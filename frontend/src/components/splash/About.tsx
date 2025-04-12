import { RA } from "@/styles"
import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"

function About(props: { ref?: React.Ref<unknown> }) {
  return (
    <Box textAlign={"center"} ref={props.ref}>
      <RA.Bounce triggerOnce>
        <Typography variant='h5' fontWeight={700} mb={2}>
          About
        </Typography>
      </RA.Bounce>
      <Card>
        <CardContent>
          <RA.Bounce triggerOnce>
            <Typography fontWeight={700}>
              About the Journey
            </Typography>
          </RA.Bounce>
          <RA.Bounce triggerOnce>
            <Typography variant='subtitle1' gutterBottom>
            Journey is a mobile application allowing users to write daily 
            journal entries, serving as an emotional outlet to keep a daily record of the user’s feelings. As many people struggle to track their emotional fluctuations and share emotional states with trusted professionals 
            or individuals. 
            </Typography>
          </RA.Bounce>
        </CardContent>
      </Card>
    </Box>
  )
}

export default About
