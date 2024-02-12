import { useState, useEffect } from "react";
import * as api from '../api/index';


export default function useTestimonial() {
	const [testimonials, setTestimonials] = useState([]);

	const getTestimonials = async () => {
		try {
			const { data } = await api.getAllTestimonials();
			setTestimonials(data?.testimonial);
		
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTestimonials();
	}, []);

	return testimonials;
}
