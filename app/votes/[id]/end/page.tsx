'use server';

import { getVoteById } from '@/services/votes';
import NotFound from '@/components/errors/not-found';
import ProtectedRoute from '@/components/protected-route';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import ConfirmButton from './confirm-button';
import Link from 'next/link';
import { endVote } from '@/services/votes';

export default async function Page({ params }: { params: { id: string } }) {
  const voteId = parseInt(params.id);
  const vote: any = await getVoteById(voteId);

  if (!vote || vote.status !== 'started') return <NotFound />;

  async function confirm() {
    'use server';
    await endVote(voteId);
  }

  return (
    <ProtectedRoute authorizedRoles={['Gestionnaire']}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Mettre fin à un vote
          </Typography>
        </Box>
        <Typography>Veuillez confirmer la fin du vote suivant:</Typography>
        <Card variant="outlined" sx={{ p: 2, my: 2 }}>
          <Typography variant="h6">{vote.title}</Typography>
        </Card>
        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} sm={6}>
            <ConfirmButton confirm={confirm} id={voteId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link href={'/votes/' + voteId}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '100%' }}
              >
                Revenir en arrière
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </ProtectedRoute>
  );
}
