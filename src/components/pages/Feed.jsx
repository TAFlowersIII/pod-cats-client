import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

export default function Feed() {

    const [msg, setMsg] = useState('')
	const [cats, setCats] = useState([])

    useEffect(() => {
        const getCats = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/cats`)
                setCats(response.data)
            }catch(err){
                console.warn(err)
                if(err.response){
                    if(err.response){
                        setMsg(err.response.data.message)
                    }
                }
            }
        }
        getCats()
    },[])
    const reversedCats = cats.reverse()
    const showCats = reversedCats.map(cat => {
        const catComment = cat.comments.map(comment =>{
            <p>{comment}</p>
        })
        return(
        <div key={cat._id}>
            <Link to={`/cats/id/${cat.catId}`}>
                <img src={cat.img_Url} />
            </Link>
            <p>{catComment}</p>
        </div>
        )
    })

    return (
        <div>
            {showCats}
        </div>
    )
}