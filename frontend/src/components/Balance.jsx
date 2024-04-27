import axios from "axios";
import { useState } from "react"

export const Balance = () => {
    const [balance, setBalance] = useState(0);
    useState(() => {
        axios.get("http://localhost:5000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => setBalance(res.data.balance))
    })
    return <div className="flex mx-auto">
        <div className="font-bold text-lg">
            Your balance:
        </div>
        <div className="font-semibold ml-4 text-lg">
            {balance} BDT.
        </div>
    </div>
}