import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useFaq() {
	const [faqs, setFaqs] = useState([]);

	const getFaqs = async () => {
		try {
			const { data } = await api.getAllFaqs();
			setFaqs(data?.faq);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getFaqs();
	}, []);

	return faqs;
}
