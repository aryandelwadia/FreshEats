import axios from "axios"
import { useEffect } from "react"

export default function Profile(){
    
    let user = "as";

    useEffect(()=>{    
        userDetail();
    },[]);

    async function userDetail(){
        try{
            const response = await axios.get("http://localhost:3000/currentUser");
            user = response.data;
        }
        catch(err){
            console.log(err.message);
        }
    }

    return<>
        <div>
            name: {user}
        </div>
    </>
}