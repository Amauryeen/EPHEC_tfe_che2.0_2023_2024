'use server';
import { Box, Button, Card, Typography } from '@mui/material';
import UsersTable from './table';
import Link from 'next/link';
import { getUsers } from '@/services/users';
import AddIcon from '@mui/icons-material/Add';

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Tous les utilisateurs
          </Typography>
          <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
            <Link href="/users/new">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ marginBottom: '10px' }}
              >
                Créer
              </Button>
            </Link>
          </Box>
        </Box>
        <UsersTable users={users} />
      </Card>
    </>
  );
}
