import React from 'react';
import { Typography, Button, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles';

export default ({ title, onAdd, onDelete, deleteDisable, isWrite, isDelete }) => {

    const classes = useStyles();

    return (
        <Container>
            <div style={{ width: "100%", marginTop: "10px", paddingLeft: "10px" }}>
                <Typography component="h1" variant="h5" className={classes.label}>
                    <b>{title}</b>
                </Typography>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                {isWrite ? <Button startIcon={<AddIcon />} onClick={() => onAdd()} variant="contained" className={classes.primaryButton}>Add</Button> : null}
                {isDelete ? <Button disabled={deleteDisable} startIcon={<DeleteIcon />} onClick={() => onDelete()} variant="contained" className={classes.dangerButton}>Delete</Button> : null}
            </div>
        </Container>
    );
}