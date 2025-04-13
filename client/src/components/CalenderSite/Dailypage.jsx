import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import ToDoList from './ToDoList';
import { useTasks } from './TaskContext';

const Dailypage = ({ selectedColor, clearSelectedColor, editMode, selectedDay }) => {
  const [hoveredHour, setHoveredHour] = useState(null);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [removedTaskIds, setRemovedTaskIds] = useState(new Set());
  const scrollRef = useRef(null);

  const { allTasks, setAllTasks } = useTasks();

  const currentDate = selectedDay?.year != null
    ? new Date(selectedDay.year, selectedDay.month, selectedDay.day)
    : new Date();

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const getDayKey = () => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  };

  const dayKey = getDayKey();
  const flatKey = `daily-Tasks-${dayKey}`;

  // Promote flat array tasks to ToDoList only
  useEffect(() => {
    const raw = allTasks[dayKey];
    if (Array.isArray(raw) && (!allTasks[flatKey] || allTasks[flatKey].length === 0)) {
      setAllTasks(prev => ({
        ...prev,
        [flatKey]: raw
      }));
    }
  }, [allTasks, dayKey, flatKey, setAllTasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 8 * 65;
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
      const { taskId, sourceListId, taskData } = data;

      setAllTasks(prev => ({
        ...prev,
        [dayKey]: {
          ...(prev[dayKey] || {}),
          [hour]: [...(prev[dayKey]?.[hour] || []), {
            ...taskData,
            id: Date.now(),
            hourAssigned: hour,
          }]
        }
      }));

      if (sourceListId.startsWith('hour-')) {
        const sourceHour = parseInt(sourceListId.split('-')[1]);
        setAllTasks(prev => {
          const updatedHours = {
            ...(prev[dayKey] || {}),
            [sourceHour]: (prev[dayKey]?.[sourceHour] || []).filter(t => t.id !== parseInt(taskId)),
          };
          return {
            ...prev,
            [dayKey]: updatedHours
          };
        });
      } else {
        setRemovedTaskIds(prev => new Set([...prev, `${sourceListId}-${taskId}`]));
      }
    } catch (err) {
      console.error("Error handling drop on hour:", err);
    }
  }, [setAllTasks, dayKey]);

  const handleTaskMove = useCallback((taskId, sourceListId) => {
    const hour = parseInt(sourceListId.split('-')[1]);

    setAllTasks(prev => {
      const updatedHours = {
        ...(prev[dayKey] || {}),
        [hour]: (prev[dayKey]?.[hour] || []).filter(t => t.id !== taskId),
      };
      return {
        ...prev,
        [dayKey]: updatedHours
      };
    });
  }, [setAllTasks, dayKey]);

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
          </div>
        ))}
      </div>

      <ToDoList
        weekText="Tasks"
        customHeight="785px"
        customTitleWidth="205px"
        customFontSize="20px"
        selectedColor={selectedColor}
        clearSelectedColor={clearSelectedColor}
        listId={`daily-Tasks-${dayKey}`}
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
  editMode: PropTypes.bool,
  selectedDay: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
};

export default Dailypage;
