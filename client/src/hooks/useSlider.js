import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useSlider() {
	const [sliders, setSliders] = useState([]);

	const getSliders = async () => {
		try {
			const { data } = await api.getAllSliders();
			setSliders(data?.slider);		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getSliders();
	}, []);

	return sliders;
}
