import { Link } from "react-router-dom";

const TempCalendarButton = () => (
  <Link to="/calendar">
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
      Go to Calendar
    </button>
  </Link>
);

export default TempCalendarButton;

