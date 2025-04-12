import { Button, Container, Stack, Typography } from "@mui/material"
import React from "react"

export default function JourneyLog() {
  return (
    <React.Fragment>
      <Container sx={{ mt: 2 }}>
        <Stack spacing={3}>
          <Typography variant='h5'>Journal Log</Typography>
          <Button variant='outlined'>Write Your Entry Log</Button>
        </Stack>
      </Container>
    </React.Fragment>
  )
}
