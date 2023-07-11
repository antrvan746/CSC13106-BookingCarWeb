import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { StaffRole } from "@prisma/client";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import FirebaseApp from "../../config/firebase";

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const apiURL = "http://localhost:3000";

const app = FirebaseApp;
const auth = getAuth();

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const router = useRouter();

  const [staffRole, setStaffRole] = useState(StaffRole.EMPLOYEE.toString());

  const handleChangeStaffRole = (event: SelectChangeEvent) => {
    setStaffRole(event.target.value);
  };

  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors: Partial<SignUpFormData> = {};

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      validationErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const response = await fetch(apiURL + "/api/staffs", {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            name: formData.firstName + " " + formData.lastName,
            role: staffRole,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);

          router.push("/admin");
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const StyledLoginTitle = styled.h3``;

  return (
    <StyledFormContainer>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StyledLoginTitle> Đăng kí tài khoản nhân viên </StyledLoginTitle>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  label="First Name"
                  size="small"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  size="small"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Staff Email Address"
                  name="email"
                  size="small"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  size="small"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  name="staffRole"
                  id="staffRole"
                  value={staffRole}
                  onChange={handleChangeStaffRole}
                  size="small"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={StaffRole.EMPLOYEE.toString()}>
                    {" "}
                    Employee{" "}
                  </MenuItem>
                  <MenuItem value={StaffRole.ADMIN.toString()}>
                    {" "}
                    Admin{" "}
                  </MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/admin/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </StyledFormContainer>
  );
};

export default SignUpForm;
