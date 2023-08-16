import React from "react";
import { Button } from "@mui/material";
import styles from './Header.module.scss';
import Container from "@mui/material";

export const Header = () =>{
	const isAuth = false;

	const onClickLogout = () =>{}

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<a className={styles.logo} href="/">
						<div>Daria's Blog'</div>
					</a>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
							<a href="/posts/create">
							<Button variant="contained">Create a post</Button>
							</a>
							<Button onClick={onClickLogout} variant="contained" color="error">
								Log out
							</Button>
							</>
						) : (
							<>
							<a href="/login">
								<Button variant="outlined">
									Log In
								</Button>
							</a>
							</>
						)
						}
					</div>
				</div>
			</Container>
		</div>
	)
}