import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    list: { width: 250 },
    fullList: { width: 'auto' },
    icon: { color: theme.palette.secondary.main },
    label: { color: theme.palette.primary.main }
}));