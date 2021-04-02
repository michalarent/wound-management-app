import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import WoundItem from "./WoundItem";
import "./WoundTable.css";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    maxWidth: "80%",
    marginLeft: "300px",
    position: "relative",
  },
}));

const WoundTable = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const auth = useContext(AuthContext);
  const userId = useParams().userId;

  const [loadedWounds, setLoadedWounds] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:5000/api/wounds/user/${userId}`
      );
      const responseData = await response.json();
      if (!response.ok) {
      } else {
        setLoadedWounds(responseData.wound);
        console.log(`Row below`);
      }
    };
    sendRequest();
  }, []);

  const columns = [
    {
      dataField: "name",
      text: "Wound Name",
      align: "left",
    },
    {
      dataField: "bodyPart",
      text: "Body Part",
      align: "left",
    },
    {
      dataField: "description",
      text: "Description",
      align: "left",
    },
    {
      dataField: "dateCreated",
      text: "Date Created",
      align: "left",
    },
    {
      dataField: "dateLastEdited",
      text: "Date Last Edited",
      align: "left",
    },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      setModalInfo(row);
      console.log(row);
      toggleTrueFalse();
    },
  };

  const onRowClick = (row) => {
    console.log(row);
  };

  const toggleTrueFalse = () => {
    setShowModal(handleOpen);
  };

  const ModalContent = () => {
    return (
      <Modal open={show} onClose={handleClose}>
        <WoundItem
          key={modalInfo.id}
          id={modalInfo.id}
          name={modalInfo.name}
          bodyPart={modalInfo.bodyPart}
          description={modalInfo.description}
          dateCreated={modalInfo.dateCreated}
        />
      </Modal>
    );
  };

  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={loadedWounds}
        columns={columns}
        rowEvents={rowEvents}
        striped
        condensed
      />
      {show ? <ModalContent /> : null}
    </div>
  );
};

export default WoundTable;
