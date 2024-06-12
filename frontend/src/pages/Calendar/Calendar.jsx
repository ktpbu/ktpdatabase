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
            <iframe
                src="https://calendar.google.com/calendar/embed?src=c_dc1c92fb37e77b2828d7126733c511c5bd842fd51fb5730824825cb9ffe617ba%40group.calendar.google.com&ctz=America%2FNew_York"
                className="calender"
            ></iframe>
        </div>
    );
};

export default Calendar;
