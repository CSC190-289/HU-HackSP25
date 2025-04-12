import { Box } from "@mui/material"
import React from "react"

interface Props {
  children: React.ReactNode
}

export default function Crumb(props: Props) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: "#FFEFEF",
        border: 1,
        borderColor: "#f9c6c6",
        borderWidth: 1,
        paddingBlock: 1,
        paddingInline: 2,
      }}>
      {props.children}
    </Box>
  )
}
