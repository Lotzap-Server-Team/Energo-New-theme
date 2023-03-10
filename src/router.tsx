import { Suspense, lazy, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import React from 'react';


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

 



// Pages

// Pages
// function shareDataF(data:any){
//   setDocuments(data)
// }
const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
// const addcompany = Loader(
//   lazy(() => import('src/content/applications/Transactions/Addcompany'))
// );
// users
const UserLists = Loader(
  lazy(() => import('src/content/applications/UsersLists'))
);
const Role = Loader(
  lazy(() => import('src/content/applications/Role'))
);
const Permission = Loader(
  lazy(() => import('src/content/applications/Permission'))
);
const Countries = Loader(
  lazy(() => import('src/content/applications/Countries'))
);

const States = Loader(
  lazy(() => import('src/content/applications/States'))
);

const Cities = Loader(
  lazy(() => import('src/content/applications/Cities'))
);
const Notification = Loader(
  lazy(() => import('src/content/applications/Notification'))
);

//company

const AddCompany = Loader(
  lazy(() => import('src/content/applications/Transactions/Add'))
);
const EditCompany = Loader(
  lazy(() => import('src/content/applications/Transactions/Edit'))
);
const ViewCompany = Loader(
  lazy(() => import('src/content/applications/Transactions/View'))
);
const AddCompanyData = Loader(
  lazy(() => import('src/content/applications/Transactions/CompanyFolders'))
);
const CompanyFoldersView = Loader(
  lazy(() => import('src/content/applications/Transactions/FoldersView'))
);
const DocumentShare = Loader(
  lazy(() => import('src/content/applications/Transactions/DocumentShare'))
);

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components


// Permission  Components
const AddPermission = Loader(
  lazy(() => import('src/content/applications/Permission/Add'))
);

const Editpermission = Loader(
  lazy(() => import('src/content/applications/Permission/Edit'))
);

//Country Components
const AddCountries = Loader(
  lazy(() => import('src/content/applications/Countries/Add'))
);

const EditCountries = Loader(
  lazy(() => import('src/content/applications/Countries/Edit'))
);



//States Components
const AddStates = Loader(
  lazy(() => import('src/content/applications/States/Add'))
);

const EditStates = Loader(
  lazy(() => import('src/content/applications/States/Edit'))
);
//States Components
const AddCities = Loader(
  lazy(() => import('src/content/applications/Cities/Add'))
);

const EditCities = Loader(
  lazy(() => import('src/content/applications/Cities/Edit'))
);
//Roles Components
const AddRole = Loader(
  lazy(() => import('src/content/applications/Role/Add'))
);
const EditRole = Loader(
  lazy(() => import('src/content/applications/Role/Edit'))
);
const ViewRole = Loader(
  lazy(() => import('src/content/applications/Role/View'))
);

// User Components
const AddUsers = Loader(
  lazy(() => import('src/content/applications/UsersLists/Add'))
);

const EditUsers = Loader(
  lazy(() => import('src/content/applications/UsersLists/Edit'))
);

const ViewUsers = Loader(
  lazy(() => import('src/content/applications/UsersLists/View'))
);

//profile
const Profile = Loader(
  lazy(() => import('src/content/applications/Profile/EditProfile'))
);
// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);




const routes: RouteObject[] = [

  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },

      {
        path: 'transactions', 
         children: [
          {
            path:'',
            element:<Transactions/>
          },
          {
            path: 'add-company',
            element: <AddCountries />
          },
        //  {
        //     path: 'add-company',
        //     element: <addcompany/>
        //   }
         ]
      },
      // {
      //   path: 'transactions',
      //   element: <Transactions />
      // },
      // {
      //   path: 'add-company',
      //   element: <addCompany/>
      // },
      {
        path: 'profile',
        element:<UserLists/>
      },

      {
        path: 'role',
        element:<Role/> , 
         children: [
       
        
         ]
      },
      {
        path: 'notification',
        element:< Notification /> , 
         children: [
       
        
         ]
      },
      {
        path: 'permissions',
        element:<Permission/> , 
         children: [
         {
            path: 'add',
            element: <AddPermission />
          },
          {
            path: 'edit',
            element: <Editpermission />
          },
        
         ]
      },
      {
        path: 'countries',
        element:<Countries/> , 
         children: [
       
        
         ]
      },
      {
        path: 'states',
        element:<States/> , 
         children: [
         ]
      },
      {
        path: 'cities',
        element:<Cities/> , 
         children: [
         ]
      },
      {
        path: 'adduser',
        element: <AddUsers/>
      },
      {
        path: 'adduser',
        element: <AddUsers/>
      },
      {
        path: 'edituser/:id',
        element: <EditUsers/>
      },
      // Permission Coponents
      {
        path: 'add',
        element: <AddPermission />
      },
      {
        path: 'edit/:id',
        element: <Editpermission />
      },

      // Country Components
      {
        path: 'addcountry',
        element: <AddCountries  />
      },
      {
        path: 'editcountry/:id',
        element: <EditCountries  />
      },
      {
        path: 'show-company-folders/:id',
        element: <AddCompanyData />
      },
      

        {
          path: 'addstate',
          element: <AddStates />
        },
        {
          path: 'editstate/:id',
          element: <EditStates />
        },
         // Cities Components
         {
          path: 'addcity',
          element: <AddCities />
        },
        {
          path: 'editcity/:id',
          element: <EditCities />
        },
        // Roles Components
        {
          path: 'addrole',
          element: <AddRole />
        },
        {
          path: 'editrole/:id',
          element: <EditRole />
        },
        {
          path: 'viewrole/:id',
          element: <ViewRole />
        },
      {
        path: 'viewuser/:id',
        element: <ViewUsers/>
      },
      {
        path: 'addcompany',
        element: <AddCompany/>
      },
      {
        path: 'profileview',
        element: <Profile/>
      },
      {
        path: 'editcompany/:id',
        element: <EditCompany/>
      },
      {
        path: 'viewcompany/:id',
        element: <ViewCompany/>
      },
      {
        path: 'companyfolders/:id/:folderId',
        element: <CompanyFoldersView 
  
        />  
      },
      {
        path: 'documentShare/:id',
        element: <DocumentShare 
        // shareData={documenets}
        />
      },

    ] 
    
  },

  

  // {
  //   path: '/components',
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="buttons" replace />
  //     },
  //     {
  //       path: 'buttons',
  //       element: <Buttons />
  //     },
  //     {
  //       path: 'modals',
  //       element: <Modals />
  //     },
  //     {
  //       path: 'accordions',
  //       element: <Accordions />
  //     },
  //     {
  //       path: 'tabs',
  //       element: <Tabs />
  //     },
  //     {
  //       path: 'badges',
  //       element: <Badges />
  //     },
  //     {
  //       path: 'tooltips',
  //       element: <Tooltips />
  //     },
  //     {
  //       path: 'avatars',
  //       element: <Avatars />
  //     },
  //     {
  //       path: 'cards',
  //       element: <Cards />
  //     },
  //     {
  //       path: 'forms',
  //       element: <Forms />
  //     }
  //   ]
  // }
];

export default routes;
