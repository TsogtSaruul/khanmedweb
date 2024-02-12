import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useAbout() {
	const [abouts, setAbouts] = useState([]);

	const getAbouts = async () => {
		try {
			const { data } = await api.getAllAbouts();
			setAbouts(data?.about);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAbouts();
	}, []);

	return abouts;
}
