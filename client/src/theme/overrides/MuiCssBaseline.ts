import { SCROLL_BAR_WIDTH } from '../../const/const';

export default {
  '@global': {
    '*': {
      boxSizing: 'content-box',
    },
    '*::-webkit-scrollbar': {
      width: SCROLL_BAR_WIDTH,
    },
    '*::-webkit-scrollbar-track': {
      border: 'solid 1px #525b6b',
      borderRadius: '20px',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
      border: 'none',
      borderRadius: '20px',
    },
  },
};
