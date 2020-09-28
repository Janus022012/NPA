import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import overrides from './overrides/overrides';
import typography from './typography';
import zIndex from './zIndex';

const theme = createMuiTheme({
  palette,
  overrides,
  typography,
  zIndex,
});

export default theme;
