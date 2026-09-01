import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import DialogueList from '@/app/components/dialogue/DialogueList';
import StoryList from '@/app/components/story/StoryList';
import { getRandomDialogues } from '@/app/lib/dialogues';
import { getFeaturedStories } from '@/app/lib/stories';

export default function Home() {
  const dialogues = getRandomDialogues(3);
  const stories = getFeaturedStories(3);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Hero Section */}
      <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: { xs: 'left', sm: 'center' } }}>
        <Chip
          label="Interactive Italian Learning"
          color="primary"
          variant="outlined"
          size="small"
          sx={{ mb: 2, fontWeight: 600 }}
        />
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
            letterSpacing: '-0.02em',
            mb: 2,
          }}
        >
          Learn Italian Through Real Conversations & Stories
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 680,
            mx: { xs: 0, sm: 'auto' },
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.6,
          }}
        >
          Practice with realistic Italian dialogues and engaging short stories. Tap any word to see its translation and explore natural phrasing in context.
        </Typography>
      </Box>

      {/* Featured Stories Section */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              Featured Stories
            </Typography>
            <Chip
              label={`${stories.length} stories`}
              size="small"
              sx={{ fontWeight: 600, bgcolor: 'action.hover' }}
            />
          </Box>

          <Link href="/stories" style={{ textDecoration: 'none' }}>
            <Button
              endIcon={<ArrowForwardIcon />}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600 }}
            >
              View all stories
            </Button>
          </Link>
        </Box>

        <StoryList stories={stories} />
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* Featured Dialogues Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              Featured Dialogues
            </Typography>
            <Chip
              label={`${dialogues.length} dialogues`}
              size="small"
              sx={{ fontWeight: 600, bgcolor: 'action.hover' }}
            />
          </Box>

          <Link href="/dialogues" style={{ textDecoration: 'none' }}>
            <Button
              endIcon={<ArrowForwardIcon />}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600 }}
            >
              View all dialogues
            </Button>
          </Link>
        </Box>

        <DialogueList dialogues={dialogues} />
      </Box>
    </Container>
  );
}
