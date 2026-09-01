import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StoryReader from '@/app/components/reader/StoryReader';
import { getAllStories, getStoryById } from '@/app/lib/stories';

interface PageProps {
  params: Promise<{ storyId: string }>;
}

export async function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((story) => ({
    storyId: story.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storyId } = await params;
  const story = getStoryById(storyId);

  if (!story) {
    return {
      title: 'Story Not Found - LeggoParola',
    };
  }

  return {
    title: `${story.title} (${story.level}) - LeggoParola`,
    description: story.description,
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { storyId } = await params;
  const story = getStoryById(storyId);

  if (!story) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Top Navigation */}
      <Box sx={{ mb: 3 }}>
        <Link href="/stories" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            color="inherit"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Back to Stories
          </Button>
        </Link>
      </Box>

      {/* Story Reader Main Content */}
      <StoryReader story={story} />
    </Container>
  );
}
