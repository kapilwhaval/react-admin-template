/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import { addUser } from '../../redux/actions/user';
import { login } from '../../api';
import { useDispatch } from 'react-redux';
import LoginSvgFace from '../../components/login-svg-face';
import { useFormik } from 'formik';
import constants from '../../constants';
import * as Yup from 'yup';
import { TweenMax, Expo, Quad } from 'gsap';

var email = document.querySelector('#email'),
    password = document.querySelector('#password'),
    mySVG = document.querySelector('.svgContainer'),
    armL = document.querySelector('.armL'),
    armR = document.querySelector('.armR'),
    eyeL = document.querySelector('.eyeL'),
    eyeR = document.querySelector('.eyeR'),
    nose = document.querySelector('.nose'),
    mouth = document.querySelector('.mouth'),
    mouthBG = document.querySelector('.mouthBG'),
    mouthSmallBG = document.querySelector('.mouthSmallBG'),
    mouthMediumBG = document.querySelector('.mouthMediumBG'),
    mouthLargeBG = document.querySelector('.mouthLargeBG'),
    mouthMaskPath = document.querySelector('#mouthMaskPath'),
    mouthOutline = document.querySelector('.mouthOutline'),
    tooth = document.querySelector('.tooth'),
    tongue = document.querySelector('.tongue'),
    chin = document.querySelector('.chin'),
    face = document.querySelector('.face'),
    eyebrow = document.querySelector('.eyebrow'),
    outerEarL = document.querySelector('.earL .outerEar'),
    outerEarR = document.querySelector('.earR .outerEar'),
    earHairL = document.querySelector('.earL .earHair'),
    earHairR = document.querySelector('.earR .earHair'),
    hair = document.querySelector('.hair');
var caretPos, curEmailIndex, screenCenter, svgCoords, eyeMaxHorizD = 10 /*20*/, eyeMaxVertD = 10, noseMaxHorizD = 10 /*23*/, noseMaxVertD = 10, dFromC, eyeDistH, eyeLDistV, eyeRDistV, eyeDistR, mouthStatus = "small";

function getCoord(e) {
    var carPos = email.selectionEnd,
        div = document.createElement('div'),
        span = document.createElement('span'),
        copyStyle = getComputedStyle(email),
        emailCoords = {}, caretCoords = {}, centerCoords = {}
        ;
    [].forEach.call(copyStyle, function (prop) {
        div.style[prop] = copyStyle[prop];
    });
    div.style.position = 'absolute';
    document.body.appendChild(div);
    div.textContent = email.value.substr(0, carPos);
    span.textContent = email.value.substr(carPos) || '.';
    div.appendChild(span);

    emailCoords = getPosition(email);							//console.log("emailCoords.x: " + emailCoords.x + ", emailCoords.y: " + emailCoords.y);
    caretCoords = getPosition(span);							//console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
    centerCoords = getPosition(mySVG);							//console.log("centerCoords.x: " + centerCoords.x);
    svgCoords = getPosition(mySVG);
    screenCenter = centerCoords.x + (mySVG.offsetWidth / 2);		//console.log("screenCenter: " + screenCenter);
    caretPos = caretCoords.x + emailCoords.x;					//console.log("caretPos: " + caretPos);

    dFromC = screenCenter - caretPos; 							//console.log("dFromC: " + dFromC);
    var pFromC = Math.round((caretPos / screenCenter) * 100) / 100;
    if (pFromC < 1) {

    } else if (pFromC > 1) {
        pFromC -= 2;
        pFromC = Math.abs(pFromC);
    }

    eyeDistH = -dFromC * .05;
    if (eyeDistH > eyeMaxHorizD) {
        eyeDistH = eyeMaxHorizD;
    } else if (eyeDistH < -eyeMaxHorizD) {
        eyeDistH = -eyeMaxHorizD;
    }

    var eyeLCoords = { x: svgCoords.x + 0, y: svgCoords.y + 1 };
    var eyeRCoords = { x: svgCoords.x + 0, y: svgCoords.y + 1 }; //svgCoords.x + 120
    var noseCoords = { x: svgCoords.x + 0.97, y: svgCoords.y + 0.81 };	//97 & 81
    var mouthCoords = { x: svgCoords.x - 0, y: svgCoords.y - 100 }; //100
    var eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    var eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
    var eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
    var eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    var eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
    var eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
    var noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    var noseX = Math.cos(noseAngle) * noseMaxHorizD;
    var noseY = Math.sin(noseAngle) * noseMaxVertD;
    var mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 0);
    var mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
    var mouthY = Math.sin(mouthAngle) * noseMaxVertD;
    var mouthR = Math.cos(mouthAngle) * 0.00006;
    var chinX = mouthX * .8;  //8
    var chinY = mouthY * .5;	//5
    var chinS = 1 - ((dFromC * .15) / 100);
    if (chinS > 1) { chinS = 1 - (chinS - 1); }
    var faceX = mouthX * .3;	//3
    var faceY = mouthY * .4;	//4
    var faceSkew = Math.cos(mouthAngle) * 0.1; //5

    TweenMax.to(eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut });
    TweenMax.to(eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut });
    TweenMax.to(nose, 1, { x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
    TweenMax.to(mouth, 1, { x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
    TweenMax.to(chin, 1, { x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut });
    TweenMax.to(face, 1, { x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: Expo.easeOut });

    document.body.removeChild(div);
};

function onEmailInput(e) {
    getCoord(e);
    var value = e.target.value;
    curEmailIndex = value.length;

    if (curEmailIndex > 0) {
        if (mouthStatus === "small") {
            mouthStatus = "medium";
            // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut });
            TweenMax.to([eyeL, eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
        }
        if (value.includes("@")) {
            mouthStatus = "large";
            // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthLargeBG, ease: Expo.easeOut });
            //TweenMax.to(tooth, 1, {x: 3, y: -2, ease: Expo.easeOut});
            //TweenMax.to(tongue, 1, {y: 2, ease: Expo.easeOut});
            TweenMax.to([eyeL, eyeR], 1, { scaleX: .75, scaleY: .75, ease: Expo.easeOut, transformOrigin: "center center" });
        } else {
            mouthStatus = "medium";
            // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, ease: Expo.easeOut });
            //TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
            //TweenMax.to(tongue, 1, {x: 0, y: 1, ease: Expo.easeOut});
            TweenMax.to([eyeL, eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
        }
    } else {
        mouthStatus = "small";
        // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut });
        //TweenMax.to(tooth, 1, {x: 0, y: 0, ease: Expo.easeOut});
        //TweenMax.to(tongue, 1, {y: 0, ease: Expo.easeOut});
        TweenMax.to([eyeL, eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
    }
}

function onEmailFocus(e) {
    e.target.parentElement.classList.add("focusWithText");
    getCoord();
}

function onEmailBlur(e) {
    if (e.target.value === "") {
        e.target.parentElement.classList.remove("focusWithText");
    }
    resetFace();
}

function onPasswordFocus(e) {
    coverEyes();
}

function onPasswordBlur(e) {
    uncoverEyes();
}

function coverEyes() {
    TweenMax.to(armL, .45, { x: -93, y: 10, rotation: 0, ease: Quad.easeOut });
    TweenMax.to(armR, .45, { x: -93, y: 10, rotation: 0, ease: Quad.easeOut, delay: .1 });
}

function uncoverEyes() {
    TweenMax.to(armL, 1.35, { y: 220, ease: Quad.easeOut });
    TweenMax.to(armL, 1.35, { rotation: 105, ease: Quad.easeOut, delay: .1 });
    TweenMax.to(armR, 1.35, { y: 220, ease: Quad.easeOut });
    TweenMax.to(armR, 1.35, { rotation: -105, ease: Quad.easeOut, delay: .1 });
}

function resetFace() {
    TweenMax.to([eyeL, eyeR], 1, { x: 0, y: 0, ease: Expo.easeOut });
    TweenMax.to(nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut });
    TweenMax.to(mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
    TweenMax.to(chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
    TweenMax.to([face, eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut });
    TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
}

function getAngle(x1, y1, x2, y2) {
    var angle = Math.atan2(y1 - y2, x1 - x2);
    return angle;
}

function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName === "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPos,
        y: yPos
    };
}

export default ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    useEffect(() => {
        email = document.querySelector('#email');
        password = document.querySelector('#password');
        mySVG = document.querySelector('.svgContainer');
        armL = document.querySelector('.armL');
        armR = document.querySelector('.armR');
        eyeL = document.querySelector('.eyeL');
        eyeR = document.querySelector('.eyeR');
        nose = document.querySelector('.nose');
        mouth = document.querySelector('.mouth');
        mouthBG = document.querySelector('.mouthBG');
        mouthSmallBG = document.querySelector('.mouthSmallBG');
        mouthMediumBG = document.querySelector('.mouthMediumBG');
        mouthLargeBG = document.querySelector('.mouthLargeBG');
        mouthMaskPath = document.querySelector('#mouthMaskPath');
        mouthOutline = document.querySelector('.mouthOutline');
        tooth = document.querySelector('.tooth');
        tongue = document.querySelector('.tongue');
        chin = document.querySelector('.chin');
        face = document.querySelector('.face');
        eyebrow = document.querySelector('.eyebrow');
        outerEarL = document.querySelector('.earL .outerEar');
        outerEarR = document.querySelector('.earR .outerEar');
        earHairL = document.querySelector('.earL .earHair');
        earHairR = document.querySelector('.earR .earHair');
        hair = document.querySelector('.hair');
        email.addEventListener('input', onEmailInput);
        password.addEventListener('focus', onPasswordFocus);
        password.addEventListener('blur', onPasswordBlur);
        TweenMax.set(armL, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
        TweenMax.set(armR, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });
    }, [])

    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = () => Yup.object({
        email: Yup.string().email(constants.ERROR_MESSAGES.INVALID_EMAIL).required(constants.ERROR_MESSAGES.REQUIRED),
        password: Yup.string().required(constants.ERROR_MESSAGES.REQUIRED).min(6, constants.ERROR_MESSAGES.SHORT_PASSWORD)
    })

    const onSubmit = () => {
        login(formik.values)
            .then((res) => {
                res.all_modules.filter((item) => {
                    let isAllowed = false;
                    res.access_modules.map(({ id }) => { if (id === item.id) isAllowed = true })
                    item.isAllowed = isAllowed;
                    return item;
                })
                dispatch(addUser(res))
                history.push("/dashboard");
            })
            .catch((err) => setError('Invalid Email id or password'))
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
                <div style={{ width: "40%" }}>
                    <LoginSvgFace />
                </div>
                <Typography className={classes.loginLabel} component="h1" variant="h5">Login</Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
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
                        error={formik.errors.email ? true : false} />
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
                        error={formik.errors.password ? true : false} />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /><br />
                    <center style={{ color: 'red', fontSize: '16px' }}>{error}</center>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Login</Button>
                </form>
                <Grid container>
                    <Grid item xs>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </Grid>
                    <Grid item>
                        <Link to="/sign-up">Don't have an account? Sign Up</Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Typography variant="body2" align="center">
                    {'Kapil Whaval © '}{` ${new Date().getFullYear()}`}
                </Typography>
            </Box>
        </Container>
    );
}
