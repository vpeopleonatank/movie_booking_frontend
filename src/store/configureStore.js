import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import movies from "../reducers/moviesReducer"
import errors from "../reducers/errorsReducer"
import fetches from "../reducers/fetchReducer"
import user from "../reducers/userReducer"
import misc from "../reducers/miscReducer"
import validate from "../reducers/validationReducer"
import report from "../reducers/reportReducer"
import createHistory from "history/createBrowserHistory"
import {routerReducer, routerMiddleware} from "react-router-redux"
import {reducer as formReducer} from 'redux-form';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Persisted user state

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const regionReducer = (region = {}, action) => {
  switch (action.type) {
    case 'REGION_SELECTED':
      return action.payload;
    default:
      return region;
  }
}

const movieReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_LIST':
      return action.payload;
    default:
      return state;
  }
}

const genreReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_GENRES':
      return action.payload;
    default:
      return state;
  }
}

const externalIdReducer = (selectedMovie = '', action) => {
  switch (action.type) {
    case 'FETCH_EXTERNAL_IDS':
      return action.payload;
    default:
      return selectedMovie;
  }
}

const selectedMovieReducer = (selectedMovie = '', action) => {
  switch (action.type) {
    case 'MOVIE_SELECTED':
      return action.payload;
    default:
      return selectedMovie;
  }
}

const scheduleReducer = (schedule = [], action) => {
  switch (action.type) {
    case 'FETCH_SCHEDULE':
      return action.payload;
    default:
      return schedule;
  }
}

const selectedShowingReducer = (selectedShowing = '', action) => {
  switch (action.type) {
    case 'SHOWING_SELECTED':
      return action.payload;
    default:
      return selectedShowing;
  }
}

const ticketsReducer = (tickets = {}, action) => {
  switch (action.type) {
    case 'TICKETS_SELECTED':
      return action.payload;
    default:
      return tickets;
  }
}

const selectedSeatsReducer = (selectedSeats = [], action) => {
  switch (action.type) {
    case 'SEATS_SELECTED':
      return action.payload;
    default:
      return selectedSeats;
  }
}

const bookingReducer = (booking = {}, action) => {
  switch (action.type) {
    case 'BOOKING_CONFIRMED':
      return action.payload;
    default:
      return booking;
  }
}

const findBookingsReducer = (bookings = [], action) => {
  switch (action.type) {
    case 'BOOKINGS_FOUND':
      console.log('payload findBooking');
      console.log(action.payload);
      return action.payload;
    default:
      return bookings;
  }
}

const personReducer = (person = {}, action) => {
  switch (action.type) {
    case 'PERSON_ADDED':
      return action.payload;
    default:
      return person;
  }
}


export default function configureStore() {
  return createStore(
    combineReducers({
      report,
      misc,
      validate,
      user,
      errors,
      movies,
      fetches,
      router: routerReducer,

      region: regionReducer,
      // movies: movieReducer,
      genres: genreReducer,
      externalId: externalIdReducer,
      selectedMovie: selectedMovieReducer,
      schedule: scheduleReducer,
      selectedShowing: selectedShowingReducer,
      tickets: ticketsReducer,
      selectedSeats: selectedSeatsReducer,
      booking: bookingReducer,
      foundBookings: findBookingsReducer,
      form: formReducer,
      person: personReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, middleware)
  )
}
