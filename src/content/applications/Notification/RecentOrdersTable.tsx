import { FC, useState } from 'react';
import { createTheme, ThemeProvider ,styled} from "@mui/material/styles";
import {
  Divider,
  Box,
  Card,
  useTheme,
  CardHeader,
  Alert,
  AlertTitle,
  
} from '@mui/material';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import BulkActions from './BulkActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from "@mui/material/Stack";
import Dialog from '@mui/material/Dialog';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';

interface RecentOrdersTableProps {
  className?: string;


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

const RecentOrdersTable: FC<RecentOrdersTableProps> = () => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;

  const [open, setOpen] = useState(false);
  const [openFolder, setFolder] = useState(false);
  const [documents, setFile] = useState<any | null>(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleClickOpenFolder(){
    setFolder(true);
  };

  const handleCloseFolder = () => {
    setFolder(false);
    setFile(null);
  };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && <CardHeader title="Notification List" />}
      <Divider />
      <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="success" sx={{ border : '1px solid green'  , m:1 }} >
                      <AlertTitle>Company Name</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}} >click here!</strong>
                    </Alert>
                    <Alert  severity="success" sx={{ border : '1px solid green'  }}>
                      <AlertTitle>User Name</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}}>click here!</strong>
                    </Alert>
                    <Alert severity="success" sx={{ border : '1px solid green'  }}>
                      <AlertTitle>Test</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}}>click here!</strong>
                    </Alert>
                    <Alert severity="success" sx={{ border : '1px solid green'  }}>
                      <AlertTitle>New Test</AlertTitle>
                      This is an Notification — <strong onClick={()=>{handleClickOpenFolder()}}>click here!</strong>
                    </Alert>
                  </Stack>
     
      <Box p={2}>
      <BootstrapDialog onClose={handleCloseFolder} aria-labelledby="customized-dialog-title" open={openFolder} >
    
     
      <div className="card px-4" style={{ padding :'2rem' }} >
      <div  className="form-group mt-2">
      <div className="card">
        <div className="card-content">
          <h3 className="card-title" id="title">
          </h3><h1>Company Name</h1>
          <p className="card-excerpt">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.
          </p>
        </div>
      </div>
      </div>
     
    </div>
      </BootstrapDialog>
      </Box>
    </Card>
  );
};



export default RecentOrdersTable;
