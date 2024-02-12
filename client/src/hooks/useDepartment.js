import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useDepartment() {
	const [departments, setDepartments] = useState([]);

	const getDepartments = async () => {
		try {
			const { data } = await api.getAllDepartments();
			setDepartments(data?.department);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDepartments();
	}, []);

	return departments;
}
