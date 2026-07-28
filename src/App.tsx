import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOS } from '@/store/useOS';
import { BootScreen } from '@/stages/BootScreen';
import { LoginScreen } from '@/stages/LoginScreen';
import { Desktop } from '@/stages/Desktop';
import { ClickFX } from '@/components/ClickFX';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { trackVisit } from '@/hooks/useViews';

export default function App() {
  const stage = useOS((s) => s.stage);
  const session = useOS((s) => s.session);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.session = session === 'night' ? 'night' : 'day';
  }, [session]);

  // Count the visit even on mobile, where the gadget (and its widget) never renders.
  useEffect(trackVisit, []);

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4 },
      };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={stage} className="stage" {...fade}>
          {stage === 'boot' && <BootScreen />}
          {stage === 'login' && <LoginScreen />}
          {stage === 'desktop' && <Desktop />}
        </motion.div>
      </AnimatePresence>
      <ClickFX />
    </>
  );
}
