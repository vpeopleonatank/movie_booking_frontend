import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {compose} from "redux";

class Navigation extends React.Component
{


  render() {
        return (
            <div className="nav">                    
                {/*<NavLink to="/" exact className="nav-button" activeStyle={{backgroundColor: '#960018' }}>REGION</NavLink>*/}
                {/*<NavLink to="/movies" className="nav-button" activeStyle={{backgroundColor: '#960018' }}>MOVIE</NavLink>*/}
                <NavLink to="/booking/schedule" className="nav-button" activeStyle={{backgroundColor: '#960018' }}>SCHEDULE</NavLink>
                <NavLink to="/booking/tickets" className="nav-button" activeStyle={{backgroundColor: '#960018' }}>TICKETS</NavLink>
                <NavLink to="/booking/seats" className="nav-button" activeStyle={{backgroundColor: '#960018' }}>SEATS</NavLink>
                <NavLink to="/booking/personal-details" className="nav-button" activeStyle={{backgroundColor: '#960018' }}>PERSONAL INFO</NavLink>
                <NavLink to="/booking/confirmation" className="nav-button" activeStyle={{backgroundColor: '#960018' }}>CONFIRM</NavLink>
            </div>
        );
    }
}

// export default connect(null)(Navigation);
export default compose(
  withRouter,
  connect(null)
)(Navigation);