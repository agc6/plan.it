import { createContext, useState, useEffect, useContext } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  // Main task storage - using an object with list IDs as keys
  const [allTasks, setAllTasks] = useState({});
  
  // Helper function to add a task to a specific list
  const addTaskToList = (listId, task) => {
    setAllTasks(prev => ({
      ...prev,
      [listId]: [...(prev[listId] || []), task]
    }));
  };
  
  // Helper function to move tasks between lists
  const moveTask = (taskId, sourceListId, targetListId, taskData) => {
    // Remove from source
    const sourceTasks = [...(allTasks[sourceListId] || [])];
    const taskIndex = sourceTasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      const [task] = sourceTasks.splice(taskIndex, 1);
      
      // Add to target with new ID
      const targetTasks = [...(allTasks[targetListId] || [])];
      targetTasks.unshift({
        ...task,
        ...taskData,
        id: Date.now() // New ID to avoid conflicts
      });
      
      setAllTasks(prev => ({
        ...prev,
        [sourceListId]: sourceTasks,
        [targetListId]: targetTasks
      }));
    }
  };
  
  // Check if a task is part of the current week
  const isCurrentWeekTask = (listId) => {
    return listId.startsWith('week-') && isCurrentWeek(listId.split('-')[1]);
  };
  
  // Helper to check if a week number is the current week
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
      isCurrentWeekTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook for accessing the task context
export function useTasks() {
  return useContext(TaskContext);
}