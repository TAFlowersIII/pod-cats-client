import React from 'react';
import { Link } from 'react-router-dom'

export default function Welcome() {
	return (
		<div className='flex flex-col justify-items-center content-center items-center mx-auto w-1/2'>

			<div>
				<h1 className='text-3xl font-medium font-serif mt-20'>Welcome To Pod Cats!</h1>
				<h3>Browse some cats, and save your favorites!</h3>
			<br></br>
				<img className='rounded-3xl border-4 border-black mx-auto' 
				src="https://coed.com/wp-content/uploads/2018/01/shutterstock_1031589889.jpg"
				id="welcome_photo"
				alt="a picture of a smiling kitten"
				></img>
			<br></br>
				<p>“Owners of dogs will have noticed that, if you provide them with food and water and shelter and affection, they will think you are God. Whereas owners of cats are compelled to realize that, if you provide them with food and water and affection, they draw the conclusion that they are God.” – Christopher Hitchens</p>

				<Link to={"./Login"}>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 rounded-full">Click To Log In</button>
				</Link>

			</div>
		</div>
	)
}