'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TranslateIcon from '@mui/icons-material/Translate';
import { Story } from '@/app/types/story';
import { renderInteractiveText } from '@/app/lib/renderInteractiveText';
import SentenceTranslation from '@/app/components/reader/SentenceTranslation';

interface StoryReaderProps {
  story: Story;
}

export default function StoryReader({ story }: StoryReaderProps) {
  const [openSentenceIds, setOpenSentenceIds] = useState<Set<string>>(new Set());

  const toggleSentenceTranslation = (sentenceId: string) => {
    setOpenSentenceIds((prev) => {
      const next = new Set(prev);
      if (next.has(sentenceId)) {
        next.delete(sentenceId);
      } else {
        next.add(sentenceId);
      }
      return next;
    });
  };

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', width: '100%' }}>
      {/* Story Metadata Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.5, sm: 3 },
          mb: 3,
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 1.5, alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={story.level}
            color="primary"
            size="small"
            sx={{ fontWeight: 700, fontSize: '0.75rem', height: 24 }}
          />
          <Chip
            label={story.topic}
            variant="outlined"
            size="small"
            sx={{ textTransform: 'capitalize', fontSize: '0.75rem', height: 24 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', ml: 'auto' }}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {story.estimatedReadingMinutes} min read
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <MenuBookIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {story.wordCount} words
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            letterSpacing: '-0.01em',
            mb: 1,
          }}
        >
          {story.title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.95rem', sm: '1rem' },
            lineHeight: 1.6,
          }}
        >
          {story.description}
        </Typography>
      </Paper>

      {/* Story Content - Continuous Prose with Interactive Words & Sentence Translations */}
      <Paper
        variant="outlined"
        component="article"
        aria-label="Story text"
        sx={{
          p: { xs: 3, sm: 4.5 },
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        {story.paragraphs.map((paragraph) => (
          <Box
            key={paragraph.id}
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              lineHeight: { xs: 1.85, sm: 2.0 },
              mb: { xs: 3, sm: 3.5 },
              '&:last-child': { mb: 0 },
              color: 'text.primary',
              letterSpacing: '0.01em',
            }}
          >
            {paragraph.sentences.map((sentence, sIndex) => {
              const isSentenceOpen = openSentenceIds.has(sentence.id);

              return (
                <React.Fragment key={sentence.id}>
                  <Box component="span" sx={{ display: 'inline' }}>
                    {renderInteractiveText(sentence.text, sentence.words)}
                    <Tooltip
                      title={isSentenceOpen ? 'Hide translation' : 'Translate sentence'}
                      arrow
                      placement="top"
                    >
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSentenceTranslation(sentence.id);
                        }}
                        aria-label={isSentenceOpen ? 'Hide translation' : 'Translate sentence'}
                        sx={{
                          display: 'inline-flex',
                          verticalAlign: 'middle',
                          p: '2px',
                          mx: 0.5,
                          opacity: isSentenceOpen ? 1 : 0.4,
                          color: isSentenceOpen ? 'primary.main' : 'text.secondary',
                          backgroundColor: isSentenceOpen ? 'action.selected' : 'transparent',
                          borderRadius: '4px',
                          transition: 'opacity 0.15s, background-color 0.15s, color 0.15s',
                          '&:hover': {
                            opacity: 1,
                            color: 'primary.main',
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <TranslateIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                    {sIndex < paragraph.sentences.length - 1 && !isSentenceOpen ? ' ' : ''}
                  </Box>
                  <SentenceTranslation
                    translation={sentence.translation}
                    isOpen={isSentenceOpen}
                  />
                </React.Fragment>
              );
            })}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

