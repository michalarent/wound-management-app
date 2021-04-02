import React, { useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core/styles";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
  };
}

// const themeLight = createMuiTheme({
//   palette: {
//     background: {
//       default: "white"
//     }
//   }
// });

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(),
      marginLeft: "350px",
    },
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
      palette: {
        background: {
          default: "black",
        },
      },
    },
  },
  toolbar: theme.mixins.toolbar,
  appBarSpacer: theme.mixins.toolbar,
}));

export function Form(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <MuiThemeProvider>
        <CssBaseline />
        <form className={classes.root}>{props.children}</form>
      </MuiThemeProvider>
    </>
  );
}
