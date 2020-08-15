import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as Icons from '@material-ui/icons';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import Header from '../header';

export default ({ history }) => {

    const { all_modules } = useSelector(state => state.userDetails);
    const classes = useStyles();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            onKeyDown={() => setDrawerOpen(!isDrawerOpen)}
        >
            <List>
                {all_modules.map((menu) => menu.isAllowed ? (
                    <ListItem button key={menu.title} onClick={() => history.push(menu.url)}>
                        <ListItemIcon className={classes.icon}>{<Icons.RadioButtonChecked />}</ListItemIcon>
                        <ListItemText primary={menu.title.charAt(0).toUpperCase() + menu.title.slice(1)} className={classes.label} />
                    </ListItem>
                ) : null)}
            </List>
            <Divider />
        </div>
    );

    return (
        <React.Fragment>
            <Header history={history} toggleDrawer={() => setDrawerOpen(!isDrawerOpen)} />
            <Drawer anchor={'left'} open={isDrawerOpen} onClose={() => setDrawerOpen(!isDrawerOpen)}>
                {list()}
            </Drawer>
        </React.Fragment>
    );
}
