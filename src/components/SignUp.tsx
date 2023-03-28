import { Box, Button, Typography } from "@mui/material";
import sign_up_style from "./css/signUp.module.css";
import style from "./css/common.module.css";

function SignUp() {
    return (
        <body id="id1">
        <Box className={sign_up_style.sign_up_box}>
            <img className={style.logo} src="src/assets/logo.svg" width="100"/>
            <img className={style.logo_name} src="src/assets/logo_name.svg" width="50"/>
            <Typography className={style.text}>SIGN UP</Typography>
            <label>
                <input type="text" placeholder="First Name" className={sign_up_style.short_field}/>
            </label>
            <label>
                <input type="text" placeholder="Last Name" className={sign_up_style.short_field}/>
            </label>
            <label>
                <input type="text" placeholder="Country" className={sign_up_style.short_field}/>
            </label>
            <label>
                <input type="text" placeholder="City" className={sign_up_style.short_field}/>
            </label>
            <label>
                <input type="text" placeholder="Address" className={style.field}/>
            </label>
            <label>
                <input type="text" placeholder="Phone Number" className={style.field}/>
            </label>
            <label>
                <input type="text" placeholder="Email" className={style.field}/>
            </label>
            <label>
                <input type="password" placeholder="Password" className={style.field}/>
            </label>
            <Button className={sign_up_style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>SIGN UP</Button>
        </Box>
        </body>
    )
}

export default SignUp;