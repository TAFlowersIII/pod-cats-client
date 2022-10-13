import React from 'react';

export default function About() {
     return (
          <div>
               <div>
                    <h1 className='text-3xl font-bold mb-2'>About the Pod Cats Team</h1>
                    <h3 className='text-lg'>In software engineering, group projects are considered especially challenging.</h3>
                    <h3 className='text-lg'>At General Assembly, the dedicated web developers who love their pet cats have created this website known as Pod Cats.</h3>
                    <h3 className='text-lg'>These are their stories...</h3>
               </div>


               {/* Thomas: */}
               <div className='flex flex-col mx-auto max-w-lg'>
                    <div className='border-2 border-black rounded p-2 my-2'>
                         <img className='devCats mx-auto rounded' alt='Thomas Cat' src='https://cdn2.thecatapi.com/images/16h.jpg'></img>
                         <br></br>
                         <h1 className='font-bold text-xl'>Thomas</h1>
                         <br></br>
                         <h4>Thomas is a grumpy old man on the outside, but a lil cutie patootie on the inside. He enjoys weird and obscure music, long bike rides through nature, deep talks about philosophy/the state of humanity, and immature humor- although he pretends to enjoy immature humor ironically. He is too hip and cool for his own damn good.</h4>
                    </div>
                    <div className='border-2 border-black rounded p-2 my-2'>
                         <img className='devCats mx-auto rounded' alt='Stephen Cat' src='https://i.imgur.com/m6lOLAB.jpg'></img>
                         <br></br>
                         <h1 className='font-bold text-xl'>Stephen</h1>
                         <br></br>
                         <h4>Stephen enjoys meditating in his sleep. He ponders on the mysteries of life and enjoys learning new things. One thing to know about Stephen is that he truly enjoys making people laugh and helping others to the best of his abilities. His goal is to make people love cats just as much as he does.</h4>
                    </div>
                    <div className='border-2 border-black rounded p-2 my-2'>
                         <img className='devCats mx-auto rounded' alt='Matt Cat' src='https://i.imgur.com/m6lOLAB.jpg'></img>
                         <br></br>
                         <h1 className='font-bold text-xl'>Matt</h1>
                         <br></br>
                         <h4>Matt is a golden retriever of a human, but loves his grey and ginger cats. He loves playing drums, listening to music, and eating pizza. If he could have any kind of cat, it would be an all black cat to be his witchy little friend at halloween.</h4>
                    </div>
                    <div className='border-2 border-black rounded p-2 my-2'>
                         <img className='devCats mx-auto rounded' alt='Devin Cat' src='https://i.imgur.com/KgVkwhb.jpg'></img>
                         <br></br>
                         <h1 className='font-bold text-xl'>Devin</h1>
                         <br></br>
                         <h4>Devin is a pandemic cat dad. He enjoys sleeping around whatever bed space his cat leaves for him, going for runs along the River Walk, convincing people that Hawaiian pizza is top tier, exploring the Grand Line, and learning to code!</h4>
                    </div>
               </div>
          </div>
     )
}