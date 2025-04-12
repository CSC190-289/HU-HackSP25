import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import React from "react"

function decimalToTenScale(decimal: number): number {
  return +(decimal * 10).toFixed(1) // one decimal place
}

interface Props {
  feeling: string
  amount: number
}

export default function FeelCard(props: Props) {
  return (
    <Card
      sx={{ alignItems: "center", backgroundColor: "#7E4274", color: "#FFF" }}>
      <CardContent>
        <Typography variant='h6'>{props.feeling}</Typography>
        <Typography>{decimalToTenScale(props.amount)} / 10</Typography>
      </CardContent>
    </Card>
  )
}
