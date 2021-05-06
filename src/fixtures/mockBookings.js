import dayjs from '../utils/dayConfig'
import Chance from 'chance'
const chance = new Chance()

// config
const fuzzyStayLength = 14  // max of random stay length
const fractionPaid = .5

const mockDates = (fromDate, toDate, past) => {
    // will yield arrival and departure dates for randomized stays overlapping toDate to fromDate
    let stayLength = Math.floor( fuzzyStayLength * Math.random() ) + 1 // you always stay 1 night
    const daysLoaded = dayjs(toDate).diff(dayjs(fromDate), 'day')

    let arrival = new Date(fromDate)
    arrival.setDate(
        arrival.getDate() + 
        Math.round(daysLoaded * Math.random()) -  // set the halfway point somewhere in the loaded days
        Math.round(stayLength/2)
        )
    
    // sometimes we want to mock past unpaid stays
    if (past) {
        arrival.setDate(-stayLength)
    }

    let departure = new Date(arrival)
    departure.setDate(departure.getDate() + stayLength)

    const arrivalFormatted = arrival.toISOString().slice(0, 10)
    const departureFormatted = departure.toISOString().slice(0, 10)

    return [ arrivalFormatted, departureFormatted ]
}

const bookingTemplate = {
    "name": "string",
    "email": "string",
    "member_id": 0,
    "sci_member": true,
    "phone": "string",
    "city": "string",
    "arrival": "2021-03-29",
    "departure": "2021-03-29",
    "people_count": 1,
    "membership_count": 0,
    "info": "string",
    "cancelled": true,
    "invoice_needed": true,
    "paid": true,
    "date_paid": "2021-03-29",
    "amount": 0,
    "no_stay_pay": true,
    "no_meal_pay": true,
    "longstayer": true,
    "event_id": 0,
    "grou_name": "string",
    "meal_days": 0
  }

const createBooking = (fromDate, toDate, pastUnpaid) => {
    const [ arrival, departure ] = mockDates(fromDate, toDate, pastUnpaid)
    const name = chance.name()
    const email = chance.email()
    const id = chance.guid()
    const paid = pastUnpaid ? false : !!Math.round(Math.random() + fractionPaid - .5)
    return {
        ...bookingTemplate,
        arrival,
        departure,
        name,
        email,
        id,
        paid
    }
}

export const mockBookings = (numberOfBookings = 24, fromDate, toDate, pastUnpaid) => {
    fromDate = fromDate ? fromDate : new Date
    const bookings = new Array(numberOfBookings)
        .fill({})
        .map(booking => createBooking(fromDate, toDate, pastUnpaid))

    return bookings
}

export const mockBookingsAsync = (numberOfBookings = 24, fromDate, toDate, pastUnpaid) => {
    const bookings =  mockBookings(numberOfBookings, fromDate, toDate, pastUnpaid)
    return new Promise((resolve, reject) => {
        setTimeout(
            () => resolve(bookings),
            1000
        )
    })
}

export const mockPastUnpaidBookingsAsync = () => {
    const bookings =  mockBookings(2, '2021-04-02', '2021-04-03', true)
    return new Promise((resolve, reject) => {
        setTimeout(
            () => resolve(bookings),
            3000
        )
    })
}