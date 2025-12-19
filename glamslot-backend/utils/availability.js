const Booking=require('../models/Booking')
const Service=require('../models/Service')

const toMinutes=(timeStr)=>{
    const[hours,minutes]=timeStr.split(":").map(Number)
    return hours*60+minutes
}
const toTimeString=(total)=>{
    const hh=Math.floor(total/60).toString().padStart(2,"0")
    const mm=(total%60).toString().padStart(2,"0")
    return `${hh}:${mm}`
}
async function checkAvailability({serviceId,staffId,date,startTime}){
     const service=await Service.findById(serviceId)
     if(!service){
        throw new Error("Service not found")
     }
     const duration=service.durationMinutes
        const startMinutes=toMinutes(startTime)
        const endMinutes=startMinutes+duration
        const endTime=toTimeString(endMinutes)

        const query={date,status:{$in:['pending','confirmed']}}
        if(staffId){
            query.staffId=staffId
        }
        const bookings=await Booking.find(query)
        for(let booking of bookings){
            const exisitingStart=toMinutes(booking.startTime)
            const exisitingEnd=toMinutes(booking.endTime)
            const overlaps=startMinutes<exisitingEnd && exisitingStart < endMinutes
            if(overlaps){
                return {available:false}
            }

        }
        return {available:true,endTime}
}
module.exports={checkAvailability}