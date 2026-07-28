/**
 * Visitor counter backed by Upstash Redis (REST API — no SDK needed).
 *
 *   GET  /api/views  -> current count, never increments
 *   POST /api/views  -> increments once per IP per day, returns the new count
 *
 * Responds with `{ views: null }` when Redis isn't configured, so the front-end
 * simply hides the widget instead of erroring (e.g. during local `vite dev`).
 */

export const config = { runtime: 'edge' };

const COUNTER_KEY = 'portfolio:views';
const SEEN_PREFIX = 'portfolio:seen:';
const SEEN_TTL_SECONDS = 60 * 60 * 24;

const BOT_RE =
  /bot|crawler|spider|slurp|headless|lighthouse|pingdom|curl|wget|python-requests|facebookexternalhit|whatsapp|telegram|discord|preview|monitor/i;

type RedisEnv = { url: string; token: string };

/** Upstash sets `KV_REST_API_*` via the Vercel Marketplace, `UPSTASH_*` via its own integration. */
function redisEnv(): RedisEnv | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(env: RedisEnv, command: string[]): Promise<unknown> {
  const res = await fetch(env.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error(`upstash responded ${res.status}`);
  const body = (await res.json()) as { result?: unknown; error?: string };
  if (body.error) throw new Error(body.error);
  return body.result ?? null;
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Reserves today's slot for this visitor. Returns false when the same IP already
 * counted today, which keeps a page refresh (or a reload loop) from inflating the number.
 */
async function claimVisit(env: RedisEnv, req: Request): Promise<boolean> {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  if (!ip) return true; // No IP to dedupe on — fall back to the client-side guard.

  const day = new Date().toISOString().slice(0, 10);
  const fingerprint = await sha256(`${ip}|${day}`);
  const claimed = await redis(env, [
    'SET',
    `${SEEN_PREFIX}${fingerprint}`,
    '1',
    'NX',
    'EX',
    String(SEEN_TTL_SECONDS),
  ]);
  return claimed === 'OK';
}

function toCount(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null; // Key doesn't exist yet.
}

function json(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return json({ error: 'method not allowed' }, 405);
  }

  const env = redisEnv();
  if (!env) return json({ views: null, configured: false });

  try {
    const isBot = BOT_RE.test(req.headers.get('user-agent') ?? '');
    if (req.method === 'POST' && !isBot && (await claimVisit(env, req))) {
      return json({ views: toCount(await redis(env, ['INCR', COUNTER_KEY])) ?? 1 });
    }
    return json({ views: toCount(await redis(env, ['GET', COUNTER_KEY])) ?? 0 });
  } catch {
    return json({ views: null }, 502);
  }
}
