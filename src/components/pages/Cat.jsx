import { useParams, useNavigate } from 'react-router-dom'
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
        <div>
            <h1>lil cat 🐈‍⬛</h1>
            <img className='rounded-3xl border-4 border-black' src={cat.img_Url} alt="a cute kitty" />
            
            <form onSubmit ={addFavorite}>
            
            <div>
                <label htmlFor='header'>Your cat's name:</label>
                <input 
                    type='text' 
                    id='header' 
                    value={cat.header}
                    placeholder="Mister Snuggles"
                    onChange={e => setCat({...cat, header: e.target.value})}
                    required
                ></input>
            </div>

            <div>
                <label htmlFor='content'>Description:</label>
                <input 
                    type='text' 
                    id='content' 
                    value={cat.content}
                    placeholder='Describe your cat...' 
                    onChange={e => setCat({...cat, content: e.target.value})}
                    required
                ></input>
            </div>
                <input hidden></input>
            <button type='submit'>Add to Profile</button>
            </form>
        </div>
    )
    const loginMessage = (
        <h1>🐾 Log in to get your paws on this cat's details! 🐾</h1>
    )
    return (
        <div className='flex items-center flex-col justify-center'>
            {currentUser ? catPic : loginMessage}            
        </div>
    )

}