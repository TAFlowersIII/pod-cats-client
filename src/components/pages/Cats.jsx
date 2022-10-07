import { useEffect, useState } from "react";
import axios from "axios";

export default function Cats(){

    const [cats, setCats] = useState([])

    useEffect(() =>{
        const getCats = async () => {
            try{
                const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10`)
                console.log(response.data)
                setCats(response.data)
            }catch(err){
                console.log(err)
            }
        }
        getCats()
    },[])

    const showCats = cats.forEach(cat => {
        return(
            <div id={cat.id}>
                <img src={cat.url} alt="a very cute cat"/>
            </div>
        )
    })
    return(
        <div>
            {showCats}
        </div>
    )
}