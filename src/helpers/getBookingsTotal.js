import { isPresentAtDayInt } from '../helpers/isPresentAtDay'
import { convertDateToInt } from '../helpers/convertDateToInt'

const getBookingsTotal = (day, bookings) => {
    const dayInt = convertDateToInt(day.format('YYYY-MM-DD'))

    return bookings.reduce((total, booking) => (
        isPresentAtDayInt(dayInt, booking) ? total + booking.people_count : total
    ),0)
}

export default getBookingsTotal
