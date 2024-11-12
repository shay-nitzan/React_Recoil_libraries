import { React, useState } from "react"
import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil"

import './App.css'

const usernameState = atom({ // atom is units of state
  key: 'username',
  default: 'Shay'
})

const countState = selector({ // atom is units of state
  key: 'count',
  get: ({get}) => {
    const username = get(usernameState)
    return username.length
  }
})

export function App() { //anything with RecoilRoot has access to the all pieces of states
  return <RecoilRoot> 
    <Nav />
    <Body />

  </RecoilRoot>
}

export function Nav() {
  const username = useRecoilValue(usernameState)
  // const [username, setUsername] = useRecoilState(usernameState)

  return <div className="nav">
    <p>{username}</p>
  </div>
}

export function Body() {
  return <div className="body">
    <Profile />
    <Count />
  </div>
}

export function Profile() {
  const [username, setUsername] = useRecoilState(usernameState)
  return <div className="App">
    <h2>Profile:</h2>
    <p>{username}</p>
    <input type='text' value={username} onChange={ev => setUsername(ev.target.value)}/>
  </div>
}

export function Count() {
  const count = useRecoilValue(countState)

  return <div>
    <p>Count: {count}</p>
  </div>
}

export default App