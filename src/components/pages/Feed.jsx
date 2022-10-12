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
                console.log(response.data)
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
        // const catComment = cat.comments.map(comment =>{
        //     <p>{comment}</p>
        // })
        return(
        <div key={cat._id} className='flex items-center flex-col justify-center'>
            <h3>{cat.header}</h3>
            <Link to={`/cats/id/${cat.catId}`}>
                <img className='rounded-3xl border-4 border-black' src={cat.img_Url} />
            </Link>
            {/* <p>Posted by: {cat.user[0].name}</p> */}
            <p>Description: {cat.content}</p>
            <br></br>
            <br></br>
            {/* <p>{catComment}</p> */}
        </div>
        )
    })

    return (
        <div>
            {showCats}
            <img className='leftCat' src= 'https://i.imgur.com/fGAzAtW.png' />
            <img className='rightCat' src= 'https://i.imgur.com/Tpl6G6b.png' />
        </div>
    )
}