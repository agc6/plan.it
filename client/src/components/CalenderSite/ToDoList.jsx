import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTasks } from "./TaskContext";

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
  listId,
  isWeeklyTasks = false,
  editMode = false,
}) => {
  const { allTasks, setAllTasks, addTaskToList, moveTask, isCurrentWeekTask } = useTasks();
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const listRef = useRef(null);

  // Get tasks for this list
  const taskInputs = allTasks[listId] || [];

  const heightToUse = customHeight || "358px";
  const widthToUse = customWidth || "293px";
  const titleWidthToUse = customTitleWidth || "125px";
  const fontSizeToUse = customFontSize || "24px";
  const leftDatePaddingToUse = customLeftDatePadding || "21px";

  const addNewTask = () => {
    const newTask = {
      id: Date.now(),
      text: "",
      animate: true,
      color: selectedColor || "bg-blue-200", // fallback color
      createdAt: new Date().toISOString(),
    };
    
    // Add to current list
    setAllTasks(prev => ({
      ...prev,
      [listId]: [...(prev[listId] || []), newTask]
    }));
    
    // If this is a current week task, also add it to weekly tasks
    if (isCurrentWeekTask(listId) && listId !== 'weekly-tasks') {
      const weeklyTask = {...newTask, id: Date.now() + 1};
      setAllTasks(prev => ({
        ...prev,
        'weekly-tasks': [...(prev['weekly-tasks'] || []), weeklyTask]
      }));
    }
    
    clearSelectedColor(); // clear selected color after task is added
  };

  const handleKeyDown = (event, id) => {
    if (event.key === "Escape") {
      // Remove this task
      setAllTasks(prev => {
        const updatedList = (prev[listId] || []).filter(task => task.id !== id);
        return {
          ...prev,
          [listId]: updatedList
        };
      });
    }
  };

  const handleChange = (e, id) => {
    const newText = e.target.value;
    
    // Update task in this list
    setAllTasks(prev => {
      const updatedList = (prev[listId] || []).map(task => 
        task.id === id ? { ...task, text: newText } : task
      );
      
      // Find if this task has a corresponding task in weekly tasks
      let weeklyTaskId = null;
      
      if (isCurrentWeekTask(listId) && listId !== 'weekly-tasks') {
        // If we're in a current week list, find the corresponding weekly task
        const currentListTask = updatedList.find(task => task.id === id);
        const weeklyTasks = prev['weekly-tasks'] || [];
        
        // Try to find a matching task (matching creation time or similar properties)
        const matchingWeeklyTask = weeklyTasks.find(task => 
          task.createdAt === currentListTask?.createdAt ||
          (task.text === currentListTask?.text && task.color === currentListTask?.color)
        );
        
        if (matchingWeeklyTask) {
          weeklyTaskId = matchingWeeklyTask.id;
        }
      } else if (listId === 'weekly-tasks') {
        // If we're in the weekly tasks, update all corresponding tasks in week lists
        Object.keys(prev).forEach(key => {
          if (isCurrentWeekTask(key) && key !== 'weekly-tasks') {
            const weekTask = prev[key].find(task => 
              task.text === (prev[listId].find(t => t.id === id)?.text) &&
              task.color === (prev[listId].find(t => t.id === id)?.color)
            );
            
            if (weekTask) {
              const updatedWeekTasks = prev[key].map(task => 
                task.id === weekTask.id ? { ...task, text: newText } : task
              );
              prev = {
                ...prev,
                [key]: updatedWeekTasks
              };
            }
          }
        });
      }
      
      // If there's a corresponding weekly task, update that too
      if (weeklyTaskId) {
        const updatedWeeklyTasks = (prev['weekly-tasks'] || []).map(task => 
          task.id === weeklyTaskId ? { ...task, text: newText } : task
        );
        
        return {
          ...prev,
          [listId]: updatedList,
          'weekly-tasks': updatedWeeklyTasks
        };
      }
      
      return {
        ...prev,
        [listId]: updatedList
      };
    });
  };

  const handleCircleClick = (id) => {
    // Toggle completion status and update color
    setAllTasks(prev => {
      const task = (prev[listId] || []).find(t => t.id === id);
      if (!task) return prev;
      
      const updatedTask = {
        ...task,
        completed: !task.completed,
        color: selectedColor || task.color
      };
      
      const updatedList = (prev[listId] || []).map(t => 
        t.id === id ? updatedTask : t
      );
      
      return {
        ...prev,
        [listId]: updatedList
      };
    });
    
    if (selectedColor) {
      clearSelectedColor(); // Reset selected color after applying
    }
  };

  // Drag handlers
  const handleDragStart = (e, taskId, taskData) => {
    e.dataTransfer.setData("application/json", JSON.stringify({
      taskId,
      sourceListId: listId,
      taskData
    }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { taskId, sourceListId, taskData } = data;
      
      if (sourceListId === listId) {
        // Task dropped in the same list
        return;
      }
      
      // Remove from source list
      setAllTasks(prev => {
        const sourceList = (prev[sourceListId] || []).filter(t => t.id !== taskId);
        
        // Add to target list with new ID to avoid conflicts
        const newTaskId = Date.now();
        const updatedTask = {
          ...taskData,
          id: newTaskId,
          animate: true
        };
        
        const targetList = [...(prev[listId] || []), updatedTask];
        
        // Determine if we need to sync with weekly tasks
        if (isCurrentWeekTask(listId) && listId !== 'weekly-tasks') {
          // Also add to weekly tasks
          const weeklyTask = {...updatedTask, id: newTaskId + 1};
          return {
            ...prev,
            [sourceListId]: sourceList,
            [listId]: targetList,
            'weekly-tasks': [...(prev['weekly-tasks'] || []), weeklyTask]
          };
        } else if (listId === 'weekly-tasks' && isCurrentWeekTask(sourceListId)) {
          // Already moved from a week list to weekly tasks, no extra action needed
        }
        
        return {
          ...prev,
          [sourceListId]: sourceList,
          [listId]: targetList
        };
      });
    } catch (err) {
      console.error("Error handling drop:", err);
    }
  };

  const handleDeleteTask = (id) => {
    setAllTasks(prev => {
      const updatedList = (prev[listId] || []).filter(t => t.id !== id);
      
      return {
        ...prev,
        [listId]: updatedList
      };
    });
  };

  return (
    <div
      ref={listRef}
      className={`relative group m-3 mb-2 bg-white outline-[0.5px] outline-[#484848] rounded-t-[25px] rounded-b-[10px] shadow-sm shadow-gray-400 
        ${isDraggingOver ? "bg-blue-50" : ""}`}
      style={{ height: heightToUse, width: widthToUse }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
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
            draggable
            onDragStart={(e) => handleDragStart(e, task.id, task)}
          >
            <button
              className="w-4 h-4 rounded-full border-2 border-black bg-white cursor-pointer"
              title="Apply selected color"
              onClick={() => handleCircleClick(task.id)}
            />
            <input
              type="text"
              placeholder="Enter a task..."
              value={task.text || ""}
              onChange={(e) => handleChange(e, task.id)}
              onKeyDown={(e) => handleKeyDown(e, task.id)}
              className={`p-2 border border-gray-300 rounded w-full transition-all duration-300 ease-in-out transform 
              ${task.animate ? "animate-slide-down" : ""} 
              ${task.completed ? "line-through text-gray-500 opacity-60" : ""} 
              cursor-grab`} // Add grab cursor for draggable items
              readOnly={task.completed} // Prevent editing when completed
              onAnimationEnd={() => {
                if (task.animate) {
                  setAllTasks(prev => {
                    const updatedList = (prev[listId] || []).map(t => 
                      t.id === task.id ? { ...t, animate: false } : t
                    );
                    return {
                      ...prev,
                      [listId]: updatedList
                    };
                  });
                }
              }}
            />
            {/*Show delete button only in edit mode */}
              {editMode && (
                <button
                  className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center ml-auto"
                  title="Delete Task"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  ⛔
                </button>
              )}
            
          </div>
        ))}
      </div>

      {/* Drag indicator when hovering */}
      {isDraggingOver && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-t-[25px] rounded-b-[10px] pointer-events-none"></div>
      )}

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
  weekText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dateRange: PropTypes.string,
  customHeight: PropTypes.string,
  customTitleWidth: PropTypes.string,
  customFontSize: PropTypes.string,
  customWidth: PropTypes.string,
  customLeftDatePadding: PropTypes.string,
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  listId: PropTypes.string,
  isWeeklyTasks: PropTypes.bool,
  editMode: PropTypes.bool,
};


export default ToDoList;
