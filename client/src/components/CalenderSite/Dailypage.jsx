import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import ToDoList from './ToDoList';
import { useTaskContext } from './TaskContext';

const Dailypage = ({ selectedColor, clearSelectedColor, editMode, selectedDay }) => {
  const [hoveredHour, setHoveredHour] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());
  const scrollRef = useRef(null);

  const { activeWeek, tasksByWeek, assignTaskHour } = useTaskContext();

  const currentDate = selectedDay?.year != null
    ? new Date(selectedDay.year, selectedDay.month, selectedDay.day)
    : new Date();

  const currentDateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  // Tasks that have not yet been assigned to an hour
  const unassignedTasks = (tasksByWeek?.[activeWeek]?.[currentDateKey] || []).filter(task => task.hour == null);
  
  // Organize hour-assigned tasks into buckets
  const hourTasks = tasksByWeek?.[activeWeek]?.[currentDateKey]?.reduce((acc, task) => {
    if (task.hour !== undefined) {
      const hour = task.hour;
      if (!acc[hour]) acc[hour] = [];
      acc[hour].push(task);
    }
    return acc;
  }, {}) || {};

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 8 * 65; // scroll to 8AM
    }
  }, []);

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
      const { taskId } = data;
      assignTaskHour(activeWeek, currentDateKey, taskId, hour);
    } catch (err) {
      console.error("Error handling drop on hour:", err);
    }
  }, [assignTaskHour, activeWeek, currentDateKey]);

  const handleTaskMove = useCallback((taskId) => {
    console.log(taskId); // Can be expanded later for cleanup
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
                        taskId: task.id
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

      {/* ✅ TASK PANEL with unassigned tasks */}
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
        setRemovedTaskIds={setRemovedTaskIds}
        editMode={editMode}
        initialTasks={unassignedTasks} // Connect weekly → daily sync here
        
      />
    </div>
  );
};

Dailypage.propTypes = {
  selectedColor: PropTypes.string,
  clearSelectedColor: PropTypes.func,
  editMode: PropTypes.bool,
  selectedDay: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
};

export default Dailypage;