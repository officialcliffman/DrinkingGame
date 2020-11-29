import React, { useEffect, useState } from 'react';
import { Modal, Button, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SquareInfo = ({newSquare}) => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true)

  }, [newSquare])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={{backgroundColor: "white"}}>
      <IconButton onClick={handleClose}>
        <CloseIcon style={{color: "red"}} />
      </IconButton>
      <p>Hello</p>
    </div>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Open Modal
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        disableBackdropClick={true}
      >
        {body}
      </Modal>
    </div>
  );
}

export default SquareInfo;