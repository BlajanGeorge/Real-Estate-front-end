import { Autocomplete, Box, Button, Card, CardMedia, TextField, Typography } from "@mui/material";
import Navbar from "./Navbar";
import style from "./css/rent.module.css"
import { useState } from "react";

function Rent(props : {type : string}) {
    interface livingEntity {
        name : string,
        city : string,
        country : string,
        photoUrl : string,
        price : string,
        valute : string,
        state : string,
        rooms : string,
        mp : string,
    }

    const [dummyLivingEntities] = useState(new Array<livingEntity>(
        {name : "Lodha Miracles", city : "Cluj Napoca", country : "Romania", photoUrl: "src/assets/home_img_5.png", price:'450k', valute:'€', state:'Ready to move in', rooms:'5 rooms', mp:'120 Mp'}, 
        {name : "Lodha Magic", city : "Cluj Napoca", country : "Romania", photoUrl: "src/assets/home_img_6.png", price:'200k', valute:'$', state:'Ready to move in', rooms:'6 rooms', mp:'160 Mp'}, 
        {name : "Lodha Party", city : "Bucuresti", country : "Romania", photoUrl: "src/assets/home_img_7.png", price:'600k', valute:'£', state:'Ready to move in', rooms:'3 rooms', mp:'140 Mp'}))
        
    return (
        <>
        <Navbar/>
        <Autocomplete
          value={props.type}
          options={["Apartment", "House", "All"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'5%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Type"/>}/>
          <Autocomplete
          value="0-25"
          options={["0-25", "26-50", "51-100", "101-300", "301+"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'25%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Mp"/>}/>
          <Autocomplete
          value="One"
          options={["One", "Two", "Three", "Four", "Five", "More than five"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'45%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Rooms"/>}/>
          <Autocomplete
          value="0 - 20.000"
          options={["0 - 20.000", "", "20.001 - 50.000", "50.001 - 100.000", "100.001 - 300.000", "300.001 +"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'65%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Price"/>}/>
        <Button className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>FILTER</Button>
        <Box className={style.box_for_rent}>
             {
            dummyLivingEntities.map((entity) => {
               return <Card sx={{height:'362px', width:'600px', marginLeft:'10%', backgroundColor:"#F3F3F3", borderRadius:'25px', marginTop:'6%', marginBottom:'6%'}}>
                <Box className={style.box_for_image}>
                <Typography sx={{ fontWeight:"900", marginTop:'30px', fontSize:'24px', color:"#434343", marginLeft:'300px', position:'absolute'}}>{entity.name}</Typography>
                <Typography sx={{ fontWeight:"600", marginTop:'70px', fontSize:'10px', color:"#434343", marginLeft:'300px', position:'absolute'}}>{entity.city}, {entity.country}</Typography>
                <Typography sx={{marginLeft:'300px', marginTop:'101px', position:'absolute', color:"#434343", fontSize:'24px'}}>{entity.valute}</Typography>
                <Typography sx={{marginLeft:'330px', marginTop:'100px', position:'absolute', fontWeight:'900', fontSize:'24px', color:'#434343'}}>{entity.price}</Typography>
                <Typography sx={{marginLeft:'300px', marginTop:'150px', position:'absolute', fontWeight:'900', fontSize:'18px', color:'#434343'}}>{entity.mp}</Typography>
                <Typography sx={{marginLeft:'400px', marginTop:'150px', position:'absolute', fontWeight:'900', fontSize:'18px', color:'#434343'}}>{entity.rooms}</Typography>
                <Typography sx={{marginLeft:'300px', marginTop:'190px', position:'absolute', fontWeight:'900', fontSize:'24px', color:'#434343'}}>{entity.state}</Typography>
                <Button className={style.button_2} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>Rent</Button>
                 <CardMedia
                   component="img"
                   image={entity.photoUrl}/>
                 </Box>
               </Card>
            })   
       }
        </Box>
          </>
          
    )
}

export default Rent;