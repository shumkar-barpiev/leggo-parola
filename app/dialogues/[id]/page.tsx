import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Reader from '@/app/components/reader/Reader';
import { getAllDialogues, getDialogueById } from '@/app/lib/dialogues';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const dialogues = getAllDialogues();
  return dialogues.map((dialogue) => ({
    id: dialogue.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const dialogue = getDialogueById(id);

  if (!dialogue) {
    return {
      title: 'Dialogue Not Found - LeggoParola',
    };
  }

  return {
    title: `${dialogue.title} (${dialogue.level}) - LeggoParola`,
    description: dialogue.description,
  };
}

export default async function DialoguePage({ params }: PageProps) {
  const { id } = await params;
  const dialogue = getDialogueById(id);

  if (!dialogue) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {/* Top Navigation */}
      <Box sx={{ mb: 3 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            color="inherit"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            Back to Dialogues
          </Button>
        </Link>
      </Box>

      {/* Reader Main Content */}
      <Reader dialogue={dialogue} />
    </Container>
  );
}
