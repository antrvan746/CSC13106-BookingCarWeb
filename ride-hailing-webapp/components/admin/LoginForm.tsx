import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import styled from "styled-components";
import FirebaseApp from "../../config/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const StyledLoginTitle = styled.h3``;

const app = FirebaseApp;
const auth = getAuth();

const LoginForm = () => {
  const [signInWithEmailAndPassword, _loggedInUser, _loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [isError, setIsError] = useState(false);

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
	

    try {
      const email = data.get("email")?.toString();
      const password = data.get("password")?.toString();

	  console.log(email + " " + password)
      if (email !== undefined && password !== undefined) {
        const user = await signInWithEmailAndPassword(email, password);

        if (error) {
          throw new Error(
            "Error when processing. Check your internet connection or account information."
          );
        }

		if (user !== undefined) {
			router.push("/admin")
		}
      } else {
        throw new Error("Invalid email or password!!");
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <StyledFormContainer>
      <StyledLoginTitle> Đăng nhập tài khoản của bạn </StyledLoginTitle>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isError && (
            <Alert severity="error" onClose={() => setIsError(false)}>
              Kiểm tra thông tin tài khoản đăng nhập hoặc internet của bạn
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Staff Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </StyledFormContainer>
  );
};

export default LoginForm;
