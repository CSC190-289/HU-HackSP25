import { Stack, Typography } from "@mui/material"
import React from "react"
import Crumb from "../Crumb"

const tips = [
  "Did you know? The capital of Guyana is Georgetown?",
  "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque  faucibus ex sapien vitae pellentesque sem placerat. In id cursus",
]

const getRandomTip = () => {
  const randomIndex = Math.floor(Math.random() * tips.length)
  return tips[randomIndex]
}

export default function Protip() {
  return (
    <React.Fragment>
      <Crumb>
        <Stack spacing={1} textAlign={"initial"}>
          <Typography>Some tips</Typography>
          <Typography>{getRandomTip()}</Typography>
        </Stack>
      </Crumb>
    </React.Fragment>
  )
}
