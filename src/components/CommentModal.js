<<<<<<< HEAD
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
=======
import React from 'react';
import {
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button
} from '@mui/material';

export default function CommentModal({ open, handleClose, comment, setComment }) {
  const handleSave = () => {
    console.log("Comment Saved:", comment);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>Add Comment</Typography>
          <TextField
            label="Comment Description"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Box mt={2} display="flex" gap={2}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
