import { firestore } from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { EntryNote } from "@/core/types"
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material"
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  Timestamp,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

export default function JourneyLog() {
  const navigate = useNavigate()
  const auth = useAuthContext()
  const [entries, setEntries] = useState<QuerySnapshot<EntryNote>>()

  console.debug(entries?.docs)

  useEffect(() => {
    if (auth.user) {
      const ref = collection(firestore, "users", auth.user.uid, "feelings")
      const q = query(ref, orderBy("date", "desc"))
      getDocs(q)
        .then((x) => {
          setEntries(x as QuerySnapshot<EntryNote>)
        })
        .catch((err) => console.debug(err))
    }
  }, [auth.user])

  const handleWriteEntryLog = () => {
    void navigate("/entry/create/")
  }

  return (
    <React.Fragment>
      <Container sx={{ mt: 2 }}>
        <Stack spacing={3}>
          <Typography variant='h5'>Journal Log</Typography>
          <Button variant='outlined' onClick={handleWriteEntryLog}>
            Write Your Entry Log
          </Button>
          <Grid2 container spacing={2}>
            {entries?.docs.map((x) => (
              <Grid2 key={x.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                <Card
                  sx={{ textAlign: "initial" }}
                  onClick={() => void navigate(`/entry/details/${x.id}`)}>
                  <CardActionArea>
                    <CardHeader
                      // avatar={<></>}
                      title={formatTimestampToMonthDay(x.data().date)}
                      subheader={formatTimestampToTime(x.data().date)}
                    />
                    <CardMedia
                      sx={{ objectFit: "contain" }}
                      component={"img"}
                      height={196}
                      image={x.data().picture}
                      alt={x.data().picture}
                    />
                    <CardContent>
                      <Typography>{x.data().text.slice(0, 30)}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Container>
    </React.Fragment>
  )
}
