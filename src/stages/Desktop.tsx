import { AnimatePresence } from 'framer-motion';
import { useOS } from '@/store/useOS';
import { Wallpaper } from '@/components/Wallpaper';
import { PixelRunner } from '@/components/PixelRunner';
import { Birds } from '@/components/Birds';
import { DesktopIcons } from '@/desktop/DesktopIcons';
import { Gadgets } from '@/desktop/Gadgets';
import { WindowManager } from '@/desktop/WindowManager';
import { Taskbar } from '@/desktop/Taskbar';
import { StartMenu } from '@/desktop/StartMenu';

export function Desktop() {
  const startOpen = useOS((s) => s.startOpen);

  return (
    <div className="desktop">
      <Wallpaper />
      <Birds />
      <PixelRunner />
      <DesktopIcons />
      <Gadgets />
      <WindowManager />
      <AnimatePresence>{startOpen && <StartMenu />}</AnimatePresence>
      <Taskbar />
    </div>
  );
}
