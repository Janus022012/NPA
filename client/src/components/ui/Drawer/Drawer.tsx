import React, { FC } from 'react';
// Material-UI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import MaterialUIDrawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

// MaterialUI icon
// TODO ICONを自作する。
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ComputerIcon from '@material-ui/icons/Computer';
import SaveIcon from '@material-ui/icons/Save';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import CloudIcon from '@material-ui/icons/Cloud';

// self-made
import { closeDrawer } from '../../../state/redux/Module/drawerModule';
import {
  DRAWER_ITEM_HEIGHT,
  DRAWER_OPEN_WIDTH,
  DRAWER_CLOSE_WIDTH,
  ICON_HEIGHT,
  ICON_WIDTH,
  TOOLBAR_HEIGHT,
} from '../../../const/const';
import { RootState } from '../../../state/redux/stores';
import { addTab } from '../../../state/redux/Module/tabModule';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      backgroundColor: theme.palette.secondary.main,
    },
    drawerOpen: {
      width: DRAWER_OPEN_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: DRAWER_CLOSE_WIDTH,
    },
    drawerTop: {
      border: `solid 1px ${theme.palette.secondary.light}`,
    },
    drawerChevron: {
      color: theme.palette.common.white,
      height: TOOLBAR_HEIGHT,
    },
    drawerItem: {
      textColor: theme.palette.common.white,
      paddingLeft: '12px',
      height: DRAWER_ITEM_HEIGHT,
    },
    drawerIcon: {
      color: theme.palette.common.white,
      width: ICON_WIDTH,
      height: ICON_HEIGHT,
    },
    drawerContent: {
      border: `solid 1px ${theme.palette.secondary.light}`,
      borderTopWidth: '0px',
    },
    drawerIconText: {
      color: theme.palette.common.white,
    },
    drawerDivider: {
      backgroundColor: theme.palette.secondary.light,
    },
  }),
);

export const Drawer: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.drawer.openDrawer);

  const handleTab = (
    tabName: string,
    componentName: string,
    propsList: Array<unknown>,
  ) => {
    dispatch(
      addTab({
        tabName: tabName,
        componentName: componentName,
        props: propsList,
      }),
    );
  };

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <div className={classes.root}>
      <MaterialUIDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.drawerTop}>
          <IconButton
            onClick={handleCloseDrawer}
            className={classes.drawerChevron}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <div className={classes.drawerContent}>
          <List>
            <ListItem button key="1" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('PacketsGenerator', 'PacketsGenerator', []);
                }}>
                <CallMadeIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Generate Packets
              </ListItemText>
            </ListItem>
            <ListItem button key="2" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('PacketsCapturer', 'PacketsCapturer', []);
                }}>
                <CallReceivedIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Capture Packets
              </ListItemText>
            </ListItem>
            <ListItem button key="3" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('PacketsRouteTracer', 'PacketsRouteTracer', []);
                }}>
                <AccountTreeIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Trace Packet Routes
              </ListItemText>
            </ListItem>
            <ListItem button key="4" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('ConnectByConsole', 'ConnectByConsole', []);
                }}>
                <SettingsInputComponentIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Connect by Console Cable
              </ListItemText>
            </ListItem>
            <ListItem button key="5" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('ConnectBySSH/Telnet', 'ConnectBySSH/Telnet', []);
                }}>
                <ComputerIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Connect by SSH/Telnet
              </ListItemText>
            </ListItem>
            <ListItem button key="6" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('Task', 'Task', []);
                }}>
                <AssignmentIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Do Tasks
              </ListItemText>
            </ListItem>
            <ListItem button key="7" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('Parameters', 'Parameters', []);
                }}>
                <SaveIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Save Parameters
              </ListItemText>
            </ListItem>
          </List>
          <Divider className={classes.drawerDivider} />
          <List>
            <ListItem button key="8" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('DisconnectNetwork', 'DisconnectNetwork', []);
                }}>
                <SignalWifiOffIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Disconnect Network
              </ListItemText>
            </ListItem>
            <ListItem button key="9" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('Account', 'Account', []);
                }}>
                <AccountBoxIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Account
              </ListItemText>
            </ListItem>
            <ListItem button key="10" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('Cloud Setting', 'CloudSetting', []);
                }}>
                <CloudIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Cloud Setting
              </ListItemText>
            </ListItem>
            <ListItem button key="11" className={classes.drawerItem}>
              <ListItemIcon
                onClick={() => {
                  handleTab('Setting', 'Setting', []);
                }}>
                <SettingsIcon className={classes.drawerIcon} />
              </ListItemIcon>
              <ListItemText className={classes.drawerIconText}>
                Setting
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </MaterialUIDrawer>
    </div>
  );
};

export default Drawer;
