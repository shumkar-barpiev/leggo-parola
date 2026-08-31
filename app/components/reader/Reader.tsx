'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Dialogue } from '@/app/types/dialogue';
import DialogueLine from '@/app/components/dialogue/DialogueLine';

interface ReaderProps {
  dialogue: Dialogue;
}

export default function Reader({ dialogue }: ReaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map unique speakers to distinct color indices
  const speakerIndexMap = React.useMemo(() => {
    const map = new Map<string, number>();
    let currentIndex = 0;
    dialogue.lines.forEach((line) => {
      if (!map.has(line.speaker)) {
        map.set(line.speaker, currentIndex++);
      }
    });
    return map;
  }, [dialogue.lines]);

  const uniqueSpeakers = Array.from(speakerIndexMap.keys());

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', width: '100%' }}>
      {/* Collapsible Dialogue Info Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: isExpanded ? { xs: 2.5, sm: 3 } : { xs: 1.5, sm: 2 },
          mb: 2.5,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          transition: 'padding 0.2s ease-in-out',
        }}
      >
        {/* Header Top Summary Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          {/* Left: Essential info in a compact row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1.25,
              minWidth: 0,
            }}
          >
            <Chip
              label={dialogue.level}
              color="primary"
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.75rem', height: 24 }}
            />

            <Typography
              variant={isExpanded ? 'h5' : 'subtitle1'}
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1.3,
              }}
            >
              {dialogue.title}
            </Typography>

            <Chip
              label={dialogue.topic}
              variant="outlined"
              size="small"
              sx={{ textTransform: 'capitalize', fontSize: '0.75rem', height: 24 }}
            />

            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              ({dialogue.lines.length} exchanges)
            </Typography>
          </Box>

          {/* Right: Expand / Collapse Toggle Button */}
          <Tooltip title={isExpanded ? 'Hide details' : 'Show details'} arrow>
            <IconButton
              size="small"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse dialogue details' : 'Expand dialogue details'}
              sx={{
                color: 'text.secondary',
                flexShrink: 0,
                '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
              }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Collapsible Detailed Section */}
        <Collapse in={isExpanded} timeout={200} unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              {dialogue.description}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Speakers:
                </Typography>
                {uniqueSpeakers.map((speaker) => (
                  <Chip
                    key={speaker}
                    label={speaker}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem', height: 22 }}
                  />
                ))}
              </Box>

              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Source: {dialogue.sourceLanguage.toUpperCase()} → Translation: {dialogue.translationLanguage.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Paper>

      {/* Single Shared Dialogue Transcript Container */}
      <Paper
        variant="outlined"
        component="section"
        aria-label="Dialogue conversation transcript"
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        {dialogue.lines.map((line, index) => (
          <React.Fragment key={line.id}>
            <DialogueLine
              line={line}
              speakerIndex={speakerIndexMap.get(line.speaker) ?? 0}
            />
            {index < dialogue.lines.length - 1 && (
              <Divider sx={{ my: 1.5, opacity: 0.6 }} />
            )}
          </React.Fragment>
        ))}
      </Paper>
    </Box>
  );
}
