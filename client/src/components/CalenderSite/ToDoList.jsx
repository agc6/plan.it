import { useState } from "react";
const ToDoList = ({weekText, dateRange, customHeight, customTitleWidth, customFontSize, customWidth, customLeftDatePadding}) => {
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

    // Use Esc to delete task
    const handleKeyDown = (event, index) => {
      if (event.key === "Escape") {
        setTaskInputs(taskInputs.filter((_, i) => i !== index));
      }
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
            style={{width: titleWidthToUse}}
          >
                <h1 
                    className="font-semibold tracking-wide font-archivo"
                    style={{fontSize: fontSizeToUse}}
                >
                    {weekText}
                </h1>
            </div>
            <h1 
                className="font-assistant text-[22px] pl-3"
                style={{paddingLeft: leftDatePaddingToUse}}
            >
                {dateRange}
            </h1>
        </div>

        {/* Scrollable Task List with Custom Scrollbar */}
        <div
          className="mt-2 overflow-y-auto custom-scrollbar"
          style={{
            maxHeight: `calc(${heightToUse} - 75px)`,
            paddingRight: "20px",
          }}
        >
          {taskInputs.map((task, index) => (
            <input
              key={index}
              type="text"
              placeholder="Enter a task..."
              value={task}
              onChange={(e) => {
                const newInputs = [...taskInputs];
                newInputs[index] = e.target.value;
                setTaskInputs(newInputs);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          ))}
        </div>

        {/* Add Button - Appears on Hover */}
        <button
          onClick={() => setTaskInputs([...taskInputs, ""])}
          className="absolute bottom-3 right-3 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
        >
          +
        </button>

        {/* Custom Scrollbar Styling */}
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
        `}</style>
      </div>
    );
  };
  export default ToDoList;