'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { Story } from '@/app/types/story';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 24px rgba(0, 0, 0, 0.4)'
              : theme.shadows[4],
          borderColor: 'primary.main',
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/stories/${story.id}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          p: 2.5,
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5, alignItems: 'center' }}>
            <Chip
              label={story.level}
              size="small"
              color="primary"
              variant="filled"
              sx={{ fontWeight: 700, fontSize: '0.75rem', height: 24 }}
            />
            <Chip
              label={story.topic}
              size="small"
              variant="outlined"
              sx={{ textTransform: 'capitalize', fontSize: '0.75rem', height: 24 }}
            />
          </Stack>

          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
            {story.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {story.description}
          </Typography>
        </CardContent>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2.5,
            pt: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {story.estimatedReadingMinutes} min read
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.8125rem',
            }}
          >
            <span>Read story</span>
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
