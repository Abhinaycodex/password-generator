import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numallow , setnumallow] =useState(false)
  const [charallow , setcharallow] =useState(false)
  const [password , setpassword] =useState("")

  const passwordref= useRef(null)

  const passwordgenerator = useCallback ( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallow) str += "0123456789"
    if(charallow) str += " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~ "

    for (let i = 1; i <=length; i++) {
      
      let char = Math.floor(Math.random() * str.length +1)

      pass += str.charAt(char)
      
    }
    setpassword(pass)

  }

  , [length, numallow, charallow,setpassword])

  const copyPasswordToClipboard = useCallback( ()=> {
    passwordref.current?.select()
    passwordref.current?.selectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  }, [password] )

  useEffect( ()=> {
    passwordgenerator()
  }, [length,numallow,charallow, passwordgenerator])
  


  return (
    <>
      <h1 className='text-4xl  text-center text-white'>welcome to password generator  </h1>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 text-black-500 text-2xl  bg-gray-300 mt-8'>
        password generator

        <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
         
          <input type="text"
          value={password}
          className='w-full px-2 py-3'
          placeholder='password'
          readOnly
          ref={passwordref}

           />

           <button 
           onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0' >
            copy
           </button>
        </div>

        <div className='flex text-sm gap-x-2  text-orange-800'>
          <div className='flex item-center gap-x-2 '>
            <input 
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={ (e)=> {setlength(e.target.value)}}
            />

             <label> length:{length}</label>

             <div className='flex item-center gap-x-1'>
             <input type="checkbox"
             defaultChecked={numallow}
             id='numinput'
             onChange={ (e)=> {setnumallow((prev)=> !prev);}}
             />

             <label htmlFor="numbers">Numbers</label>
             </div>

             <div className='flex item-center gap-x-1'>
             <input type="checkbox"
             defaultChecked={charallow}
             id='characterinput'
             onChange={ (e)=> {setcharallow((prev)=> !prev);}}

             />
             <label htmlFor="character">character</label>
             </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
