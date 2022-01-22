import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid,
  Box,
  Button,
  IconButton,
  Drawer,
  MenuItem,
  Link,
} from "@material-ui/core";
import logoImg from "/Users/andrewhumble/Documents/GitHub/pomoplaylist/src/favicon.ico";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#000000",
    paddingRight: "79px",
    paddingLeft: "118px",
  },
  logoStyle: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "900",
    color: "#FFFFFF",
    fontSize: "20px",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  "@media (max-width: 900px)": {
    paddingLeft: 0,
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

const headersData = [
  {
    label: "About Pomodoro",
    href: "/about",
  },
  {
    label: "Support PomoPlaylist",
    href: "/support",
  },
];

const Header = ({ logout }) => {
  const { header, menuButton, toolbar, drawerContainer, logoStyle } =
    useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1000
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {logo}
        <div>
          <Grid container>
            {getMenuButtons()}
            {getLogoutButtons()}
          </Grid>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{logo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const onClick = (e) => {
    logout();
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const getLogoutButtons = () => {
    return (
      <div>
        <Button
          {...{
            color: "inherit",
            className: menuButton,
          }}
          onClick={onClick}
        >
          Log OUT
        </Button>
      </div>
    );
  };

  const logo = (
    <div>
      <Grid container alignItems="center">
        <Box mt={0}>
          <img src={logoImg} alt="Logo" width="20" height="20" />
        </Box>
        <Box ml={1}>
          <Typography variant="h6" component="h1" className={logoStyle}>
            Pomo
          </Typography>
        </Box>
        <Box ml={0.15}>
          <Typography variant="h6" component="h1">
            Playlist
          </Typography>
        </Box>
      </Grid>
    </div>
  );

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Header;