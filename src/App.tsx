import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import News from "./components/News"
import { FrontEndRoutes } from "./constants/Constant"
import Sell from "./components/Sell"
import Rent from "./components/Rent"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={FrontEndRoutes.LOGIN_ROUTE} element={<Login />} />
        <Route path={FrontEndRoutes.SIGN_UP_ROUTE} element={<SignUp />} />
        <Route path={FrontEndRoutes.HOME_ROUTE} element={<Home/>} />
        <Route path={FrontEndRoutes.ABOUT_ROUTE} element={<About/>}/>
        <Route path={FrontEndRoutes.CONTACT_ROUTE} element={<Contact/>}/>
        <Route path={FrontEndRoutes.NEWS_ROUTE} element={<News/>}/>
        <Route path={FrontEndRoutes.SELL_ROUTE} element={<Sell/>}/>
        <Route path={FrontEndRoutes.ALL_ROUTE} element={<Rent type='ALL'/>}/>
        <Route path={FrontEndRoutes.APARTMENT_ROUTE} element={<Rent type='APARTMENT'/>}/>
        <Route path={FrontEndRoutes.HOUSE_ROUTE} element={<Rent type='HOUSE'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
