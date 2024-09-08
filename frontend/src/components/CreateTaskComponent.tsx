import React, { useState } from "react";
import { TaskService } from "../services/TaskService";

interface CreateTaskComponentProps {
  addTask: (task: any) => void;
}

const CreateTaskComponent: React.FC<CreateTaskComponentProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const taskService = new TaskService();

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setSuccess(false);
    event.preventDefault();
    console.log({ title, description });
    await taskService.createTask(title, description).then((res) => {
      console.log(res.data);
      addTask(res.data);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-white to-teal-50 py-10 px-10 mt-12 rounded-xl shadow-xl">
      <div className="flex flex-col md:flex-row">
        <form onSubmit={handleSubmit} className="md:w-1/2">
          <h1 className="font-bold text-3xl text-teal-700 mb-6 flex items-center">
            Start a New Task
          </h1>

          <div className="mb-6">
            <label
              htmlFor="task"
              className="block text-lg font-semibold text-gray-700 mb-2 flex items-center"
            >
              Task Title
            </label>
            <input
              id="task"
              name="task"
              type="text"
              required
              placeholder="What’s your task about?"
              value={title}
              onChange={handleTaskChange}
              className="block w-full rounded-lg border-2 border-gray-400 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="text-lg font-semibold text-gray-700 mb-2 flex items-center"
            >
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              placeholder="Give a detailed description of your task."
              value={description}
              onChange={handleDescriptionChange}
              className="block w-full rounded-lg border-2 border-gray-400 p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Task
          </button>
        </form>

        <div className="md:w-1/2 md:pl-12 mt-10 md:mt-0 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-medium text-teal-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
              Task Writing Tips
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-5">
              <li>
                Write concise, descriptive titles that summarize the task.
              </li>
              <li>
                Break tasks into smaller, actionable steps to make them
                manageable.
              </li>
              <li>Set clear deadlines to maintain focus and track progress.</li>
              <li>Prioritize tasks by importance, urgency, and impact.</li>
              <li>Regularly review and adjust tasks as priorities shift.</li>
              <li>
                Include specific details like expected outcomes or requirements.
              </li>
              <li>
                Assign tasks to team members when collaboration is needed.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {success ? (
        <div className="text-center py-4 lg:px-4">
          <div
            className="bg-green-100 border-t border-b border-teal-500 text-teal-700 px-4 py-3"
            role="alert"
          >
            <p className="text-sm">Task Added!</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateTaskComponent;