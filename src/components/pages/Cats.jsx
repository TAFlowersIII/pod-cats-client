import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cats() {

    const [cats, setCats] = useState([])

    useEffect(() =>{
        const getCats = async () => {
            try{
                const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10`)
                // console.log(response.data)
                setCats(response.data)
            }catch(err){
                console.log(err)
            }
        }
        getCats()
    },[])

    const showCats = cats.map(cat => {
        return(
            <div key={cat.id} className='flex items-center flex-col justify-center'>
                <Link to={`/cats/id/${cat.id}`}>
                <img  width="500px" src={cat.url} alt="a very cute cat"/>
                </Link>
            </div>
        )
    })
    return(
        <div>
            <h1>cats</h1>
            {showCats}
        </div>
    )
}