import axios from "axios";
import { API_URL } from "../config";
// authService.ts
export class TaskService {
  private url = API_URL;

    createTask(title: string,description: string) {
        return axios.post(`${this.url}/tasks`, {
        title,description,"completed":false
        },{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }});
    }

    getTasksByUser(id: number) {
       
        return axios.get(`${this.url}/tasks/user/${id}`,{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }});
    }

    deleteTask(id: number) {
        return axios.delete(`${this.url}/tasks/${id}`,{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }});
    }

    updateTask(id: number, task: any) {
        console.log(task,id);
        return axios.put(`${this.url}/tasks/${id}`, {
        task,
        },{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }});
    }

    getTask(id: string) {
        return axios.get(`${this.url}/tasks/${id}`,{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }});
    }
}
