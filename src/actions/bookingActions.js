import LocalServer from '../apis/LocalServer';
import LocalServer2 from "../apis/LocalServer2";
import MovieDatabase from "../apis/MovieDatabase";
import moment from "moment";

export const selectRegion = (region, lang) => {
  return {
    type: 'REGION_SELECTED',
    payload: {region, lang}
  }
}

export const fetchMovieList = (locale) => async dispatch => {
  const response = await MovieDatabase.get('/movie/now_playing', {
    params: {
      region: locale.region,
      language: locale.lang
    }
  });
  dispatch({type: 'FETCH_LIST', payload: response.data.results});
};

export const fetchGenreList = () => async dispatch => {
  const response = await MovieDatabase.get('/genre/movie/list');
  dispatch({type: 'FETCH_GENRES', payload: response.data.genres});
}

export const fetchExternalId = (movieId = null) => async dispatch => {
  const response = await MovieDatabase.get(`/movie/${movieId}/external_ids`);
  dispatch({type: 'FETCH_EXTERNAL_IDS', payload: response.data});
}

export const selectMovie = (movie) => {
  return {
    type: 'MOVIE_SELECTED',
    payload: movie
  }
}

export const selectPlace = (place) => {
  return {
    type: 'PLACE_SELECTED',
    payload: place
  }
}

export const fetchSchedule = (movieId = null) => async dispatch => {
  const response = await LocalServer.get(`/schedule/${movieId}`);
  dispatch({type: 'FETCH_SCHEDULE', payload: response.data});
}

export const selectShowing = (showing) => {
  return {
    type: 'SHOWING_SELECTED',
    payload: showing
  }
}

export const selectCurrentDate = (currDate) => {
  return {
    type: 'CURRENT_DATE',
    payload: currDate
  }
}

export const selectTickets = (tickets) => {
  return {
    type: 'TICKETS_SELECTED',
    payload: tickets
  }
}

export const selectSeats = (seats) => {
  return {
    type: 'SEATS_SELECTED',
    payload: seats
  }
}

export const confirmBooking = (booking) => async dispatch => {
  console.log("confirm booking");
  console.log(booking);
  let bookingDate = `${booking.selectedShowing}`;
  // const startDateStr = moment(bookingDate).format('YYYY-MM-DD HH:mm')
  // console.log(startDateStr);
  console.log(bookingDate);
  await LocalServer2.post('/booking/booking', {
    movie: {
      id: booking.selectedMovie._id
    },
    showing: bookingDate,
    username: booking.user,
    seats: booking.selectedSeats
  });


  // await LocalServer.post('/bookings', {
  //   movie: {
  //     title: booking.selectedMovie.title,
  //     id: booking.selectedMovie.id,
  //     poster: booking.selectedMovie.poster_path,
  //     genres: booking.selectedMovie.genre_ids,
  //     release_date: booking.selectedMovie.release_date,
  //     average_score: booking.selectedMovie.vote_average,
  //     overview: booking.selectedMovie.overview
  //   },
  //   region: {
  //     region: booking.region.region,
  //     lang: booking.region.lang
  //   },
  //   showing: booking.selectedShowing,
  //   seats: booking.selectedSeats,
  //   person: {
  //     first_name: booking.person.firstName,
  //     last_name: booking.person.lastName,
  //     email: booking.person.email,
  //     phone_number: booking.person.phone
  //   }
  // });
  dispatch({type: 'BOOKING_CONFIRMED', payload: booking});
}

export const findBookings = (movieId, showing) => async dispatch => {
  console.log(movieId, ' showing time:', showing);
  // const response = await LocalServer.get('/bookings', {
  //   params: {
  //     id: movieId,
  //     showing: showing
  //   }
  // });
  const response = await LocalServer2.get('/booking/booking', {
    params: {
      id: movieId,
      showing: `${showing}.000Z`
    }
  });

  console.log(response.data);
  dispatch({type: 'BOOKINGS_FOUND', payload: response.data});
}

export const addPersonalInfo = (person) => {
  return {
    type: 'PERSON_ADDED',
    payload: person
  }
}