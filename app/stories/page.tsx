import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import StoryLibrary from '@/app/components/story/StoryLibrary';
import { getAllStories } from '@/app/lib/stories';

export const metadata: Metadata = {
  title: 'Story Library - LeggoParola',
  description: 'Explore Italian short stories with vocabulary and phrase lookups.',
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 1,
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
            Story Library
          </Typography>
          <Chip
            label={`${stories.length} stories`}
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Explore short stories in Italian to practice reading comprehension in context.
        </Typography>
      </Box>

      {/* Interactive Story Library with Search */}
      <StoryLibrary stories={stories} />
    </Container>
  );
}
