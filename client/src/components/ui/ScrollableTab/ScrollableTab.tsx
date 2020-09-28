import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  TOOLBAR_HEIGHT,
  DRAWER_CLOSE_WIDTH,
  DRAWER_OPEN_WIDTH,
} from '../../../const/const';
import { RootState } from '../../../state/redux/stores';
import zIndex from '../../../theme/zIndex';

const a11yProps = (index: number) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    paddingTop: TOOLBAR_HEIGHT,
    paddingLeft: DRAWER_CLOSE_WIDTH,
  },
  scrollableTab: {
    // TODO theme経由にする。
    zIndex: zIndex.tab,
    width: `calc(100% - ${DRAWER_CLOSE_WIDTH}px)`,
    border: `solid 1px ${theme.palette.secondary.light}`,
  },
  scrollableTabShift: {
    paddingLeft: DRAWER_OPEN_WIDTH,
    width: `calc(100% - ${DRAWER_OPEN_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  tab: {
    textColor: theme.palette.common.white,
  },
}));

const ScrollableTab = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const open = useSelector((state: RootState) => state.drawer.openDrawer);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="secondary"
        elevation={0}
        className={clsx(classes.scrollableTab, {
          [classes.scrollableTabShift]: open,
        })}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default ScrollableTab;
