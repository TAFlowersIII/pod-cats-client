import { useEffect, useState } from "react";
import axios from "axios";

export default function Cats(){

    const [cats, setCats] = useState([])

    useEffect(() =>{
        const kitties = async () => {
            try{
                const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10
                `)
                console.log(response.data)
            }catch(err){
                console.log(err)
            }
        }
    },[])
    return(
        <div>

        </div>
    )
}