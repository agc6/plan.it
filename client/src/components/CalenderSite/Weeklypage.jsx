import PropTypes from "prop-types";
import ToDoList from "./ToDoList";

const Weeklypage = ({ selectedColor, clearSelectedColor }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <ToDoList
          weekText="DAY 1"
          dateRange="Day 1"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
        />
        <ToDoList
          weekText="DAY 2"
          dateRange="Day 2"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
        />
        <ToDoList
          weekText="DAY 3"
          dateRange="Day 3"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
        />
      </div>
      <div className="flex flex-row">
        <ToDoList
          weekText="DAY 4"
          dateRange="Day 4"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
        />
        <ToDoList
          weekText="DAY 5"
          dateRange="Day 5"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
        />
        <ToDoList
          weekText="DAY 6"
          dateRange="Day 6"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
        />
        <ToDoList
          weekText="DAY 7"
          dateRange="Day 7"
          selectedColor={selectedColor}
          clearSelectedColor={clearSelectedColor}
        />
      </div>
    </div>
  );
};

Weeklypage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
};

export default Weeklypage;