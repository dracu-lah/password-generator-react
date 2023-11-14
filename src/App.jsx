import { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (characterAllowed) str += "~!@#$%^&*()`_+-="

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select()
    let isCopied = window.navigator.clipboard.writeText(password)
    if (isCopied) {
      setCopied(prev => !prev)
    }
  })

  useEffect(() => {
    passwordGenerator()
    if (copied) {
      setCopied(false)
    }
  }, [length, numberAllowed, characterAllowed])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-2  pt-2 pb-8 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-xl overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 cursor-default '
            placeholder='password'
            ref={passwordRef}
            readOnly
          />
          <button onClick={copyPasswordToClipboard} className=' duration-300 hover:bg-blue-600 outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>{copied ? "copied" : "copy"}</button>
        </div>
        {/*  */}
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={() => setCharacterAllowed(prev => !prev)} />
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App