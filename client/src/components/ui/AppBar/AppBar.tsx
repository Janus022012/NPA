import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
// Material-UI
import MaterialUIAppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// self-made
import theme from '../../../theme/theme';
import { openDrawer } from '../../../state/redux/Module/drawerModule';
import Drawer from '../Drawer/Drawer';
import { DRAWER_OPEN_WIDTH, TOOLBAR_HEIGHT } from '../../../const/const';
import { RootState } from '../../../state/redux/stores';
import Logo from '../../../resources/img/logo/NPA_title_logo.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.appBar,
    },
    appBarShift: {
      zIndex: theme.zIndex.appBar - 100,
      marginLeft: DRAWER_OPEN_WIDTH,
      width: `calc(100% - ${DRAWER_OPEN_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolBar: {
      height: TOOLBAR_HEIGHT,
      border: `solid 1px ${theme.palette.secondary.light}`,
    },
    menuButton: {
      margin: '12.5px',
    },
    title: {
      flexGrow: 1,
      paddingLeft: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  }),
);

export const AppBar = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.drawer.openDrawer);

  const handleOpenDrawer = () => {
    dispatch(openDrawer());
  };

  return (
    <div className={classes.root}>
      <MaterialUIAppBar
        position="fixed"
        elevation={0}
        color="secondary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar
          disableGutters={true}
          className={clsx(classes.toolBar, {
            [classes.appBarShift]: open,
          })}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            onClick={handleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <img src={Logo} />
        </Toolbar>
      </MaterialUIAppBar>
      <Drawer />
    </div>
  );
};

export default AppBar;
