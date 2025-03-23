import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ToDoList from "./ToDoList";

const MonthlyPage = ({ selectedColor, clearSelectedColor }) => {
  const navigate = useNavigate();

  const weeks = [
    { weekText: "WEEK 1", dateRange: "12/30 ─ 01/05", weekNumber: 1 },
    { weekText: "WEEK 2", dateRange: "01/06 ─ 01/12", weekNumber: 2 },
    { weekText: "WEEK 3", dateRange: "01/13 ─ 01/19", weekNumber: 3 },
    { weekText: "WEEK 4", dateRange: "01/20 ─ 01/26", weekNumber: 4, customHeight: "263px", customWidth: "453px", customLeftDatePadding: "180px" },
    { weekText: "WEEK 5", dateRange: "01/27 ─ 01/31", weekNumber: 5, customHeight: "263px", customWidth: "453px", customLeftDatePadding: "180px" }
  ];

  const handleWeekClick = () => {
    navigate("/weekly");
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row">
          {weeks.slice(0, 3).map((week) => (
            <ToDoList
              key={week.weekText}
              weekText={
                <span onClick={() => handleWeekClick(week.weekNumber)} className="cursor-pointer hover:underline">
                  {week.weekText}
                </span>
              }
              dateRange={week.dateRange}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
            />
          ))}
        </div>
        <div className="flex flex-row">
          {weeks.slice(3, 5).map((week) => (
            <ToDoList
              key={week.weekText}
              weekText={
                <span onClick={() => handleWeekClick(week.weekNumber)} className="cursor-pointer hover:underline">
                  {week.weekText}
                </span>
              }
              dateRange={week.dateRange}
              customHeight={week.customHeight}
              customWidth={week.customWidth}
              customLeftDatePadding={week.customLeftDatePadding}
              selectedColor={selectedColor}
              clearSelectedColor={clearSelectedColor}
            />
          ))}
        </div>
      </div>
      <ToDoList
        weekText="FUTURE MONTHS"
        customHeight="643px"
        customTitleWidth="205px"
        customFontSize="20px"
        selectedColor={selectedColor}
        clearSelectedColor={clearSelectedColor}
      />
    </div>
  );
};

MonthlyPage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
};

export default MonthlyPage;