import React from "react";
import { withStyles } from "@mui/material/styles";
import Dialog from "@mui/material//Dialog";
import AppBar from "@mui/material//AppBar";
import Toolbar from "@mui/material//Toolbar";
import IconButton from "@mui/material//IconButton";
import Typography from "@mui/material//Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material//Slide";
import Button from "@mui/material//Button";
import BackButton from "./../../components/BackButton/BackButton";

const styles = {
  appBar: {
    position: "relative",
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: "relative",
    flex: 1,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    maxWidth: "350px",
    maxHeight: "100%",
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Cropped image
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <BackButton /> */}
          <div className={classes.imgContainer}>
            <img src={this.props.img} alt="Cropped" className={classes.img} />
          </div>

          <div className="d-flex">
            {" "}
            <Button
              variant="contained"
              color="primary"
              className="mx-auto"
              onClick={() => {}}
              // onClick={() => console.log(this.props)}
            >
              Update Profile
            </Button>
          </div>
          <div className="d-flex">
            <Button
              // color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
              color="primary"
              variant="contained"
              className="mx-auto mt-3"
            >
              <CloseIcon /> Change
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ImgDialog);
