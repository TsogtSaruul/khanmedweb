import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useService() {
	const [services, setServices] = useState([]);

	const getServices = async () => {
		try {
			const { data } = await api.getAllServices();
			setServices(data?.service);
		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getServices();
	}, []);

	return services;
}
