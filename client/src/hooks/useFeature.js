import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useFeature() {
	const [features, setFeatures] = useState([]);

	const getFeatures = async () => {
		try {
			const { data } = await api.getAllFeatures();
			setFeatures(data?.feature);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getFeatures();
	}, []);

	return features;
}
