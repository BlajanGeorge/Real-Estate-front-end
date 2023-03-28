import Navbar from "./Navbar";
import style from "./css/home.module.css";
import { useState } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";

function Home() {

    interface livingEntity {
        name : string,
        city : string,
        country : string,
        photoUrl : string
    }

    const [dummyLivingEntities] = useState(new Array<livingEntity>(
        {name : "Lodha Miracles", city : "Cluj Napoca", country : "Romania", photoUrl: "src/assets/home_img_5.png"}, 
        {name : "Lodha Magic", city : "Cluj Napoca", country : "Romania", photoUrl: "src/assets/home_img_6.png"}, 
        {name : "Lodha Party", city : "Bucuresti", country : "Romania", photoUrl: "src/assets/home_img_7.png"}))

    return (
        <>
        <Navbar />
        <img className={style.home_img_1} src="src/assets/home_img_1.png"/>
        <img className={style.home_img_2} src="src/assets/home_img_2.svg"/>
        <img className={style.home_img_3} src="src/assets/home_img_3.svg"/>
        <img className={style.home_img_4} src="src/assets/home_img_4.png"/>
        <Box className={style.box_for_livings}>
        {
            dummyLivingEntities.map((entity) => {
               return <Card sx={{height:'450px', width:'300px', marginLeft:'12.5%', backgroundColor:"#F3F3F3", borderRadius:'25px'}}>
                <Box className={style.box_for_image}>
                 <CardMedia
                   component="img"
                   image={entity.photoUrl}/>
                   <Typography sx={{ fontWeight:"900", marginTop:'15px', fontSize:'24px', color:"#434343", marginLeft:'15px'}}>{entity.name}</Typography>
                   <Typography sx={{ fontWeight:"600", marginTop:'2px', fontSize:'10px', color:"#434343", marginLeft:'15px'}}>{entity.city}, {entity.country}</Typography>
                    </Box>
               </Card>
            })   
       }
       </Box>
       <img className={style.circle} src="src/assets/arrows.svg"/>
     </>
    )
}

export default Home;