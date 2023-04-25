import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./components/About"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import News from "./components/News"
import { FrontEndRoutes } from "./constants/Constant"
import Sell from "./components/Sell"
import Rent from "./components/Rent"
import Profile from "./components/Profile"
import PropertyEntity from "./components/Property"
import Contact from "./components/Contact"
import { GenericRoute } from "./components/GenericRoute"
import { AgentRoute } from "./components/AgentRoute"
import { CustomerRoute } from "./components/CustomerRoute"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={FrontEndRoutes.LOGIN_ROUTE} element={<Login />} />
        <Route path={FrontEndRoutes.SIGN_UP_ROUTE} element={<SignUp />} />
        <Route path={FrontEndRoutes.HOME_ROUTE} element={<GenericRoute><Home/></GenericRoute>} />
        <Route path={FrontEndRoutes.ABOUT_ROUTE} element={<GenericRoute><About/></GenericRoute>}/>
        <Route path={FrontEndRoutes.NEWS_ROUTE} element={<GenericRoute><News/></GenericRoute>}/>
        <Route path={FrontEndRoutes.SELL_ROUTE} element={<><AgentRoute><Sell /></AgentRoute></>}/>
        <Route path={FrontEndRoutes.ALL_ROUTE} element={<GenericRoute><Rent type='All'/></GenericRoute>}/>
        <Route path={FrontEndRoutes.APARTMENT_ROUTE} element={<GenericRoute><Rent type='Apartment'/></GenericRoute>}/>
        <Route path={FrontEndRoutes.HOUSE_ROUTE} element={<GenericRoute><Rent type='House'/></GenericRoute>}/>
        <Route path={FrontEndRoutes.PROFILE_ROUTE} element={<GenericRoute><Profile/></GenericRoute>}/>
        <Route path={FrontEndRoutes.PROPERTY_ROUTE} element={<PropertyEntity/>}/>
        <Route path={FrontEndRoutes.CONTACT_ROUTE} element={<CustomerRoute><Contact/></CustomerRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
