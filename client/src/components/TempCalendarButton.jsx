import { Link } from "react-router-dom";

const TempCalendarButton = () => (
  <Link to="/calendar">
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
      Go to Calender
    </button>
  </Link>
);

export default TempCalendarButton;

