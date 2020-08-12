import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/page-header';
import CustomTable from '../../components/table';
import PopUp from '../../components/pop-up';
import { Button, Checkbox, Container, Typography } from "@material-ui/core";
import { useStyles } from './styles';
import TextField from '@material-ui/core/TextField';
import { getAllRoles, getAllModules, deleteRoles, addRole, editRole } from '../../api';
import swal from 'sweetalert';

export default () => {

    const classes = useStyles();
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({ name: "", description: "" })
    const [modules, setModules] = useState([]);
    const [isPopUpOpen, setPopUpOpen] = useState({ type: 'add', isOpen: false });

    useEffect(() => {
        getAllRoles().then((res) => setRoles(res.data)).catch((err) => console.log(err))
        getAllModules().then((res) => setModules(res.data)).catch((err) => console.log(err))
    }, []);

    const renderModules = () => {
        const modulesColumns = [
            {
                id: 'select', label: <Checkbox
                    onClick={(event) => {
                        setModules(modules.filter((module) => {
                            module.isSelected = event.target.checked;
                            return module;
                        }))
                    }} />, minWidth: 20
            },
            { id: 'name', label: 'Module Name', minWidth: 100 },
        ];
        return (
            <CustomTable
                columns={modulesColumns}
                rows={modules.map((item) => {
                    return {
                        select: <Checkbox onClick={(event) => {
                            setModules(modules.filter((module) => {
                                if (module.id === item.id) module.isSelected = event.target.checked
                                return module;
                            }))
                        }} checked={item.isSelected ? item.isSelected : false} color="primary" />,
                        name: item.title.charAt(0).toUpperCase() + item.title.slice(1),
                    };
                })}
            />
        );
    }

    const renderRoleForm = () => {
        return (
            <Container>
                <form className="d-flex flex-column flex-wrap" autoComplete="off">
                    <Container>
                        <TextField className="mr-3" label="Role Name" value={role.name} onChange={(e) => setRole({ ...role, name: e.target.value })} />
                        <TextField fullWidth label="Role Description" value={role.description} onChange={(e) => setRole({ ...role, description: e.target.value })} />
                    </Container>
                    <Container className="mt-3"><Typography variant="h6">Select Modules</Typography></Container>
                    {renderModules()}
                </form>
            </Container>
        );
    }

    const initDelete = () => {
        swal({
            title: "Warning",
            icon: "warning",
            text: "Are you sure you want to delete selected roles ?",
            buttons: true,
            dangerMode: true,
        })
            .then((isConfirmed) => {
                if (isConfirmed) {
                    let selectedRoles = roles.filter((role) => { if (role.isSelected) return role; return null });
                    let selectedIds = selectedRoles.map((item) => { return item.id })
                    deleteRoles({ ids: selectedIds })
                        .then(() => {
                            setRoles(roles.filter((role) => {
                                if (selectedIds.indexOf(role.id) === -1) return role
                                return null;
                            }))
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

    const initAddEditRole = () => {
        if (isPopUpOpen.type === "add") {
            addRole(role)
                .then(async (res) => {
                    setRoles([...roles, res.data])
                    return await swal({
                        title: "Success",
                        text: "Added role successfully",
                        icon: "success",
                        button: "OK",
                    })
                })
                .then(() => {
                    setPopUpOpen({ ...isPopUpOpen, isOpen: false })
                })
                .catch((err) => console.log(err))
        } else {
            editRole({ id: role.id, name: role.name, description: role.description })
                .then(async (res) => {
                    setRoles(roles.map((item) => item.id === res.data.id ? res.data : item))
                    return await swal({
                        title: "Success",
                        text: "Edited role successfully",
                        icon: "success",
                        button: "OK",
                    })
                })
                .then(() => {
                    setPopUpOpen({ ...isPopUpOpen, isOpen: false })
                })
                .catch((err) => console.log(err))
        }
    }

    const columns = [
        {
            id: 'select', label: <Checkbox onClick={(event) => {
                setRoles(roles.filter((role) => {
                    role.isSelected = event.target.checked;
                    return role;
                }))
            }} />, minWidth: 20
        },
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'module', label: 'Modules Allowed', minWidth: 100 },
        { id: 'edit', label: 'Edit', minWidth: 60 },
    ];

    return (
        <React.Fragment>
            <PageHeader
                title={"Roles Management"}
                onAdd={() => setPopUpOpen({ ...isPopUpOpen, isOpen: true, type: 'add' })}
                onDelete={() => initDelete()}
            />
            <CustomTable
                columns={columns}
                rows={roles.map((item) => {
                    return {
                        select: <Checkbox onClick={(event) => {
                            setRoles(roles.filter((role) => {
                                if (role.id === item.id) role.isSelected = event.target.checked
                                return role;
                            }))
                        }} checked={item.isSelected ? item.isSelected : false} color="primary" />,
                        name: item.name,
                        module: item.module ? item.module.length : '0',
                        edit: <Button variant="contained" className={classes.primaryButton} onClick={() => {
                            setRole(item);
                            setPopUpOpen({ ...isPopUpOpen, type: "edit", isOpen: true })
                        }}>Edit</Button>
                    };
                })}
            />
            <PopUp
                size="lg"
                isOpen={isPopUpOpen.isOpen}
                toggle={() => setPopUpOpen({ ...isPopUpOpen, isOpen: false })}
                header={isPopUpOpen.type === "add" ? "Add Role" : "Edit Role"}
                footer={[
                    <Button className="mr-3" key={0} variant="contained" color="primary" onClick={() => initAddEditRole()}>Save</Button>,
                    <Button key={1} variant="contained" color="secondary" onClick={() => setPopUpOpen({ ...isPopUpOpen, isOpen: false })}>Close</Button>
                ]}
            >
                {renderRoleForm()}
            </PopUp>
        </React.Fragment>
    );
}