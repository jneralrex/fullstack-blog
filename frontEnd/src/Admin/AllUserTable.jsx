import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 170, align: 'center' },
  { id: 'lastName', label: 'Last Name', minWidth: 170, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'center' },
  { id: 'phone', label: 'Phone', minWidth: 170, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
];

const AllUserTable = () => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('http://localhost:9000/api/blog/users');
        if (Array.isArray(resp.data.data)) {
          const mappedData = resp.data.data.map(user => ({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          }));
          setRows(mappedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:9000/api/blog/users/${userId}`);
      if (res.data.message === 'Deleted successfully') {
        setRows(rows.filter(row => row.id !== userId));
        alert('User deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden', position: 'fixed', right: '0' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'actions' ? (
                          <div>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                              onClick={() => deleteUser(row.id)}
                              sx={{ margin: '2px' }}
                            >
                              <Tooltip title="Delete">
                                <DeleteOutlinedIcon />
                              </Tooltip>
                            </Button>
                          </div>
                        ) : column.format && typeof value === 'number' ? (
                          column.format(value)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AllUserTable;
