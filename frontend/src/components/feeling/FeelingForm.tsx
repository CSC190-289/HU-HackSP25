import {
  AppBar,
  Box,
  Button,
  Container,
  LinearProgress,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import Crumb from "../Crumb"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import UploadImage from "./UploadImage"
import Protip from "../today/Protip"
// import FeelCard from "../FeelCard"
import { firestore } from "@/core/api/firebase"
import { useAuthContext, useSnackbar } from "@/core/hooks"
import { useNavigate } from "react-router-dom"
import { Feel } from "@/core/types"

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

export default function FeelingForm() {
  const auth = useAuthContext()
  const [emo, setEmo] = useState<string>(getRandomFeelingEmoji())
  const [ts, setTS] = useState<Timestamp>(Timestamp.fromDate(new Date()))
  const [picture, setPicture] = useState<string>("")
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const snack = useSnackbar()

  useEffect(() => {
    setEmo(getRandomFeelingEmoji())
    setTS(Timestamp.fromDate(new Date()))
  }, [])

  const handleSubmit = () => {
    // console.debug("ts", ts)
    // console.debug("img", buffer)
    // console.debug("text", text)
    const createEntryNote = async () => {
      setLoading(true)
      try {
        if (!auth.user) {
          throw new Error("Unauthroized")
        }
        const cref = collection(firestore, "users", auth.user.uid, "feelings")
        const res = await fetch("http://209.97.147.167:8000/journey/", {
          method: "POST",
          body: JSON.stringify({
            raw_string: text,
          }),
        })
        if (!res.ok) {
          throw new Error()
        }
        const payload = (await res.json()) as unknown as string[]
        console.debug("payload", payload)
        const feels: Feel[] = [
          {
            name: "Sadness",
            amount: parseFloat(payload[0]),
          },
          {
            name: "Joy",
            amount: parseFloat(payload[1]),
          },
          {
            name: "Love",
            amount: parseFloat(payload[2]),
          },
          {
            name: "Anger",
            amount: parseFloat(payload[3]),
          },
          {
            name: "Fear",
            amount: parseFloat(payload[4]),
          },
          {
            name: "Surprise",
            amount: parseFloat(payload[5]),
          },
        ]
        console.debug("feels", feels)
        await addDoc(cref, {
          // Updates prompt_img field in question doc
          date: ts,
          text: text,
          picture: picture,
          /* TODO - talk to AI model */
          feelings: feels,
        })
        // await getDoc(fref)
        void navigate("/")
      } catch (error) {
        console.debug("An error has occurred: ", error)
        snack.show({
          position: {
            horizontal: "center",
            vertical: "top",
          },
          message: "An error has occured. Try again later.",
          type: "error",
        })
      }
      setLoading(false)
    }
    void createEntryNote()
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
      {loading && <LinearProgress />}
      <Container sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <Typography variant='h5'>How are we feeling today? {emo}</Typography>
          <UploadImage picture={picture} setPicture={setPicture} />
          <TextField
            label={"Share about your day ❣️"}
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            color='primary'
            variant='contained'
            disabled={loading}
            onClick={handleSubmit}>
            Submit
          </Button>
          <Protip />
        </Stack>
      </Container>
    </React.Fragment>
  )
}
