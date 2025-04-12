import { Log } from "@/core/types";
import { BorderColor } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";

const today = new Date();

export default function LogCard() {
    return ( 
        <Card variant="outlined"  sx={{ borderRadius: 1 }}>
            <CardContent>
                <Typography>
                  TODAY: {today.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    )
}