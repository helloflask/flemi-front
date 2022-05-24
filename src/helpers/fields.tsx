import { InputProps } from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { FieldError } from "./errors";
import { fieldStyle } from "./globals";

interface TextFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: InputProps["onChange"];
    error?: string;
    fullWidth?: boolean;
    rows?: number;
    multiline?: boolean;
}

export function CustomTextField(props: TextFieldProps) {
    return (
        <>
            <TextField
                sx={
                    props.fullWidth
                        ? { mt: 1, textAlign: "center" }
                        : fieldStyle
                }
                id={props.id}
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                variant="standard"
                margin="none"
                fullWidth={props.fullWidth}
                rows={props.rows}
                multiline={props.multiline}
                color={props.error === "" ? undefined : "error"}
            />
            <FieldError message={props.error} />
        </>
    );
}
