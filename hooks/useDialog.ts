import { dialogAtom } from '@/store';
import { useAtom } from 'jotai';

interface DialogConfig {
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onClose?(): void;
  onConfirm?(): void;
  mode?: 'OK' | 'YESNO';
}

export function useOpenDialog() {
  const [, setModalConfig] = useAtom(dialogAtom);
  const openDialog = (config: DialogConfig) => {
    setModalConfig({
      config,
      visible: true,
    });
  };
  return { openDialog };
}
