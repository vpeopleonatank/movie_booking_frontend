import React from "react"
import PropTypes from "prop-types"
import {withStyles} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import AccountPanel from "./AccountPanel"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import {Link, withRouter} from "react-router-dom"
import green from "@material-ui/core/colors/green"
import leaf from "../assets/mongoleaf.png"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as miscActions from "../actions/miscActions"
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive';
import {compose} from "redux"
import {useHistory} from "react-router-dom";

const mongo = green[500]

const styles = {
  root: {
    borderBottom: "1px solid gray",
  },
  drawer: {
    display: "inline-flex",
    alignItems: "center",
    color: "white",
  },
  lichchieu: {
    display: "inline-flex",
    alignItems: "center",
    color: "white",
  },

  appbar: {
    display: "flex",
    height: "120px",
    width: "100vw",
    background: "#000000",
    justifyContent: "space-around",
    flexFlow: "wrap",
    alignItems: "center",
  },
  typography: {
    textAlign: "center",
    fontSize: "3em",
    color: mongo,
    fontWeight: "600",
    lineHeight: "1.125",
    marginLeft: "100px",
    fontFamily:
      "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
  },
  leaf: {
    img: {
      height: "3em",
    },
  },
}


function Header(props) {
  function onClickLichChieu() {
    props.history.push('/phim-chieu-theo-gio');
    // props.miscActions.toggleDrawer();
  }

  const {classes} = props
  return (
    <div className={classes.root}>
      <div className={classes.appbar}>
        <IconButton
          className={classes.drawer}
          onClick={props.miscActions.toggleDrawer}
        >
          <SearchIcon/>
        </IconButton>
        <IconButton
          className={classes.lichchieu}
          onClick={onClickLichChieu}
        >
          <AirplanemodeActive/>
          Date Booking
        </IconButton>
        <Typography className={classes.typography} type="title">
          <Link style={{textDecoration: "none", color: mongo}} to="/">
            Mta Cinema
            <img
              id="mongoleaf"
              src={leaf}
              width="40px"
              height="40px"
              alt="leaf"
            />
          </Link>
        </Typography>
        <AccountPanel/>
      </div>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps({misc}) {
  return {
    misc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    miscActions: bindActionCreators(miscActions, dispatch),
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header)
