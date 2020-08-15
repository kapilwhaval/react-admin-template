import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

export const InputField = ({ label, value, onChange, maxLength, id, error, secured }) => (
    <TextField
        fullWidth
        type={secured ? "password" : "text"}
        inputProps={{ maxLength: maxLength }}
        variant="outlined"
        id={id}
        error={error ? true : false}
        helperText={error}
        name={id}
        maxLength={20}
        className="my-2"
        label={label}
        value={value}
        onChange={onChange}
    />
)

export const DropDown = ({ label, value, onChange, id, list, error, size }) => (
    <FormControl size={size} className="my-2" fullWidth variant="outlined">
        <InputLabel id={`label${id}`}>{label}</InputLabel>
        <Select
            labelId={`label${id}`}
            id={id}
            error={error ? true : false}
            value={value ? value : ""}
            onChange={onChange}
            label={label}
        >
            {list.map((item, index) => <MenuItem key={index} value={item}>{item.name}</MenuItem>)}
        </Select>
        <FormHelperText error >{error}</FormHelperText>
    </FormControl>
)