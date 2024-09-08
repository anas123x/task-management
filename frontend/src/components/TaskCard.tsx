import React, { useState } from "react";
import { TaskService } from "../services/TaskService";
import TaskEditModal from "./TaskEditModal";

interface TaskCardProps {
  title: string;
  description: string;
  completed: boolean;
  id: number;
  deleteTask: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, completed, id ,deleteTask}) => {
  const [task, setTask] = useState({ title, description, completed});
  const [isModalOpen, setIsModalOpen] = useState(false);
    const taskService = new TaskService();
  const handleEdit = () => {
    setIsModalOpen(true);
  };
 
  const handleSave = async (updatedTask: { title: string; description: string; completed: boolean }) => {
    await taskService.updateTask(id, updatedTask).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
    setTask(updatedTask);
    setIsModalOpen(false);
  };

  const handleDelete= ()=>{
    deleteTask(id);
  }

  const handleComplete = async () => {
    await taskService.updateTask(id, { title: task.title, description, completed: !completed }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
    setTask({ ...task, completed: !task.completed });
  };

  return (
    <div
      className={`task-card max-w-xs m-1 relative p-4 border rounded-lg shadow-lg transition-transform duration-200 hover:scale-105
            ${task.completed ? "bg-green-100 border-green-400" : "bg-slate-100 border-slate-400"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <div className="flex items-center space-x-2">
          {task.completed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : null}
          <button
            onClick={handleEdit}
            className="p-1 rounded hover:bg-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600">{task.description}</p>

      <div className="mt-4 text-right">
        <button
          onClick={() => handleComplete()}
          className={`py-1 px-4 text-sm font-semibold rounded-lg 
                    ${task.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"} hover:bg-opacity-90`}
        >
          {task.completed ? "Completed" : "Mark as Done"}
        </button>
      </div>

      {isModalOpen && (
       <TaskEditModal
       task={task}
       id={id}
       isOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
       onSave={handleSave}
         deleteTask={handleDelete}
     />
      )}
    </div>
  );
};

export default TaskCard;