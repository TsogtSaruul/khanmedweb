import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useSocial() {
	const [socials, setSocials] = useState([]);

	const getSocials = async () => {
		try {
			const { data } = await api.getAllSocials();
			setSocials(data?.social);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getSocials();
	}, []);

	return socials;
}
