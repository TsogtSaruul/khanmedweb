import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useSchedule() {
	const [schedules, setSchedules] = useState([]);

	const getSchedules = async () => {
		try {
			const { data } = await api.getAllSchedules();
			setSchedules(data?.schedule);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getSchedules();
	}, []);

	return schedules;
}
