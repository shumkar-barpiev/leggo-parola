'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialogue } from '@/app/types/dialogue';
import DialogueCard from './DialogueCard';

interface DialogueListProps {
  dialogues: Dialogue[];
}

export default function DialogueList({ dialogues }: DialogueListProps) {
  if (!dialogues || dialogues.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No dialogues available yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 3,
      }}
    >
      {dialogues.map((dialogue) => (
        <DialogueCard key={dialogue.id} dialogue={dialogue} />
      ))}
    </Box>
  );
}
