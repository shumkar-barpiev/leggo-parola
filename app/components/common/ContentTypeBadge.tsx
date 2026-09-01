'use client';

import React from 'react';
import Chip from '@mui/material/Chip';

export type ContentType = 'Dialogue' | 'Story';

interface ContentTypeBadgeProps {
  type: ContentType;
}

export default function ContentTypeBadge({ type }: ContentTypeBadgeProps) {
  return (
    <Chip
      label={type}
      size="small"
      sx={{
        fontWeight: 700,
        fontSize: '0.75rem',
        height: 24,
        color: (theme) => (theme.palette.mode === 'dark' ? '#fb923c' : '#c2410c'),
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(251, 146, 60, 0.16)' : 'rgba(234, 88, 12, 0.1)',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(251, 146, 60, 0.35)' : 'rgba(234, 88, 12, 0.25)',
      }}
    />
  );
}
