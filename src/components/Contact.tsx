import Navbar from "./Navbar";
 import style from "./css/contact.module.css"
 import { Box, Button } from "@mui/material";

 function Contact() {
     return (
         <>
         <Navbar/>
         <Box sx={{backgroundColor:"#F3F3F3", height:'90%', width:'100%'}}>
         <img className={style.logo} src="src/assets/contact_1.svg" width="300px"/>
         <img className={style.logo_2} src="src/assets/contact_2.svg" width="300px"/>
         <img className={style.logo_3} src="src/assets/contact_3.svg" width="300px"/>
         <label>
             <input type="text" placeholder="Your Name" className={style.field}/>
         </label>
         <label>
              <input type="text" placeholder="Your Email" className={style.field_2}/>
         </label>
         <label>
              <input type="text" placeholder="Your Message" className={style.field_3}/>
         </label>
         <Button className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>GET IN TOUCH</Button>
         </Box>
         </>
     )
 }

 export default Contact;