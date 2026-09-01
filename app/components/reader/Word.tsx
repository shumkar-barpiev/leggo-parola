'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DialogueWord } from '@/app/types/dialogue';
import { StoryWord } from '@/app/types/story';
import WordTranslationPopover from './WordTranslationPopover';

interface WordProps {
  word: DialogueWord | StoryWord;
}

export default function Word({ word }: WordProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <Box
        component="span"
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        sx={{
          display: 'inline',
          cursor: 'pointer',
          borderRadius: '4px',
          px: '2px',
          py: '1px',
          transition: 'background-color 0.15s ease, color 0.15s ease',
          backgroundColor: (theme) =>
            isOpen
              ? theme.palette.mode === 'dark'
                ? 'rgba(56, 189, 248, 0.22)'
                : 'rgba(25, 118, 210, 0.15)'
              : 'transparent',
          color: isOpen ? 'primary.main' : 'inherit',
          fontWeight: isOpen ? 600 : 'inherit',
          '&:hover': {
            backgroundColor: (theme) =>
              isOpen
                ? theme.palette.mode === 'dark'
                  ? 'rgba(56, 189, 248, 0.28)'
                  : 'rgba(25, 118, 210, 0.2)'
                : theme.palette.mode === 'dark'
                  ? 'rgba(56, 189, 248, 0.12)'
                  : 'rgba(25, 118, 210, 0.08)',
            color: 'primary.main',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: '1px',
          },
        }}
      >
        {word.text}
      </Box>

      <WordTranslationPopover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        word={word}
      />
    </>
  );
}
