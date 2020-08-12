import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { signUp } from '../../api';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import constants from '../../constants';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';


export default function SignIn() {
    const classes = useStyles();

    const [error, setError] = useState('');

    const initialValues = {
        email: '',
        password: '',
        reenter: ''
    }
    const validationSchema = () => Yup.object({
        email: Yup.string().email(constants.ERROR_MESSAGES.INVALID_EMAIL).required(constants.ERROR_MESSAGES.REQUIRED),
        password: Yup.string().required(constants.ERROR_MESSAGES.REQUIRED).min(6, constants.ERROR_MESSAGES.SHORT_PASSWORD),
        reenter: Yup.string().required(constants.ERROR_MESSAGES.REQUIRED).min(6, constants.ERROR_MESSAGES.SHORT_PASSWORD)
    })

    const onSubmit = () => {
        if (formik.values.password === formik.values.reenter) {
            signUp(formik.values)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => setError('Unauthorized Request'))
        } else {
            setError('Passwords does not match')
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Sign Up</Typography>
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onBlur={formik.handleBlur('email')}
                        onChange={formik.handleChange('email')}
                        value={formik.values.email}
                        helperText={formik.errors.email}
                        error={formik.errors.email ? true : false}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onBlur={formik.handleBlur('password')}
                        onChange={formik.handleChange('password')}
                        value={formik.values.password}
                        helperText={formik.errors.password}
                        error={formik.errors.password ? true : false}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="reenter"
                        label="Re-Enter Password"
                        type="password"
                        id="reenter"
                        autoComplete="current-password"
                        onBlur={formik.handleBlur('reenter')}
                        onChange={formik.handleChange('reenter')}
                        value={formik.values.reenter}
                        helperText={formik.errors.reenter}
                        error={formik.errors.reenter ? true : false}
                    />
                    <center style={{ color: 'red', fontSize: '16px' }}>{error}</center>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign Up</Button>
                </form>
                <Grid container>
                    <Grid item>
                        <Link to="/login" variant="body2">Already have an account ? Login</Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="black" align="center">
                    {'Kapil Whaval © '}{` ${new Date().getFullYear()}`}
                </Typography>
            </Box>
        </Container>
    );
}