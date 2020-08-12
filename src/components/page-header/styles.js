import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    primaryButton: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        marginRight: "5px"
    },
    dangerButton: {
        backgroundColor: theme.palette.danger.main,
        color: 'white',
        marginRight: "10px"
    },
    label: {
        color: theme.palette.secondary.main
    }
}));
