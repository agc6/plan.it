import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create context
const TaskContext = createContext();

// Hook to use context
export const useTaskContext = () => useContext(TaskContext);

// Provider component
export const TaskProvider = ({ children }) => {
  const [activeWeek, setActiveWeek] = useState(null); // e.g., "2025-04-01_to_2025-04-07"
  const [selectedDay, setSelectedDay] = useState(null); // e.g., { year: 2025, month: 3, day: 29 }
  const [tasksByWeek, setTasksByWeek] = useState({});

  // Add task to specific day in a week
  const addTaskToWeek = (weekKey, day, task) => {
    setTasksByWeek(prev => {
      const weekTasks = prev[weekKey] || {};
      const dayTasks = weekTasks[day] || [];
      return {
        ...prev,
        [weekKey]: {
          ...weekTasks,
          [day]: [...dayTasks, task],
        },
      };
    });
  };

  // Move task from one day to another in the same week
  const moveTaskToDay = (weekKey, fromDay, toDay, taskId) => {
    setTasksByWeek(prev => {
      const task = prev[weekKey]?.[fromDay]?.find(t => t.id === taskId);
      if (!task) return prev;

      return {
        ...prev,
        [weekKey]: {
          ...prev[weekKey],
          [fromDay]: prev[weekKey][fromDay].filter(t => t.id !== taskId),
          [toDay]: [...(prev[weekKey][toDay] || []), task],
        },
      };
    });
  };

  // Assign task to a specific hour in a day
  const assignTaskHour = (weekKey, day, taskId, hour) => {
    setTasksByWeek(prev => {
      const updatedDayTasks = (prev[weekKey]?.[day] || []).map(task =>
        task.id === taskId ? { ...task, hour } : task
      );
      return {
        ...prev,
        [weekKey]: {
          ...prev[weekKey],
          [day]: updatedDayTasks,
        },
      };
    });
  };

  return (
    <TaskContext.Provider
      value={{
        activeWeek,
        setActiveWeek,
        selectedDay,
        setSelectedDay,
        tasksByWeek,
        addTaskToWeek,
        moveTaskToDay,
        assignTaskHour,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// ✅ ESLint-friendly prop types
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};