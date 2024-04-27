import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-2 px-36">
            <Appbar />
            <Balance />
            <Users />
        </div>
    )
}
