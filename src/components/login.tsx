import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import flemi from "../helpers/axiosInstance";
import NavBar from "./navBar";
import { CustomTextField as TextField } from "../helpers/fields";
import * as validate from "../helpers/validators";
import { fieldStyle } from "../helpers/globals";
import { FormError } from "../helpers/errors";

interface LoginState {
    usernameOrEmail: string;
    password: string;
    showPassword: boolean;
    error: string;
}

export const LoginForm = () => {
    const [values, setValues] = React.useState<LoginState>({
        usernameOrEmail: "",
        password: "",
        showPassword: false,
        error: "",
    });
    const [errors, setErrors] = React.useState({ usernameOrEmail: "" });
    const [formValid, setFormValid] = React.useState(false);

    // prettier-ignore
    const handleChange =
        (prop: keyof LoginState) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setValues({ ...values, [prop]: event.target.value });
                if (prop === "password" && event.target.value !== "") {
                    errors.usernameOrEmail === "" && setFormValid(true);
                }
            };
    const handleUsernameOrPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const usernameOrEmail = event.target.value;
        if (
            !validate.username(usernameOrEmail) &&
            !validate.email(usernameOrEmail)
        ) {
            setErrors({ usernameOrEmail: "Invalid username or email" });
            setFormValid(false);
        } else {
            setErrors({ usernameOrEmail: "" });
            values.password !== "" && setFormValid(true);
        }
        setValues({ ...values, usernameOrEmail: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const navigate = useNavigate();
    const handleButtonClick = () => {
        flemi
            .post("/auth/login", {
                username: values.usernameOrEmail,
                password: values.password,
            })
            .then((res: { data: { auth_token: string } }) => {
                const token: string = res.data.auth_token;
                localStorage.setItem("token", token);
                return navigate("/");
            })
            .catch(({ response }) => {
                switch (response.status) {
                    case 404:
                        setValues({ ...values, error: "User not found" });
                        break;
                    case 403:
                        setValues({ ...values, error: "Password incorrect" });
                        break;
                }
            });
    };
    return (
        <Box component="form" autoComplete="off">
            <TextField
                id="usernameOrEmail"
                label="Username Or Email"
                value={values.usernameOrEmail}
                onChange={handleUsernameOrPassword}
                error={errors.usernameOrEmail}
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
                                {values.showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <div id="password-error"></div>
            <FormControl
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    m: 2,
                    width: "35ch",
                }}
            >
                <Button
                    size="large"
                    variant="contained"
                    onClick={handleButtonClick}
                    disabled={!formValid}
                >
                    Login
                </Button>
            </FormControl>
            <FormError message={values.error} />
        </Box>
    );
};

const Login = () => {
    return (
        <>
            <NavBar />
            <div className="container mx-auto max-50% flex justify-center">
                <LoginForm />
            </div>
        </>
    );
};

export default Login;
