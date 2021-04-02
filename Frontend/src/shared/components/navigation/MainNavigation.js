// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'

import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailSharp from "@material-ui/icons/MailSharp";
import QuestionAnswerSharpIcon from "@material-ui/icons/QuestionAnswerSharp";
import LocalHospitalSharpIcon from "@material-ui/icons/LocalHospitalSharp";
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import WarningSharpIcon from '@material-ui/icons/WarningSharp';

import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MainNavigation() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Wrap It App ™
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Divider />
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <div>
        <ListItem button key="Injury" component={NavLink} to="/wounds/new">
            <ListItemIcon>
              <WarningSharpIcon />
            </ListItemIcon>
            <ListItemText primary="New Wound" />
          </ListItem>
          <Divider />
          <ListItem button key="Messages" component={NavLink} to="/messages">
            <ListItemIcon>
              <MailSharp />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button key="Appointments" component={NavLink} to="/appointments"> 
            <ListItemIcon>
              <QuestionAnswerSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
          <ListItem button key="Treatments" component={NavLink} to="/treatments">
            <ListItemIcon>
              <LocalHospitalSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Treatments" />
          </ListItem>
        </div>
        <Divider />

        <List>
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <DashboardSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="My Medical History">
            <ListItemIcon>
              <DescriptionSharpIcon />
            </ListItemIcon>
            <ListItemText primary="My Medical History" />
          </ListItem>
          <ListItem button key="Timeline">
            <ListItemIcon>
              <TimelineSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Timeline" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Files">
            <ListItemIcon>
              <AttachFileSharpIcon />
            </ListItemIcon>
            <ListItemText primary="My Files" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
