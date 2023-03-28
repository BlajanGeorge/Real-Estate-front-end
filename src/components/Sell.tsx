import Navbar from "./Navbar";
import style from "./css/sell.module.css"

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
        <label>
            <input type="text" placeholder="!Valute!" className={style.field_5}/>
        </label>
        <label>
            <input type="text" placeholder="Ms" className={style.field_6}/>
        </label>
        <label>
            <input type="text" placeholder="!Type!" className={style.field_7}/>
        </label>
        <img className={style.logo_2} src="src/assets/sell_logo_1.svg" width="100px"/>
        </>
    )
}

export default Sell;