import './App.css'
import { TwitterFollowCar } from './components/TwitterFollowCar'
import { usersDB } from './userDB'

function App() {

  return (
    <section className='app'>
      {
        usersDB.map(user => {
          const { userName, name, initialIsFollowin } = user;

          return <TwitterFollowCar 
            userName={userName}
            name={name} 
            initialIsFollowin={initialIsFollowin}
            key={userName}
          />
        })
      }
    </section>
  )
}

export default App
