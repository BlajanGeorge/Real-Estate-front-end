import { Autocomplete, Box, Button, Card, CardMedia, TextField, Typography } from "@mui/material";
import Navbar from "./Navbar";
import style from "./css/rent.module.css"
import { useEffect, useState } from "react";
import { Property } from "./Profile";
import { BackEndRoutes, FrontEndRoutes } from "../constants/Constant";
import axios from "axios";

function Rent(props : {type : string}) {
    const [properties, setProperties] = useState(Array<Property>)
    const [filterType, setFilterType] = useState(props.type)
    const [filterSq, setFilterSq] = useState('0 - 25')
    const [filterPrice, setFilterPrice] = useState('0 - 20.000')
    const [filterRooms, setFilterRooms] = useState('One')

    const [toggle, setToggle] = useState(false)

    async function getProperties() {
      axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE + "/filter?type=" + filterType,  {
          headers: {
              authorization: 'Bearer ' + localStorage.getItem('token') as string
          }})
      .then(function(res){
      setProperties(res.data)
      setToggle(!toggle)
      })
  }

  const goToProperty = (id : number) => {
    localStorage.setItem('property', id as unknown as string)
    window.location.replace(FrontEndRoutes.PROPERTY_ROUTE)
}

async function getPropertiesByFilter() {
  var type = filterType
  var rooms
  var maxSq
  var minSq
  var minPrice
  var maxPrice


  switch (filterRooms) {
    case 'One':
      rooms = 1
      break;
    case 'Two':
      rooms = 2
      break;
    case 'Three':
      rooms = 3
      break;
    case 'Four':
      rooms = 4
      break;
    case 'Five':
      rooms = 5
      break;
    case 'More than five':
      rooms = 0
      break;
    default:
      break;
  }

  switch (filterSq) {
    case '0 - 25':
      minSq = 0
      maxSq = 25
      break;
    case '26 - 50':
      minSq = 26
      maxSq = 50
      break;
    case '51 - 100':
      minSq = 51
      maxSq = 100
      break;
    case '101 - 300':
      minSq = 101
      maxSq = 300
    break;
    case '301 +':
      minSq = 301
      maxSq = 9999999999999
    break;
  }
    
    switch (filterPrice) {
      case '0 - 20.000':
        minPrice = 0
        maxPrice = 20000
        break;
      case '20.001 - 50.000':
        minPrice = 20001
        maxPrice = 50000
        break;
      case '50.001 - 100.000':
        minPrice = 50001
        maxPrice = 100000
        break;
      case '100.001 - 300.000':
        minPrice = 100001
        maxPrice = 300000
      break;
      case '300.001 +':
        minPrice = 300001
        maxPrice = 99999999999
      break;
  }

  var query = ''

  if(type != undefined) {
    query = query + '?type=' + type
  }

  if(rooms != undefined) {
    if (query == '') {
      query = query + '?rooms=' + rooms
    } else {
      query = query + '&rooms=' + rooms
    }
  }

  if(minSq != undefined) {
    if (query == '') {
      query = query + '?min_sq=' + minSq
    } else {
      query = query + '&min_sq=' + minSq
    }
  }

  if(maxSq != undefined) {
    if (query == '') {
      query = query + '?max_sq=' + maxSq
    } else {
      query = query + '&max_sq=' + maxSq
    }
  }

  if(minPrice != undefined) {
    if (query == '') {
      query = query + '?min_price=' + minPrice
    } else {
      query = query + '&min_price=' + minPrice
    }
  }

  if(maxPrice != undefined) {
    if (query == '') {
      query = query + '?max_price=' + maxPrice
    } else {
      query = query + '&max_price=' + maxPrice
    }
  }

   await axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE + "/filter" + query, {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token') as string
  }
   }).then(function(res){
    setProperties(res.data)
    setToggle(!toggle)
   })
}

  useEffect(()=>{
    getProperties()}, [])

      return (
        <>
        <Navbar/>
        <Autocomplete
          value={filterType}
          options={["Apartment", "House", "All"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'5%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Type"/>}
          onChange={(event: any, newValue: string | null) => {
            setFilterType(newValue!);
          }}
          />
          <Autocomplete
          value={filterSq}
          options={["0 - 25", "26 - 50", "51 - 100", "101 - 300", "301 +"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'25%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Sq"/>}
          onChange={(event: any, newValue: string | null) => {
            setFilterSq(newValue!);
          }}
          />
          <Autocomplete
          value={filterRooms}
          options={["One", "Two", "Three", "Four", "Five", "More than five"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'45%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Rooms"/>}
          onChange={(event: any, newValue: string | null) => {
            setFilterRooms(newValue!);
          }}
          />
          <Autocomplete
          value={filterPrice}
          options={["0 - 20.000", "", "20.001 - 50.000", "50.001 - 100.000", "100.001 - 300.000", "300.001 +"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'65%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params} label="Price"/>}
          onChange={(event: any, newValue: string | null) => {
            setFilterPrice(newValue!);
          }}
          />
        <Button className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}} onClick={() => getPropertiesByFilter()}>FILTER</Button>
        <Box className={style.box_for_rent}>
             {
            properties.map((entity) => {
               return <Card sx={{height:'362px', width:'600px', marginLeft:'10%', backgroundColor:"#F3F3F3", borderRadius:'25px', marginTop:'6%', marginBottom:'6%'}}>
                <Box className={style.box_for_image}>
                <Typography sx={{ fontWeight:"900", marginTop:'30px', fontSize:'24px', color:"#434343", marginLeft:'300px', position:'absolute'}}>{entity.name}</Typography>
                <Typography sx={{ fontWeight:"600", marginTop:'70px', fontSize:'10px', color:"#434343", marginLeft:'300px', position:'absolute'}}>{entity.city}, {entity.country}</Typography>
                <Typography sx={{marginLeft:'300px', marginTop:'101px', position:'absolute', color:"#434343", fontSize:'24px'}}>{entity.exchange == 'Euro' ? '€' : (entity.exchange == 'Dollar' ? '$' : '£')}</Typography>
                <Typography sx={{marginLeft:'330px', marginTop:'100px', position:'absolute', fontWeight:'900', fontSize:'24px', color:'#434343'}}>{entity.price}</Typography>
                <Typography sx={{marginLeft:'300px', marginTop:'150px', position:'absolute', fontWeight:'900', fontSize:'18px', color:'#434343'}}>{entity.square_feet} Sq</Typography>
                <Typography sx={{marginLeft:'400px', marginTop:'150px', position:'absolute', fontWeight:'900', fontSize:'18px', color:'#434343'}}>{entity.rooms} Rooms</Typography>
                <Typography sx={{marginLeft:'300px', marginTop:'200px', position:'absolute', fontWeight:'900', fontSize:'18px', color:'#434343'}}>{entity.type}</Typography>
                <Button className={style.button_2} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}} onClick={() => goToProperty(entity.id)}>SHOW</Button>
                 <CardMedia
                   component="img"
                   image={entity.photos[0].url}/>
                 </Box>
               </Card>
            })   
       }
        </Box>
          </>
          
    )
}

export default Rent;