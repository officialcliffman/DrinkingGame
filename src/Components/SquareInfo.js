import React, { useEffect, useState } from 'react';
import { Modal, Card, CardMedia, CardContent, Button } from '@material-ui/core';

const SquareInfo = ({ newSquare, playerPosition, handleContinueClick, handleSquareRule, currentPlayer, closeAllModal, playerID, playerMoney, playerCheckpoint, poison, handlePoisonButton }) => {
    // State to open and close modal
    const [open, setOpen] = useState(false);

    // open modal when a player is moved
    useEffect(() => {
        if (playerPosition[currentPlayer] !== 0) {
            setOpen(true)
        }
    }, [playerPosition, currentPlayer]);

    // Handle the close of the modal
    const handleClose = () => {
        setOpen(false);
        if (currentPlayer === playerID) {
            handleSquareRule();
        }
    }

    // Check to see if the player is poisoned
    const checkIfPoisoned = () => {
        if (poison && playerID === currentPlayer) {
            return true;
        } else {
            return false;
        }
    }

    // Checks to see if the user should be able to escape this square
    const checkIfEscapeDisabled = () => {
        if (playerID === currentPlayer && ((newSquare === 23 && playerCheckpoint === 0) || (newSquare === 39 && playerCheckpoint === 1))) {
            return true
        } else {
            return false;
        }
    }

    // Check to see if user can afford to purchase checkpoint
    const checkIfAffordable = () => {
        if (newSquare === 23 && playerMoney < 10) {
            return true;
        } else if (newSquare === 39 && playerMoney < 20) {
            return true;
        } else {
            return false;
        }
    }

    // The body of the modal
    const body = (
        <div style={{ backgroundColor: "white", width: "400px", height: "400px" }}>
            <Card >
                <CardMedia
                    image={'/Images/square' + newSquare + '.jpg'}
                    title="Square"
                    style={{ height: 400, width: 400 }}
                    width="50"
                    component="img"
                    alt={"Square " + newSquare + " image"}
                />

                {/* If the player reaches a checkpoint square which they haven't purchased yet*/}
                {checkIfEscapeDisabled() ?
                    <CardContent>
                        <h2>Pay to continue?</h2>
                        <Button disabled={checkIfAffordable()} onClick={() => handleContinueClick(true, newSquare)}>Yes</Button>
                        <Button onClick={() => handleContinueClick(false, newSquare)}>No</Button>
                    </CardContent>
                    :
                    ""}
                {/* If the player is poisoned*/}
                {checkIfPoisoned() ?
                    <CardContent>
                        <h2>Have you chugged yet?</h2>
                        <Button onClick={() => handlePoisonButton()}>Yes</Button>
                        <Button onClick={() => handleClose()}>No</Button>
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
                disableBackdropClick={checkIfEscapeDisabled() || checkIfPoisoned()}
                disableEscapeKeyDown={checkIfEscapeDisabled() || checkIfPoisoned()}
            >
                {body}
            </Modal>
        </>
    );
};

export default SquareInfo;