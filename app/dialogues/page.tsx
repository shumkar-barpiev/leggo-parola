import type { Metadata } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import DialogueLibrary from '@/app/components/dialogue/DialogueLibrary';
import { getAllDialogues } from '@/app/lib/dialogues';

export const metadata: Metadata = {
  title: 'Dialogue Library - LeggoParola',
  description: 'Explore the complete library of Italian dialogues with vocabulary and phrase lookups.',
};

export default function DialoguesPage() {
  const dialogues = getAllDialogues();

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
            Dialogue Library
          </Typography>
          <Chip
            label={`${dialogues.length} dialogues`}
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Explore the complete collection of Italian dialogues and practice reading in context.
        </Typography>
      </Box>

      {/* Interactive Dialogue Library with Search */}
      <DialogueLibrary dialogues={dialogues} />
    </Container>
  );
}
