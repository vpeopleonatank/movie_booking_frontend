import React, {Component} from "react"
import PropTypes from "prop-types"
import {withStyles} from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as movieActions from "../actions/movieActions"
import {compose} from "redux"

const mongo = green[500]

const getScoreBackground = score => {
  if (score >= 8) {
    return {backgroundColor: mongo}
  }
  if (score >= 6) {
    return {backgroundColor: "#3273dc"}
  }
  if (score) {
    return {backgroundColor: "red"}
  }
  return {backgroundColor: "rgba(0, 0, 0, 0)"}
}

const styles = {
  tile: {
    display: "inline-flex",
    background: "#242424",
    margin: "1vw",
    height: "675px",
    width: "320px",
    borderRadius: 4,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  img: {
    margin: "15px",
    alignSelf: "flex-center",
    width: "90%",
    height: "400px",
  },
  title: {
    color: mongo,
    fontWeight: 320,
    lineHeight: 1.125,
    fontSize: "1.125em",
    margin: "10px",
    fontFamily:
      "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
  },
  infoContainer: {
    margin: "15px",
  },
  year: {
    borderRadius: "100%",
    background: "#363636",
    padding: ".25em .75em",
    marginRight: "4px",
    color: "#E0E0E0",
    fontSize: ".9rem",
    fontFamily:
      "Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
  },
  rating: {
    borderRadius: "290486px",
    background: "#ffdd57",
    padding: ".25em .75em",
    marginLeft: "4px",
    color: "black",
    fontSize: ".9rem",
    fontFamily:
      "Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
  },
  cast: {
    color: "#E0E0E0",
    padding: "0 15px",
    fontWeight: 300,
    lineHeight: 1.2,
    fontSize: "18px",
  },
  imdb: {
    color: "#e0e0e0",
    fontSize: "14px",
  },
  scoreBackground: {
    color: "#e0e0e0",
    padding: "0 10px",
    borderRadius: "4px",
    fontSize: "14px",
  },
  rightHalf: {
    marginTop: "250px",
    // minWidth: "600px",
    maxWidth: "60%",
    // flexDirection: "column",
    // alignItems: "center",
    // flex: "0 0 auto",
    // height: "100vh",
    // justifyContent: "center",
  },
  leftHalf: {
    marginTop: "65px",
    // minWidth: "300px",
    // maxWidth: "30%",
    // flexDirection: "column",
    // alignItems: "center",
    // flex: "0 0 auto",
    // height: "100vh",
  },
  root: {
    display: "flex",
    background: "black",
    justifyContent: "space-around",
    width: "100vw",
    textAlign: "center",
    flexDirection: "row",
    flexFlow: "wrap",
  },
  writerSkittles: {
    marginTop: "10px",
    color: "white",
    fontSize: "30px",
    background: "#363636",
    padding: "5px",
    margin: "0 10px",
    borderRadius: "4px",
    float: "left",
    "&:hover": {
      // textDecoration: "underline",
      cursor: "pointer",
      background: mongo,
    },
  },
  skittlesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
}

class MovieScheduleTile extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  imgEvent({id, imgError}) {
    let img = document.getElementById(id)
    let canvas = img.parentNode
    let ctx = canvas.getContext("2d")
    if (imgError) {
      ctx.font = "20pt Calibri"
      ctx.textAlign = "center"
      ctx.fillStyle = "white"
      ctx.fillText("Image failed to load", 150, 222)
    } else {
      ctx.drawImage(img, 0, 0, 300, 444)
    }
  }

  handleClick() {
    this.props.movieActions.movieDetail(this.props.movie._id)
  }

  render() {
    const {classes, movie} = this.props
    const castText = movie.cast ? `Starring: ${movie.cast.join(", ")}` : ""
    const imdb =
      movie.imdb && movie.imdb.rating ? `IMDB: ${movie.imdb.rating} / 10` : ""

    const castBox = movie.cast ? (
      <div>
        <div className={classes.skittlesContainer}>
          {movie.cast.map((elem, ix) => (
            <span key={ix} className={classes.writerSkittles}>
              {elem}
            </span>

          ))}
        </div>
      </div>
    ) : (
      ""
    )
    return (
      <div>
        <div className={classes.root}>
          <div className={classes.leftHalf}>

            <div className={classes.tile} onClick={this.handleClick}>
              <Link style={{textDecoration: "none"}} to={`movies/id/${movie._id}`}>
                <canvas width={300} height={444} className={classes.img}>
                  <img
                    id={movie._id}
                    className={classes.img}
                    src={movie.poster || ""}
                    alt={movie.title}
                    title={movie.title}
                    onLoad={() => this.imgEvent({id: movie._id, imgError: false})}
                    onError={() => this.imgEvent({id: movie._id, imgError: true})}
                  />
                </canvas>
                <p className={classes.title}>{movie.title}</p>
                <div className={classes.infoContainer}>
                  <span className={classes.year}>{movie.year}</span>
                  {movie.rated && (
                    <span className={classes.rating}>{movie.rated}</span>
                  )}
                </div>
                <p className={classes.cast}>{castText}</p>
                <div>
                  {imdb && (
                    <span
                      className={classes.scoreBackground}
                      style={getScoreBackground(movie.imdb.rating)}
                    >
                {imdb}
              </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
          <div className={classes.rightHalf}>
            {castBox}

          </div>

        </div>
      </div>
    )
  }
}

MovieScheduleTile.propTypes = {
  movie: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    movieActions: bindActionCreators(movieActions, dispatch),
  }
}

export default compose(
  withStyles(styles),
  connect(
    () => ({}),
    mapDispatchToProps
  )
)(MovieScheduleTile)
