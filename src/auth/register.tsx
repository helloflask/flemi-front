import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as validate from "../validators";
import { CustomTextField as TextField } from "../fields";
import NavBar from "../navBar";
import { FieldError, FormError } from "../errors";
import { fieldStyle } from "../globals";
import flog from "../axiosInstance";

interface RegisterState {
    username: string;
    name: string;
    email: string;
    password: string;
    showPassword: boolean;
    passwordAgain: string;
    showPasswordAgain: boolean;
    aboutMe: string;
    error: string;
}

interface FieldsValid {
    username: boolean,
    name: boolean,
    email: boolean,
    password: boolean,
    passwordAgain: boolean,
}

export const RegisterForm = () => {
    const [values, setValues] = React.useState<RegisterState>({
        username: "",
        name: "",
        email: "",
        password: "",
        showPassword: false,
        passwordAgain: "",
        showPasswordAgain: false,
        aboutMe: "",
        error: "",
    });
    const [errors, setErrors] = React.useState({
        username: "",
        name: "",
        email: "",
        passwordAgain: "",
        form: "",
    })
    const [fieldsValid, setFieldsValid] = React.useState<FieldsValid>({
        username: false,
        name: false,
        email: false,
        password: false,
        passwordAgain: false,
    })
    const setValidState = (prop: keyof FieldsValid, valid: boolean) => {
        setFieldsValid({ ...fieldsValid, [prop]: true });
    }
    const formValid = () => (
        fieldsValid.username &&
        fieldsValid.name &&
        fieldsValid.email &&
        fieldsValid.password &&
        fieldsValid.passwordAgain &&
        validate.password(values.password, values.passwordAgain)
    );
    const formErrors = {
        "username": "The length must be between 3 and 16",
        "email": "Email invalid",
        "name": "The length must be shorter than 64",
    };
    const handleChange = (prop: keyof RegisterState) =>
	                     (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        switch (prop) {
            case "username":
            case "email":
            case "name":
                if (!validate[prop](value)) {
                    setErrors({ ...errors, [prop]: formErrors[prop] });
                    setValidState(prop, false);
                    break;
                }
                setValidState(prop, true);
                setErrors({ ...errors, [prop]: "" });
                break;
            case "password":
            case "passwordAgain":
                let password: string, passwordAgain: string;
                if (prop === "password") {
                    password = value;
                    passwordAgain = values.passwordAgain;
                } else {
                    passwordAgain = value;
                    password = values.password;
                }
                if (!validate.password(password, passwordAgain)) {
                    setErrors({ ...errors, passwordAgain: "Passwords don't match" });
                    setValidState(prop, false);
                    break;
                }
                setValidState(prop, true);
                setErrors({ ...errors, passwordAgain: "" });
                break;
        }
        setValues({ ...values, [prop]: value });
    };
    const handleClickShowPassword = () => {
        console.log(values);
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };
    const handleClickShowPasswordAgain = () => {
        setValues({
            ...values,
            showPasswordAgain: !values.showPasswordAgain
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const navigate = useNavigate();

    const handleRegister = () => {
        flog.post("/auth/register", {
            username: values.username,
            password: values.password,
            email: values.email,
            about_me: values.aboutMe,
            name: values.name,
        })
            .then(() => {
                flog.post("/auth/login", {
                    username: values.username,
                    password: values.password
                })
                    .then((res: { data: { auth_token: string } }) => {
                        const token: string = res.data.auth_token;
                        localStorage.setItem("token", token);
                        return navigate("/");
                    });
            })
            .catch(({ response }) => {
                const { message } = response.data;
                setErrors({ ...errors, form: message });
            });
    };
    return (<>
        <Box component="form" autoComplete="off" sx={{ p: 2 }} id="firstForm">
            <TextField
                id="username"
                label="Username"
                value={values.username}
                onChange={handleChange("username")}
                error={errors.username}
            />
            <TextField
                id="name"
                label="Name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
            />
            <TextField
                id="email"
                label="Email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
            />
            <FormControl sx={fieldStyle} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl><br />
            <FormControl
                sx={fieldStyle}
                variant="standard"
                color={errors.passwordAgain === "" ? undefined : "error"}
            >
                <InputLabel htmlFor="passwordAgain">Password Again</InputLabel>
                <Input
                    id="passwordAgain"
                    type={values.showPasswordAgain ? "text" : "password"}
                    value={values.passwordAgain}
                    onChange={handleChange("passwordAgain")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordAgain}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPasswordAgain ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FieldError message={errors.passwordAgain} />
            <TextField
                id="aboutMe"
                label="About Me (Optional)"
                value={values.aboutMe}
                onChange={handleChange("aboutMe")}
                error=""
                multiline
                rows={3}
            />
            <FormControl sx={{ display: "flex", justifyContent: "center", m: 2, width: "35ch" }}>
                <Button size="large" variant="contained" onClick={handleRegister} disabled={!formValid()}>Register</Button>
            </FormControl>
            <FormError message={errors.form} />
        </Box>
    </>);
}

const Register = () => {
    return (<>
        <NavBar />
        <div className="container mx-auto max-w-60% flex justify-center">
            <RegisterForm />
        </div>
    </>);
}

export default Register;
