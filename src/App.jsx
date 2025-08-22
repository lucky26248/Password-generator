import { useCallback, useEffect, useState,useRef } from 'react'



function App() {
  const [length, setLength] = useState(8);
  const[numberAllowed,setNumberAllowed]=useState(false)
  const[characterAllowed,setCharacterAllowed]=useState(false)
  const[password,setPassword]=useState("")

  //useRef Hook
  const passwordRef = useRef(null)
  
//useCallback Hook
 const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(characterAllowed) str+="!@#$%^&*()_-+={}[]"
   for (let i= 1; i <=length; i++) {
    let char = Math.floor(Math.random()*str.length +1)
    pass+=str.charAt(char)
  } 
   setPassword(pass)

  },[length,numberAllowed,characterAllowed,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },
  [password])
//useEffect Hook
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
 <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
      
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Password Generator
      </h1>

      
      <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
        <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3 text-white font-bold bg-gray-700 placeholder-white placeholder:font-bold"
              placeholder="Generated password"
              readonly
             ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-all"
        >
          Copy
        </button>
      </div>

      
      <div className="space-y-4">
        
        
        <div className="flex items-center gap-x-3">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="w-full accent-blue-600 cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-sm text-gray-200">Length: {length}</label>
        </div>

      
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="w-4 h-4 accent-blue-600"
          />
          <label htmlFor="numberInput" className="text-gray-200 text-sm">
            Include Numbers
          </label>
        </div>

        
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={() => setCharacterAllowed((prev) => !prev)}
            className="w-4 h-4 accent-blue-600"
          />
          <label htmlFor="characterInput" className="text-gray-200 text-sm">
            Include Special Characters
          </label>
        </div>

      </div>
    </div>
  </div>
  
  ) 
}

export default App
