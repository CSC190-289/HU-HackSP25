import { Box, Stack, Typography } from "@mui/material"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import React, { useState } from "react"
import { RA } from "@/styles"

function FAQs(props: { ref?: React.Ref<unknown> }) {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  return (
    <Box ref={props.ref}>
      <RA.Zoom triggerOnce>
        <Typography variant='h5' textAlign={"center"} fontWeight={700} mb={2}>
          FAQs
        </Typography>
      </RA.Zoom>
      <Stack spacing={4}>
        <RA.Zoom triggerOnce>
          <Accordion
            expanded={open1}
            onMouseEnter={() => setOpen1(true)}
            onMouseLeave={() => setOpen1(false)}>
            <AccordionSummary>
              <b>
                Q: How does Journey differentiate from other diary applications?
              </b>
            </AccordionSummary>
            <AccordionDetails>
              <b>A:</b> Journey allows for a more comfortable and informal
              record database for patient use or general use to any user signed
              up.
            </AccordionDetails>
          </Accordion>
        </RA.Zoom>
        <RA.Zoom triggerOnce>
          <Accordion
            expanded={open2}
            onMouseEnter={() => setOpen2(true)}
            onMouseLeave={() => setOpen2(false)}>
            <AccordionSummary>
              <b>Q: How does Journeys AI model work for users?</b>
            </AccordionSummary>
            <AccordionDetails>
              <b>A:</b> Through AI’s tool usage of sentiment analysis using
              natural processing languages, the app will record emotional
              patterns that the user records in their journal entries.
            </AccordionDetails>
          </Accordion>
        </RA.Zoom>
        <RA.Zoom triggerOnce>
          <Accordion
            expanded={open3}
            onMouseEnter={() => setOpen3(true)}
            onMouseLeave={() => setOpen3(false)}>
            <AccordionSummary>
              <b>Q: Do you have to pay to journal? </b>
            </AccordionSummary>
            <AccordionDetails>
              <b>A:</b> Journaling on the app is completely free for users who
              want to record their entries and be provided an outlet to write
              how they are feeling for the day. For further multipurposes, fees
              may apply for less limitations on certain features.
            </AccordionDetails>
          </Accordion>
        </RA.Zoom>
        {/* <RA.Zoom triggerOnce>
          <Accordion
            expanded={open4}
            onMouseEnter={() => setOpen4(true)}
            onMouseLeave={() => setOpen4(false)}>
            <AccordionSummary> 
               <b>Q: Can I use PulseCheck on my phone?</b>
            </AccordionSummary>
            <AccordionDetails>
              <b>A:</b> Absolutely! PulseCheck is fully responsive and works
              seamlessly mobile devices. 
            </AccordionDetails> 
          </Accordion>
        </RA.Zoom> */}
      </Stack>
    </Box>
  )
}

export default FAQs
