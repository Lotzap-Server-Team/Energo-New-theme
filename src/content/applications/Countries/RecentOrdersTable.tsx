import { FC, ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Button
} from '@mui/material';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import {  useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { store } from 'src/redux/store';
import { deleteCountry, StatusCountry } from 'src/redux/store/reducers/slices/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';


interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
  onActiveClick : any

}

interface Filters {
  status?: CryptoOrderStatus;
}




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

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders, onActiveClick  }) => {




  const[editcountry , setEditCountry] = useState(false)
  const[countrydelet , setCountryDelet] = useState(false)

  var permissions:any  = localStorage.getItem('permissions')

  const givepermission = ()=>{
    var allpermission = JSON.parse(permissions)
   if(allpermission.length != 0){
    allpermission.forEach((data) => {
      if(data.flag=='Countries'){
        if(data.name == 'Edit'){
          setEditCountry(true)
        }
        if(data.name == 'Delete'){
          setCountryDelet(true)
        }
      }
    });
  }
  }
  useEffect(()=>{
    givepermission()
  })
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [activeStatus, setActiveStatus] = useState<any>(true);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const navigate = useNavigate();
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

  function deletecountry(e: any) {
        const formdata = {
          country_id: e , 
        }
        store.dispatch(deleteCountry(formdata)).then((res: any) => {
          if (res.payload.status == true) {
            toast.success(res.payload.message);
            onActiveClick(2)
          } else {
            toast.error(res.payload.message);
          }
        });
        setOpen(false)
      }
  


  const statusUpdateCountry = (e: any) => {
    const formData = {
      country_id: e,
    };
    store.dispatch(StatusCountry(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload.message);
        onActiveClick()
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




  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  let paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  // console.log(paginatedCryptoOrders,"data")

  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && <CardHeader title="Countries List" />}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell>S.No.</TableCell>
              <TableCell>Countries </TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder: any, i:any) => {

              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                 
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {i+1}
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
                      {cryptoOrder.title}
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
                      {cryptoOrder.is_active ==1 ? <Button color="success"  onClick={()=> statusUpdateCountry(cryptoOrder.id)}
                          > Active </Button> :  <Button color='error'
                           onClick={()=> statusUpdateCountry(cryptoOrder.id)} > 
                           Inactive </Button>}
                    </Typography>
                  </TableCell>
              

                  <TableCell align="center">
                   
                      {
                        editcountry  && 
                        <Tooltip title="Edit Countries" arrow>
                        <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        component={Link}
                        to={'/management/editcountry/' + cryptoOrder.id}
                      >
                       
                          <EditTwoToneIcon fontSize="small" />
                      
                      </IconButton>
                      </Tooltip>
                      }
                   
               
                    {
                      countrydelet && 
                      <Tooltip title="Delete Countries" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={handleOpen} >
                        <DeleteTwoToneIcon sx={{ color:"red" }}  fontSize="small"  />
                      </IconButton>
                    </Tooltip>
                     }
                   
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
                sx={{ color: 'black', textAlign: 'center' , mt : 3   }}
              >
                Are you sure want to delete this ?
              </Typography>
              <Box sx={{ textAlign : 'center' , mt : 3 }} >
              <Button
                variant="outlined"
                sx={{
                  background: '#3d6df9',
                  color: 'white',
                  mx:1
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ mx:1 , background: '#f44336', color: 'white' }}
                  onClick={()=> { deletecountry(cryptoOrder.id)}}
              >
               Delete
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
