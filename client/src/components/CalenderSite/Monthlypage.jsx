import PropTypes from "prop-types";
import ToDoList from "./ToDoList";

const MonthlyPage = ({ selectedColor, clearSelectedColor }) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <ToDoList
            weekText="WEEK 1"
            dateRange="12/30 ─ 01/05"
            selectedColor={selectedColor}
            clearSelectedColor={clearSelectedColor}
          />
          <ToDoList
            weekText="WEEK 2"
            dateRange="01/06 ─ 01/12"
            selectedColor={selectedColor}
            clearSelectedColor={clearSelectedColor}
          />
          <ToDoList
            weekText="WEEK 3"
            dateRange="01/13 ─ 01/19"
            selectedColor={selectedColor}
            clearSelectedColor={clearSelectedColor}
          />
        </div>
        <div className="flex flex-row">
          <ToDoList
            weekText="WEEK 4"
            dateRange="01/20 ─ 01/26"
            customHeight="263px"
            customWidth="453px"
            customLeftDatePadding="180px"
            selectedColor={selectedColor}
            clearSelectedColor={clearSelectedColor}
          />
          <ToDoList
            weekText="WEEK 5"
            dateRange="01/27 ─ 01/31"
            customHeight="263px"
            customWidth="453px"
            customLeftDatePadding="180px"
            selectedColor={selectedColor}
            clearSelectedColor={clearSelectedColor}
          />
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
