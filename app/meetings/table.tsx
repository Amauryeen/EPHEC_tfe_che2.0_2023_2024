'use client';
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { Meeting } from '@prisma/client';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { Chip } from '@mui/material';

export default function Table(props: { meetings: Meeting[] }) {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Titre' },
    {
      field: 'startTime',
      headerName: 'Début',
      renderCell: (params: GridRenderCellParams) => {
        return new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Europe/Brussels',
        }).format(new Date(params.row.startTime));
      },
    },
    {
      field: 'endTime',
      headerName: 'Fin',
      renderCell: (params: GridRenderCellParams) => {
        return new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Europe/Brussels',
        }).format(new Date(params.row.endTime));
      },
    },
    {
      field: 'status',
      headerName: 'Statut',
      renderCell: (params: GridRenderCellParams) => {
        switch (params.row.status) {
          case 'started':
            return (
              <Chip
                icon={<ArrowDownwardIcon />}
                label="Démarrée"
                color="success"
                variant="outlined"
              />
            );
          case 'planned':
            return (
              <Chip
                icon={<AccessTimeFilledIcon />}
                label="Planifiée"
                color="warning"
                variant="outlined"
              />
            );
          case 'ended':
            return (
              <Chip
                icon={<CheckIcon />}
                label="Terminée"
                color="info"
                variant="outlined"
              />
            );
          case 'cancelled':
            return (
              <Chip
                icon={<CloseIcon />}
                label="Annulée"
                color="error"
                variant="outlined"
              />
            );
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Link href={`/meetings/${params.row.id}`}>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Link>
          <Link href={`/meetings/${params.row.id}/edit`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </>
      ),
    },
  ];

  return (
    <DataGrid
      rows={props.meetings}
      columns={columns}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
      }}
      disableRowSelectionOnClick
      autosizeOnMount={true}
      autosizeOptions={{
        includeHeaders: true,
        includeOutliers: true,
        outliersFactor: 1.5,
        expand: true,
      }}
    />
  );
}
