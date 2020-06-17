import React, {Component} from "react"
import PropTypes from "prop-types"
import {withStyles} from "@material-ui/core/styles"
import throttle from "lodash.throttle"
import GridList from "@material-ui/core/GridList"
import Box from '@material-ui/core/Box';
// import { palette } from '@material-ui/system';

import MovieScheduleTile from "../components/MovieScheduleTile"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as movieActions from "../actions/movieActions"
import {compose} from "redux"
import CircularProgress from "@material-ui/core/CircularProgress"
import Facets from "../components/Facets"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";

const mongo = green[500]


const styles = theme => ({
  root: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "black",
    alignContent: "center",
    width: "100vw",
    minHeight: "100vh",
    height: "100%",
    flexBasis: 0,
  },
  gridList: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "black",
    width: "100vw",
    flexBasis: 0,
    flexGrow: 0,
    flexDirection: "column",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  skittlesHeader: {
    color: "white",
    marginBottom: "10px",
  },
  skittlesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "white",
  },
  picker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  colPicker: {
    marginTop: "10px",
    color: "white",
    fontSize: "30px",
    background: "#363636",
    padding: "5px",
    margin: "0 10px",
    borderRadius: "4px",
    float: "left",
  },
  button: {
    marginTop: "10px",
    height: "50px",
    color: "white",
    background: mongo,
    "&:hover": {
      // textDecoration: "underline",
      cursor: "pointer",
      background: mongo,
    },
  },
})

class MovieSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paging: false,
      movies: [],
      scheduleDate: new Date(),
      startTime: '00:00',
      endTime: '00:00',
    }
    this.onScroll = throttle(this.onScroll.bind(this), 1000)
  }

  handleDateChange = date => {
    this.setState({
      scheduleDate: date
    });
    console.log(date);
  };

  componentDidMount() {
    if (!this.props.movies || this.props.movies.movies.length === 0) {
      this.props.movieActions.fetchMovies()
    }
    window.addEventListener("scroll", this.onScroll, true)

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    console.log(this.state.scheduleDate);
    console.log(this.state.endTime);
    console.log(this.state.startTime);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, true)
    this.onScroll.cancel()
  }

  componentWillReceiveProps(props) {
    if (props.movies.movies.length === props.movies.total_results) {
      this.setState({paging: false})
      this.onScroll.cancel()
      window.removeEventListener("scroll", this.onScroll, true)
    }
    if (!props.movies.paging) {
      this.setState({paging: false})
      this.onScroll.cancel()
    }
  }

  onScroll() {
    const scroll = document.getElementById("root")
    console.log(this.props.movies.paging);
    console.log(document.body.offsetHeight + window.pageYOffset);
    console.log(scroll.scrollHeight-1500);
    console.log(this.props.movies.movies.length);
    console.log( this.props.movies.total_results);
    if (
      !this.props.movies.paging &&
      document.body.offsetHeight + window.pageYOffset >=
      scroll.scrollHeight - 1500 &&
      this.props.movies.movies.length !== this.props.movies.total_results
    ) {
      this.props.movieActions.beginPaging()
      this.props.movieActions.paginate(
        this.props.movies.movies,
        this.props.movies.page,
        this.props.movies.filters
      )
    }
  }

  timeRange = () => {
    var x = 15; //minutes interval
    var times = []; // time array
    var tt = 0; // start time

//loop to increment the time and push results in array
    for (var i = 0; tt < 24 * 60; i++) {
      var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      var mm = (tt % 60); // getting minutes of the hour in 0-55 format
      //times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)];
      if (hh < 10)
        times[i] = '0' + hh + ':';
      else times[i] = hh + ':';
      if (mm < 10) times[i] += '0' + mm; else times[i] += mm;

      tt = tt + x;
    }
    return times;
  }

  onSelectStartTime = time => {
    this.setState({
      startTime: time
    });
  }

  onSelectEndTime = time => {
    this.setState({
      endTime: time
    });
  }

  options = [
    'one', 'two', 'three'
  ];

  render() {
    const {classes} = this.props
    const movies = this.props.movies.shownMovies

    // console.log(movies)
    const shownMovies = movies ? (
      <div>
        <h4 className={classes.skittlesHeader}>Writers</h4>
        <div className={classes.skittlesContainer}>
          {movies.map((elem, ix) => (
            <span key={ix} className={classes.writerSkittles}>
              {elem.title}
            </span>
          ))}
        </div>
      </div>
    ) : (
      ""
    )


    if (
      !movies ||
      (movies.length === 0 &&
        (!this.props.errors.FetchMovieFailure ||
          !this.props.searchMovieFailure))
    ) {
      return (
        <div className={classes.loading}>
          <CircularProgress/>
        </div>
      )
    } else {
      return (
        <div
          className={this.props.classes.root}
          onScroll={this.onScroll}
          id="scroll"
        >
          <div className={classes.picker}>
            <DatePicker className={classes.colPicker} selected={this.state.scheduleDate}
                        onChange={this.handleDateChange} dateFormat='dd/MM/yyyy'
            />
            <Dropdown className={classes.colPicker} options={this.timeRange()} onChange={this.onSelectStartTime}
                      placeholder={this.timeRange()[0]} value={this.state.startTime}/>
            <Dropdown className={classes.colPicker} options={this.timeRange()} onChange={this.onSelectEndTime}
                      placeholder={this.timeRange()[0]} value={this.state.endTime}/>
            <Button className={classes.button} onClick={() => this.nextPath('/booking')}>
              Chọn
            </Button>
          </div>
          {/*<Facets />*/}
          {/*<CircularProgress />*/}
          {/*<Box bgcolor="text.primary">*/}
          <GridList
            cellHeight={600}
            className={this.props.classes.gridList}
            cols={1}
          >
            {movies.map(movie => <MovieScheduleTile key={movie._id} movie={movie}/>)}
          </GridList>
        </div>
      )
    }
  }
}

MovieSchedule.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({movies, errors}) {
  return {
    movies,
    errors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
  }
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MovieSchedule)
