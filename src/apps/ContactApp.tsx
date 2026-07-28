import { useState } from 'react';
import { useI18n } from '@/i18n/useI18n';
import { contactLinks } from '@/data/contact';
import { ContactIcon } from '@/components/ContactIcon';
import { DocButton } from '@/components/DocButton';
import { sfx } from '@/lib/sfx';

export function ContactApp() {
  const { t, L } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      sfx.toggle();
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="doc">
      <div className="doc__wrap">
        <header className="doc__head">
          <h2 className="doc__title">{t('appContact')}</h2>
          <p className="doc__intro">{t('contactIntro')}</p>
        </header>

        <div className="contact-list">
          {contactLinks.map((c) => (
            <div className="contact-row" key={c.id}>
              <span className="contact-icon">
                <ContactIcon id={c.icon} />
              </span>
              <div className="contact-info">
                <span className="contact-label">{L(c.label)}</span>
                <a className="contact-val" href={c.href} target="_blank" rel="noreferrer noopener">
                  {c.value}
                </a>
                <small className="contact-hint">{L(c.hint)}</small>
              </div>
              {c.copyable && (
                <DocButton className="contact-copy" onClick={() => copy(c.id, c.value)}>
                  {copied === c.id ? t('copied') : t('copy')}
                </DocButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
