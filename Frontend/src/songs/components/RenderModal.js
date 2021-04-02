
import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

const RenderModal = (props) => {
    const [row, setRow] = useState(props);
    console.log(row);
    return <p>Clicked.</p>
}

export default RenderModal;