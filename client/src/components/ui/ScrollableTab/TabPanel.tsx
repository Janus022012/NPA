import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/redux/stores';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  TOP_HEIGHT,
  DRAWER_CLOSE_WIDTH,
  DRAWER_OPEN_WIDTH,
} from '../../../const/const';
import zIndex from '../../../theme/zIndex';
import HomePage from '../ServiceScreen/HomePage/HomePage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: theme.palette.secondary.dark,
      // TODO theme経由にする。
      zIndex: zIndex.content,
      padding: `${TOP_HEIGHT} 0px 0px ${DRAWER_CLOSE_WIDTH}`,
      height: `calc(100vh - ${TOP_HEIGHT})`,
      width: `calc(100vw - ${DRAWER_CLOSE_WIDTH})`,
      color: 'white',
    },
    rootShift: {
      paddingLeft: DRAWER_OPEN_WIDTH,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hidden: {
      display: 'none',
    },
  }),
);

const TabPanel: FC = () => {
  const classes = useStyles();
  const tabObject = useSelector((state: RootState) => state.tab.tabObject);
  const activeTabId = useSelector((state: RootState) => state.tab.activeTabId);

  return (
    <div>
      {...tabObject.map(obj => (
        <div
          key={`TabPanel-${obj.tabId}`}
          className={clsx({ [classes.hidden]: activeTabId !== obj.tabId })}>
          <HomePage title={obj.componentName} />
        </div>
      ))}
    </div>
  );
};

export default TabPanel;
