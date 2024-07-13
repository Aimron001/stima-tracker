import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, item, id}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <p>Are you sure you to delete {item}?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onConfirm(id)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
