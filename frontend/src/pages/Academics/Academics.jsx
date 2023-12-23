import { Link } from "react-router-dom";
import "./Academics.css";

const Academics = () => {
	return (
		<div className="page-content">
			<h2>Academics</h2>
			<div>
				<Link to='/academics/courses'>
					Course Guide
				</Link>
			</div>
			<span>
				<Link to='/academics/resources'>
					Resources
				</Link>
			</span>
		</div>
	);
};

export default Academics;
