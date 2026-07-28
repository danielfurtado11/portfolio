import { useEffect } from 'react';
import { useOS } from '@/store/useOS';
import { useI18n } from '@/i18n/useI18n';
import { BrandLogo } from '@/components/BrandLogo';
import { primeAudio } from '@/lib/sfx';

const BOOT_MS = 3400;

export function BootScreen() {
  const setStage = useOS((s) => s.setStage);
  const { t } = useI18n();

  const finish = () => {
    primeAudio();
    setStage('login');
  };

  useEffect(() => {
    const timer = setTimeout(() => setStage('login'), BOOT_MS);
    const onKey = () => finish();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="boot" onClick={finish} role="button" aria-label="Skip intro">
      <BrandLogo />
      <div className="boot__title">{t('bootStarting')}…</div>
      <div className="boot__bar" />
      <div className="boot__skip">{t('bootSkip')}</div>
    </div>
  );
}
