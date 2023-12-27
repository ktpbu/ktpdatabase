import { Breadcrumb } from "react-bootstrap";

// style sheets
import "./Calendar.css";
import "./../page-content.css";

const Calendar = () => {
  	return (
    	<div className="page-content">
			<h2 className="text-start p-3">Calendar</h2>

			<Breadcrumb className="p-3">
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Calendar</Breadcrumb.Item>
			</Breadcrumb>
    	</div>
  	);
};

export default Calendar;
