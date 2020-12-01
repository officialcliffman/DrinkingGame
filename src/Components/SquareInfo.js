import React, { useEffect, useState } from 'react';
import { Modal, Card, CardMedia, CardContent, Button } from '@material-ui/core';
import { CheckBoxTwoTone } from '@material-ui/icons';
import createMixins from '@material-ui/core/styles/createMixins';

const SquareInfo = ({ newSquare, playerPosition, handleContinueClick, handleSquareRule, currentPlayer, closeAllModal, playerID }) => {
  // State to open and close modal
  const [open, setOpen] = useState(false);
  
  // open modal when a player is moved
  useEffect(() => {
    if(playerPosition[currentPlayer] !== 0){
      setOpen(true)
    }
  }, [playerPosition[currentPlayer]]);

  // Handle the close of the modal
  const handleClose = () => {
    setOpen(false);
    if(currentPlayer === playerID){
      handleSquareRule();
    }
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
        open={open && closeAllModal}
        onClose={() => handleClose()}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {body}
      </Modal>
    </>
  );
}

export default SquareInfo;