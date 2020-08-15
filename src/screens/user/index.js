import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/page-header';
import CustomTable from '../../components/table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik } from "formik";
import * as Yup from "yup";
import PopUp from '../../components/pop-up';
import { Button, Checkbox, Container } from "@material-ui/core";
import { getAllUsers, deleteUsers, getAllRoles, signUp, editUser } from '../../api';
import swal from 'sweetalert';
import constants from '../../constants';
import { InputField, DropDown } from '../../components';
import { ModalFooter } from 'reactstrap';

export default ({ access }) => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    useEffect(() => {
        getAllUsers().then((res) => { setUsers(res.users); setLoading(false) }).catch((err) => setLoading(false));
        getAllRoles().then((res) => {
            setRoles(res.roles);
        }).catch((err) => setLoading(false))
    }, []);

    const noOfSelectedUsers = users.filter((user) => { return user.isSelected ? user : null })

    const renderUserForm = () => {
        return (
            <Formik
                enableReinitialize={true}
                initialValues={{ first_name: "", last_name: "", email: "", phone: "", password: "", role: "" }}
                onSubmit={(values) => initAddUser(values)}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email().required("Required"),
                    first_name: Yup.string().min(3, "Should be atleast 3 characters").required("Required"),
                    last_name: Yup.string().min(3, "Should be atleast 3 characters").required("Required"),
                    phone: Yup.string().matches(constants.REGEX.PHONE, 'Phone number should be 10 digit').required("Required"),
                    password: Yup.string().min(6, "Should be atleast 6 characters").required("Required"),
                    role: Yup.object().required("Required")
                })}
            >
                {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
                    return (
                        <form className="d-flex flex-column flex-wrap" autoComplete="off" onSubmit={handleSubmit}>
                            <Container>
                                <InputField error={errors.first_name} maxLength="20" label="First Name" id="first_name" value={values.first_name} onChange={handleChange} />
                                <InputField error={errors.last_name} maxLength="20" label="Last Name" id="last_name" onChange={handleChange} />
                                <InputField error={errors.email} label="Email" id="email" onChange={handleChange} />
                                <InputField error={errors.phone} maxLength="10" label="Phone" id="phone" onChange={handleChange} />
                                <InputField error={errors.password} secured maxLength="10" label="Password" id="password" onChange={handleChange} />
                                <DropDown label="Role" id="role" error={errors.role} list={roles} value={values.role} onChange={(e) => setFieldValue("role", e.target.value)} />
                            </Container>
                            <ModalFooter>
                                <Button className="mr-3" variant="contained" type="submit" color="primary">Save</Button>
                                <Button variant="contained" color="secondary" onClick={() => setPopUpOpen(false)}>Close</Button>
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
                    let selectedUsers = users.filter((user) => { return user.isSelected ? user : null });
                    let selectedIds = selectedUsers.map((item) => { return item._id })
                    deleteUsers({ ids: selectedIds })
                        .then(() => {
                            setUsers(users.filter((user) => { return selectedIds.indexOf(user._id) === -1 ? user : null }))
                            swal({
                                title: "Success",
                                text: "User(s) Deleted Successfully",
                                icon: "success",
                                button: "OK",
                            })
                        })
                        .catch((err) => console.log(err))
                }
            })
    }

    const initAddUser = (values) => {
        let user = values;
        user.role = values.role.name
        signUp(user)
            .then(async (res) => {
                setUsers([...users, res.user]) //update table after adding user
                return await swal({
                    title: "Success",
                    text: "Added User successfully",
                    icon: "success",
                    button: "OK",
                })
            })
            .then(() => {
                setPopUpOpen(false)
            })
            .catch((err) => swal({
                title: "Error",
                text: "User already exists! Try another email.",
                icon: "error",
                button: "OK",
            }))
    }

    const initChangeRole = (e, user) => {
        let updatedUser = user;
        updatedUser.role = e.target.value.name;
        swal({
            title: "Warning",
            icon: "warning",
            text: `Change role of user to ${e.target.value.name} ?`,
            buttons: true,
            dangerMode: true,
        })
            .then((isConfirmed) => {
                if (isConfirmed) {
                    editUser(updatedUser)
                        .then((res) => {
                            setUsers(users.filter((oldUser) => {
                                return oldUser._id === user._id ? oldUser.role = e.target.value.name : oldUser
                            }));
                            swal({
                                title: "Success",
                                text: "Changed Role successfully",
                                icon: "success",
                                button: "OK",
                            })
                        })
                        .catch((err) => swal({
                            title: "Error",
                            text: "Something went wrong! Try later",
                            icon: "error",
                            button: "OK",
                        }))
                }
            })
    }

    const columns = [
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
    ]

    return (
        <React.Fragment>
            <PageHeader
                title={"Users Management"}
                isWrite={access.write}
                isDelete={access.delete}
                deleteDisable={!noOfSelectedUsers.length}
                onAdd={() => setPopUpOpen(true)}
                onDelete={() => initDelete()}
            />
            {
                loading ?
                    <center className="mt-5"><CircularProgress color="secondary" /></center>
                    :
                    <CustomTable
                        columns={columns}
                        rows={users.map((item) => {
                            let selectedRole = roles.filter((role) => { return role.name === item.role ? role : null })
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
                                role: access.write ?
                                    <DropDown
                                        label="Role"
                                        size="small"
                                        id="role"
                                        list={roles}
                                        value={selectedRole[0]}
                                        onChange={(e) => initChangeRole(e, item)} />
                                    :
                                    item.role,
                            };
                        })}
                    />
            }
            <PopUp
                size="lg"
                isOpen={isPopUpOpen}
                toggle={() => setPopUpOpen(false)}
                header={"Add User"}
            >
                {renderUserForm()}
            </PopUp>
        </React.Fragment>
    );
}