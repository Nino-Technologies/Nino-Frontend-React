import React from "react";
import { styled } from "@mui/system"; // Import styled
import Dialog from "@mui/material/Dialog.jsx";
import AppBar from "@mui/material/AppBar.jsx";
import Toolbar from "@mui/material/Toolbar.jsx";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
// import BackButton from "./../../components/BackButton/BackButton.jsx";

const AppBarStyled = styled(AppBar)({
  position: "relative",
});

const ImgContainer = styled("div")({
  position: "relative",
  flex: 1,
  padding: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ImgStyled = styled("img")({
  maxWidth: "350px",
  maxHeight: "100%",
});

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
    const { img, onClose } = this.props; // Destructure props for easier access
    return (
      <Dialog
        fullScreen
        open={!!img}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <div>
          <AppBarStyled>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" sx={{ flex: 1 }}>
                Cropped image
              </Typography>
            </Toolbar>
          </AppBarStyled>
          <ImgContainer>
            <ImgStyled src={img} alt="Cropped" />
          </ImgContainer>

          <div className="d-flex">
            <Button
              variant="contained"
              color="primary"
              className="mx-auto"
              onClick={() => { }}
            >
              Update Profile
            </Button>
          </div>
          <div className="d-flex">
            <Button
              onClick={onClose}
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

export default ImgDialog;
