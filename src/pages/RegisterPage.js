import {
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import HorizontalLine from "../components/HorizontalLine";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\-$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password Confirmation is required"),
});
const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        K-Home
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  let navigate = useNavigate();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { name, email, password, passwordConfirmation } = data;
    try {
      await auth.register(
        { name, email, password, passwordConfirmation },
        () => {
          navigate("/", { replace: true });
        }
      );
    } catch (error) {
      reset();
      console.log(error);
      setError("responseError", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOpenIcon />
            </Avatar>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              {!!errors.responseError && (
                <Alert severity="error">{errors.responseError.message}</Alert>
              )}
              <Stack spacing={3} sx={{ minWidth: "350px", maxWidth: "350px" }}>
                <Stack
                  spacing={2}
                  sx={{ minWidth: "350px", maxWidth: "350px" }}
                >
                  <Typography variant="h4" textAlign="center">
                    Sign Up
                  </Typography>
                  <FTextField name="name" label="Name" />
                  <FTextField name="email" label="Email" />
                  <FTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />{" "}
                  <FTextField
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    type={showPasswordConfirmation ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPasswordConfirmation(
                                !showPasswordConfirmation
                              )
                            }
                            edge="end"
                          >
                            {showPasswordConfirmation ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Register
                </LoadingButton>
              </Stack>
              <Typography textAlign="right" variant="body2">
                <Link href="/login">Already have an account</Link>
              </Typography>

              <HorizontalLine />
              <Stack justifyContent="space-evenly" direction="row">
                <IconButton color="primary" size="large">
                  <GoogleIcon />
                </IconButton>
                <IconButton color="primary" size="large">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="primary" size="large">
                  <InstagramIcon />
                </IconButton>
              </Stack>
              <Copyright />
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
