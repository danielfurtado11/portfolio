import { AnimatePresence } from 'framer-motion';
import { useOS } from '@/store/useOS';
import { APP_CONTENT } from '@/apps/registry';
import { Window } from './Window';

export function WindowManager() {
  const windows = useOS((s) => s.windows);

  return (
    <AnimatePresence>
      {windows
        .filter((w) => !w.minimized)
        .map((w) => {
          const Content = APP_CONTENT[w.id];
          return (
            <Window win={w} key={w.id}>
              <Content />
            </Window>
          );
        })}
    </AnimatePresence>
  );
}
