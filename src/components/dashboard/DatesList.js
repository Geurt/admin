import React from 'react'
import dayjs from '../../utils/dayConfig'

import DayTotal from './DayTotal'

const DatesList = ({ dates, bookings }) => {
    const fromDate = dayjs(dates.from)
    const toDate = dayjs(dates.to)
    const numberOfDays = toDate.diff(fromDate,'day')

    const days = new Array(numberOfDays).fill().map((e,i) => (
        fromDate.add(i, 'day')
    ))

    return (
        <div className="DashBoard--bookings-header-dates">
            {days.map((day,i)=>
                <div key={i} className="DashBoard--bookings-header-date">
                    <p className="DashBoard--bookings-header-date-day">
                        {day.date()}
                    </p>
                    {(i === 0 || day.date() === 1) &&
                        <p className="DashBoard--bookings-header-date-month">
                            {day.format('MMMM')}
                        </p>
                    }
                    <DayTotal day={day} bookings={bookings}/>
                </div>
                )}
        </div>
    )
}

export default DatesList
