import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function usePortfolio() {
	const [portfolios, setPortfolios] = useState([]);

	const getPortfolios = async () => {
		try {
			const { data } = await api.getAllPortfolios();
			setPortfolios(data?.portfolio);
		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPortfolios();
	}, []);

	return portfolios;
}
