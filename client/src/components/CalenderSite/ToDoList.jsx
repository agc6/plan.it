import { useState } from "react";
import PropTypes from "prop-types";

const ToDoList = ({
  weekText,
  dateRange,
  customHeight,
  customTitleWidth,
  customFontSize,
  customWidth,
  customLeftDatePadding,
  selectedColor = "",
  clearSelectedColor = () => {},
}) => {
  const heightToUse = customHeight || "358px";
  const widthToUse = customWidth || "293px";
  const titleWidthToUse = customTitleWidth || "125px";
  const fontSizeToUse = customFontSize || "24px";
  const leftDatePaddingToUse = customLeftDatePadding || "21px";

  const [taskInputs, setTaskInputs] = useState([]);

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      text: "",
      animate: true,
      color: selectedColor || "bg-blue-200", // fallback color
    };
    setTaskInputs([newTask, ...taskInputs]);
    clearSelectedColor(); // clear selected color after task is added
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Escape") {
      setTaskInputs(taskInputs.filter((task) => task.id !== id));
    }
  };

  const handleChange = (e, id) => {
    setTaskInputs((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: e.target.value } : task
      )
    );
  };

  const handleCircleClick = (id) => {
    setTaskInputs((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed, // Toggle completion
              color: selectedColor || task.color, // Keep existing color or apply selected color
            }
          : task
        )
      );
    if (selectedColor) {
      clearSelectedColor(); // Reset selected color after applying
    }
    
  };

  return (
    <div
      className="relative group m-3 mb-2 bg-white outline-[0.5px] outline-[#484848] rounded-t-[25px] rounded-b-[10px] shadow-sm shadow-gray-400 p-4"
      style={{ height: heightToUse, width: widthToUse }}
    >
      {/* Header */}
      <div className="flex flex-row items-center rounded-t-[25px] h-12">
        <div
          className="outline-[0.5px] outline-[#484848] rounded-tl-[25px] rounded-br-[25px] h-12 flex items-center justify-center px-3"
          style={{ width: titleWidthToUse }}
        >
          <h1
            className="font-semibold tracking-wide font-archivo"
            style={{ fontSize: fontSizeToUse }}
          >
            {weekText}
          </h1>
        </div>
        <h1
          className="font-assistant text-[22px] pl-3"
          style={{ paddingLeft: leftDatePaddingToUse }}
        >
          {dateRange}
        </h1>
      </div>

      {/* Task List */}
      <div
        className="mt-2 overflow-y-auto custom-scrollbar"
        style={{
          maxHeight: `calc(${heightToUse} - 75px)`,
          paddingRight: "20px",
        }}
      >
        {taskInputs.map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-3 mb-2 w-full ${task.color}`}
          >
            <button
              className="w-4 h-4 rounded-full border-2 border-black bg-white cursor-pointer"
              title="Apply selected color"
              onClick={() => handleCircleClick(task.id)}
            />
            <input
              type="text"
              placeholder="Enter a task..."
              value={task.text}
              onChange={(e) => handleChange(e, task.id)}
              onKeyDown={(e) => handleKeyDown(e, task.id)}
              className={`p-2 border border-gray-300 rounded w-full transition-all duration-300 ease-in-out transform 
              ${task.animate ? "animate-slide-down" : ""} 
              ${task.completed ? "line-through text-gray-500 opacity-60" : ""}`} // Strikethrough when completed
              readOnly={task.completed} // Prevent editing when completed
              onAnimationEnd={() => {
              setTaskInputs((prev) =>
              prev.map((t) =>
                    (t.id === task.id ? { ...t, animate: false } : t)
                  )
                );
              }}
            />
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={addNewTask}
        className="absolute bottom-3 right-3 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
        title="Add Task"
      >
        +
      </button>

      {/* Custom Scrollbar & Animation */}
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.5);
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

ToDoList.propTypes = {
  weekText: PropTypes.string,
  dateRange: PropTypes.string,
  customHeight: PropTypes.string,
  customTitleWidth: PropTypes.string,
  customFontSize: PropTypes.string,
  customWidth: PropTypes.string,
  customLeftDatePadding: PropTypes.string,
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
};

export default ToDoList;
