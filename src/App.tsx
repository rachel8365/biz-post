import { createContext, useState } from 'react';
/* import './App.css'; */
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Favourites from './components/Favourites';
import MyCards from './components/MyCards';
import AddCard from './components/AddCard';
import Home from './components/Home';
import About from './components/About';
import { ToastContainer } from 'react-toastify';
import UpdateCard from './components/UpdateCard';
import CardDetailse from './components/CardDetailse';
import Card from './interfaces/Card';
import Footer from './components/Footer';
import './styles.css';

export interface UserInfo {
  id?: number,
  email: string | false,
  role: 'Admin' | 'business' | 'regular'
}

let theme = {
  light: "light",
  dark: "dark",
}

export let SiteTheme = createContext(theme.light)

function App() {
  let [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode")!)
  )

  let [userInfo, setUserInfo] = useState<UserInfo>(() => {
    const jsonString = sessionStorage.getItem("userInfo");
    if (jsonString === null) { return { email: false }; }
    return JSON.parse(jsonString);
  })
  let [cards, setCards] = useState<Card[]>([])
  return (
    <>
      <SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
        <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
        <div className={`App  ${darkMode ? "dark" : "light"}`}>
          <Router>
            <Navbar userInfo={userInfo} setUserInfo={setUserInfo} darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
              <Route path='/' element={<Home userInfo={userInfo} setUserInfo={setUserInfo} cards={cards} setCards={setCards} />} />
              <Route path='/cards' element={<Home userInfo={userInfo} setUserInfo={setUserInfo} cards={cards} setCards={setCards} />} />
              <Route path='/login' element={<Login setUserInfo={setUserInfo} />} />
              <Route path='/cards/card-detailse/:id' element={<CardDetailse cards={cards} setCards={setCards} />} />
              <Route path='/about' element={<About userInfo={userInfo} />} />

              <Route path='/register' element={<Register setUserInfo={setUserInfo} />} />
              <Route path='/favourites' element={<Favourites userInfo={userInfo} />} />
              <Route path='/cards/new' element={<AddCard />} />
              <Route path='/my-cards' element={<MyCards userInfo={userInfo} />} />
              <Route path='/my-cards/update/:id' element={<UpdateCard />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer userInfo={userInfo} setUserInfo={setUserInfo} />

          </Router>
        </div>
      </SiteTheme.Provider>
    </>
  );
}

export default App;
