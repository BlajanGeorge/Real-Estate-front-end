import Navbar from "./Navbar";
import style from "./css/news.module.css";
import { useState } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";

function News() {
    interface New {
        day:string,
        month:string,
        title:string,
        photoUrl:string,
    }

    const [news] = useState(new Array<New>({day:"12", month:"Jan", title:"Elements of content in Epoxy Paint", photoUrl:"src/assets/news_img_1.png"},
    {day:"13", month:"Feb", title:"5 Right steps in warehouse planning", photoUrl:"src/assets/news_img_2.png"}, {day:"24",month: "Aug", title:"The right solution to build a type 45 house", photoUrl:"src/assets/news_img_3.png"}))

    return (
        <>
        <Navbar/>
        <img className={style.img_1} src="src/assets/news_1.png" width="1730px"/>
        <img className={style.logo} src="src/assets/new_2.svg" width="500px"/>
        <Box className={style.box_for_news}>
        {
            news.map((entity) => {
               return <Card sx={{height:'250px', width:'300px', marginLeft:'12.5%', backgroundColor:"#F3F3F3", borderRadius:'25px', marginTop:'20%'}}>
                <Box className={style.box_for_img}>
                 <CardMedia
                 sx={{borderRadius:'25px'}}
                   component="img"
                   image={entity.photoUrl}/>
                   <Typography sx={{position:"absolute", fontWeight:"900", marginTop:'15px', fontSize:'24px', color:"#434343", marginLeft:'15px'}}>{entity.day}</Typography>
                   <Typography sx={{position:"absolute", fontWeight:"900", marginTop:'45px', fontSize:'24px', color:"#434343", marginLeft:'10px'}}>{entity.month}</Typography>
                   <Typography sx={{position:"absolute", fontWeight:"900", marginTop:'30px', fontSize:'10px', color:"#434343", marginLeft:'70px'}}>{entity.title}</Typography>
                    </Box>
               </Card>
            })   
       }
       </Box>
       <img className={style.circle} src="src/assets/arrows.svg"/>
        </>
    )
}

export default News;