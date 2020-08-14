import React from 'react';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './login/styles';

export default () => {

    const classes = useStyles();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Access Denied</Typography>
        </div >
    );
}