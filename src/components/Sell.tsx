import Navbar from "./Navbar";
import style from "./css/sell.module.css"
import { Autocomplete, Button, TextField } from "@mui/material";

function Sell() {
    return (
        <>
        <Navbar/>
        <img className={style.logo} src="src/assets/sell_img_1.png" width="1728px"/>
        <label>
            <input type="text" placeholder="Country" className={style.field_1}/>
        </label>
         <label>
            <input type="text" placeholder="City" className={style.field_2}/>
        </label>
        <label>
            <input type="text" placeholder="Address" className={style.field_3}/>
        </label>
        <label>
            <input type="text" placeholder="Price" className={style.field_4}/>
        </label>
        <Autocomplete
          value="€ Euro"
          options={["€ Euro", "$ Dollar", "£ Pound"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'50%', marginTop:'40%'}}
          renderInput={(params) => <TextField {...params}/>}/>
        <label>
            <input type="text" placeholder="Ms" className={style.field_6}/>
        </label>
        <label>
            <input type="text" placeholder="Rooms" className={style.field_8}/>
        </label>
        <Autocomplete
          value="Apartment"
          options={["Apartment", "House"]}
          sx={{ width: '15%', position:'absolute',marginLeft:'50%', marginTop:'45%'}}
          renderInput={(params) => <TextField {...params}/>}/>
        <img className={style.logo_2} src="src/assets/sell_logo_1.svg" width="100px"/>
        <Button className={style.button} variant="contained" sx={{background:"linear-gradient(#6EEE40, #52C9A6)"}}>PUBLISH</Button>
        </>
    )
}

export default Sell;