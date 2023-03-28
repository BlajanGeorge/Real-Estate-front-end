import Navbar from "./Navbar";
import style from "./css/about.module.css"
import { Box } from "@mui/material";

function About() {
    return (
        <>
        <Navbar/>
        <img className={style.logo} src="src/assets/about_us.svg" width="1000px"/>
        <img className={style.logo_2} src="src/assets/about_us_3.svg" width="300px"/>
        <img className={style.logo_3} src="src/assets/about_us_2.svg" width="300px"/>
        <img className={style.logo_4} src="src/assets/about_us_4.svg" width="300px"/>
        <Box sx={{width:"100%", height:'250px', backgroundColor:'#595959'}}><img className={style.logo_5} src="src/assets/about_us_5.svg" width="300px"/>
        <img className={style.logo_6} src="src/assets/about_us_6.svg" width="700px"/>
        </Box>
        </>
    )
}

export default About;