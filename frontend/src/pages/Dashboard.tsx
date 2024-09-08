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
    await taskService.getTasks().then((res) => {
      setTasks(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const addTask = (task: any) => {
    console.log("abcd48654",task);
    setTasks((prevTasks) => [ task,...prevTasks]);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
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
      <a
        onClick={logout}
        className="hover:cursor-pointer font-bold hover:bg-opacity-100 bg-slate-200 p-2 bg-opacity-0 flex fixed top-0 right-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
        logout
      </a>
      <div className="w-full">
        <CreateTaskComponent addTask={addTask} />
        <ViewTasksComponent tasks={tasks} deleteTask={deleteTask}  />
      </div>
    </div>
  );
};

export default Dashboard;