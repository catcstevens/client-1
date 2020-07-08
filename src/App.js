import React,{useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom' 
// import NewBooking from './components/NewBooking'
import Bookings from './components/Bookings'
import Booking from './components/Booking'
import Login from './components/Login'
import Logout from './components/Logout'
import NotFound from './components/NotFound'
import parentData from './data/parent_data'

const App = () => {
  const [bookings, setBookings] = useState([])
  useEffect(()=> {
    setBookings(parentData)
  }, [])

function getBookingFromId (id) {
  return bookings.find((post) => post._id == id)
}

  return (
<div>
<h1>Welcome to Tooth Inc.</h1>


    <BrowserRouter>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
      </ul>
        <Switch>
        <Route exact path='/' render={Login} />
        <Route exact path='/logout' render={Logout} />
        <Route exact path='/bookings' render={(props) => <Bookings {...props} parentData={bookings} />}/>
        <Route exact path='/posts/:id' render={(props) => 
          <Booking {...props} post={getBookingFromId(props.match.params.id)} />}/>
        <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      </div>
  )
}


export default App