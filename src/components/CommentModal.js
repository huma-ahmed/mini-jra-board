import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';

const CommentModal = ({ open, onClose, onSave, value }) => {
  const [comment, setComment] = useState(value || '');

  useEffect(() => {
    if (open) setComment(value || '');
  }, [open, value]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false} // allow full screen width
      PaperProps={{
        style: {
          width: '70vw',     // 70% of viewport width
          height: '60vh',    // 60% of viewport height
          padding: '20px',
        }
      }}
    >
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent style={{ height: '100%' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Comment"
          type="text"
          fullWidth
          multiline
          minRows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ height: '100%' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(comment)} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModal;