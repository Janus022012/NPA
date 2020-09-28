import { TOOLBAR_HEIGHT } from '../../const/const';

export default {
  regular: {
    height: TOOLBAR_HEIGHT,
    '@media (min-width: 600px)': {
      minHeight: TOOLBAR_HEIGHT,
    },
  },
};
