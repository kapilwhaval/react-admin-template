export default {
    ERROR_MESSAGES: {
        INVALID_EMAIL: "Please enter valid email",
        REQUIRED: 'Required!',
        UNAUTHORIZED_REQUEST: 'Unauthorized Request!',
        SHORT_PASSWORD: "Password should contain minimum 6 characters",
        AADHAR_NUMBER: "Aadhar number should contain only 12 characters",
        EMPTY_PASSWORD: "Password should not be empty!",
        PASSWORD_NO_MATCH: "Passwords does not match!",
        RE_ENTER_PASS: "Re enter your password!",
        INVALID_NAME: "Please enter a valid name",
        INVALID_FIRST_NAME: "Please enter a valid first name",
        INVALID_LAST_NAME: "Please enter a valid last name",
        INVALID_CITY: "Please enter a city",
        INVALID_PHONE: "Invalid phone number",
        LARGE_FILE: "File size should be less than 3 MB",
        EMPTY_FIELDS: "Please fill all the fields",
        LOGO_REQUIRED: "Logo Required!",
        DESC_REQUIRED: "Description required!",
        SKILLS_REQUIRED: "Skills Required!",
        NOT_AN_IMAGE: "Please upload an image",
        MAX_SIZE: "Upload image having less than 3 MB",
        INVALID_LOCATION: 'Invalid Location',
        PASSWORD_MISMATCH: "Confirm Password does not match",
        INVALID_URL: 'Invalid URL',
        EMAIL_NOT_VERIFIED: "Email id is not verified by admin.",
        INVALID_DATE: 'Invalid Date',
        INVALID_DATE_RANGE: 'Invalid Date Range',
        DEFAULT_ERROR: 'Something went wrong',
        INVALID_FB_LINK: 'Please enter valid facebook link',
        INVALID_INSTA_LINK: 'Please enter valid instagram link',
        INVALID_TWTR_LINK: 'Please enter valid twitter link',
        INVALID_LI_LINK: 'Please enter valid linkedIn link',
        INVALID_WEBSITE_LINK: 'Please enter valid website link',
    },
    SUCCESS_MESSAGES: {
    },
    ROLES: [
        { id: 1, role: "super-admin" },
        { id: 2, role: "admin" },
        { id: 3, role: "distributor" },
        { id: 4, role: "user" },
    ],
    REGEX: {
        // eslint-disable-next-line
        EMAIL: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        NAME: /^[a-zA-Z ]+$/,
        // eslint-disable-next-line
        LONG_NAME: /^\s*[A-Za-z]['\-,.]*[^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]\s]*[A-Za-z]\s*$/,
        // eslint-disable-next-line
        MOBILE: /^(0|[1-9][0-9]{9})$/i,
        IMAGE: /(\.jpg|\.jpeg|\.bmp|\.png)$/i,
        PHONE: /\+?\d[\d -]{8,12}\d/,
        ALPHA_NUMERIC: /^[a-z ][a-z0-9 ]+$/i,
        DATE: /\d{2}\/\d{2}\/\d{4}/,
        TASK_ID: /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i,
        WEB_LINK: /^http[s]?:\/\//,
        LINK: new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    },
    API: {
        SIGNUP: "/api-v1/sign-up",
        LOGIN: "/api-v1/login",
        GET_ALL_ROLES: "/api-v1/roles",
        GET_ROLE: "/api-v1/get-role",
        CREATE_ROLE: "/api-v1/create-role",
        EDIT_ROLE: "/api-v1/edit-role",
        GET_ALL_MODULES: "/api-v1/modules",
        DELETE_ROLES: "/api-v1/delete-roles",
        GET_USERS: "/api-v1/users",
        DELETE_USERS: "/api-v1/delete-users",
        EDIT_USER: "/api-v1/edit-user"
    },
    IMAGE_FORMATE_REGEX: /(\.jpg|\.jpeg|\.bmp|\.png)$/i,
    GET_YEARS: () => {
        let years = [];
        for (let i = new Date().getFullYear(); i >= 1952; i--) {
            years = [...years, { label: i.toString(), value: i.toString() }];
        }
        return years;
    },
    DATE_FORMAT: "DD/MM/YYYY"
}