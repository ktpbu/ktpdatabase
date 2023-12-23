import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import "./CourseList.css";

const CourseList = () => {
	const [COURSELIST, setCList] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:3000/academics/courses")
			.then((res) => {
				setCList(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			})
	}, []);

	return (
	  	<div className="page-content">
			<h3>Courses</h3>
			<table>
				<thead>
					<tr>
						<th>Course ID</th>
					</tr>
				</thead>
				<tbody>
					{
					Object.keys(COURSELIST).map((course, index) => (
						<tr key={index}>
							<td>
								<div>
									<Link to={"/academics/courses/" + COURSELIST[course].id}>
										{COURSELIST[course].id}
									</Link>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
	  	</div>
	);
};

export default CourseList;
