'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TranslateIcon from '@mui/icons-material/Translate';
import { DialogueLine as DialogueLineType } from '@/app/types/dialogue';
import SentenceTranslation from '@/app/components/reader/SentenceTranslation';
import { renderInteractiveText } from '@/app/lib/renderInteractiveText';

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
