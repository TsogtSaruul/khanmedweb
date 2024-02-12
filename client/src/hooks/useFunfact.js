import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useFunfact() {
	const [funfacts, setFunfacts] = useState([]);

	const getFunfacts = async () => {
		try {
			const { data } = await api.getAllFunfacts();
			setFunfacts(data?.funfact);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getFunfacts();
	}, []);

	return funfacts;
}
