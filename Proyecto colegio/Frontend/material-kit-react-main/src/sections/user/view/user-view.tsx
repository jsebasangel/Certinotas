import { useState, useCallback, useEffect } from 'react';
import PopUp from './pop_up'; // Importa el componente PopUp
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useExAlumnosData } from 'src/ExAlumnosDataProvider'
import { _users, } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../user-table-row';
import Modal from '@mui/material/Modal';
// ----------------------------------------------------------------------

export function UserView() {
    const [rows, setRows] = useState<UserProps[]>([]);
  const { datos2, loading } = useExAlumnosData();  // aquí obtienes los datos reales desde el backend
  // Aquí mapeas 'data' para que coincida con la interfaz UserProps
 useEffect(() => {
    if (!loading) {
      setRows(
        datos2.map((exAlumno: any) => ({
          idEstudiante: exAlumno.ID_EXAlumno,
          id: exAlumno.Numero_Documento,
          nombre: exAlumno.Nombre,
          apellido: exAlumno.Apellido,
          nombreCompleto: exAlumno.Nombre + ' ' + exAlumno.Apellido,
          fecha: exAlumno.Fecha_Nacimiento || 'N/A',
          telefono: exAlumno.Telefono || 'N/A',
          correo: exAlumno.Correo_Electronico || 'N/A',
          avatarUrl: `/assets/images/avatar/avatar-${1}.webp`,
        }))
      );
    }
  }, [datos2, loading]);
  const table = useTable();
  const [filterName, setFilterName] = useState('');

  const dataFiltered: UserProps[] = applyFilter({
    inputData: rows,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Función para abrir el popup
  const handleOpenPopup = (idEstudiante: string) => {
    setSelectedId(idEstudiante);
    setShowPopup(true);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Gestión de certificados de exalumnos
        </Typography>

      </Box>

      <Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            pt: 2,
          }}
        >
          <UserTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => {
              if (table.selected.length > 0 && table.selected.length <= 1) {
                handleOpenPopup(table.selected[0]); // toma el primer seleccionado
              } else {
                alert('debe seleccionar solo un estudiante');
              }
            }}
          >
            Certificado
          </Button>
        </Box>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={rows.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    rows.map((user) => user.idEstudiante)
                  )
                }
                headLabel={[
                  { id: 'id', label: 'Numero de documento' },
                  { id: 'nombreCompleto', label: 'Nombre Completo' },
                  { id: 'fecha', label: 'Fecha de Nacimiento' },
                  { id: 'telefono', label: 'Telefono' },
                  { id: 'correo', label: 'Correo' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.idEstudiante)}
                      onSelectRow={() => table.onSelectRow(row.idEstudiante)}
                      onUpdateRow={(updatedRow) => {
                        setRows((prevRows) =>
                          prevRows.map((r) =>
                            r.idEstudiante === updatedRow.idEstudiante ? updatedRow : r
                          )
                        );
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, rows.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={rows.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      <Modal open={showPopup} onClose={handleClosePopup}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 10,
            borderRadius: 3,
            p: 4,
            width: { xs: '100%', sm: 480 }, // Responsive
            height: '55vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            transition: 'all 0.3s ease-in-out',
            border: '1px solid #ccc',
          }}
        >
          {showPopup && selectedId && (
            <PopUp onClose={handleClosePopup} idExAlumno={selectedId} />
          )}
        </Box>
      </Modal>

    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
