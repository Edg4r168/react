import SearchResults from './pages/SearchResults';
import './App.css';

import { Route } from 'wouter';
// import Context from './context/StaticContext';
import { GifsContextProvider } from './context/GifsContext';

import Header from 'components/Header/Header';

import Details from './pages/Details';
import Home from './pages/Home';
import { UserContexProvider } from 'context/UserContext';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';

function App() {

  return (
    // <Context.Provider value={{ name: "Jose", age: 20 }}>
    <UserContexProvider>
      <div className="App">
        <section className="App-content">
          <Header />
          <h1>Gifs</h1>
          <GifsContextProvider>

            <Route path='/' component={Home}></Route>
            <Route path='/search/:keyword/:rating?' component={SearchResults}/>
            <Route path='/gif/:id' component={Details}/>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/404' component={() => <h1>404 ERROR :(</h1>}/>

          </GifsContextProvider>
        </section>
      </div>
    </UserContexProvider>
    // </Context.Provider>
  );
}

export default App;
