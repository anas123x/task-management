import React, { useState, useEffect } from "react";
import CreateTaskComponent from "../components/CreateTaskComponent";
import ViewTasksComponent from "../components/ViewTasksComponent";
import { TaskService } from "../services/TaskService";

interface DashboardProps {
  // Define the props for your component here
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const taskService = new TaskService();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
    getTasks();
  }, []);
const deleteTask = async (id: number) => {
     await taskService.deleteTask(id).then((res) => {
       console.log(res.data);
       getTasks();
     }).catch((err) => {
       console.log(err);
     })
    console.log("idd",id);
    setTasks(tasks.filter((task) => task.id !== id))
    }
  const getTasks = async () => {
    await taskService.getTasksByUser(16).then((res) => {
      setTasks(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const addTask = (task: any) => {
    console.log("abcd48654",task);
    setTasks((prevTasks) => [ task,...prevTasks]);
  };

 
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background: `
          linear-gradient(-45deg, #0000 1.3%, #E4E4ED 0 32%, #0000 0),
          linear-gradient(45deg, #0000 48%, #0D9488 0 52%, #0000 0),
          linear-gradient(45deg, #0000 1.3%, #E4E4ED 0 32%, #0000 0) calc(32px / 2) calc(32px / 2),
          linear-gradient(-45deg, #0000 48%, #0D9488 0 52%, #0000 0) #E4E4ED
        `,
        backgroundSize: 'calc(2 * 32px) 32px, 32px 32px',
      }}
    >
      
      <div className="w-full">
        <CreateTaskComponent addTask={addTask} />
        <ViewTasksComponent tasks={tasks} deleteTask={deleteTask}  />
      </div>
    </div>
  );
};

export default Dashboard;