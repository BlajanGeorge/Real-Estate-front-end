import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BackEndRoutes } from "../constants/Constant";
import Navbar from "./Navbar";
import style from "./css/common.module.css";

function Profile() {
    const [detailsFetched, setDetailsFetched] = useState(false)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [favorites, setFavorites] = useState([])
    
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
                <Button  className={style.button_edit_profile} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>SIGN IN</Button>
            </Box>
            <Box sx={{backgroundColor:'white', width:'45%', height:'100%'}}>
                da
            </Box>
        </Box>
        </>
    )
}

export default Profile;