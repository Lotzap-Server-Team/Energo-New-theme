import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser, Permission, Role, User, Company ,ShareEmail} from './../../../../model/User';

const localEndPoint="http://localhost:8080";
const buildEndPoint="/apis"
const apiEndPoint='https://laravel.cppatidar.com/energo/backend/api'//detectEnvURL();
// var token = localStorage.getItem("access_token");
var token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTc0MGViNjQ4MTg5NjQzNTE4ZGM2M2MzNTg0ZWY5MTFlM2NlZDA0OGMwMjU1YWU4MzFlMzgwZDY5N2YzZDE5ODJjOTFjYzNlY2VjMzQwYjciLCJpYXQiOjE2NzYyNzI5NzkuNzg3NjEzLCJuYmYiOjE2NzYyNzI5NzkuNzg3NjE4LCJleHAiOjE3MDc4MDg5NzkuNzMwNDU2LCJzdWIiOiIxMCIsInNjb3BlcyI6W119.GY8OpFXRo2_Rd2wLHz0_pMHn4E1Eb_mw31lXjaXDKIJB9mM5UuMfyUQmUT2dGw8RwFCNYHPmhTFvj5ku2wgqKfDZ050kun6O67VkQhUbeicTy3rz7uVpPdcrCgmVFjHaeHw2sq-ttwwhlV2Qn4NBqTcnuDlPsVox4w0uW-x9345OVqTaIV8rsw8D8Rw7nzX2yZZyyUl61vKg033KA5MIT7E2_v7CwzwSV2awIcl_c0w0E0yTXxQf2IGV6k_T25iAe7Nxy84tlHnSC3pjyvfcaR75hlBQK1UQdcQxbOzCbVjCdTiOciQ34T4vXHzNPXduSwNR-uSJfQWb4qXkondATxXhPVya1r-eJQL1U-q2C-8Dw-2yzUqAUYVNfcJK0n9q9dtjebDqmJyJGVvGwutoe0Aaue-qKWEyghPwn-zteuhzEv2bOqeucsVuF1ytMC8E6d3NZEQGG5yDog4VOTea02-TjjeTQTpe_bCnc9tJCRtcEstzN2sdfOwxu7R7DEoSAoWEnmiLvGKbvxaPmXWXtnin3MbJyzgLqtf8K7oQAI6-pTM3CtDxXMPuLmXTSKvxSPAsGx0wxicUF8dLUQwobsmbC9UQTQxLYbbhF32Td9SmCXAWqFntJZR4IpyzKjqdtxkka3UzUo9pvakV5m6PBOM2VZx5e0mDm_Wxbb2mbxI';
export const createUser = createAsyncThunk('Create_user',  (user: User) => {
    return  fetch(apiEndPoint+'/createUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})

export const createRole = createAsyncThunk('Create_role', async (role: Role) => {
    return  fetch(apiEndPoint+'/createRole', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(role)
    }).then(res => {
        return res.json()
    });
})

export const updateRole = createAsyncThunk('update_role', async (role: Role) => {
   return  fetch(apiEndPoint+'/updateRole', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(role)
    }).then(res => {
        return res.json()
    });
})

export const shareDocuments = createAsyncThunk('share_Documents', async (ShareEmail: ShareEmail) => {
    return  fetch(apiEndPoint+'/shareDocuments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(ShareEmail)
    }).then(res => {
        return res.json()
    });
})

export const login = createAsyncThunk('login', async (user: User) => {
    return  fetch(apiEndPoint+'/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})

export const createCompany = createAsyncThunk('Create_company', async (company: Company) => {
    return  fetch(apiEndPoint+'/createCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

export const updateCompany = createAsyncThunk('Update_company', async (company: Company) => {
    return  fetch(apiEndPoint+'/updateCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

export const updateUser = createAsyncThunk('Update_user', async (user: User) => {
    
    return  fetch(apiEndPoint+'/updateUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})

export const updateUserProfile = createAsyncThunk('Update_user', async (user: User) => {
    
    return  fetch(apiEndPoint+'/updateUserProfile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})
export const getRoles = createAsyncThunk('get_Roles', async () => {
    return  fetch(apiEndPoint+'/getRoles', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getUsers = createAsyncThunk('get_Users', async () => {
    return  fetch(apiEndPoint+'/getUsers', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getCompanies = createAsyncThunk('get_Companies', async () => {
    return  fetch(apiEndPoint+'/getCompanies', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getCompany = createAsyncThunk('get_Company', async (company: Company) => {
    return  fetch(apiEndPoint+'/getCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

export const deleteCompany = createAsyncThunk('delete_Company', async (company: Company) => {
    const requestOptions = {
        id:`${company}`
    };
    return  fetch(apiEndPoint+'/deleteCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },

        
        body: JSON.stringify(requestOptions)

    }).then(res => {
        return res.json()
    });
})
export const deleteUser = createAsyncThunk('delete_User', async (user: any) => {
    const requestOptions = {
        id:`${user}`
    };
    return  fetch(apiEndPoint+'/deleteUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },

        
        body: JSON.stringify(requestOptions)

    }).then(res => {
        return res.json()
    });
})



export const getUser = createAsyncThunk('get_User', async (user: User) => {
    return  fetch(apiEndPoint+'/getUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})

export const getRole = createAsyncThunk('get_Role', async (role: Role) => {
   return  fetch(apiEndPoint+'/getRole', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(role)
    }).then(res => {
        return res.json()
    });
})

export const getPermission = createAsyncThunk('get_Permission', async (permission: Permission) => {
    return  fetch(apiEndPoint+'/getPermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(permission)
    }).then(res => {
        return res.json()
    });
})

export const getPermissions = createAsyncThunk('get_Permissions', async () => {
    return  fetch(apiEndPoint+'/getPermissions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getPermissionParent = createAsyncThunk('get_Permissions_parent', async () => {
    return  fetch(apiEndPoint+'/getPermissionParent', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getPermissionParentChlid = createAsyncThunk('get_Permissions_parent', async () => {
    return  fetch(apiEndPoint+'/getPermissionParentChlid', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const createPermission = createAsyncThunk('create_Permission', async (permission: Permission) => {
     return  fetch(apiEndPoint+'/createPermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(permission)
    }).then(res => {
        return res.json()
    });
})

export const createRolehasPermission = createAsyncThunk('create_Role_has_Permission', async (role: Role) => {
    return  fetch(apiEndPoint+'/createRolehasPermission', {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
             'Authorization': `${token}`,
       },
       body: JSON.stringify(role)
   }).then(res => {
       return res.json()
   });
})



export const updatePermission = createAsyncThunk('update_Permission', async (permission: Permission) => {
    return  fetch(apiEndPoint+'/updatePermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(permission)
    }).then(res => {
        return res.json()
    });
})
export const deletePermission = createAsyncThunk('deletePermission', async (data:any) => {
    return  fetch(apiEndPoint+'/deletePermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const createCompanyFolder = createAsyncThunk('create_Company_Folder', async (company_id:any) => {
    return  fetch(apiEndPoint+'/createCompanyFolder', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(company_id)
    }).then(res => {
        return res.json()
    });
})





export const getCompanyFolder = createAsyncThunk('get_Company_Folders', async (company_id:any) => {
    return  fetch(apiEndPoint+'/getCompanyFolders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(company_id)
    }).then(res => {
        return res.json()
    });
})


export const getDocuments = createAsyncThunk('get_Documents', async (data:any) => {
    return  fetch(apiEndPoint+'/getDocuments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const uploadeImage = createAsyncThunk('uploade_Image', async (data:any) => {
    return  fetch(apiEndPoint+'/uploadeImage', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const statusUpdate = createAsyncThunk('status_User', async (data:any) => {
    return  fetch(apiEndPoint+'/statusUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const statusCompany = createAsyncThunk('status_Company', async (data:any) => {
    return  fetch(apiEndPoint+'/statusCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getRolehasPermission = createAsyncThunk('getRolehasPermission', async (data:any) => {
    const requestOptions = {
        role_id:`${data}`
    };
    return  fetch(apiEndPoint+'/getRolehasPermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(requestOptions)
    }).then(res => {
        return res.json()
    });
})

// add some country api code here
export const createCountry = createAsyncThunk('createCountry', async (data:any) => {
    return  fetch(apiEndPoint+'/createCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getCountries = createAsyncThunk('getCountries', async () => {
    return  fetch(apiEndPoint+'/getCountries', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getCountry = createAsyncThunk('getCountry', async (data:any) => {
    return  fetch(apiEndPoint+'/getCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const updateCountry = createAsyncThunk('updateCountry', async (data:any) => {
    return  fetch(apiEndPoint+'/updateCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const deleteCountry = createAsyncThunk('deleteCountry', async (data:any) => {
    return  fetch(apiEndPoint+'/deleteCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const StatusCountry = createAsyncThunk('StatusCountry', async (data:any) => {
    return  fetch(apiEndPoint+'/statusCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
// add some city api code here
export const getCities = createAsyncThunk('getCities', async () => {
    return  fetch(apiEndPoint+'/getCities', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getCountryStates = createAsyncThunk('getCountryStates', async (data:any) => {
    return  fetch(apiEndPoint+'/getCountryStates', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const createCity = createAsyncThunk('createCity', async (data:any) => {
    return  fetch(apiEndPoint+'/createCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getCity = createAsyncThunk('getCity', async (data:any) => {
    return  fetch(apiEndPoint+'/getCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const updateCity = createAsyncThunk('updateCity', async (data:any) => {
    return  fetch(apiEndPoint+'/updateCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const deleteCity = createAsyncThunk('deleteCity', async (data:any) => {
    return  fetch(apiEndPoint+'/deleteCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const statusCity = createAsyncThunk('statusCity', async (data:any) => {
    return  fetch(apiEndPoint+'/statusCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const createState = createAsyncThunk('createState', async (data:any) => {
    return  fetch(apiEndPoint+'/createState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getStates = createAsyncThunk('getStates', async () => {
    return  fetch(apiEndPoint+'/getStates', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})
export const getState = createAsyncThunk('getState', async (data:any) => {
    return  fetch(apiEndPoint+'/getState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const deleteState = createAsyncThunk('deleteState', async (data:any) => {
    return  fetch(apiEndPoint+'/deleteState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const statusState = createAsyncThunk('statusState', async (data:any) => {
    return  fetch(apiEndPoint+'/statusState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const updateState = createAsyncThunk('updateState', async (data:any) => {
    return  fetch(apiEndPoint+'/updateState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
// add some city api code here++
// role permission getRolehasPermissions
export const getRolehasPermissions = createAsyncThunk('getRolehasPermissions', async (data:any) => {
    return  fetch(apiEndPoint+'/getRolehasPermissions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

const INIT_STATE: AppUser = {
    currUser: {
        companyName: '',
        companyId: '',
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        phone: '',
        isGlobal:false,
        permission:'',
        address:'',
        street: '',
        country:'',
        city:'',
        zip: '',
        profile_picture:'',
    }
}

export const UserMgmtSlice = createSlice({
    name: 'UserMgmtSlice',
    initialState: INIT_STATE,
    reducers: {
        setAppUser(state, action: PayloadAction<User>) {
           return {
                ...state,
                currUser: Object.assign(action.payload)
            }
        },
        resetAppUser(state) {
            Object.assign(state,INIT_STATE)
        },
       

        setUserProp(state, action: PayloadAction<any>) {
            const tmpUser = state.currUser;
            return {
                ...state,
                currUser: Object.assign({
                    ...tmpUser,
                    [action.payload.id]: action.payload.value
                })
            }
        },

        // setUserTC(state, action: PayloadAction<any>) {
        //     const tmpUser = state.currUser;
            
        //     return {
        //         ...state,
        //         currUser: Object.assign({
        //             ...tmpUser,
        //             [action.payload.text]: {
        //                 "version": action.payload.value.version,
        //                 "text": action.payload.value.text_content
        //             }
        //         })
        //     }
        // },
        setUserAddress(state, action: PayloadAction<any>) {    
            const tmpUser = state.currUser;
            return {
                ...state,
                currUser: Object.assign({
                    ...tmpUser,
                    address: Object.assign(action.payload)
                })
            }
        },
        setUserDeepProp(state, action: PayloadAction<any>) {
            const tmpUser = state.currUser;
            const deepProp = action.payload.parent;
            return {
                ...state,
                currUser: Object.assign({
                    ...tmpUser,
                    [action.payload.parentName]: Object.assign({
                        ...deepProp,
                        [action.payload.id]: action.payload.value
                    })
                })
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, response) => {
            console.log('createUser success' + response.payload)
        })
        builder.addCase(createUser.rejected, (state, response) => {
            console.log('createUser failed' + response)
        })

    }
})