import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useCallaction() {
	const [callactions, setCallactions] = useState([]);

	const getCallactions = async () => {
		try {
			const { data } = await api.getAllCallactions();
			setCallactions(data?.callaction);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCallactions();
	}, []);

	return callactions;
}
