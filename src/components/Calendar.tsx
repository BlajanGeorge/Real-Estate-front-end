import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from '@mui/material'

function CustomCalendar() {
    const events = [
        { title: 'Meeting', start: new Date() }
      ]
      
    return (
        <Box sx={{position:'absolute', height:'30%', width:'40%', marginTop:'45%', marginLeft:'30%'}}>
        <FullCalendar
         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
         headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay"
          }}
        events={events}
        initialView="timeGridDay"
      />
       </Box>
    )
}

export default CustomCalendar