import axios from "axios"
import { useEffect } from "react"

export default function Profile(){
    
    let user;

    useEffect(()=>{    
        userDetail();
    },[]);

    async function userDetail(){
        try{
            const response = await axios.get("http://localhost:3000/currentUser");
            user = response;
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