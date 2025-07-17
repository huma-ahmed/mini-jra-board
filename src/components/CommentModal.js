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