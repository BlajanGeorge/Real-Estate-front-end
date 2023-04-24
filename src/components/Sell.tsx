import Navbar from "./Navbar";
import style from "./css/sell.module.css"
import { Alert, Autocomplete, Box, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { BackEndRoutes } from "../constants/Constant";
import axios from "axios";

function Sell() {
    const [exchange, setExchange] = useState('')
    const [type, setType] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [sq, setSq] = useState('')
    const [rooms, setRooms] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [photosDisplay, setPhotosDisplay] = useState([])
    const [name, setName] = useState('')
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [toggle, setToggle] = useState(false)
    const [photos, setPhotos] = useState([])

    async function createProeprty() {
        if (exchange == '') {
            setErr(true)
            setErrMsg('Exchange must not be blank')
            setToggle(!toggle)
            return
        }

        if (type == '') {
            setErr(true)
            setErrMsg('Type must not be blank')
            setToggle(!toggle)
            return
        }

        if (address == '') {
            setErr(true)
            setErrMsg('Address must not be blank')
            setToggle(!toggle)
            return
        }

        if (price == '') {
            setErr(true)
            setErrMsg('Price must not be blank')
            setToggle(!toggle)
            return
        }

        if (sq == '') {
            setErr(true)
            setErrMsg('Sq must not be blank')
            setToggle(!toggle)
            return
        }

        if (rooms == '') {
            setErr(true)
            setErrMsg('Rooms must not be blank')
            setToggle(!toggle)
            return
        }

        if (country == '') {
            setErr(true)
            setErrMsg('Country must not be blank')
            setToggle(!toggle)
            return
        }

        if (city == '') {
            setErr(true)
            setErrMsg('City must not be blank')
            setToggle(!toggle)
            return
        }

        if (photos.length < 1 || photos.length > 4) {
            setErr(true)
            setErrMsg('Must have between 1 and 4 photos')
            setToggle(!toggle)
            return
        }

        await axios.post(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE, {
            "name" : name,
            "country" : country,
            "city" : city,
            "address" : address,
            "exchange" : exchange,
            "price" : price,
            "square_feet" : sq,
            "rooms" : rooms,
            "type" : type,
            "photos" : photos
        }, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token') as string
            }
        }).then(function(res) {
            setName('')
            setExchange('')
            setPrice('')
            setAddress('')
            setCity('')
            setCountry('')
            setRooms('')
            setSq('')
            setPhotos([])
            setPhotosDisplay([])
            setToggle(!toggle)
        })
    }

    const handleClose = () => {
        setErr(false)
    }

    async function uploadPhoto (event) {
        let displayArr = photosDisplay
        let contentArr = photos

        if (displayArr.length > 3 || contentArr.length > 3) {
            setErr(true)
            setErrMsg('Must have between 1 and 4 photos')
            setToggle(!toggle)
            return
        }

        let display = URL.createObjectURL(event.target.files[0])
        let content = event.target.files[0];

        const contentBuffer = await content.arrayBuffer();
        let byteArray = new Uint8Array(contentBuffer);

        displayArr.push(display)
        contentArr.push({'name' : event.target.files[0].name , 'content' : byteArray})

        setPhotosDisplay(displayArr)
        setPhotos(contentArr)

        setToggle(!toggle)
    }

    return (
        <>
        <Navbar/>
        <img className={style.logo} src="src/assets/sell_img_1.png" width="1728px"/>
        <label>
            <input value={country} type="text" placeholder="Country" className={style.field_1} onChange={event => setCountry(event.target.value)}/>
        </label>
         <label>
            <input value={city} type="text" placeholder="City" className={style.field_2} onChange={event => setCity(event.target.value)}/>
        </label>
        <label>
            <input value={address} type="text" placeholder="Address" className={style.field_3} onChange={event => setAddress(event.target.value)}/>
        </label>
        <label>
            <input value={name} type="text" placeholder="Name" className={style.field_9} onChange={event => setName(event.target.value)}/>
        </label>
        <label>
            <input value={price} type="text" placeholder="Price" className={style.field_4} onChange={event => setPrice(event.target.value)}/>
        </label>
        <Autocomplete className={style.autocomplete_2}
              sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}}
              onChange={(event: any, newValue: string | null) => {
                setType(newValue!);
              }}
              options={["House", "Apartment"]}
              renderInput={(params) => <TextField {...params} label="Type"/>}/>
        <label>
            <input value={sq} type="text" placeholder="Sq" className={style.field_6} onChange={event => setSq(event.target.value)}/>
        </label>
        <label>
            <input value={rooms} type="text" placeholder="Rooms" className={style.field_8} onChange={event => setRooms(event.target.value)}/>
        </label>
        <Autocomplete className={style.autocomplete_1}
              sx={{'.MuiOutlinedInput-notchedOutline': { border: 0 }}}
              onChange={(event: any, newValue: string | null) => {
                setExchange(newValue!);
              }}
              options={["Euro", "Dollar", "Ron"]}
              renderInput={(params) => <TextField {...params} label="Exchange"/>}/>
        <Button onClick={createProeprty} className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>PUBLISH</Button>
        <input className={style.logo_2} type="file" accept="image/jpeg, image/png, image/jpg" onChange={uploadPhoto}></input>
        <Box sx={{position:'absolute', height:'30%', width:'30%', border:'1px solid black', marginTop:'-23%', marginLeft:'1%', borderRadius:'43px', display:'grid', gridTemplateColumns:'repeat(2, 1fr)'}}>
         {
            photosDisplay.map((currElement, index) => {
                return <Box sx={{marginLeft:'30%', marginTop:'10%'}}><img src={currElement} width='100px' height='100px'/></Box>
            })
         }
            </Box>
        <Snackbar
        open={err}
        autoHideDuration={10000}
        onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errMsg}
                </Alert>
                </Snackbar>
        </>
    )
}

export default Sell;