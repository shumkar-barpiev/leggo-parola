'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

interface SentenceTranslationProps {
  translation: string;
  isOpen: boolean;
}

export default function SentenceTranslation({ translation, isOpen }: SentenceTranslationProps) {
  return (
    <Collapse in={isOpen} timeout={200} unmountOnExit>
      <Box
        sx={{
          mt: 1,
          py: 0.875,
          px: 1.5,
          borderRadius: '0 8px 8px 0',
          borderLeft: '3px solid',
          borderColor: 'primary.main',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(25, 118, 210, 0.04)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: '0.8125rem',
              color: 'text.secondary',
              flexShrink: 0,
            }}
          >
            Eng:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.9rem', sm: '0.95rem' },
              color: 'text.primary',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            {translation}
          </Typography>
        </Box>
      </Box>
    </Collapse>
  );
}
