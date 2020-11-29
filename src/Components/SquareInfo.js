import React, { useEffect, useState } from 'react';
import { Modal, IconButton, Card, CardMedia } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SquareInfo = ({ newSquare, cells }) => {
  // State to open and close modal
  const [open, setOpen] = useState(false);

  // open modal when a player is moved
  useEffect(() => {
    if (newSquare !== 0) {
      setOpen(true)
    }
  }, [newSquare, cells]);

  // Handle the close of the modal
  const handleClose = () => {
    setOpen(false);
  };
  // The body of the modal
  const body = (
    <div style={{ backgroundColor: "white", width: "200px", height: "200px" }}>
      <IconButton onClick={handleClose}>
        <CloseIcon style={{ color: "red" }} />
      </IconButton>
      <Card >
        <CardMedia
          image={'/Images/square'+ newSquare + '.jpg'}
          title="Square"
          style={{ height: 100 }}
          width="50"
          component="img"
          alt={"Square " + newSquare + " image"}
        />
      </Card>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        disableBackdropClick={true}
      >
        {body}
      </Modal>
    </>
  );
}

export default SquareInfo;