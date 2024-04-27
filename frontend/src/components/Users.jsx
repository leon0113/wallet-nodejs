/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/user/bulk?filter=${filter}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => setUsers(res.data.user));
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={e => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

