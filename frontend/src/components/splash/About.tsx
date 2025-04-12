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
              Reinventing the Classroom Experience
            </Typography>
          </RA.Bounce>
          <RA.Bounce triggerOnce>
            <Typography variant='subtitle1' gutterBottom>
              PulseCheck was created to address the challenges of engaging
              students in large lecture halls. As classrooms grow, keeping
              students attentive and involved becomes a monumental task. Our
              goal is to bridge the gap between lecture and participation
              through interactive, real-time polls and quizzes. Developed by a
              team of passionate educators and developers, PulseCheck’s mission
              is to enhance student engagement, provide instructors with instant
              feedback, and foster a more interactive, personalized learning
              experience.
            </Typography>
          </RA.Bounce>
        </CardContent>
      </Card>
    </Box>
  )
}

export default About
