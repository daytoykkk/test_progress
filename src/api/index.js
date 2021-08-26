import { post, put } from "./http";

let data = {
    "username":"collegeAdmin",
    "password":"a1598753A"
}

export const postLogin = () => post("auth/adminLogin", data);
export const postProgress = (token) => put("collegeAdmin/completeTask", 5, token)