import { useI18n } from '@/i18n/useI18n';
import { DocButton } from '@/components/DocButton';

const CV_URL = '/cv/Daniel-Furtado-CV.pdf';

export function CVApp() {
  const { t, L } = useI18n();

  const download = () => {
    const a = document.createElement('a');
    a.href = CV_URL;
    a.download = 'Daniel-Furtado-CV.pdf';
    a.click();
  };

  return (
    <div className="cv-app">
      <div className="cv-toolbar">
        <DocButton variant="primary" onClick={download}>
          {t('downloadCV')}
          <span className="docbtn__ic" aria-hidden="true">↓</span>
        </DocButton>
        <DocButton onClick={() => window.open(CV_URL, '_blank')}>
          {t('openCV')}
          <span className="docbtn__ic" aria-hidden="true">↗</span>
        </DocButton>
        <span className="cv-toolbar__note">{L({ pt: 'Currículo · PDF', en: 'Résumé · PDF' })}</span>
      </div>
      <iframe className="cv-frame" src={`${CV_URL}#view=FitH`} title="Daniel Furtado CV" />
    </div>
  );
}
