import React, {Component} from "react"
// The following line needs an eslint ignore directive because Router needs to be in scope
import {BrowserRouter as Router, Route, Switch} from "react-router-dom" // eslint-disable-line no-unused-vars
import ConnectedSwitch from "../routing/ConnectedSwitch"
import PrivateRoute from "../routing/PrivateRoute"
import Header from "../components/Header"
import Errors from "../components/Errors"
import MovieGrid from "./MovieGrid"
import CountryResults from "./CountryResults"
import LoginCard from "../components/LoginCard"
import SignupCard from "../components/SignupCard"
import MovieDetail from "../components/MovieDetail"
import Account from "../components/Account"
import Status from "../components/Status"
import AppDrawer from "../components/AppDrawer"
import AdminRoute from "../routing/AdminRoute"
import AdminPanel from "../containers/AdminPanel"
import "./normalize.css"
import UserReport from "./UserReport"
import BookingContainer from "../components/bookingComponents/BookingContainer";
import Navigation from "../components/bookingComponents/Navigation";
import ScheduleSelection from "../components/bookingComponents/ScheduleSelection";
import TicketSelection from "../components/bookingComponents/TicketSelection";
import PlaceSelection from "../components/bookingComponents/PlaceSelection";
import PersonalInfo from "../components/bookingComponents/PersonalInfo";
import Confirmation from "../components/bookingComponents/Confirmation";
import RegionSelection from "../components/bookingComponents/RegionSelection";
import MovieSelection from "../components/bookingComponents/MovieSelection";
import MovieSchedule from "./MovieSchedule";

class MainContainer extends Component {
  render() {
    return (
      <div id="full" style={{overflowX: "hidden"}}>
        <Header/>
        <AppDrawer/>
        <Errors/>
        <ConnectedSwitch>
          <AdminRoute
            path="/admin"
            component={AdminPanel}
            redirectRoute="/login"
          />
          <Route exact path="/" component={MovieGrid}/>
          <Route exact path="/phim-chieu-theo-gio" component={MovieSchedule}/>
          <Route exact path="/movies/id/:id" component={MovieDetail}/>
          <Route exact path="/country-results" component={CountryResults}/>
          {/*<Route exact path="/booking" component={Navigation}/>*/}

          <PrivateRoute
            path="/account"
            component={Account}
            redirectRoute="/login"
          />
          <Route exact path="/account" component={Account}/>
          {/*<Route path="/status" component={Status}/>*/}
          <Route path="/login" component={LoginCard}/>
          <Route path="/signup" component={SignupCard}/>
          <Route path="/user-report" component={UserReport}/>
        </ConnectedSwitch>
        <Route path="/booking" component={Navigation}/>
        <Switch>
          {/*<Route path="/booking" exact component={RegionSelection} />*/}
          {/*<Route path="/movies" exact component={MovieSelection} />*/}
          {/*<Route path="/booking/schedule"  component={ScheduleSelection}/>*/}
          <Route path="/booking/tickets" component={TicketSelection}/>
          <Route path="/booking/seats" component={PlaceSelection}/>
          <Route path="/booking/personal-details" component={PersonalInfo}/>
          <Route path="/booking/confirmation" component={Confirmation}/>
        </Switch>
      </div>
    )
  }
}

export default MainContainer
