/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

function AssisstantCourses() {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5208/api/Teacher/Assistant",
					{
						headers: {},
					}
				);
				console.log(response.data);
				setCourses(response.data);
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};

		fetchCourses();
	}, []);
	return <></>;
}

export default AssisstantCourses;
