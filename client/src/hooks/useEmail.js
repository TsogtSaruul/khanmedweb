import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useEmail() {
	const [emails, setEmails] = useState([]);

	const getEmails = async () => {
		try {
			const { data } = await api.getAllEmails();
			setEmails(data?.emails);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getEmails();
	}, []);

	return emails;
}
