import { useState, useEffect, useRef, useCallback } from "react";
import {
    Button,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import * as React from "react";

const formatTime = (time: number, ms: number) => {
    const getTwoDigits = (num: number) => `0${num}`.slice(-2);

    const hours = getTwoDigits(Math.floor(time / 3600));
    const minutes = getTwoDigits(Math.floor((time % 3600) / 60));
    const seconds = getTwoDigits(time % 60);

    return `${hours}:${minutes}:${seconds}.${ms ?? 0}`;
};

const Stopwatch: React.FC = () => {
    const [laps, setLaps] = useState<number[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<number>();
    const startTimeRef = useRef<number>();
    const lapTimeRef = useRef<number>();
    const timerDisplayRef = useRef<HTMLHeadingElement>(null);

    const update = useCallback((timestamp: number) => {
        const elapsed = Math.floor(
            (timestamp - (startTimeRef.current ?? 0)) / 1000
        );
        const ms = Math.floor((timestamp - (startTimeRef.current ?? 0)) % 1000);
        if (timerDisplayRef.current) {
            timerDisplayRef.current.textContent = formatTime(elapsed, ms);
        }
        timerRef.current = requestAnimationFrame(update);
        document.title = formatTime(elapsed, ms);
    }, []);

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        if (timerDisplayRef.current) {
            timerDisplayRef.current.textContent = formatTime(0, 0);
        }
        setLaps([]);
    };

    const lap = () => {
        const lapTime = performance.now();
        const lapSeconds = Math.floor(
            (lapTime - (lapTimeRef.current ?? 0)) / 1000
        );
        lapTimeRef.current = lapTime;
        setLaps([...laps, lapSeconds]);
    };

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = performance.now();
            lapTimeRef.current = performance.now();
            timerRef.current = requestAnimationFrame(update);
        } else {
            cancelAnimationFrame(timerRef.current ?? 0);
        }
        return () => cancelAnimationFrame(timerRef.current ?? 0);
    }, [isRunning, update]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h2" ref={timerDisplayRef}>
                {formatTime(0, 0)}
            </Typography>
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
                        <ListItemText
                            primary={`Lap ${i + 1}`}
                            secondary={formatTime(lap, 0)}
                        />{" "}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Stopwatch;
