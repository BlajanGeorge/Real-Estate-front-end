import { AppBar, Button, Container, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import style from "./css/common.module.css";
import navbar_style from "./css/navbar.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import { FrontEndRoutes } from "../constants/Constant";

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElRent, setAnchorElRent] = React.useState<null | HTMLElement>(null);
    
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const handleOpenRentMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElRent(event.currentTarget);
    };

    const handleCloseRentMenu = () => {
        setAnchorElRent(null);
    }

    const handleLogOut = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        window.location.replace(FrontEndRoutes.LOGIN_ROUTE)
    }

    const handleHome = () => {
        window.location.replace("/home")
    }

    const handleNews = () => {
        window.location.replace("/news")
    }

    const handleSell = () => {
        window.location.replace("/sell")
    }

    const handleAbout = () => {
        window.location.replace("/about")
    }

    const handleContact = () => {
        window.location.replace("/contact")
    }

    const handleRentApartment = () => {
        window.location.replace("/apartments") 
    }

    const handleRentHouse = () => {
        window.location.replace("/houses") 
    }

    const handleRentAll = () => {
        window.location.replace("/all") 
    }

    return (
        <AppBar className={style.app_bar}>
             <Container>
             <Toolbar disableGutters>
             <img className={style.logo_navbar} src="src/assets/logo.svg" width="60"/>
             <img className={style.logo_name_navbar} src="src/assets/logo_name.svg" width="40"/>
             <Button className={navbar_style.first_button} disableRipple 
             onClick={handleHome}
             sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }}>Home</Button>
              <Button className={navbar_style.button} disableRipple
              onClick={handleNews}
               sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }}>News</Button>
              <Button className={navbar_style.button} disableRipple 
              sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }}
            onClick={handleOpenRentMenu}
            >Rent</Button>
            <Menu
                    sx={{ width: '165px', height: '250px', marginLeft:'35px' }}
                    anchorEl={anchorElRent}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElRent)}
                    onClose={handleCloseRentMenu}
                >
                    <MenuItem sx={{ height: '40px', width: '165px' }} divider={true} dense={true} onClick={handleRentApartment}>
                        <ApartmentIcon sx={{marginRight:'5px'}}/>
                        Apartment
                        </MenuItem>
                    <MenuItem sx={{ height: '40px', width: '165px' }} dense={true} onClick={handleRentHouse}>
                        <HomeIcon sx={{marginRight:'5px'}}/>
                        House
                    </MenuItem>
                    <MenuItem sx={{ height: '40px', width: '165px' }} dense={true} onClick={handleRentAll}>
                        <BusinessIcon sx={{marginRight:'5px'}}/>
                        All
                    </MenuItem>
                </Menu>
              <Button className={navbar_style.button} disableRipple sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }}
            onClick={handleSell}
            >Sell</Button>
              <Button className={navbar_style.button} disableRipple
              onClick={handleAbout}
              sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }}>About</Button>
              <Button className={navbar_style.button} disableRipple
               onClick={handleContact}
              sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }}>Contact</Button>
         <IconButton sx={{height:'80px', width:'80px', position:'relative', marginLeft:'15%', marginTop:'2.5%'}} onClick={handleOpenUserMenu}>
            <AccountCircleIcon sx={{color:"green", fontSize:'60px'}}/>
         </IconButton>
         <Menu
                    sx={{ width: '135px', height: '250px', marginLeft:'12px' }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem sx={{ height: '40px', width: '135px' }} divider={true} dense={true} onClick={handleCloseUserMenu}>
                        <AccountCircleIcon sx={{marginRight:'5px'}}/>
                        Profile
                        </MenuItem>
                    <MenuItem sx={{ height: '40px', width: '135px' }} dense={true} onClick={handleLogOut}>
                        <LogoutIcon/>
                        Log out
                    </MenuItem>
                </Menu>
                </Toolbar>
             </Container>
        </AppBar>   
    )
}

export default Navbar;
