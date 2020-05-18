import React, { useState } from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface Props {
    password: string;
    onPasswordChange(nextPassword: string): void;
    optional?: boolean;
}

export default function PasswordInput(props: Props) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Passwort{props.optional ? " (optional)" : ""}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={props.password}
                onChange={(e) => props.onPasswordChange(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={props.optional ? 140 : 70}
            />
        </FormControl>);

}