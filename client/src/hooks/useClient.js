import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useClient() {
	const [clients, setClients] = useState([]);

	const getClients = async () => {
		try {
			const { data } = await api.getAllClients();
			setClients(data?.client);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getClients();
	}, []);

	return clients;
}
