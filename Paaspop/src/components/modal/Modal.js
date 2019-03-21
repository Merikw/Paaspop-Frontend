import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const Modal = props => {
  return (
    <Dialog
      onTouchOutside={props.onClose}
      width={0.9}
      visible={props.visible}
      dialogAnimation={new ScaleAnimation()}
      dialogTitle={<DialogTitle title={props.title} hasTitleBar={false} />}
      actions={[<DialogButton text="DISMISS" onPress={props.onClose} key="button-1" />]}
    >
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
