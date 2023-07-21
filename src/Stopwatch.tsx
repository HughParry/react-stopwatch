import { useState, useEffect } from "react";
import { Button, Box, Typography, List, ListItem } from "@mui/material";
import * as React from "react";

const formatTime = (time: number) => {
    const getTwoDigits = (num: number) => `0${num}`.slice(-2);

    const hours = getTwoDigits(Math.floor(time / 3600));
    const minutes = getTwoDigits(Math.floor((time % 3600) / 60));
    const seconds = getTwoDigits(time % 60);

    return `${hours}:${minutes}:${seconds}`;
};

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };
    const lap = () => {
        const lastLapTime = laps.length > 0 ? laps[laps.length - 1] : 0;
        setLaps([...laps, time - lastLapTime]);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h2">{formatTime(time)}</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" onClick={start}>
                    Start
                </Button>
                <Button variant="contained" onClick={stop}>
                    Stop
                </Button>
                <Button variant="contained" onClick={reset}>
                    Reset
                </Button>
                <Button variant="contained" onClick={lap}>
                    Lap
                </Button>
            </Box>
            <List>
                {laps.map((lap, i) => (
                    <ListItem key={i}>
                        Lap {i + 1}: {formatTime(lap)}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Stopwatch;
