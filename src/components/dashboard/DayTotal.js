import React, { useState, useEffect }from 'react'
import getBookingsTotal from '../../helpers/getBookingsTotal'

const DayTotal = ({ day, bookings }) => {
    const [total, setTotal] = useState("-")
    // this is a pretty heavy operation; so we do it async
    useEffect(() => {
        setTotal(() => getBookingsTotal(day, bookings))
    }, [day,bookings])
    return <p className="DashBoard--bookings-header-total">{total}</p>
}

export default DayTotal
