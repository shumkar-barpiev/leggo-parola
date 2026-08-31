'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TranslateIcon from '@mui/icons-material/Translate';
import { DialogueLine as DialogueLineType, DialogueWord } from '@/app/types/dialogue';
import Word from './Word';
import SentenceTranslation from './SentenceTranslation';

interface DialogueLineProps {
  line: DialogueLineType;
  speakerIndex?: number;
}

const SPEAKER_AVATAR_COLORS = [
  '#0284c7', // Sky Blue
  '#d97706', // Amber / Orange
  '#16a34a', // Emerald Green
  '#9333ea', // Purple
  '#e11d48', // Rose / Red
  '#0d9488', // Teal
];

function renderInteractiveText(text: string, words: DialogueWord[]) {
  if (!words || words.length === 0) {
    return text;
  }

  const nodes: React.ReactNode[] = [];
  let currentIndex = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const matchIndex = text.indexOf(word.text, currentIndex);

    if (matchIndex === -1) {
      nodes.push(
        <Word key={`word-${i}-${word.text}`} word={word} />
      );
      continue;
    }

    // Append preceding characters (punctuation, whitespace)
    if (matchIndex > currentIndex) {
      nodes.push(
        <React.Fragment key={`text-before-${i}-${currentIndex}`}>
          {text.slice(currentIndex, matchIndex)}
        </React.Fragment>
      );
    }

    // Append interactive word
    nodes.push(
      <Word key={`word-${i}-${word.text}`} word={word} />
    );

    currentIndex = matchIndex + word.text.length;
  }

  // Append any trailing punctuation or whitespace
  if (currentIndex < text.length) {
    nodes.push(
      <React.Fragment key={`text-trailing-${currentIndex}`}>
        {text.slice(currentIndex)}
      </React.Fragment>
    );
  }

  return nodes;
}

export default function DialogueLine({ line, speakerIndex = 0 }: DialogueLineProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  const avatarBg = SPEAKER_AVATAR_COLORS[speakerIndex % SPEAKER_AVATAR_COLORS.length];
  const speakerInitial = line.speaker.charAt(0).toUpperCase();

  const handleToggleTranslation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTranslation((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: { xs: 1.5, sm: 2 },
        py: 0.75,
      }}
    >
      {/* Speaker Avatar with Tooltip */}
      <Tooltip title={line.speaker} placement="top" arrow>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: avatarBg,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.875rem',
            flexShrink: 0,
            mt: 0.25,
            cursor: 'default',
          }}
        >
          {speakerInitial}
        </Avatar>
      </Tooltip>

      {/* Main Conversation Line Content */}
      <Box sx={{ flexGrow: 1, minWidth: 0, pt: 0.25 }}>
        {/* Interactive Italian Text */}
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontSize: { xs: '1.05rem', sm: '1.15rem' },
            fontWeight: 500,
            lineHeight: 1.6,
            color: 'text.primary',
          }}
        >
          {renderInteractiveText(line.text, line.words)}
        </Typography>

        {/* Collapsible English Sentence Translation */}
        <SentenceTranslation
          translation={line.translation}
          isOpen={showTranslation}
        />
      </Box>

      {/* Far Right: Icon-only Translation Toggle with Tooltip */}
      <Tooltip
        title={showTranslation ? 'Hide translation' : 'Show translation'}
        placement="top"
        arrow
      >
        <IconButton
          size="small"
          onClick={handleToggleTranslation}
          aria-label={showTranslation ? 'Hide translation' : 'Show translation'}
          color={showTranslation ? 'primary' : 'default'}
          sx={{
            color: showTranslation ? 'primary.main' : 'text.secondary',
            backgroundColor: showTranslation ? 'action.selected' : 'transparent',
            flexShrink: 0,
            mt: 0.25,
            '&:hover': {
              backgroundColor: 'action.hover',
              color: 'primary.main',
            },
          }}
        >
          <TranslateIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
