import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import Crumb from "../Crumb"
import { Timestamp } from "firebase/firestore"
import UploadImage from "./UploadImage"
import Protip from "../today/Protip"
import FeelCard from "../FeelCard"

function formatTimestampToMonthDay(timestamp: Timestamp): string {
  const date = timestamp.toDate()
  return date.toLocaleDateString("en-US", {
    month: "short", // "Apr"
    day: "numeric", // "12"
  })
}

function formatTimestampToTime(timestamp: Timestamp): string {
  const date = timestamp.toDate()
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

function getRandomFeelingEmoji(): string {
  const emojis = [
    "😊", // happy
    "😢", // sad
    "😡", // angry
    "😴", // sleepy
    "🤓", // nerdy
    "😎", // cool
    "🥳", // celebrating
    "😱", // shocked
    "😇", // innocent
    "🤯", // mind-blown
    "🙃", // upside-down
    "🤗", // hug
    "🥺", // pleading
    "😬", // awkward
    "🤠", // yeehaw
  ]

  const randomIndex = Math.floor(Math.random() * emojis.length)
  return emojis[randomIndex]
}

export default function Feeling() {
  const [ts, setTS] = useState<Timestamp>(Timestamp.fromDate(new Date()))
  const [img, setImg] = useState<string>("")
  const [text, setText] = useState("")

  const handleSubmit = () => {
    /* TODO handle submission */
    console.debug("ts", ts)
    console.debug("img", img)
    console.debug("text", text)
  }

  return (
    <React.Fragment>
      <AppBar position='relative' color='inherit'>
        <Toolbar>
          <Crumb>
            <Typography textTransform={"uppercase"}>
              Today: {formatTimestampToMonthDay(ts)}
            </Typography>
          </Crumb>
          <Box flex={1} />
          <Crumb>
            <Typography>{formatTimestampToTime(ts)}</Typography>
          </Crumb>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <FeelCard feeling='Sad' amount={0.1} />
        <Stack spacing={2} mt={5}>
          <Typography variant='h5' fontWeight="medium">
            How are you feeling today? {getRandomFeelingEmoji()}
          </Typography>
          <UploadImage img={img} setImg={setImg} />
          <TextField
            label={"Share about your day ❣️"}
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button color='primary' variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
          <Protip />
        </Stack>
      </Container>
    </React.Fragment>
  )
}
