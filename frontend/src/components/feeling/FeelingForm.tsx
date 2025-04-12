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
import { addDoc, collection, getDoc, Timestamp } from "firebase/firestore"
import UploadImage from "./UploadImage"
import Protip from "../today/Protip"
// import FeelCard from "../FeelCard"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { firestore, storage } from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"

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

// function getRandomFeelingEmoji(): string {
//   const emojis = [
//     "😊", // happy
//     "😢", // sad
//     "😡", // angry
//     "😴", // sleepy
//     "🤓", // nerdy
//     "😎", // cool
//     "🥳", // celebrating
//     "😱", // shocked
//     "😇", // innocent
//     "🤯", // mind-blown
//     "🙃", // upside-down
//     "🤗", // hug
//     "🥺", // pleading
//     "😬", // awkward
//     "🤠", // yeehaw
//   ]

//   const randomIndex = Math.floor(Math.random() * emojis.length)
//   return emojis[randomIndex]
// }

export default function FeelingForm() {
  const auth = useAuthContext()
  // const [emo, setEmo] = useState<string>(getRandomFeelingEmoji())
  const [ts, setTS] = useState<Timestamp>(Timestamp.fromDate(new Date()))
  const [buffer, setBuffer] = useState<string | ArrayBuffer>("")
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // setEmo(getRandomFeelingEmoji())
    setTS(Timestamp.fromDate(new Date()))
  }, [])

  const handleSubmit = () => {
    /* TODO handle submission */
    console.debug("ts", ts)
    console.debug("img", buffer)
    console.debug("text", text)
    const fileUpload = async (payload: ArrayBuffer, storagePath: string) => {
      setLoading(true)
      const fileRef = ref(storage, storagePath)
      try {
        if (!auth.user) {
          throw new Error("Unauthroized")
        }
        const cref = collection(firestore, "users", auth.user.uid, "feelings")
        const snapshot = await uploadBytes(fileRef, payload) // Uploads image
        const downloadURL = await getDownloadURL(snapshot.ref) // Gets download URL from firestore
        const fref = await addDoc(cref, {
          // Updates prompt_img field in question doc
          prompt_img: downloadURL,
        })
        await getDoc(fref)
      } catch (error) {
        console.debug("An error has occurred: ", error)
      }
      setLoading(false)
    }
    if (buffer) {
      void fileUpload(buffer as ArrayBuffer, "feelings")
    }
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
        {/* <FeelCard feeling='Sad' amount={0.1} /> */}
        <Stack spacing={2}>
          <Typography variant='h5'>How are we feeling today?</Typography>
          <UploadImage buffer={buffer} setBuffer={setBuffer} />
          <TextField
            label={"Tell us how are you feeling"}
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
