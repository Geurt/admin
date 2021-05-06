import React, { useState, useEffect, useRef, useReducer } from 'react'
import '../../styles/DashBoard.css'
import dayjs from '../../utils/dayConfig'
import api from '../../utils/api'

import DatesList from './DatesList'
import DashBoardBookingListing from './DashBoardBookingListing'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'
import { sortBookings } from '../../helpers/sortBookings'
import { getUniqueBookings } from '../../helpers/getUniqueBookings'
import { addDateIntsToBookings } from '../../helpers/convertDateToInt'
import { todayAtHome } from '../../helpers/todayAtHome'

import { mockBookingsAsync, mockPastUnpaidBookingsAsync } from '../../fixtures/mockBookings'

const bookingsReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            addDateIntsToBookings(action.payload) // done for very fast date comparisons
            const bookings = [
                ...state.bookings,
                ...action.payload
            ]
            const uniqueBookings = getUniqueBookings(bookings)
            sortBookings(uniqueBookings)
            return {
                bookings: uniqueBookings
            }
        default:
            throw new Error();
    }
}

const DashBoard = () => {
    const url = '/booking/query'
    const requestFields = ["paid", "people_count","name","id","arrival","departure"]
    const today = todayAtHome().format('YYYY-MM-DD')
    const [startDate, setStartDate] = useState(today)
    const [loadedDates, setLoadedDates] = useState({from: startDate, to: null})
    const [state, dispatch] = useReducer(bookingsReducer, {bookings: []})
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // a seperate call to load past unpaid bookings
    const loadPastUnpaidBookings = async () => {
        const oneDayAgo = dayjs().subtract(1,'days').format('YYYY-MM-DD')
        const oneMonthAgo = dayjs().subtract(1,'month').format('YYYY-MM-DD')

        try {
            // <--- comment in to use actual api
            // const requestBody = {
            //     "fields": requestFields,
            //     "present_during": {
            //         "start": oneMonthAgo,
            //         "end": oneDayAgo
            //         },
            //     "match": {
            //         "field": "paid",
            //         "value": "false"
            //         }
            // }
            // const response = await api.post(url,requestBody)
            // const bookings = response.data.rows
            // --->
            // <--- comment out to use actual api
            const bookings = await mockPastUnpaidBookingsAsync()
            // --->
            dispatch({type: 'add', payload: bookings})
        } catch (error) {
            console.log(error)
            setHasError(() => true)
        }
    }
    // we only load the past unpaid bookings once
    useEffect(() => {
        loadPastUnpaidBookings()
    },[])

    // fetch the bookings
    // note that the first bookings fetch is triggered by the infinite-scroll trigger being in view
    const loadBookings = async () => {
        setIsLoading(() => true)

        // only load the next month
        const lastLoadedDate = loadedDates.to ? loadedDates.to : startDate    // on first call we will not have dates.to set yet
        const newEndDate = dayjs(lastLoadedDate).add(1,'month').format('YYYY-MM-DD')
        
        setLoadedDates((prevDates) => ({
            from: prevDates.from,
            to: newEndDate
        }))
        // load the bookings for these dates
        try {
            // <--- comment in to use actual api
            // const requestBody = {
            //     "fields": requestFields,
            //     "present_during": {
            //         "start": lastLoadedDate,
            //         "end": newEndDate
            //       }
            // }
            // const response = await api.post(url,requestBody)
            // const bookings = response.data.rows
            // --->            
            // <--- comment out to use actual api
            const bookings = await mockBookingsAsync(48, lastLoadedDate, newEndDate, false)
            // --->
            dispatch({type: 'add', payload: bookings})
            setIsLoading(() => false)
        } catch (error) {
            console.log(error)
            setHasError(() => true)
        }
    }

    // set up infinite scrolling
    const scrollWindow = useRef(null)
    const trigger = useRef(null)

    useEffect(() => {
        const handleTrigger = ([entry]) => {
            // prevent default trigger on instantiation (note that we disconnect & reconnect reconnect observer)
            if (entry.intersectionRatio > 0) loadBookings()
        }
        const options = {
            root: scrollWindow.current
        }
        const observer = new window.IntersectionObserver(handleTrigger, options)
        observer.observe(trigger.current)

        return () => observer.disconnect() // disconnect on rerender: we only want one observer
    },[loadedDates])    // this needs to be redefined on dates change (or it will still use the loadBookings handler as defined in the original closure - which uses the past state)

    return (
            <div className="DashBoard--bookings-outer-container">
                <label className="DashBoard--bookings-header-label">
                    <p className="DashBoard--bookings-header-label-text">totals</p>
                </label>
                <div className="DashBoard--bookings-container" ref={scrollWindow}>
                    {hasError && <ErrorMessage/>}
                    {isLoading && <Loader />}
                    <div className="DashBoard--bookings-inner-wrapper">
                            {loadedDates.to && <DatesList dates={loadedDates} bookings={state.bookings}/>}
                            <ul className="DashBoard--bookings-list">
                                    {state.bookings.map(booking =>
                                            <DashBoardBookingListing 
                                                key={booking.id}                                    
                                                booking={booking}/>
                                        )}
                            </ul>
                            <div className="Dashboard--infinite-scroll-trigger" ref={trigger}>
                            </div>
                    </div>
                </div>
            </div>
    )
}

export default DashBoard
