import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import ToDoList from './ToDoList';

const Dailypage = ({ selectedColor, clearSelectedColor, selectedWeek, editMode }) => {
  const [hoveredHour, setHoveredHour] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [hourTasks, setHourTasks] = useState({});
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 8 * 65; // More accurate, 8am SLOT
    }
  }, []);
  

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const currentDayNumber = selectedWeek
    ? (selectedWeek - 1) * 7 + today.getDate() % 7 || 1
    : today.getDate();

  const currentDate = new Date(year, month, currentDayNumber);
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const handleDragOver = (e, hour) => {
    e.preventDefault();
    setHoveredHour(hour);
  };

  const handleDrop = useCallback((e, hour) => {
    e.preventDefault();
    setHoveredHour(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { taskId, sourceListId, taskData } = data;

      // Add the task to the target hour
      setHourTasks(prev => ({
        ...prev,
        [hour]: [...(prev[hour] || []), {
          ...taskData,
          id: Date.now(),
          hourAssigned: hour,
        }]
      }));

      // If the source is another hour slot, remove it from there
      if (sourceListId.startsWith('hour-')) {
        const sourceHour = parseInt(sourceListId.split('-')[1]);
        
        setHourTasks(prev => {
          if (!prev[sourceHour]) return prev;
          
          return {
            ...prev,
            [sourceHour]: prev[sourceHour].filter(task => task.id !== parseInt(taskId))
          };
        });
      } else {
        // For tasks coming from ToDoList components (not hour slots)
        setRemovedTaskIds(prev => new Set([...prev, `${sourceListId}-${taskId}`]));
      }
    } catch (err) {
      console.error("Error handling drop on hour:", err);
    }
  }, []);

  const handleTaskMove = useCallback((taskId, sourceListId) => {
    if (sourceListId.startsWith('hour-')) {
      const hourNum = parseInt(sourceListId.split('-')[1]);

      setHourTasks(prev => {
        if (!prev[hourNum]) return prev;

        return {
          ...prev,
          [hourNum]: prev[hourNum].filter(task => task.id !== taskId)
        };
      });
    }
  }, []);

  return (
    <div className="flex px-6 py-4">
      <div ref={scrollRef} className="w-[80%] max-h-[800px] overflow-y-scroll border rounded-md bg-white shadow-sm mr-6">
        <div className="sticky top-0 z-10 bg-white p-4 border-b text-lg font-bold">
          {formattedDate}
        </div>
        {hours.map((hour) => (
          <div
            key={hour}
            className={`border-b border-dotted border-gray-300 px-6 py-4 relative 
              ${hoveredHour === hour ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            onMouseEnter={() => setHoveredHour(hour)}
            onMouseLeave={() => setHoveredHour(null)}
            onDragOver={(e) => handleDragOver(e, hour)}
            onDrop={(e) => handleDrop(e, hour)}
          >
            <div className={`text-base font-medium mb-2 ${hour === currentHour ? 'text-blue-600 font-bold' : 'text-gray-700'}`}>
              {formatHour(hour)}
            </div>

            {hourTasks[hour] && hourTasks[hour].length > 0 && (
              <div className="space-y-2 mb-2">
                {hourTasks[hour].map(task => (
                  <div
                    key={task.id}
                    className={`flex items-center p-2 rounded ${task.color || 'bg-blue-100'}`}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("application/json", JSON.stringify({
                        taskId: task.id,
                        sourceListId: `hour-${hour}`,
                        taskData: task
                      }));
                    }}
                  >
                    <div className="w-3 h-3 rounded-full border border-gray-400 mr-2"></div>
                    <div className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.text || 'Untitled Task'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hoveredHour === hour && (
              <div className="text-xs italic text-gray-500 border border-dashed border-gray-300 p-2 rounded">
                Drop tasks here
              </div>
            )}
          </div>
        ))}
      </div>
      <ToDoList
        weekText="TASKS"
        customHeight="785px"
        customTitleWidth="205px"
        customFontSize="20px"
        selectedColor={selectedColor}
        clearSelectedColor={clearSelectedColor}
        listId="daily-tasks"
        onDragTaskComplete={handleTaskMove}
        removedTaskIds={removedTaskIds}
        editMode={editMode}
      />
    </div>
  );
};

Dailypage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  selectedWeek: PropTypes.number,
};

export default Dailypage;