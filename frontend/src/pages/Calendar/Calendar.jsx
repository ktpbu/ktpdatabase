import CustomBreadcrumb from "../../components/CustomBreadcrumb";

const Calendar = () => {
    return (
        <div className="w-3/4 mx-auto py-20">
            <h2 className="p-3 text-start text-[#234c8b]">Calendar</h2>

            <CustomBreadcrumb
                previous={[{ title: "Home", path: "/" }]}
                current="Calendar"
            />

            <iframe
                src="https://calendar.google.com/calendar/embed?src=c_dc1c92fb37e77b2828d7126733c511c5bd842fd51fb5730824825cb9ffe617ba%40group.calendar.google.com&ctz=America%2FNew_York"
                className="w-full h-128"
            ></iframe>
        </div>
    );
};

export default Calendar;
