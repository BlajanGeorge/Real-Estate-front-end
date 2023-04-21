import Navbar from "./Navbar";
import style from "./css/home.module.css";
import { useEffect, useState } from "react";
import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Property } from "./Profile";
import { BackEndRoutes, FrontEndRoutes } from "../constants/Constant";
import axios from "axios";

function Home() {

    const[properties, setProperties] = useState(Array<Property>)
    const[populate, setPopulate] = useState(false)

    async function getProperties() {
        axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE,  {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token') as string
            }})
        .then(function(res){
        setProperties(res.data)
        setPopulate(true)
        })
    }

    const goToProperty = (id : number) => {
        localStorage.setItem('property', id as unknown as string)
        window.location.replace(FrontEndRoutes.PROPERTY_ROUTE)
    }

    useEffect(()=>{
        getProperties()
    }, [])

    return (
        <>
        <Navbar />
        <img className={style.home_img_1} src="src/assets/home_img_1.png"/>
        <img className={style.home_img_2} src="src/assets/home_img_2.svg"/>
        <img className={style.home_img_3} src="src/assets/home_img_3.svg"/>
        <img className={style.home_img_4} src="src/assets/home_img_4.png"/>
        <Box className={style.box_for_livings}>
        {
            properties.slice(0,3).map((property) => {
               return <CardActionArea sx={{height:'450px', width:'300px', marginLeft:'12.5%', borderRadius:'25px'}} onClick={() => goToProperty(property.id)}>
               <Card sx={{height:'450px', width:'300px', backgroundColor:"#F3F3F3", borderRadius:'25px'}}>
                <Box className={style.box_for_image}>
                 <CardMedia
                   component="img"
                   image={property.photos[0].url}/>
                   <Typography sx={{ fontWeight:"900", marginTop:'15px', fontSize:'24px', color:"#434343", marginLeft:'15px'}}>{property.name}</Typography>
                   <Typography sx={{ fontWeight:"600", marginTop:'2px', fontSize:'10px', color:"#434343", marginLeft:'15px'}}>{property.city}, {property.country}</Typography>
                    </Box>
               </Card>
               </CardActionArea>
            })   
       }
       </Box>
       <img className={style.circle} src="src/assets/arrows.svg" onClick={() => window.location.replace(FrontEndRoutes.ALL_ROUTE)}/>
     </>
    )
}

export default Home;