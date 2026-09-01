'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Story } from '@/app/types/story';
import StoryCard from './StoryCard';

interface StoryListProps {
  stories: Story[];
}

export default function StoryList({ stories }: StoryListProps) {
  if (!stories || stories.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No stories available yet.
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
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </Box>
  );
}
