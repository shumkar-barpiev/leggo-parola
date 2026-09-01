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
import { Story } from '@/app/types/story';
import StoryList from './StoryList';

interface StoryLibraryProps {
  stories: Story[];
}

const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const PAGE_SIZE = 6;

export default function StoryLibrary({ stories }: StoryLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const trimmedQuery = searchQuery.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();

  // Extract unique CEFR levels from dataset
  const availableLevels = useMemo(() => {
    const unique = Array.from(new Set(stories.map((s) => s.level).filter(Boolean)));
    return unique.sort((a, b) => {
      const idxA = CEFR_ORDER.indexOf(a.toUpperCase());
      const idxB = CEFR_ORDER.indexOf(b.toUpperCase());
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [stories]);

  // Extract unique topics from dataset
  const availableTopics = useMemo(() => {
    const unique = Array.from(new Set(stories.map((s) => s.topic).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [stories]);

  // Filter stories by title query, level, and topic (before pagination)
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesTitle =
        !normalizedQuery || story.title.toLowerCase().includes(normalizedQuery);
      const matchesLevel =
        selectedLevel === 'ALL' ||
        story.level.toUpperCase() === selectedLevel.toUpperCase();
      const matchesTopic =
        selectedTopic === 'ALL' ||
        story.topic.toLowerCase() === selectedTopic.toLowerCase();
      return matchesTitle && matchesLevel && matchesTopic;
    });
  }, [stories, normalizedQuery, selectedLevel, selectedTopic]);

  // Total pages based on filtered results
  const totalPages = Math.ceil(filteredStories.length / PAGE_SIZE) || 1;
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  // Paginated slice of filtered stories
  const paginatedStories = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    return filteredStories.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredStories, safePage]);

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

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('ALL');
    setSelectedTopic('ALL');
    setCurrentPage(1);
  };

  const isFiltering = Boolean(trimmedQuery || selectedLevel !== 'ALL' || selectedTopic !== 'ALL');

  return (
    <Box>
      {/* Cohesive Filter Toolbar */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* Main Filter Toolbar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {/* Search */}
          <TextField
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search stories by title..."
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: "text.secondary",
                        fontSize: 18,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      aria-label="Clear search query"
                      edge="end"
                      sx={{ p: 0.25 }}
                    >
                      <ClearIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
                sx: {
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  fontSize: "0.875rem",
                  height: 38,
                },
              },
            }}
            sx={{
              width: {
                xs: "100%",
                sm: 320,
                md: 300,
              },
              flexShrink: 0,
            }}
          />

          {/* Level Filter */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.75,
              minWidth: 0,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                mr: 0.25,
                whiteSpace: "nowrap",
              }}
            >
              Level:
            </Typography>

            <Chip
              label="All"
              clickable
              size="small"
              color={selectedLevel === "ALL" ? "primary" : "default"}
              variant={selectedLevel === "ALL" ? "filled" : "outlined"}
              onClick={() => handleLevelChange("ALL")}
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 28,
              }}
            />

            {availableLevels.map((level) => {
              const isSelected =
                selectedLevel.toUpperCase() === level.toUpperCase();

              return (
                <Chip
                  key={level}
                  label={level}
                  clickable
                  size="small"
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                  onClick={() => handleLevelChange(level)}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    height: 28,
                  }}
                />
              );
            })}
          </Box>

          {/* Topic Filter */}
          {availableTopics.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 0.75,
                minWidth: 0,
                flex: { xs: "unset", md: 1 },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  mr: 0.25,
                  whiteSpace: "nowrap",
                }}
              >
                Topic:
              </Typography>

              <Chip
                label="All topics"
                clickable
                size="small"
                color={selectedTopic === "ALL" ? "primary" : "default"}
                variant={selectedTopic === "ALL" ? "filled" : "outlined"}
                onClick={() => handleTopicChange("ALL")}
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: 28,
                }}
              />

              {availableTopics.map((topic) => {
                const isSelected =
                  selectedTopic.toLowerCase() === topic.toLowerCase();

                return (
                  <Chip
                    key={topic}
                    label={topic.replace(/-/g, " ")}
                    clickable
                    size="small"
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                    onClick={() => handleTopicChange(topic)}
                    sx={{
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: "0.75rem",
                      height: 28,
                      textTransform: "capitalize",
                    }}
                  />
                );
              })}
            </Box>
          )}
        </Box>

        {/* Result Count */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            minHeight: 28,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            {isFiltering ? (
              <>
                Showing <strong>{filteredStories.length}</strong> of{" "}
                {stories.length} stories
              </>
            ) : (
              <>
                Showing <strong>{filteredStories.length}</strong>{" "}
                {filteredStories.length === 1 ? "story" : "stories"}
              </>
            )}
          </Typography>

          {isFiltering && (
            <Button
              size="small"
              onClick={handleResetFilters}
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                textTransform: "none",
                minWidth: "auto",
                px: 1,
                py: 0.25,
                minHeight: 28,
              }}
            >
              Clear filters
            </Button>
          )}
        </Box>
      </Box>

      {/* Story Cards Grid or Empty State */}
      {filteredStories.length > 0 ? (
        <>
          <StoryList stories={paginatedStories} />

          {/* Compact Pagination Controls */}
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
            No matching stories
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2.5, maxWidth: 460, mx: 'auto' }}
          >
            {isFiltering
              ? `No stories found matching the active filters${trimmedQuery ? ` ("${trimmedQuery}")` : ''}. Try adjusting your search or filters.`
              : 'No stories available yet.'}
          </Typography>
          {isFiltering && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleResetFilters}
              sx={{ fontWeight: 600, borderRadius: 2 }}
            >
              Clear filters
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
}
