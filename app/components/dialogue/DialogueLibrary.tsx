'use client';

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Dialogue } from '@/app/types/dialogue';
import DialogueList from './DialogueList';

interface DialogueLibraryProps {
  dialogues: Dialogue[];
}

const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const PAGE_SIZE = 6;

export default function DialogueLibrary({ dialogues }: DialogueLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const trimmedQuery = searchQuery.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();

  // Dynamically extract unique CEFR levels from dataset
  const availableLevels = useMemo(() => {
    const unique = Array.from(new Set(dialogues.map((d) => d.level)));
    return unique.sort((a, b) => {
      const idxA = CEFR_ORDER.indexOf(a.toUpperCase());
      const idxB = CEFR_ORDER.indexOf(b.toUpperCase());
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [dialogues]);

  // Combine title search and CEFR level filter
  const filteredDialogues = useMemo(() => {
    return dialogues.filter((dialogue) => {
      const matchesTitle =
        !normalizedQuery || dialogue.title.toLowerCase().includes(normalizedQuery);
      const matchesLevel =
        selectedLevel === 'ALL' ||
        dialogue.level.toUpperCase() === selectedLevel.toUpperCase();
      return matchesTitle && matchesLevel;
    });
  }, [dialogues, normalizedQuery, selectedLevel]);

  // Total pages based on filtered dialogues
  const totalPages = Math.ceil(filteredDialogues.length / PAGE_SIZE) || 1;
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  // Paginate filtered results
  const paginatedDialogues = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    return filteredDialogues.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredDialogues, safePage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('ALL');
    setCurrentPage(1);
  };

  const isFiltering = Boolean(trimmedQuery || selectedLevel !== 'ALL');

  return (
    <Box>
      {/* Compact Controls Header: Search + Level Filters on one row on desktop */}
      <Box
        sx={{
          mb: 2.5,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {/* Search Input Bar (Compact) */}
        <TextField
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search dialogues by title..."
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    aria-label="Clear search query"
                    edge="end"
                    sx={{ p: 0.5 }}
                  >
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: 2.5,
                bgcolor: 'background.paper',
                fontSize: '0.875rem',
              },
            },
          }}
          sx={{
            width: { xs: '100%', md: 300 },
            flexShrink: 0,
          }}
        />

        {/* CEFR Level Filter Chips */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 0.75,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              mr: 0.5,
              display: { xs: 'none', sm: 'inline' },
            }}
          >
            Level:
          </Typography>

          {/* "All levels" Option */}
          <Chip
            label="All levels"
            clickable
            size="small"
            color={selectedLevel === 'ALL' ? 'primary' : 'default'}
            variant={selectedLevel === 'ALL' ? 'filled' : 'outlined'}
            onClick={() => handleLevelChange('ALL')}
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 28,
            }}
          />

          {/* Dynamic Available Levels */}
          {availableLevels.map((level) => {
            const isSelected = selectedLevel.toUpperCase() === level.toUpperCase();
            return (
              <Chip
                key={level}
                label={level}
                clickable
                size="small"
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                onClick={() => handleLevelChange(level)}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  height: 28,
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Active Filter Compact Status Bar */}
      {isFiltering && (
        <Box
          sx={[
            {
              mb: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
              py: 0.75,
              px: 1.5,
              borderRadius: 2,
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              border: '1px solid',
              borderColor: 'divider',
            },
            (theme) =>
              theme.applyStyles('dark', {
                bgcolor: 'rgba(255, 255, 255, 0.03)',
              }),
          ]}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              Showing <strong>{filteredDialogues.length}</strong> of {dialogues.length} dialogues
            </Typography>
            {trimmedQuery && (
              <Chip
                size="small"
                label={`"${trimmedQuery}"`}
                onDelete={handleClearSearch}
                sx={{ height: 22, fontSize: '0.75rem' }}
              />
            )}
            {selectedLevel !== 'ALL' && (
              <Chip
                size="small"
                label={`Level: ${selectedLevel}`}
                onDelete={() => handleLevelChange('ALL')}
                sx={{ height: 22, fontSize: '0.75rem' }}
              />
            )}
          </Box>

          <Button
            size="small"
            onClick={handleResetFilters}
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'none',
              py: 0,
              minHeight: 24,
            }}
          >
            Reset
          </Button>
        </Box>
      )}

      {/* Dialogue Cards List or Empty State */}
      {filteredDialogues.length > 0 ? (
        <>
          <DialogueList dialogues={paginatedDialogues} />

          {/* Compact Client-Side Pagination Controls */}
          {totalPages > 1 && (
            <Box
              sx={{
                mt: 3.5,
                pt: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Button
                variant="outlined"
                size="small"
                startIcon={<NavigateBeforeIcon />}
                disabled={safePage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                sx={{ fontWeight: 600, borderRadius: 2 }}
              >
                Previous
              </Button>

              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Page <strong>{safePage}</strong> of <strong>{totalPages}</strong>
              </Typography>

              <Button
                variant="outlined"
                size="small"
                endIcon={<NavigateNextIcon />}
                disabled={safePage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                sx={{ fontWeight: 600, borderRadius: 2 }}
              >
                Next
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Paper
          variant="outlined"
          sx={{
            py: 6,
            px: 3,
            textAlign: 'center',
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" component="p" sx={{ fontWeight: 600, mb: 1 }}>
            No matching dialogues
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2.5, maxWidth: 440, mx: 'auto' }}
          >
            No dialogues found for the selected level ({selectedLevel})
            {trimmedQuery ? ` and query "${trimmedQuery}"` : ''}.
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleResetFilters}
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Reset all filters
          </Button>
        </Paper>
      )}
    </Box>
  );
}
