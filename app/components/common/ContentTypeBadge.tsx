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
      sx={[
        {
          fontWeight: 700,
          fontSize: '0.75rem',
          height: 24,
          color: '#c2410c',
          backgroundColor: 'rgba(234, 88, 12, 0.1)',
          border: '1px solid',
          borderColor: 'rgba(234, 88, 12, 0.25)',
        },
        (theme) =>
          theme.applyStyles('dark', {
            color: '#fb923c',
            backgroundColor: 'rgba(251, 146, 60, 0.16)',
            borderColor: 'rgba(251, 146, 60, 0.35)',
          }),
      ]}
    />
  );
}
