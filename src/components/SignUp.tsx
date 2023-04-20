import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import sign_up_style from "./css/signUp.module.css";
import style from "./css/common.module.css";
import axios from 'axios';
import { useEffect, useState } from "react";
import { BackEndRoutes, FrontEndRoutes } from "../constants/Constant";

function SignUp() {

    interface Country {
        name : string
        phonePrefix : string
    }

    interface City {
        name : string
        country : string
    }

    interface LocationDto {
        countries : Array<Country>
        cities : Array<City>
    }

    const [errMessage] = useState('Invalid input')
    const [emailErrMessage, setEmailErrMessage] = useState('Invalid email format')
    const [passErrMessage] = useState('Invalid password format')
    const [tokenErrMessage] = useState('Unauthorized token')
    const validEmail = new RegExp("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")
    const validPass = new RegExp("^(?=.*[0-9])"
      + "(?=.*[a-z])(?=.*[A-Z])"
      + "(?=.*[@#$%^&+=])"
      + "(?=\\S+$).{8,20}$")

    const [locationDto, setLocationDto] = useState()
    const [countryNames, setCountryNames] = useState([])
    const [cityNames, setCityNames] = useState([])
    const [locationLoaded, setLocationLoaded] = useState(false)

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [agentToken, setAgentToken] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [countryErr, setCountryErr] = useState(false)
    const [cityErr, setCityErr] = useState(false)
    const [firstNameErr, setFirstNameErr] = useState(false)
    const [lastNameErr, setLastNameErr] = useState(false)
    const [phoneErr, setPhoneErr] = useState(false)
    const [addressErr, setAddressErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const [tokenErr, setTokenErr] = useState(false)

    async function getValidLocations() {
        await axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.VALID_LOCATIONS_ROUTE)
        .then(function(result) {
            setLocationDto(result.data)
            var countryNames = result.data.countries.map((c: { name: any; }) => c.name);
            setCountryNames(countryNames)
            setLocationLoaded(true)
        })
        .catch(function (err){
            console.log(err)
        })
    }
    
    const setCities = (country : string) => {
        if(locationDto != undefined) {
        let cities = locationDto.cities.filter((city: { country: string; }) => city.country == country).map((city: { name: any; }) => city.name)
        setCityNames(cities)
        setCountry(country)
        }
    }

    const signUp = async () => {
        var signUpForm = {
            'country' : country,
            'city' : city,
            'first_name' : firstName,
            'last_name' : lastName,
            'phone' : phone,
            'agent_token' : agentToken,
            'address' : address,
            'email' : email,
            'password' : password
        }

        let err = false;

        if(!signUpForm.first_name) {
          setFirstNameErr(true)
          err = true;
        } else {
            setFirstNameErr(false)
        }

        if(!signUpForm.last_name) {
            setLastNameErr(true)
            err = true;
        }
        else {
            setLastNameErr(false)
        }

        if(!signUpForm.phone) {
            setPhoneErr(true)
            err = true;
        }
        else {
            setPhoneErr(false)
        }

        if(!signUpForm.address) {
            setAddressErr(true)
            err = true;
        }
        else {
            setAddressErr(false)
        }

        if (!validEmail.test(signUpForm.email)) {
            setEmailErr(true)
            err = true;
        }
        else {
            setEmailErr(false)
        }

        if(!validPass.test(signUpForm.password)) {
            setPasswordErr(true)
            err = true;
        }
        else {
            setPasswordErr(false)
        }

        if(!signUpForm.city) {
            setCityErr(true)
            err = true;
        }
        else {
            setCityErr(false)
        }

        if(!signUpForm.country) {
            setCountryErr(true)
            err = true;
        }
        else {
            setCountryErr(false)
        }

        if(err == false) {
        await axios.post(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE, signUpForm)
        .then(function(res){
            window.location.replace(FrontEndRoutes.LOGIN_ROUTE)
        })
        .catch(function(err) {
            console.log(err)
            if(err.response.status == 401) {
                setAgentToken('')
                setTokenErr(true)
            }
            if(err.response.status == 400) {
                if(err.response.data.email != undefined) {
                    setEmail('')
                    setEmailErr(true)
                    setEmailErrMessage(err.response.data.email[0])
                }
            }
        })
    }
    }

    useEffect(()=>{
        getValidLocations()
    }, [])

    return (
        <body id="id1">
        <Box className={sign_up_style.sign_up_box}>
            <img className={style.logo} src="src/assets/logo.svg" width="100"/>
            <img className={style.logo_name} src="src/assets/logo_name.svg" width="50"/>
            <Typography className={style.text}>SIGN UP</Typography>
            <Autocomplete className={cityErr == false ? sign_up_style.autocomplete_2 : sign_up_style.autocomplete_2_err}
              sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}}
              onChange={(event: any, newValue: string | null) => {
                setCity(newValue!);
              }}
              options={cityNames}
              renderInput={(params) => <TextField {...params} label="City"/>}/>

            <Autocomplete className={countryErr == false ? sign_up_style.autocomplete_1 : sign_up_style.autocomplete_1_err}
              sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}}
              onChange={(event: any, newValue: string | null) => {
                setCities(newValue!);
              }}
              options={countryNames}
              renderInput={(params) => <TextField {...params} label="Country"/>}/>
            <label>
                <input type="text" placeholder={firstNameErr == false ? "First Name" : errMessage} className={firstNameErr == false ? sign_up_style.short_field_1 : sign_up_style.short_field_1_error} onChange={event => setFirstName(event.target.value)}/>
            </label>
            <label>
                <input type="text" placeholder={lastNameErr == false ? "Last Name" : errMessage} className={lastNameErr == false ? sign_up_style.short_field_1 : sign_up_style.short_field_1_error} onChange={event => setLastName(event.target.value)}/>
            </label>
            <label>
                <input type="text" placeholder={phoneErr == false ? "Phone Number" : errMessage} className={phoneErr == false ? sign_up_style.short_field : sign_up_style.short_field_error} onChange={event => setPhone(event.target.value)}/>
            </label>
            <label>
                <input value={agentToken} type="text" placeholder={tokenErr == false ? "Agent Token" : tokenErrMessage} className={tokenErr == false ? sign_up_style.short_field : sign_up_style.short_field_error} onChange={event => setAgentToken(event.target.value)}/>
            </label>
            <label>
                <input type="text" placeholder={addressErr == false ? "Address" : errMessage} className={addressErr == false ? style.field : style.field_err} onChange={event => setAddress(event.target.value)}/>
            </label>
            <label>
                <input value={email} type="text" placeholder={emailErr == false ? "Email" : emailErrMessage} className={emailErr == false ? style.field : style.field_err} onChange={event => setEmail(event.target.value)}/>
            </label>
            <label>
                <input type="password" placeholder={passwordErr == false ? "Password" : passErrMessage} className={passwordErr == false ? style.field : style.field_err} onChange={event => setPassword(event.target.value)}/>
            </label>
            <Button onClick={signUp} className={sign_up_style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>SIGN UP</Button>
        </Box>
        </body>
    )
}

export default SignUp;