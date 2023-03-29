import { Autocomplete, Button, TextField } from "@mui/material";
import Navbar from "./Navbar";
import style from "./css/rent.module.css"

function Rent(props : {type : string}) {
    return (
        <>
        <Navbar/>
        <Autocomplete
          value={props.type}
          options={["Apartment", "House", "All"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'12%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params}/>}/>
          <Autocomplete
          value="0-25 Mp"
          options={["0-25 Mp", "25-50 Mp", "50-100 Mp", "100-300 Mp", "300+ Mp"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'32%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params}/>}/>
          <Autocomplete
          value="One Room"
          options={["One Room", "Two Rooms", "Three Rooms", "Four Rooms", "Five Rooms", "More than five Rooms"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'52%', marginTop:'15%'}}
          renderInput={(params) => <TextField {...params}/>}/>
        <Button className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>FILTER</Button>
          </>
          
    )
}

export default Rent;