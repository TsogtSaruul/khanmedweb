import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useVision() {
	const [visions, setVisions] = useState([]);

	const getVisions = async () => {
		try {
			const { data } = await api.getAllVisions();
			setVisions(data?.vision);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getVisions();
	}, []);

	return visions;
}
