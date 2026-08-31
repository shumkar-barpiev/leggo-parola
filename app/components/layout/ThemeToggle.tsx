'use client';

import React, { useSyncExternalStore } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function ThemeToggle() {
  const { mode, setMode, systemMode } = useColorScheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <IconButton size="small" color="inherit" disabled sx={{ width: 36, height: 36 }}>
        <DarkModeOutlinedIcon sx={{ fontSize: 20, opacity: 0.5 }} />
      </IconButton>
    );
  }

  const resolvedMode = mode === 'system' ? systemMode : mode;
  const isDark = resolvedMode === 'dark';

  const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} arrow>
      <IconButton
        size="small"
        onClick={handleToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        sx={{
          color: 'text.primary',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          width: 36,
          height: 36,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon sx={{ fontSize: 20, color: 'warning.light' }} />
        ) : (
          <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
