import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const SignIn = () => {
    return <div className="bg-slate-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-slate-100 w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your infromation to log in"} />
                <InputBox placeholder="example@gmail.com" label={"Email"} />
                <InputBox placeholder="*******" label={"Password"} />
                <div className="pt-4">
                    <Button label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signin"} />
            </div>
        </div>
    </div>
}
