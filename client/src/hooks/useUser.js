import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useUser() {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		try {
			const { data } = await api.getAllUsers();
			setUsers(data.user);
		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	return users;
}
