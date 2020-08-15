import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/page-header';
import CustomTable from '../../components/table';
import CircularProgress from '@material-ui/core/CircularProgress';
import PopUp from '../../components/pop-up';
import { Button, Checkbox, Container, Typography, Switch } from "@material-ui/core";
import { useStyles } from './styles';
import TextField from '@material-ui/core/TextField';
import { getAllRoles, getAllModules, deleteRoles, addRole, editRole } from '../../api';
import swal from 'sweetalert';

export default ({ access }) => {

    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({ name: "", description: "" })
    const [modules, setModules] = useState([]);
    const [selectedModules, setSelectedModules] = useState([]);
    const [isPopUpOpen, setPopUpOpen] = useState({ type: 'add', isOpen: false });

    useEffect(() => {
        getAllRoles().then((res) => { setRoles(res.roles); setLoading(false) }).catch((err) => setLoading(false))
        getAllModules().then((res) => {
            let sortedModules = res.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
            setModules(sortedModules)
        }).catch((err) => console.log(err))
    }, []);

    const numberOfSelectedRoles = roles.filter((role) => { return role.isSelected ? role : null })
    const numberOfSelectedModules = modules.filter((module) => { return module.isSelected ? module : null });

    const renderModules = () => {
        const modulesColumns = [
            {
                id: 'select', label: <Checkbox
                    onClick={(event) => {
                        setSelectedModules(selectedModules.filter((module) => {
                            module.isSelected = event.target.checked;
                            return module;
                        }))
                    }} checked={numberOfSelectedModules.length === modules.length} />, minWidth: 20
            },
            { id: 'name', label: 'Module Name', minWidth: 100 },
            { id: 'read', label: 'Can Read', minWidth: 100 },
            { id: 'write', label: 'Can Modify', minWidth: 100 },
            { id: 'delete', label: 'Can Delete', minWidth: 100 },
        ];
        return (
            <CustomTable
                columns={modulesColumns}
                rows={selectedModules.map((item) => {
                    return {
                        select: <Checkbox onClick={(event) => {
                            setSelectedModules(selectedModules.filter((module) => {
                                if (module.id === item.id) {
                                    module.isSelected = event.target.checked
                                    module.read = event.target.checked
                                }
                                return module;
                            }))
                        }} checked={item.isSelected ? item.isSelected : false} color="primary" />,
                        name: item.title.charAt(0).toUpperCase() + item.title.slice(1),
                        read: <Switch
                            disabled={item.isSelected ? !item.isSelected : true}
                            checked={item.read}
                            onChange={(event) => {
                                setSelectedModules(selectedModules.filter((module) => {
                                    if (module.id === item.id) module.read = event.target.checked
                                    return module;
                                }))
                            }}
                            name="read"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />,
                        write: <Switch
                            disabled={item.isSelected ? !item.isSelected : true}
                            checked={item.write}
                            onChange={(event) => {
                                setSelectedModules(selectedModules.filter((module) => {
                                    if (module.id === item.id) module.write = event.target.checked
                                    return module;
                                }))
                            }}
                            name="write"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />,
                        delete: <Switch
                            disabled={item.isSelected ? !item.isSelected : true}
                            checked={item.delete}
                            onChange={(event) => {
                                setSelectedModules(selectedModules.filter((module) => {
                                    if (module.id === item.id) module.delete = event.target.checked
                                    return module;
                                }))
                            }}
                            name="delete"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
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
                        <TextField inputProps={{ maxLength: 20 }} variant="outlined" maxLength={20} className="mr-3" label="Role Name" value={role.name} onChange={(e) => setRole({ ...role, name: e.target.value })} />
                        <TextField inputProps={{ maxLength: 1000 }} variant="outlined" multiline className="mt-2" fullWidth label="Role Description" value={role.description} onChange={(e) => setRole({ ...role, description: e.target.value })} />
                    </Container>
                    <Container className="mt-3"><Typography variant="h6">Select Modules and Access</Typography></Container>
                    {renderModules()}
                    <Container className="mt-3"><Typography style={{ color: "red" }}>{error}</Typography></Container>
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
                    let selectedRoles = roles.filter((role) => { return role.isSelected ? role : null });
                    let selectedIds = selectedRoles.map((item) => { return item._id })
                    deleteRoles({ ids: selectedIds })
                        .then(() => {
                            setRoles(roles.filter((role) => { return selectedIds.indexOf(role._id) === -1 ? role : null }))
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
        setSelectedModules(modules.filter((module) => {
            if (module.id === 1) { module.isSelected = true; module.read = true; return module; }
            else { module.isSelected = false; module.read = false; return module };
        }))
        setRole({ ...role, name: "", description: "" })
    }

    const initEditRole = (role) => {
        setSelectedModules(modules.filter((module) => {
            return role.access_modules.map((roleModules) => {
                if (roleModules._id === module.id) {
                    module.isSelected = true
                    module.read = roleModules.read;
                    module.write = roleModules.write;
                    module.delete = roleModules.delete;
                }
                return module;
            })
        }))
    }

    const initAddEditRole = () => {
        let updatedModules = modules.filter((module) => { return module.isSelected ? module : null });
        let selectedIds = updatedModules.map((item) => {
            return {
                id: item.id,
                read: item.read ? item.read : "ss",
                write: item.write ? item.write : false,
                delete: item.delete ? item.delete : false
            }
        })
        if (role.name && role.description && selectedIds.length) {
            setError("");
            if (isPopUpOpen.type === "add") {
                addRole({ name: role.name, description: role.description, access_modules: selectedIds })
                    .then(async (res) => {
                        setRoles([...roles, res.role]) //update table after adding role
                        return await swal({
                            title: "Success",
                            text: "Added Role successfully",
                            icon: "success",
                            button: "OK",
                        })
                    })
                    .then(() => {
                        setPopUpOpen({ ...isPopUpOpen, isOpen: false })
                    })
                    .catch((err) => swal({
                        title: "Error",
                        text: "Role already exists! Try another name.",
                        icon: "error",
                        button: "OK",
                    }))
            } else {
                editRole({ _id: role._id, name: role.name, description: role.description, access_modules: selectedIds })
                    .then(async (res) => {
                        setRoles(roles.map((item) => item._id === res.data._id ? res.data : item))  //update table after editing role
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
                    .catch((err) => swal({
                        title: "Error",
                        text: "Role already exists! Try another name.",
                        icon: "error",
                        button: "OK",
                    }))
            }
        }
        else if (!role.name) setError('Please enter role name');
        else if (!role.description) setError('Please add role description');
        else setError('Please select atleast one module for access');
    }

    const columns =
        access.write ?
            [
                {
                    id: 'select', label: <Checkbox onClick={(event) => {
                        setRoles(roles.filter((role) => {
                            role.isSelected = event.target.checked;
                            return role;
                        }))
                    }} checked={numberOfSelectedRoles.length === roles.length} />, minWidth: 20
                },
                { id: 'name', label: 'Name', minWidth: 100 },
                { id: 'module', label: 'Modules Allowed', minWidth: 100 },
                { id: 'edit', label: 'Edit', minWidth: 60 },
            ]
            :
            [
                { id: 'name', label: 'Name', minWidth: 100 },
                { id: 'module', label: 'Modules Allowed', minWidth: 100 },
            ]


    return (
        <React.Fragment>
            <PageHeader
                title={"Users Management"}
                isWrite={access.write}
                isDelete={access.delete}
                deleteDisable={!numberOfSelectedRoles.length}
                onAdd={() => { initAddRole(); setPopUpOpen({ ...isPopUpOpen, isOpen: true, type: 'add' }) }}
                onDelete={() => initDelete()}
            />
            {
                loading ?
                    <center className="mt-5"><CircularProgress color="secondary" /></center>
                    :
                    <CustomTable
                        columns={columns}
                        rows={roles.map((item) => {
                            return {
                                select: <Checkbox onClick={(event) => {
                                    setRoles(roles.filter((role) => {
                                        if (role._id === item._id) role.isSelected = event.target.checked
                                        return role;
                                    }))
                                }} checked={item.isSelected ? item.isSelected : false} color="primary" />,
                                name: item.name,
                                module: item.access_modules ? item.access_modules.length : '0',
                                edit: access.write ? <Button variant="contained" className={classes.primaryButton} onClick={() => {
                                    setRole(item);
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