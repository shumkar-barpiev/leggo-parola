'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  const isDialoguesActive = pathname?.startsWith('/dialogues');
  const isStoriesActive = pathname?.startsWith('/stories');

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            minHeight: { xs: 56, sm: 64 },
            gap: 1,
          }}
        >
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
              textDecoration: 'none',
              color: 'inherit',
              flexShrink: 0,
            }}
          >
            <MenuBookIcon sx={{ color: 'primary.main', fontSize: { xs: 24, sm: 28 } }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: '.05rem',
                color: 'text.primary',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              LeggoParola
            </Typography>
          </Box>

          <Box
            component="nav"
            aria-label="Main Navigation"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1.5 },
            }}
          >
            <Button
              component={Link}
              href="/dialogues"
              color={isDialoguesActive ? 'primary' : 'inherit'}
              size="medium"
              sx={{
                fontWeight: isDialoguesActive ? 700 : 500,
                px: { xs: 1, sm: 1.5 },
                minWidth: { xs: 'auto', sm: 64 },
                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                backgroundColor: isDialoguesActive ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: isDialoguesActive ? 'action.selected' : 'action.hover',
                },
              }}
            >
              Dialogues
            </Button>
            <Button
              component={Link}
              href="/stories"
              color={isStoriesActive ? 'primary' : 'inherit'}
              size="medium"
              sx={{
                fontWeight: isStoriesActive ? 700 : 500,
                px: { xs: 1, sm: 1.5 },
                minWidth: { xs: 'auto', sm: 64 },
                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                backgroundColor: isStoriesActive ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: isStoriesActive ? 'action.selected' : 'action.hover',
                },
              }}
            >
              Stories
            </Button>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

