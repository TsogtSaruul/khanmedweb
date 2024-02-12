import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useAppointment() {
	const [appointments, setAppointments] = useState([]);

	const getAppointments = async () => {
		try {
			const { data } = await api.getAllAppointments();
			setAppointments(data?.appointments);
		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAppointments();
	}, []);

	return appointments;
}
