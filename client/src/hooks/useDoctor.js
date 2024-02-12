import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useDoctor() {
	const [doctors, setDoctors] = useState([]);

	const getDoctors = async () => {
		try {
			const { data } = await api.getAllDoctors();
			setDoctors(data?.doctor);
		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDoctors();
	}, []);

	return doctors;
}
