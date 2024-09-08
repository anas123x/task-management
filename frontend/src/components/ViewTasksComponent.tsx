import React from "react";
import TaskCard from "./TaskCard";

interface ViewTasksComponentProps {
  tasks: any[];
    deleteTask: (id: number) => void;
}

const ViewTasksComponent: React.FC<ViewTasksComponentProps> = ({ tasks,deleteTask }) => {
    const handleDelete= (id:number)=>{
        console.log("id",id);
        deleteTask(id);
        tasks.filter((task) => task.id !== id);
      }
  return (
    <div className="w-full bg-gradient-to-r from-white  to-teal-50 py-10 px-10 mt-12 rounded-xl shadow-xl">
      <h1 className="font-bold text-3xl text-teal-700 mb-6 flex items-center">
        Your Tasks
      </h1>
      <div className="flex flex-wrap">
        {tasks.map((task: any) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            id={task.id}
            deleteTask={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewTasksComponent;