import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import PropTypes from 'prop-types';

const CustomModal = props => {
  const { onClose, visible, title, children } = props;
  return (
    <Dialog
      onTouchOutside={onClose}
      width={0.9}
      visible={visible}
      dialogAnimation={new ScaleAnimation()}
      dialogTitle={<DialogTitle title={title} hasTitleBar={false} />}
      actions={[<DialogButton text="DISMISS" onPress={onClose} key="button-1" />]}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

CustomModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;
