import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BulkActions from './BulkActions';
import {
  deleteCompany,
  deleteUser,
  getUsers,
  statusUpdate
} from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';
import { toast } from 'react-toastify';
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}

interface Filters {
  status?: CryptoOrderStatus;
}
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
  onActivestatus : any ;
}
const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, onActivestatus }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const params = useParams();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    pb: 3
  };
  const deleteUserById = (e: any) => {
    store.dispatch(deleteUser(e)).then((res: any) => {
      if (res.payload.status == true) {
        // setPermissions((prevRows : any) => {
        //   const rowToDeleteIndex = randomInt(0, prevRows.length - 1);
        //   return [
        //     ...permissions.slice(0, rowToDeleteIndex),
        //     ...permissions.slice(rowToDeleteIndex + 1),
        //   ];
        // });
        toast.success(res.payload.message);
        //  setPermissions([]);
      } else {
        toast.error(res.payload.message);
      }
    });
  };
  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };
  const statusUpdateUser = (e: any) => {
    const formData = {
      id: e
    };
    const userList = () => {
      store.dispatch(getUsers()).then((res: any) => {
        setUsers(res.payload.users);
      });
    };
    store.dispatch(statusUpdate(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload.message);
        onActivestatus()
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  const navigate = useNavigate();

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const goEditForm = (id: any) => {
    navigate(`/management/edituser/${id}`);
  };
  const viewForm = (id: any) => {
    navigate(`/management/viewuser/${id}`);
  };
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && <CardHeader title="Users" />}
      <Divider />
      <TableContainer>
        <Table sx={{ minWidth: 1100 }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell> */}
              <TableCell>S.No</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>

              <TableCell align="right">Actions</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder: any, i) => {
              // console.log(cryptoOrder, 'cryptoOrdercryptoOrdercryptoOrder');
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, cryptoOrder.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {i + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.company_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.first_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.email}
                      {/* {cryptoOrder.website.slice(0, 10)} */}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.phone.slice(0, 10)}
                      {/* {cryptoOrder.is_active == '1'? 'Active':'Inactive'} */}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.is_active == '1' && (
                        <Button
                          color="success"
                          onClick={() => {
                            statusUpdateUser(cryptoOrder.id);
                          }}
                        >
                          Active
                        </Button>
                      )}
                      {cryptoOrder.is_active == '0' && (
                        <Button
                          color="error"
                          onClick={() => {
                            statusUpdateUser(cryptoOrder.id);
                          }}
                        >
                          Inactive
                        </Button>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Tooltip title="Edit Company" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <Button component={Link}  to={'/management/edituser/'+ cryptoOrder.id}>
                       <EditTwoToneIcon  fontSize="small"/>
                        </Button>
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip
                      title="Delete Company"
                      arrow
                      onClick={(e) => {
                        goEditForm(cryptoOrder.id);
                      }}
                    >
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Edit User"
                      arrow
                      onClick={(e) => {
                        viewForm(cryptoOrder.id);
                      }}
                    >
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete user" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={handleOpen}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  {open && (
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description"
                    >
                      <Box sx={{ ...style, width: 400 }}>
                        <Typography
                          variant="h4"
                          sx={{ color: 'black', textAlign: 'center', mt: 3 }}
                        >
                          Are you sure want to delete this ?{' '}
                        </Typography>
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                          <Button
                            variant="outlined"
                            sx={{
                              background: '#3d6df9',
                              color: 'white',
                              mx: 1
                            }}
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              mx: 1,
                              background: '#f44336',
                              color: 'white'
                            }}
                            onClick={() => {
                              deleteUserById(cryptoOrder.id);
                            }}
                          >
                            yes delete it
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
