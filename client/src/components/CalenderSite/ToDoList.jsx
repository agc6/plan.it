import { useState } from "react";

const ToDoList = ({
  weekText,
  dateRange,
  customHeight,
  customTitleWidth,
  customFontSize,
  customWidth,
  customLeftDatePadding
}) => {
  const defaultHeight = "358px";
  const heightToUse = customHeight || defaultHeight;

  const defaultWidth = "293px";
  const widthToUse = customWidth || defaultWidth;

  const defaultTitleWidth = "125px";
  const titleWidthToUse = customTitleWidth || defaultTitleWidth;

  const defaultFontSize = "24px";
  const fontSizeToUse = customFontSize || defaultFontSize;

  const defaultLeftDatePadding = "21px";
  const leftDatePaddingToUse = customLeftDatePadding || defaultLeftDatePadding;

  const [taskInputs, setTaskInputs] = useState([]);

  // Add new task with unique ID and animation flag
  const addNewTask = () => {
    const newTask = {
      id: Date.now(), // or use UUID for guaranteed uniqueness
      text: "",
      animate: true
    };
    setTaskInputs([newTask, ...taskInputs]);
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

  return (
    <div
      className="relative group m-3.25 mb-2 bg-white outline-[0.5px] outline-[#484848] rounded-t-[25px] rounded-b-[10px] shadow-sm shadow-gray-400 p-4"
      style={{ height: heightToUse, width: widthToUse }}
    >
      {/* Header Section */}
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

      {/* Scrollable Task List */}
      <div
        className="mt-2 overflow-y-auto custom-scrollbar"
        style={{
          maxHeight: `calc(${heightToUse} - 75px)`,
          paddingRight: "20px"
        }}
      >
        {taskInputs.map((task) => (
          <input
            key={task.id}
            type="text"
            placeholder="Enter a task..."
            value={task.text}
            onChange={(e) => handleChange(e, task.id)}
            onKeyDown={(e) => handleKeyDown(e, task.id)}
            className={`w-full p-2 border border-gray-300 rounded mt-2 transition-all duration-300 ease-in-out transform ${
              task.animate ? "animate-slide-down" : ""
            }`}
            onAnimationEnd={() => {
              // Remove animation flag after it runs
              setTaskInputs((prev) =>
                prev.map((t) =>
                  t.id === task.id ? { ...t, animate: false } : t
                )
              );
            }}
          />
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={addNewTask}
        className="absolute bottom-3 right-3 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
      >
        +
      </button>

      {/* Scrollbar + Slide Down Animation */}
      <style jsx>{`
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

export default ToDoList;
