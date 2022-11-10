import { atom } from 'jotai';

interface DialogConfig {
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onClose?(): void;
  onConfirm?(): void;
  mode?: 'OK' | 'YESNO';
}

interface DialogState {
  config?: DialogConfig | null;
  visible: boolean;
}

export const userAtom = atom();
export const dialogAtom = atom<DialogState | null>({ config: null, visible: false });
