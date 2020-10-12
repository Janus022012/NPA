import React, { FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  TOOLBAR_HEIGHT,
  DRAWER_CLOSE_WIDTH,
  DRAWER_OPEN_WIDTH,
} from '../../../const/const';
import { RootState } from '../../../state/redux/stores';
import zIndex from '../../../theme/zIndex';
import TabPanel from './TabPanel';
import {
  changeActiveTab,
  removeTab,
} from '../../../state/redux/Module/tabModule';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  scrollableTab: {
    paddingTop: TOOLBAR_HEIGHT,
    paddingLeft: DRAWER_CLOSE_WIDTH,
    // TODO theme経由にする。
    zIndex: zIndex.tab,
    border: `solid 1px ${theme.palette.secondary.light}`,
  },
  scrollableTabShift: {
    paddingLeft: DRAWER_OPEN_WIDTH,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  tab: {
    minHeight: TOOLBAR_HEIGHT,
  },
  menu: {},
  menuItem: {
    minWidth: '160px',
    borderRadius: '0',
  },
  menuList: {
    color: theme.palette.common.white,
  },
  menuPaper: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuListPadding: {
    paddingBottom: '0px',
  },
}));

const ScrollableTab: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.drawer.openDrawer);
  const tabObject = useSelector((state: RootState) => state.tab.tabObject);
  const [activeTabId, setActiveTabId] = useState(0);
  // TODO type定義する。
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorInfo, setAnchorInfo] = React.useState<any>(null);

  const handleActiveTabChange = (
    event: React.ChangeEvent<any>,
    newValue: number,
  ) => {
    setActiveTabId(newValue);
    dispatch(changeActiveTab({ activeTabId: event.currentTarget.id }));
  };

  const handleMenuRightClick = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    if (event.type === 'contextmenu') {
      const tabIndex = tabObject.findIndex(
        obj => obj.tabId === event.currentTarget.id,
      );
      setAnchorEl(event.currentTarget);
      const position = event.currentTarget.getBoundingClientRect();
      setAnchorInfo({
        tabId: event.currentTarget.id,
        tabIndex: tabIndex,
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
      });
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorInfo(null);
  };

  const handleTabClose = () => {
    dispatch(removeTab({ removeTabId: anchorInfo.tabId }));
    if (anchorInfo.tabIndex === 0) {
      // TODO Utils化
      setActiveTabId(0);
      dispatch(changeActiveTab({ activeTabId: tabObject[1].tabId }));
      handleMenuClose();
    } else {
      // TODO Utils化
      setActiveTabId(0);
      dispatch(changeActiveTab({ activeTabId: tabObject[0].tabId }));
      handleMenuClose();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        className={clsx(classes.scrollableTab, {
          [classes.scrollableTabShift]: open,
        })}>
        <Tabs
          value={activeTabId}
          onChange={handleActiveTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs">
          {...tabObject.map(obj => (
            <Tab
              id={obj.tabId}
              onContextMenu={handleMenuRightClick}
              label={obj.tabName}
              className={classes.tab}
              key={`TabLabel-${obj.tabId}`}
            />
          ))}
        </Tabs>
        <Menu
          id="ScrollableTabMenu"
          classes={{
            list: classes.menuList,
            paper: classes.menuPaper,
          }}
          className={classes.menu}
          anchorReference="anchorPosition"
          anchorPosition={{
            top: anchorEl ? anchorInfo.bottom : 0,
            left: anchorEl ? anchorInfo.left : 0,
          }}
          MenuListProps={{
            classes: { padding: classes.menuListPadding },
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <MenuItem className={classes.menuItem} onClick={handleTabClose}>
            Close Tab
          </MenuItem>
          <MenuItem className={classes.menuItem}>Rename Tab</MenuItem>
        </Menu>
      </AppBar>
      <TabPanel />
    </div>
  );
};

export default ScrollableTab;
