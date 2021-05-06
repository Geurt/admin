import React from 'react'
import '../../styles/DashBoardBookingListing.css'
import { Link } from 'react-router-dom'

import classNames from 'classnames'
import dayjs from '../../utils/dayConfig'
import { isPresentAtDay } from '../../helpers/isPresentAtDay'
import { todayAtHome } from '../../helpers/todayAtHome'

const DashBoardBookingListing = ({ booking }) => {
    const today = todayAtHome()

    const arrival = dayjs(booking.arrival)
    const departure = dayjs(booking.departure)

    const arrivalFromNow = arrival.diff(today, 'days')
    const lengthOfStay = departure.diff(arrival, 'days')

    const bookingClasses = classNames({
        'DashBoard--bookings-list-item' : true,
        'present': isPresentAtDay(today, booking),
        'paid': booking.paid,
        'past-unpaid': !booking.paid && departure.isBefore(today)
    })

    return (
        <li className={bookingClasses}>
                <Link to={`/bookings/${booking.id}`} className="DashBoard--booking-link">
                    <p className="DashBoard--booking-name">{booking.name}</p>
                    <div className="Dashboard--dates-bar-origin">
                        <div
                            className="Dashboard--dates-bar"
                            style={{
                                "--bar-offset": arrivalFromNow,
                                "--bar-length": lengthOfStay
                            }}>
                            <div className="DashBoard--dates-bar-endpoint DashBoard--dates-bar-endpoint--start"></div>
                            <div className="DashBoard--dates-bar-endpoint DashBoard--dates-bar-endpoint--end"></div>
                        </div>
                    </div>
                </Link>
        </li>
    )
}

export default DashBoardBookingListing
