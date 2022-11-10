import Dialog from '@/components/common/Dialog';
import { dialogAtom } from '@/store';
import { useAtom } from 'jotai';

function GlobalDialog() {
  const [{ config, visible }, setConfig] = useAtom(dialogAtom);

  const confirm = () => {
    config?.onConfirm?.();
    setConfig({ config, visible: false });
  };

  const close = () => {
    config?.onClose?.();
    setConfig({ config, visible: false });
  };

  return (
    <Dialog
      visible={visible}
      title={config?.title ?? ''}
      description={config?.description ?? ''}
      cancelText={config?.cancelText}
      confirmText={config?.confirmText}
      onClose={close}
      onConfirm={confirm}
      mode={config?.mode ?? 'OK'}
    />
  );
}

export default GlobalDialog;
