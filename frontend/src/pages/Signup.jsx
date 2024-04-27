import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import './Signup.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const setCredential = (e, setFn) => {
        setFn(e.target.value);
    };

    const onSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/signup", {
                firstName,
                lastName,
                username,
                password
            });
            localStorage.setItem("token", res.data.token);
            alert(res.data.message)
            navigate("/dashboard")
        } catch (error) {
            alert(error.response.data.message)
        }
    }


    return <div className="h-screen flex justify-center  bgPic">
        <div className="flex flex-col justify-center main">
            <div className="rounded-lg bg-slate-100 w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <InputBox onChange={e => setCredential(e, setFirstName)} placeholder="John" label={"First Name"} type={"text"} />
                <InputBox onChange={e => setCredential(e, setLastName)} placeholder="Doe" label={"Last Name"} type={"text"} />
                <InputBox onChange={e => setCredential(e, setUsername)} placeholder="example@gmail.com" label={"Email"} type={"email"} />
                <InputBox onChange={e => setCredential(e, setPassword)} placeholder="**********" label={"Password"} type={"password"} />
                <div className="pt-4">
                    <Button onClick={onSubmit} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}