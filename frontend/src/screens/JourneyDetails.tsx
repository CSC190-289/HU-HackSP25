import { firestore } from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { EntryNote } from "@/core/types"
import { AppBar, Box, LinearProgress, Toolbar, Typography } from "@mui/material"
import { doc, DocumentSnapshot, getDoc, Timestamp } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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

export default function JourneyDetails() {
  const params = useParams()
  const auth = useAuthContext()
  const id = params.id ?? ""
  const [entry, setEntry] = useState<DocumentSnapshot<EntryNote> | null>(null)

  useEffect(() => {
    if (auth.user && id) {
      const ref = doc(firestore, "users", auth.user.uid, "feelings", id)
      getDoc(ref)
        .then((x) => {
          setEntry(x as DocumentSnapshot<EntryNote>)
        })
        .catch((err) => console.debug(err))
    }
  }, [auth.user, id])

  return (
    <React.Fragment>
      <AppBar position='relative' color='inherit'>
        <Toolbar>
          <Box>
            <Typography>Journey</Typography>
            <Box display={"flex"}>
              <Typography>
                {formatTimestampToMonthDay(entry?.data()?.date)}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {entry ? <></> : <LinearProgress />}
    </React.Fragment>
  )
}
