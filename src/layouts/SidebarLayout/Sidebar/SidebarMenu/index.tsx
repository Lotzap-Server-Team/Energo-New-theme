import { useContext, useState } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useSelector } from 'react-redux';



const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const [open, setOpen] = useState(true);
  // const currentUser: any = useSelector((state: any) => state.user.currUser);
  const user_id = localStorage.getItem('user_id')
  const [companyIndex, setCompanyIndex] = useState(false);
  const [indexUsers, setIndexUsers] = useState(false);
  const [indexNotifications, setindexNotifications] = useState(false);
  const [indexSecurityManagment, setIndexSecurityManagment] = useState(false);
  const [indexSctivityLogs, setIndexSctivityLogs] = useState(false);
  const [indexRoles, setIndexRoles] = useState(false);
  const [indexPermissions, setIndexPermissions] = useState(false);
  const [indexCountries, setIndexCountries] = useState(false);
  const [indexStates, setIndexStates] = useState(false);
  const [indexCities, setIndexCities] = useState(false);
  const [indexDashboard, setIndexDashboard] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function addPermission(){


    function capitalizeFirstLetter(val:string) {
      return val.charAt(0).toUpperCase() + val.slice(1);
  }
    var permissions:any = localStorage.getItem('permissions')
    console.log("PRMISION", permissions);
    var allPermission:any =JSON.parse(permissions)?JSON.parse(permissions):[];
    if(allPermission.length != 0){
    allPermission.forEach((per:any) => {
      console.log("permisifpv", per);
      if(capitalizeFirstLetter(per.flag) == "Companies"){
        if(per.name == "Index"){
          setCompanyIndex(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "Users"){
        if(per.name == "Index"){
          setIndexUsers(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "Countries"){
        if(per.name == "Index"){
          setIndexCountries(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "States"){
        if(per.name == "Index"){
          setIndexStates(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "Cities"){
        if(per.name == "Index"){
          setIndexCities(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "Notifications"){
        if(per.name == "Index"){
          setindexNotifications(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "Dashboard"){
        if(per.name == "Index"){
          setIndexDashboard(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "Activity Logs"){
        if(per.name == "Index"){
          setIndexSctivityLogs(true)
        }
      }
      if(capitalizeFirstLetter(per.flag) == "Security Managment"){
        if(per.name == "Index"){
          setIndexSecurityManagment(true)
        }
      }
    });
  }
}
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <MenuWrapper>
        {/* <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/overview"
                  startIcon={<DesignServicesTwoToneIcon />}
                >
                  Overview
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Dashboard
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboards/crypto"
                  startIcon={<BrightnessLowTwoToneIcon />}
                >
                  Companies
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboards/messenger"
                  startIcon={<MmsTwoToneIcon />}
                >
                  Messenger
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
        <List
          component="div"
          subheader={
             <ListSubheader component="div" disableSticky>
              Dashboard
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
            {companyIndex &&  <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/transactions"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Companies List
                </Button>
              </ListItem> }
              {indexUsers  &&  <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/profile"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  User List
                </Button>
              </ListItem>}
              {indexNotifications &&  <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/notification"
                  startIcon={<NotificationsIcon />}
                >
                  Notification 
                </Button>
              </ListItem>}
              {indexSecurityManagment && <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/securitymanage"
                  startIcon={<LockOpenIcon />}
                >
                  Security Management
                </Button>
              </ListItem>}
              {indexSctivityLogs &&  <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/activitylog"
                  startIcon={<PendingActionsIcon />}
                >
                  Activity Logs
                </Button>
              </ListItem>}
              {user_id == '1' &&  <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/role"
                  startIcon={<SettingsIcon />}
                >
                  Roles 
                </Button>
              </ListItem>}
              {user_id == '1' &&  <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/permissions"
                  startIcon={<SettingsIcon />}
                >
                  Permission List 
                </Button>
              </ListItem>}
              {indexCountries && <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/countries"
                  startIcon={<PublicIcon />}
                >
                  Countries List 
                </Button>
              </ListItem>}
              {indexStates &&  <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/states"
                  startIcon={<PublicIcon />}
                >
                  States List 
                </Button>
              </ListItem>}
              {indexCities && <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/cities"
                  startIcon={<PublicIcon />}
                >
                  Cities List 
                </Button>
              </ListItem>}
            </List>
          </SubMenuWrapper>
        </List>

        
        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Accounts
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/profile/details"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  User Profile
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/profile/settings"
                  startIcon={<DisplaySettingsTwoToneIcon />}
                >
                  Account Settings
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Components
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/buttons"
                  startIcon={<BallotTwoToneIcon />}
                >
                  Buttons
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/modals"
                  startIcon={<BeachAccessTwoToneIcon />}
                >
                  Modals
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/accordions"
                  startIcon={<EmojiEventsTwoToneIcon />}
                >
                  Accordions
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/tabs"
                  startIcon={<FilterVintageTwoToneIcon />}
                >
                  Tabs
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/badges"
                  startIcon={<HowToVoteTwoToneIcon />}
                >
                  Badges
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/tooltips"
                  startIcon={<LocalPharmacyTwoToneIcon />}
                >
                  Tooltips
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/avatars"
                  startIcon={<RedeemTwoToneIcon />}
                >
                  Avatars
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/cards"
                  startIcon={<SettingsTwoToneIcon />}
                >
                  Cards
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/forms"
                  startIcon={<TrafficTwoToneIcon />}
                >
                  Forms
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Extra Pages
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/status/404"
                  startIcon={<CheckBoxTwoToneIcon />}
                >
                  Error 404
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/status/500"
                  startIcon={<CameraFrontTwoToneIcon />}
                >
                  Error 500
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/status/coming-soon"
                  startIcon={<ChromeReaderModeTwoToneIcon />}
                >
                  Coming Soon
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/status/maintenance"
                  startIcon={<WorkspacePremiumTwoToneIcon />}
                >
                  Maintenance
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
