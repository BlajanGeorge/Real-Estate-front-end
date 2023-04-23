import { Alert, Box, Button, IconButton, MobileStepper, Paper, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BackEndRoutes, FrontEndRoutes } from "../constants/Constant";
import Navbar from "./Navbar";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import React from "react";
import { Photo, Property } from "./Profile";
import { KeyboardArrowLeft, KeyboardArrowRight, TenMp } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from "dayjs";
import style from "./css/common.module.css";
import CustomCalendar from "./Calendar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function PropertyEntity() {
    interface schedule {
        title : string,
        start : Date,
    }

    interface ScheduleCount {
        label : string,
        data : number,
    }

    const [property, setProperty] = useState<Property>()
    const [photos, setPhotos] = useState(Array<Photo>)
    const [toggle, setToggle] = useState(false)
    const [loadedData, setLoadedData] = useState(false)
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [favoriteEnabled, setFavoriteEnabled] = useState(false)
    const [value, setValue] = React.useState<Dayjs | null>(null);
    const [scheduleErr, setScheduleErr] = useState(false)
    const [scheduleSuccess, setScheduleSuccess] = useState(false)
    const [scheduleMessage, setScheduleMessage] = useState('')
    const [schedules, setSchedules] = useState(Array<schedule>)
    const [schedulesChart, setSchedulesChart] = useState(Array<ScheduleCount>)
    const [showEdit, setShowEdit] = useState(false)
    const [editName, setEditName] = useState('')
    const [editExchange, setEditExchange] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editRooms, setEditRooms] = useState('')
    const [editType, setEditType] = useState('')
    const [editSquareFeet, setEditSquareFeet] = useState('')
    const [editError, setEditError] = useState(false)
    const [editErrorMsg, setEditErrorMsg] = useState('')

    const data = {
        labels : schedulesChart.map(sch => sch.label),
        datasets: [
            {
                label: 'Schedules',
                data: schedulesChart.map(sch => sch.data),
                backgroundColor: 'green',
            }
        ],
    };

    const options =  {
        scales: {
          y: {
            beginAtZero: true
          }
        }
    }

    async function getProperty() {
        var id = localStorage.getItem('property')
        
        await axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE + "/" + id, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token') as string
            }}).then(function(res) {
            setProperty(res.data)
            setPhotos(res.data.photos)
            setToggle(!toggle)
            setLoadedData(true)
        })
    }

    async function checkFav() {
        var id = localStorage.getItem('property')

        await axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE + "/" + localStorage.getItem('id') + "/favorites", {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token') as string
            }  
        }).then(function(res) {
            var favs = res.data
            var found = favs.some((fav: { id: string | null; }) => fav.id == id)

            if(!found) {
                setFavoriteEnabled(false)
            } else {
                setFavoriteEnabled(true)
            }
            setToggle(!toggle)
        })
    }

    async function handleFavorite() {
        var id = localStorage.getItem('property')

        if (favoriteEnabled == false) {
            await axios.post(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE  + "/" + localStorage.getItem('id') + "/favorites", {"property_id" : id}, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token') as string
                }
            }).then(function(res){
                setFavoriteEnabled(true)
                setToggle(!toggle)
            })

            return
        }

        if(favoriteEnabled == true ) {
            await axios.delete(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE + "/" + localStorage.getItem('id') + "/favorites?property_id=" + id, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token') as string
                }
            }).then(function(res){
                setFavoriteEnabled(false)
                setToggle(!toggle)
            })

            return 
        }
    }

    async function makeSchedule() {
        var initialTime = value?.toDate().getTime()
        var id = localStorage.getItem('property')

        if (initialTime == undefined) {
            setScheduleErr(true)
            setScheduleMessage('Invalid date format, should specify year:month:day:hour:minutes')
            return
        }

        await axios.post(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.SIGN_UP_ROUTE + "/" + localStorage.getItem('id') + "/schedules?property_id=" + id, {"date" : initialTime}, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token') as string
            }
        }).then(function(res) {
            setScheduleSuccess(true)
            setScheduleMessage(res.data)
            setToggle(!toggle)
        }).catch(function(err) {
            console.log(err)
            if (err.response.status == 400) {
            setScheduleErr(true)
            setScheduleMessage(err.response.data)
            setToggle(!toggle)
            }
        })
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
      };

    const handleClose = () => {
        setScheduleErr(false)
        setScheduleSuccess(false)
    }

    const handleEditSnakClose = () => {
        setEditError(false)
    }

    async function getSchedules() {
        await axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE + "/" + localStorage.getItem('property') + "/schedules" , {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token') as string
            }
        }).then(function(res){
            var schedulesPayload: { name: string; date: Date; }[] = []
            Array.from(res.data).forEach((schedule: { first_name: string; last_name: string; date: string | number | Date; }) => schedulesPayload.push({'title' : schedule.first_name + ' ' + schedule.last_name, 'start' : new Date(schedule.date)}))
            setSchedules(schedulesPayload)
            setToggle(!toggle)
        })
    }

    async function getStatistics() {
        var endDate = new Date()
        endDate.setHours(23,59,59)
        endDate.setDate(endDate.getDate() + 1)
        var endTimeMillis = endDate.getTime()
        var startDate = new Date()
        startDate.setHours(23,59.59)
        startDate.setDate(startDate.getDate() + 1)
        startDate.setMonth(startDate.getMonth() - 1)
        var startTimeMillis = startDate.getTime()

        await axios.get(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE + "/" + localStorage.getItem('property') + "/schedules/count?start_time=" + startTimeMillis + "&end_time=" + endTimeMillis, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token') as string
            } 
        }).then(function(res){
            setSchedulesChart(res.data)
            setToggle(!toggle)
        })
    }

    async function deleteProperty() {
       var id = localStorage.getItem('property')

       await axios.delete(BackEndRoutes.ROOT_ROUTE + BackEndRoutes.PROPERTIES_ROUTE + "/" + id, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token') as string
        } 
       }).then(function(res) {
        localStorage.removeItem('property')
        window.location.replace(FrontEndRoutes.ALL_ROUTE)
       })
    }

    async function editProperty() {
        console.log("da")
        setShowEdit(true)
        setToggle(!toggle)
    }

    const handleCloseEdit = () => {
        setEditName('')
        setEditExchange('')
        setEditPrice('')
        setEditRooms('')
        setEditSquareFeet('')
        setEditType('')
        setShowEdit(false)
        setToggle(!toggle)
    }

    const handleEdit = () => {
        if (editName == '') {
            setEditError(true)
            setEditErrorMsg('Name must not be blank')
            return
        }

        if (editPrice == '') {
            setEditError(true)
            setEditErrorMsg('Price must not be blank')
            return
        }

        if (editRooms == '') {
            setEditError(true)
            setEditErrorMsg('Rooms must not be blank')
            return
        }

        if (editSquareFeet == '') {
            setEditError(true)
            setEditErrorMsg('Square feet must not be blank')
            return
        }

        if (editType == '') {
            setEditError(true)
            setEditErrorMsg('Type must not be blank')
            return
        }

        if (editExchange == '') {
            setEditError(true)
            setEditErrorMsg('Exchange must not be blank')
            return
        }

        if (editExchange != 'Euro' && editExchange != 'Pound' && editExchange != 'Dollar') {
            setEditError(true)
            setEditErrorMsg('Exchange must be one of : Euro | Pound | Dollar')
            return
        }

        if (editType != 'House' && editType != 'Apartment') {
            setEditError(true)
            setEditErrorMsg('Type must be one of : House | Apartment')
            return
        }

        
     }

    useEffect(()=>{
        getProperty()
        checkFav()
        if (localStorage.getItem('role') == 'AGENT') {
            getSchedules()
            getStatistics()
        }
    }, [])
        
    return (
        <>
        <Navbar/>
        { loadedData == true &&
        <Box sx={{ width: 1000, position:'absolute', marginTop:'12%', marginLeft:'20%'}}>
        <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center",
          textAlign: "center",
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography> <strong>{property!.name}</strong> | <strong>{property!.country}</strong>, <strong>{property!.city}</strong> | <strong>{property!.rooms}</strong> <strong>Rooms</strong> | <strong>{property!.square_feet}</strong><strong>Sq</strong> | <strong>{property!.exchange == 'Euro' ? '€' : (property!.exchange == 'Dollar' ? '$' : '£')}</strong> <strong>{property!.price}</strong> | <strong>{property!.type}</strong></Typography>
      </Paper>
        <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents>
            {photos.map((step, index) => (
          <div>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 400,
                  display: 'block',
                  maxWidth: 1000,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.url}
              />
            ) : null}
          </div>
        ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
        steps={photos.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === photos.length - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
        </Box>}
        { localStorage.getItem('role') == 'CUSTOMER' &&
        <><IconButton sx={{ position: 'absolute', marginTop: '15%', marginLeft: '80%' }} color={favoriteEnabled == true ? 'error' : 'disabled'} onClick={handleFavorite}><FavoriteIcon fontSize="large" /></IconButton><LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']} sx={{ position: 'absolute', marginTop: '45%', marginLeft: '41%' }}>
                        <DateTimePicker value={value} onChange={(newValue) => setValue(newValue)} />
                    </DemoContainer>
                </LocalizationProvider><Button onClick={() => makeSchedule()} className={style.button_reset_pass} variant="contained" sx={{ background: "linear-gradient(#6EEE40, #52C9A6)" }}>SCHEDULE</Button><Snackbar
                    open={scheduleErr || scheduleSuccess}
                    autoHideDuration={10000}
                    onClose={handleClose}>
                        <Alert onClose={handleClose} severity={scheduleErr == true ? "error" : (scheduleSuccess == true ? "success" : "info")} sx={{ width: '100%' }}>
                            {scheduleMessage}
                        </Alert>
                    </Snackbar></>}
        {
            localStorage.getItem('role') == 'AGENT' &&
            <><CustomCalendar
                    events={schedules} />
                    <Box sx={{position:'absolute', width:'40%', height:'40%', marginTop:'80%', marginLeft:'30%' }}>
                        <Bar options={options} data={data} />
                        </Box>
                        <IconButton sx={{ position: 'absolute', marginTop: '15%', marginLeft: '80%' }} onClick={deleteProperty}><DeleteIcon fontSize="large" /></IconButton>
                        <IconButton sx={{ position: 'absolute', marginTop: '15%', marginLeft: '83%' }} onClick={editProperty}><EditIcon fontSize="large" /></IconButton>
                        {
                            showEdit == true &&
                            <Box sx={{height:'100%', width:'100%', zIndex:'1999900', backgroundColor:'rgba(255,255,255,0.3)', position:'absolute'}}>
                                <Box sx={{height:'30%', width:'50%', border:'1px solid black', borderRadius:'43px', marginTop:'20%', marginLeft:'25%', backgroundColor:'white'}}>
                                <label>
                                  <input value={editName} type="text" placeholder="Name" className={style.field_name_update} onChange={event => setEditName(event.target.value)}/>
                                </label>
                                <label>
                                  <input value={editSquareFeet} type="text" placeholder="Square feet" className={style.field_sq_update} onChange={event => setEditSquareFeet(event.target.value as unknown as number)}/>
                                </label>
                                <label>
                                  <input value={editPrice} type="text" placeholder="Price" className={style.field_price_update} onChange={event => setEditPrice(event.target.value as unknown as number)}/>
                                </label>
                                <label>
                                  <input value={editRooms} type="text" placeholder="Rooms" className={style.field_rooms_update} onChange={event => setEditRooms(event.target.value as unknown as number)}/>
                                </label>
                                <label>
                                  <input value={editExchange} type="text" placeholder="Exchange" className={style.field_exchange_update} onChange={event => setEditExchange(event.target.value)}/>
                                </label>
                                <label>
                                  <input value={editType} type="text" placeholder="Type" className={style.field_type_update} onChange={event => setEditType(event.target.value)}/>
                                </label>
                                <IconButton sx={{ position: 'absolute', marginTop: '14%', marginLeft: '22%' }} onClick={handleEdit}><CheckIcon fontSize="large" /></IconButton>
                                <IconButton sx={{ position: 'absolute', marginTop: '14%', marginLeft: '25%' }} onClick={handleCloseEdit} ><ClearIcon fontSize="large" /></IconButton>
                                </Box>
                                <Snackbar
                                   open={editError}
                                   autoHideDuration={10000}
                                   onClose={handleEditSnakClose}>
                                   <Alert onClose={handleEditSnakClose} severity="error" sx={{ width: '100%' }}>
                                    {editErrorMsg}
                                 </Alert>
                               </Snackbar>
                            </Box>
                        }
                        </>
        }
        </>
    )
}

export default PropertyEntity;
