'use client';

import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { DialogueWord } from '@/app/types/dialogue';

interface WordTranslationPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  word: DialogueWord;
}

export default function WordTranslationPopover({
  open,
  anchorEl,
  onClose,
  word,
}: WordTranslationPopoverProps) {
  const hasMultiple = word.translation.length > 1;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      slotProps={{
        paper: {
          elevation: 6,
          sx: {
            mt: 1,
            borderRadius: 2.5,
            p: 1.75,
            minWidth: 180,
            maxWidth: 280,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      }}
    >
      <Box>
        {/* Header: Italian Word & Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              color: 'primary.main',
              lineHeight: 1.2,
            }}
          >
            {word.text}
          </Typography>
          <Chip
            label="IT → EN"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              bgcolor: 'action.hover',
              color: 'text.secondary',
            }}
          />
        </Box>

        <Divider sx={{ mb: 1.25 }} />

        {/* Translation(s) */}
        {hasMultiple ? (
          <Stack spacing={0.75}>
            {word.translation.map((trans, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    minWidth: 14,
                  }}
                >
                  {index + 1}.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    fontSize: '0.9375rem',
                    lineHeight: 1.4,
                  }}
                >
                  {trans}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: '0.9375rem',
              lineHeight: 1.4,
            }}
          >
            {word.translation[0]}
          </Typography>
        )}
      </Box>
    </Popover>
  );
}
