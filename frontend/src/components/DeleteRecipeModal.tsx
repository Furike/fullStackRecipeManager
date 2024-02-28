import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteRecipeMutation from '../api/deleteRecipe';
import { useState } from 'react';

type Props = {
  id: number;
};

function DeleteRecipeModal({ id }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteRecipeMutation,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate('/');
    },
    onError: (e) => console.log(e),
  });

  if (mutation.isPending) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)} color="warning">
        Delete
      </Button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">
            Are you sure you want to delete this recipe?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => mutation.mutate(id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <CircularProgress size={30} /> : 'Delete'}
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </Box>
          {mutation.isError && (
            <Alert severity="error">Failed to delete recipe.</Alert>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteRecipeModal;
