import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function usePricing() {
	const [pricings, setPricings] = useState([]);

	const getPricings = async () => {
		try {
			const { data } = await api.getAllPricings();
			setPricings(data?.pricing);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPricings();
	}, []);

	return pricings;
}
