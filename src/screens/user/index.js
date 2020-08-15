import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/page-header';
import CustomTable from '../../components/table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik } from "formik";
import * as Yup from "yup";
import PopUp from '../../components/pop-up';
import { Button, Checkbox, Container } from "@material-ui/core";
import { useStyles } from './styles';
import { getAllUsers, deleteRoles, addRole, editRole, getAllRoles } from '../../api';
import swal from 'sweetalert';
import constants from '../../constants';
import { InputField, DropDown } from '../../components';
import { ModalFooter } from 'reactstrap';

export default ({ access }) => {

    const initValues = { first_name: "", last_name: "", email: "", phone: "", role: "" }

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState(initValues)
    const [isPopUpOpen, setPopUpOpen] = useState({ type: 'add', isOpen: false });

    useEffect(() => {
        getAllUsers().then((res) => { setUsers(res.users); setLoading(false) }).catch((err) => setLoading(false));
        getAllRoles().then((res) => { setRoles(res.roles); setLoading(false) }).catch((err) => setLoading(false))
    }, []);

    const noOfSelectedUsers = users.filter((user) => { return user.isSelected ? user : null })

    const renderUserForm = () => {
        return (
            <Formik
                enableReinitialize={true}
                initialValues={user}
                onSubmit={(values) => initAddEditRole(values)}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required("Required"),
                    first_name: Yup.string().min(3, "Should be atleast 3 characters").required("Required"),
                    last_name: Yup.string().min(3, "Should be atleast 3 characters").required("Required"),
                    phone: Yup.string().matches(constants.REGEX.PHONE, 'Phone number should be 10 digit').required("Required"),
                    role: Yup.object().required("Required")
                })}
            >
                {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
                    { console.log(values) }
                    return (
                        <form className="d-flex flex-column flex-wrap" autoComplete="off" onSubmit={handleSubmit}>
                            <Container>
                                <InputField error={errors.first_name} maxLength="20" label="First Name" id="first_name" value={values.first_name} onChange={handleChange} />
                                <InputField error={errors.last_name} maxLength="20" label="Last Name" id="last_name" onChange={handleChange} />
                                <InputField error={errors.email} label="Email" id="email" onChange={handleChange} />
                                <InputField error={errors.phone} maxLength="10" label="Phone" id="phone" onChange={handleChange} />
                                <DropDown label="Role" id="role" error={errors.role} list={roles} value={values.role} onChange={(e) => setFieldValue("role", e.target.value)} />
                            </Container>
                            <ModalFooter>
                                <Button className="mr-3" variant="contained" type="submit" color="primary">Save</Button>
                                <Button variant="contained" color="secondary" onClick={() => setPopUpOpen({ ...isPopUpOpen, isOpen: false })}>Close</Button>
                            </ModalFooter>
                        </form>
                    );
                }}
            </Formik>
        );
    }

    const initDelete = () => {
        swal({
            title: "Warning",
            icon: "warning",
            text: "Are you sure you want to delete selected users ?",
            buttons: true,
            dangerMode: true,
        })
            .then((isConfirmed) => {
                if (isConfirmed) {
                    let selectedRoles = users.filter((user) => { return user.isSelected ? user : null });
                    let selectedIds = selectedRoles.map((item) => { return item._id })
                    deleteRoles({ ids: selectedIds })
                        .then(() => {
                            setUsers(users.filter((user) => { return selectedIds.indexOf(user._id) === -1 ? user : null }))
                            swal({
                                title: "Success",
                                text: "Role(s) Deleted Successfully",
                                icon: "success",
                                button: "OK",
                            })
                        })
                        .catch((err) => console.log(err))
                }
            })
    }

    const initAddRole = () => {
        setUser(initValues)
    }

    const initEditRole = (user) => {
        setUser(user)
    }

    const initAddEditRole = (values) => {
        console.log(values)
        // if (user.name && user.description) {
        //     setError("");
        //     if (isPopUpOpen.type === "add") {
        //         addRole({ name: user.name, description: user.description })
        //             .then(async (res) => {
        //                 setUsers([...users, res.user]) //update table after adding user
        //                 return await swal({
        //                     title: "Success",
        //                     text: "Added Role successfully",
        //                     icon: "success",
        //                     button: "OK",
        //                 })
        //             })
        //             .then(() => {
        //                 setPopUpOpen({ ...isPopUpOpen, isOpen: false })
        //             })
        //             .catch((err) => swal({
        //                 title: "Error",
        //                 text: "Role already exists! Try another name.",
        //                 icon: "error",
        //                 button: "OK",
        //             }))
        //     } else {
        //         editRole({ _id: user._id, name: user.name, description: user.description })
        //             .then(async (res) => {
        //                 setUsers(users.map((item) => item._id === res.user._id ? res.user : item))  //update table after editing user
        //                 return await swal({
        //                     title: "Success",
        //                     text: "Edited user successfully",
        //                     icon: "success",
        //                     button: "OK",
        //                 })
        //             })
        //             .then(() => {
        //                 setPopUpOpen({ ...isPopUpOpen, isOpen: false })
        //             })
        //             .catch((err) => swal({
        //                 title: "Error",
        //                 text: "Role already exists! Try another name.",
        //                 icon: "error",
        //                 button: "OK",
        //             }))
        //     }
        // }
        // else if (!user.name) setError('Please enter user name');
        // else if (!user.description) setError('Please add user description');
        // else setError('Please select atleast one module for access');
    }

    const columns =
        access.write ?
            [
                {
                    id: 'select', label: <Checkbox onClick={(event) => {
                        setUsers(users.filter((user) => {
                            user.isSelected = event.target.checked;
                            return user;
                        }))
                    }} checked={noOfSelectedUsers.length === users.length} />, minWidth: 20
                },
                { id: 'name', label: 'Name', minWidth: 100 },
                { id: 'email', label: 'Email', minWidth: 100 },
                { id: 'phone', label: 'Phone', minWidth: 100 },
                { id: 'role', label: 'Role', minWidth: 100 },
                { id: 'edit', label: 'Edit', minWidth: 60 },
            ]
            :
            [
                { id: 'name', label: 'Name', minWidth: 100 },
                { id: 'email', label: 'Email', minWidth: 100 },
                { id: 'phone', label: 'Phone', minWidth: 100 },
                { id: 'role', label: 'Role', minWidth: 100 },
            ]


    return (
        <React.Fragment>
            <PageHeader
                title={"Users Management"}
                isWrite={access.write}
                isDelete={access.delete}
                deleteDisable={!noOfSelectedUsers.length}
                onAdd={() => { initAddRole(); setPopUpOpen({ ...isPopUpOpen, isOpen: true, type: 'add' }) }}
                onDelete={() => initDelete()}
            />
            {
                loading ?
                    <center className="mt-5"><CircularProgress color="secondary" /></center>
                    :
                    <CustomTable
                        columns={columns}
                        rows={users.map((item) => {
                            return {
                                select: <Checkbox onClick={(event) => {
                                    setUsers(users.filter((user) => {
                                        if (user._id === item._id) user.isSelected = event.target.checked
                                        return user;
                                    }))
                                }} checked={item.isSelected ? item.isSelected : false} color="primary" />,
                                name: `${item.first_name} ${item.last_name}`,
                                email: item.email,
                                phone: item.phone,
                                role: item.role,
                                edit: access.write ? <Button variant="contained" className={classes.primaryButton} onClick={() => {
                                    setUser(item);
                                    initEditRole(item);
                                    setPopUpOpen({ ...isPopUpOpen, type: "edit", isOpen: true })
                                }}>Edit</Button> : null
                            };
                        })}
                    />
            }
            <PopUp
                size="lg"
                isOpen={isPopUpOpen.isOpen}
                toggle={() => setPopUpOpen({ ...isPopUpOpen, isOpen: false })}
                header={isPopUpOpen.type === "add" ? "Add Role" : "Edit Role"}
            >
                {renderUserForm()}
            </PopUp>
        </React.Fragment>
    );
}