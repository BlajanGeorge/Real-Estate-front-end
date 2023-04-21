import { Box, Button, Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BackEndRoutes, FrontEndRoutes } from "../constants/Constant";
import Navbar from "./Navbar";
import style from "./css/common.module.css";

export interface Photo {
    url : string
}

export interface Property {
    name : string
    id : number
    country : string
    city : string
    address : string
    exchange : string
    price : number
    square_feet : number
    rooms : number
    type : string
    photos : Array<Photo>

}

function Profile() {

    const [detailsFetched, setDetailsFetched] = useState(false)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [currPass, setCurrPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [favorites, setFavorites] = useState(new Array<Property>())
    
    async function fetchProfile() {
        await axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE + "/" + localStorage.getItem('id'), {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token') as string
        }})
        .then(function(res){
            setEmail(res.data.email)
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setFavorites(res.data.favorites)
            setDetailsFetched(true)
        })
    }

    async function editProfile() {
        await axios.patch(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE + "/" + localStorage.getItem('id') + "/" + BackEndRoutes.PROFILE_ROUTE, {'first_name' : firstName, 'last_name' : lastName},
        {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token') as string
        }})
        .then(function(res){
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
        })
    }

    async function resetPassword() {
        await axios.patch(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE + "/" + localStorage.getItem('id') + "/" + BackEndRoutes.PASSWORD_ROUTE, {'current_password' : currPass, 'new_password' : newPass},
        {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token') as string
        }})
    }

    const goToProperty = (id : number) => {
        localStorage.setItem('property', id as unknown as string)
        window.location.replace(FrontEndRoutes.PROPERTY_ROUTE)
    }

    useEffect(()=>{
        fetchProfile()
    }, [])

    return (
        <>
        <Navbar/>
        <Box sx={{display:'flex', flexDirection:'row', position:'absolute', width:'70%', height:'40%', backgroundColor:'white',border:'1px solid black', marginTop:'12%', marginLeft:'15%', borderRadius:'43px'}}>
            <Box sx={{backgroundColor:'white', width:'45%', marginLeft:'5%', borderRight:'1px solid black', height:'100%'}}>
                <Typography sx={{position:'absolute', marginLeft:'18.5%', marginTop:'1%'}}>Email</Typography>
                <label>
                  <input value={email} type="text" placeholder="Email" className={style.field_email_profile} disabled/>
                </label>
                <Typography sx={{position:'absolute', marginLeft:'17%', marginTop:'10%'}}>First Name</Typography>
                <label>
                  <input value={firstName} type="text" placeholder="First Name" className={style.field_first_name_profile} onChange={event => setFirstName(event.target.value)}/>
                </label>
                <Typography sx={{position:'absolute', marginLeft:'17%', marginTop:'19%'}}>Last Name</Typography>
                <label>
                  <input value={lastName} type="text" placeholder="Last Name" className={style.field_last_name_profile} onChange={event => setLastName(event.target.value)}/>
                </label>
                <Button onClick={editProfile}  className={style.button_edit_profile} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>EDIT</Button>
            </Box>
            <Box sx={{backgroundColor:'white', width:'45%', height:'100%'}}>
              <Typography sx={{position:'absolute', marginLeft:'19.5%', marginTop:'1%'}}>Current Password</Typography>
                <label>
                  <input type="text" placeholder="Current password" className={style.field_curr_pass} onChange={event => setCurrPass(event.target.value)}/>
                </label>
                <Typography sx={{position:'absolute', marginLeft:'20.5%', marginTop:'10%'}}>New Password</Typography>
                <label>
                  <input type="text" placeholder="New password" className={style.field_new_pass} onChange={event => setNewPass(event.target.value)}/>
                </label>
                <Button onClick={resetPassword} className={style.button_reset_pass} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>RESET</Button>
            </Box>
        </Box>
        <Box className={style.box_for_livings_profile}>
        {
            favorites.map((property) => {
               return <CardActionArea sx={{height:'450px', width:'300px', marginLeft:'12%', backgroundColor:"#F3F3F3", borderRadius:'25px', marginTop:'20%', marginBottom:'20%'}} onClick={() => goToProperty(property.id)}>
                <Card sx={{height:'450px', width:'300px', backgroundColor:"#F3F3F3", borderRadius:'25px'}}>
                <Box sx={{width:'280px', height:'300px', marginLeft:'10px', marginTop:'10px'}}>
                 <CardMedia
                   component="img"
                   image={property.photos[0].url}/>
                     </Box>
                <Typography sx={{ fontWeight:"900", marginTop:'55px', fontSize:'24px', color:"#434343", marginLeft:'15px'}}>{property.name}</Typography>
                <Typography sx={{ fontWeight:"600", marginTop:'2px', fontSize:'10px', color:"#434343", marginLeft:'15px'}}>{property.city}, {property.country}</Typography>  
               </Card>
               </CardActionArea>
            })   
       }
        </Box>
        </>
    )
}

export default Profile;