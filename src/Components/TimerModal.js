import Timer from 'react-compound-timer';
import React, { useEffect, useState } from 'react';
import { Modal, CardContent, Card, Button } from '@material-ui/core';

const TimerModal = ({handleChoiceOneComplete, playerID, currentPlayer}) => {
    const [showButtons, setShowButtons] = useState(false);

    // When this component is loaded, dont show the buttons
    useEffect(() => {
        setShowButtons(false);
    }, []);

    // The timer will be displayed
    const body = () => {
        return (
            <Timer
                initialTime={10000}
                direction="backward"
                checkpoints={[
                    {
                        time: 0,
                        callback: () => setShowButtons(true),
                    },
                ]}
            >
                <p style={{ fontSize: '50px' }}>
                    <Timer.Seconds />
                </p>
            </Timer>)
    }
    return (
        <Modal
            open={true}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
        >
            <div style={{ backgroundColor: "white", width: "400px", height: "400px" }}>
                <Card >
                    <CardContent>
                        {body()}
                        {showButtons && playerID === currentPlayer ?
                            <>
                                <h2>Did you complete the challenge?</h2>
                                <Button onClick={() => handleChoiceOneComplete(true)}>Yes</Button>
                                <Button onClick={() => handleChoiceOneComplete(false)}>No</Button>
                            </>
                            : ""
                        }
                    </CardContent>
                </Card>
            </div>
        </Modal>
    )
}

export default TimerModal;