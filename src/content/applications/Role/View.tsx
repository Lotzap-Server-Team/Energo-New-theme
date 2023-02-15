import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createRolehasPermission,
  getPermissionParentChlid,
  getRole,
  getRolehasPermissions
} from 'src/redux/store/reducers/slices/UserSlice';
import { store } from 'src/redux/store';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  TextField,
  Toolbar,
  Button,
  FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material';
import Footer from 'src/components/Footer';

function ViewRoles() {
  const roleId = window.location.href.split('/')[5];
  const [errormessage, setErrorMessages] = useState('');
  const [title, setTitle] = useState('');
  const [onload, setOnload] = useState(false);
  const [id, setId] = useState('');
  const [permissions, setPermissions] = useState([]);

  var permissionsId: any = [];

  function getRolesOnFunction() {
    const roleId = window.location.href.split('/')[5];
    const formData = { id: roleId };
    store.dispatch(getRole(formData)).then((res: any) => {
      setOnload(true);
      if (res && res.payload) {
        setId(res.payload.role?.id);
        setTitle(res.payload.role?.name);
      }
    });
    store.dispatch(getPermissionParentChlid()).then((res: any) => {
      if (res && res.payload?.permissionparent) {
        // console.log(res,"permission")
        setPermissions(res.payload?.permissionparent);
      }
    });
  }
  useEffect(() => {
    getRolesOnFunction();
  }, []);

  function givePermissionToRole(value: any) {
    if (!permissionsId.includes(value)) {
      if ((document.getElementById(value + 'child') as any).checked == true) {
        permissionsId.push(value);
      }
    } else {
      permissionsId = permissionsId.filter((res: any) => {
        return res != value;
      });
    }
  }

  // function viewcheck(e: any) {
  //   console.log(e.checked);
  //   if (e.checked == true) {
  //     (document.getElementById("0child") as any).checked = true;
  //     (document.getElementById("1child") as any).checked = true;
  //   } else {
  //     (document.getElementById("0child") as any).checked = false;
  //     (document.getElementById("1child") as any).checked = false;
  //   }
  // }
  function addPermission() {
    setTimeout(() => {
      const roleId = window.location.href.split('/')[5];
      const formData = {
        role_id: roleId
      };
      store.dispatch(getRolehasPermissions(formData)).then((res: any) => {
        var allPermission = res.payload.data;
        allPermission.forEach((e: any) => {
          console.log();
          if (e) {
             ((
              document.getElementById(e.id +'child') as any
            ).checked = true);
            givePermissionToRole(e.id);
            console.log(e.id ,"888888888888888")
          }
        });
      });
    }, 2000);
  }
  addPermission();

  useEffect(() => {
    getRolesOnFunction();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: any = {
      role_id: id,
      permissions: permissionsId
    };
    store.dispatch(createRolehasPermission(formData)).then((res: any) => {
      if (res.payload.status == true) {
        toast.success(res.payload.message);
        setPermissions([]);
        getRolesOnFunction();
        addPermission();
      } else {
        setErrorMessages(res.payload?.message);
        toast.error(res.payload.message);
      }
    });
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="View Role" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '55ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2} rowSpacing={1}>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h4" sx={{ fontSize: '18px' }}>
                        Title : {title}
                      </Typography>

                      <Typography sx={{ my: 2, fontSize: '18px' }} variant="h4">
                        Permission
                      </Typography>

                      <Grid item xs={12} sm={12} sx={{ my: 1 }}>
                        {permissions.map((items, i) => (
                          <>
                            <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
                              <FormControlLabel
                                control={<Checkbox />}
                                label={items.name}
                              />
                            </Grid>

                            {items.chlid.map((chlid: any, i: any) => (
                              <>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  sx={{ ml: 3 }}
                                  key={i}
                                >
                                  <FormControlLabel
                                    control={
                                      <input type='checkbox' style={{ marginRight : "10px" }}
                                      id={chlid.id+'child'} 
                                      onChange={() => {
                                        givePermissionToRole(chlid.id);
                                      }}  
                                      />
                                    }
                                    label={chlid.name}
                                  />
                                </Grid>
                              </>
                            ))}
                          </>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  <div>
                    <Toolbar sx={{ mt: 3, pl: '0 !important' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                      <Button variant="contained" sx={{ ml: 2 }} 
                      component={Link}
                      to='/management/role'
                      >
                        Cancel
                      </Button>
                    </Toolbar>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />

 
    </>
  );
}

export default ViewRoles;
