import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Link,
	TextField,
} from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10vh;
`;

const StyledLoginTitle = styled.h3``;

const LoginForm = () => {
	const handleSubmit = () => {};

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
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
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
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
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
