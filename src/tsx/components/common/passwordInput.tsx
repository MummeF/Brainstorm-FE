import React, { useState } from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface Props {
    password: string;
    onPasswordChange(nextPassword: string): void;
    // validatePassword?(password: string): boolean;
    // validationText?: string;
    className?: any;
    errorText?: string;
    optional?: boolean;
}

export default function PasswordInput(props: Props) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl className={props.className} variant="outlined">
            <InputLabel error={props.errorText ? true : false} htmlFor="outlined-adornment-password">{props.errorText ? props.errorText : ('Passwort' + (props.optional ? " (optional)" : ""))}</InputLabel>
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
                error={props.errorText ? true : false}
                labelWidth={props.errorText ? props.errorText.length * 8 : props.optional ? 140 : 70}
            />
        </FormControl>);

}