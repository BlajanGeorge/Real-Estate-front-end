import { Box, Button, Typography } from "@mui/material";
import login_style from "./css/login.module.css";
import style from "./css/common.module.css";

function Login() {
    return (
        <body id="id1">
            <Box className={login_style.login_box}>
                <img className={style.logo} src="src/assets/logo.svg" width="100px"/>
                <img className={style.logo_name} src="src/assets/logo_name.svg" width="50"/>
                <Typography className={style.text}>SIGN IN</Typography>
                <label>
                  <input type="text" placeholder="Email" className={style.field}/>
                </label>
                <label>
                  <input type="password" placeholder="Password" className={style.field}/>
                </label>
                <Button className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>SIGN IN</Button>
            </Box>
           </body>
    )
}

export default Login;