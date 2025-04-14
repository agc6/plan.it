import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  // Main task storage - using an object with list IDs as keys
  const [allTasks, setAllTasks] = useState({});

  // Add a task to a specific list
  const addTaskToList = (listId, task) => {
    setAllTasks(prev => ({
      ...prev,
      [listId]: [...(prev[listId] || []), task]
    }));
  };

  // Move task between lists
  const moveTask = (taskId, sourceListId, targetListId, taskData) => {
    const sourceTasks = [...(allTasks[sourceListId] || [])];
    const taskIndex = sourceTasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      const [task] = sourceTasks.splice(taskIndex, 1);

      const targetTasks = [...(allTasks[targetListId] || [])];
      targetTasks.unshift({
        ...task,
        ...taskData,
        id: Date.now() // New ID for uniqueness
      });

      setAllTasks(prev => ({
        ...prev,
        [sourceListId]: sourceTasks,
        [targetListId]: targetTasks
      }));
    }
  };

  // Delete task from a list
  const deleteTaskFromList = (listId, taskId) => {
    setAllTasks(prev => {
      const filtered = (prev[listId] || []).filter(task => task.id !== taskId);
      return {
        ...prev,
        [listId]: filtered
      };
    });
  };

  // Get tasks for a list
  const getTasksForList = (listId) => {
    return allTasks[listId] || [];
  };

  // Check if a list is part of the current week
  const isCurrentWeekTask = (listId) => {
    return listId.startsWith('week-') && isCurrentWeek(listId.split('-')[1]);
  };

  // Helper to check if a week number is current week
  const isCurrentWeek = (weekNumber) => {
    const today = new Date();
    const currentWeek = Math.ceil(today.getDate() / 7);
    return parseInt(weekNumber) === currentWeek;
  };

  return (
    <TaskContext.Provider value={{
      allTasks,
      setAllTasks,
      addTaskToList,
      moveTask,
      deleteTaskFromList,
      getTasksForList,
      isCurrentWeekTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to access context
export function useTasks() {
  return useContext(TaskContext);
}