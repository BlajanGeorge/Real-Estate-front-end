import { Box, Button, Typography } from "@mui/material";
import login_style from "./css/login.module.css";
import style from "./css/common.module.css";
import { useState } from "react";
import { BackEndRoutes, FrontEndRoutes } from "../constants/Constant";
import axios from "axios";

function Login() {
  const [err, setErr] = useState(false)
  const [errMessage] = useState('Invalid email or password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() { 
    await axios.post(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.LOGIN_ROUTE, {'email' : email, 'password' : password})
    .then(function(res){
      localStorage.setItem('id', res.data.id)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('token', res.data.token)
      window.location.replace(FrontEndRoutes.HOME_ROUTE)
    })
    .catch(function(err) {
      setErr(true)
    })
  }

    return (
        <body id="id1">
            <Box className={login_style.login_box}>
                <img className={style.logo} src="src/assets/logo.svg" width="100px"/>
                <img className={style.logo_name} src="src/assets/logo_name.svg" width="50"/>
                <Typography className={style.text}>SIGN IN</Typography>
                <label>
                  <input value={email} type="text" placeholder={err == false ? "Email" : errMessage} className={err == false ? style.field : style.field_err} onChange={event => setEmail(event.target.value)}/>
                </label>
                <label>
                  <input value={password} type="password" placeholder={err == false ? "Password" : errMessage } className={err == false ? style.field : style.field_err} onChange={event => setPassword(event.target.value)}/>
                </label>
                <Button onClick={login} className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>SIGN IN</Button>
            </Box>
           </body>
    )
}

export default Login;