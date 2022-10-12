import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


export default function Cat({currentUser, setCurrentUser }) {
    const [cat, setCat] = useState({
        header: '',
        content: '',
        img_Url: '',
        catId: '',
        userId: '',
        _id: 'something'
    })
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getCat = async () => {
            try {
                const response = await axios.get(`https://api.thecatapi.com/v1/images/${id}`)
                const decodedoken = jwt_decode(localStorage.getItem('jwt'))

                setCat({...cat,
                    header: '',
                    content: '',
                    img_Url: response.data.url,
                    catId: response.data.id,
                    userId: decodedoken.id,
                })
        
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }                
            }
        }
        getCat()
    }, [])

    console.log(cat)

    const addFavorite = async e => {
        try {
            e.preventDefault()
            //get userId
            const decodedoken = jwt_decode(localStorage.getItem('jwt'))
            // make a copy of the cats array
            let emptyArray = [...currentUser.cats]
            // post to the backend as req.body
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/cats/new`, cat).then(catId=>{
                    // add cat to cats array
                    const something = {
                    header: cat.header,
                    content: cat.content,
                    img_Url: cat.img_Url,
                    catId: cat.catId,
                    userId: cat.userId,
                    _id: catId.data.catId}
                    setCat(something)
                    emptyArray.push(something)
            })
            
            
            // getting current user
            const cats = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${decodedoken.id}`)

            const thisUser = {...currentUser}
            thisUser.cats = emptyArray
            setCurrentUser(thisUser)
            navigate('/feed')
        } catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)               
            }
        }
    }

    const catPic = (
        <div className='flex flex-col justify-center'>
            <h1 className='text-3xl font-bold mt-20'>lil cat 🐈‍⬛</h1>
            
            <img className='rounded-3xl border-4 border-black my-10' src={cat.img_Url} alt="a cute kitty" />

            <form 
                onSubmit ={addFavorite}
                className="w-full max-w-sm flex flex-col justify-center items-center"
            >
                <div className='flex items-center py-2'>
                    <div className='border-b border-teal-500 m-2'>
                        <label htmlFor='header'>I dub thee:</label>
                        <input 
                            className='bg-transparent border-none w-full text-black-700 mr-3 py-1 px-2'
                            type='text' 
                            id='header' 
                            value={cat.header}
                            placeholder="Mister Snuggles"
                            onChange={e => setCat({...cat, header: e.target.value})}
                            required
                        ></input>
                    </div>

                    <div className='border-b border-teal-500 '>
                        <label htmlFor='content'>Description:</label>
                        <input 
                            className=' bg-transparent border-none w-full text-black-700 mr-3 py-1 px-2'
                            type='text' 
                            id='content' 
                            value={cat.content}
                            placeholder='...ZoomBoi...' 
                            onChange={e => setCat({...cat, content: e.target.value})}
                            required
                        ></input>
                    </div>
                        <input hidden></input>
                    <button
                        className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded' 
                        type='submit'>Add to Profile</button>
                </div>
            </form>
        </div> 
    )
    const loginMessage = (
        <div>
            <h1 className='text-3xl font-bold'>🐾 Log in to get your paws on this cat's details! 🐾</h1>
            <Link to='/login' >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Log in
                </button>
            </Link>
        </div>
    )
    return (
        <div className='flex items-center flex-col justify-center'>
            {currentUser ? catPic : loginMessage}
            <img className='leftCat' src= 'https://i.imgur.com/fGAzAtW.png' />
            <img className='rightCat' src= 'https://i.imgur.com/Tpl6G6b.png' />
            <img className='rightLongCat' src='https://i.imgur.com/nvUPSwj.png' />
            <img className='leftLongCat' src='https://i.imgur.com/PWQqz04.png' />            
        </div>
    )

}