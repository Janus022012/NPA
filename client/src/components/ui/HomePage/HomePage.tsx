import React from 'react';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import {
  DRAWER_CLOSE_WIDTH,
  DRAWER_OPEN_WIDTH,
  TOP_HEIGHT,
} from '../../../const/const';
import zIndex from '../../../theme/zIndex';
import { RootState } from '../../../state/redux/stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: theme.palette.secondary.dark,
      // TODO theme経由にする。
      zIndex: zIndex.content,
      padding: `${TOP_HEIGHT} 0px 0px ${DRAWER_CLOSE_WIDTH}`,
      height: `calc(100vh - ${TOP_HEIGHT})`,
      color: 'white',
    },
    rootShift: {
      paddingLeft: DRAWER_OPEN_WIDTH,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
);

const HomePage = () => {
  const classes = useStyles();
  const open = useSelector((state: RootState) => state.drawer.openDrawer);
  return (
    <div
      className={clsx(classes.root, {
        [classes.rootShift]: open,
      })}>
      <Typography variant={'h1'}>This is HomePage</Typography>
    </div>
  );
};

export default HomePage;
