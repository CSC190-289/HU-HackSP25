import FeelGrid from "@/components/FeelGrid"
import { firestore } from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { EntryNote } from "@/core/types"
import {
  AppBar,
  Box,
  Container,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { doc, DocumentSnapshot, getDoc, Timestamp } from "firebase/firestore"
import Image from "mui-image"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function formatTimestampToMonthDay(timestamp: Timestamp | undefined): string {
  if (!timestamp) {
    return ""
  }
  const date = timestamp.toDate()
  return date.toLocaleDateString("en-US", {
    month: "short", // "Apr"
    day: "numeric", // "12"
  })
}

function formatTimestampToTime(timestamp: Timestamp | undefined): string {
  if (!timestamp) {
    return ""
  }
  const date = timestamp.toDate()
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

export default function JourneyDetails() {
  const params = useParams()
  const auth = useAuthContext()
  const id = params.id ?? ""
  const [entry, setEntry] = useState<DocumentSnapshot<EntryNote> | null>(null)
  const navigate = useNavigate()

  if (!id) {
    void navigate("/")
  }

  useEffect(() => {
    if (auth.user) {
      const ref = doc(firestore, "users", auth.user.uid, "feelings", id)
      getDoc(ref)
        .then((x) => {
          setEntry(x as DocumentSnapshot<EntryNote>)
        })
        .catch(() => void navigate("/"))
    }
  }, [auth.user, id, navigate])

  console.debug(entry?.data())

  return (
    <React.Fragment>
      <AppBar position='relative' color='inherit'>
        <Toolbar>
          <Box flex={1}>
            <Typography fontWeight={"bolds"}>Your Journey Today</Typography>
            <Box display={"flex"}>
              <Typography>
                {formatTimestampToMonthDay(entry?.data()?.date)}
              </Typography>
              <Box flexGrow={1} />
              <Typography>
                {formatTimestampToTime(entry?.data()?.date)}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {entry?.exists() ? (
        <Container sx={{ mt: 2 }}>
          <Stack spacing={2}>
            {entry.data().picture && (
              <Image src={entry.data().picture} height={256} fit='contain' />
            )}
            <Typography textAlign={"initial"}>{entry.data().text}</Typography>
            <FeelGrid feels={entry.data().feelings} />
          </Stack>
        </Container>
      ) : (
        <LinearProgress />
      )}
    </React.Fragment>
  )
}
