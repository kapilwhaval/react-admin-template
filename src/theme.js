import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#034a98',
        },
        secondary: {
            main: '#eb590c',
        },
        danger: {
            main: red[500],
        }
    },
});