import React, { useEffect, useState } from 'react';
import { Modal, Card, CardMedia, CardContent, Button } from '@material-ui/core';

const SquareInfo = ({ newSquare, cells, handleContinueClick }) => {
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
      <Card >
        <CardMedia
          image={'/Images/square' + newSquare + '.jpg'}
          title="Square"
          style={{ height: 100 }}
          width="50"
          component="img"
          alt={"Square " + newSquare + " image"}
        />
        {newSquare === 23 ?
          <CardContent>
            <h2>Pay to continue?</h2>
            <Button onClick={() => handleContinueClick(true)}>Yes</Button>
            <Button onClick={() => handleContinueClick(false)}>No</Button>
          </CardContent>
          :
          ""}
      </Card>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {body}
      </Modal>
    </>
  );
}

export default SquareInfo;