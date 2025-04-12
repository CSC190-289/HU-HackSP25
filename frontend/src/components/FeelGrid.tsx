import { Feel } from "@/core/types"
import { Grid2 } from "@mui/material"
import React from "react"
import FeelCard from "./FeelCard"

interface Props {
  feels: Feel[]
}

/**
 * @brief Displays FeelCards in a Grid
 */
export default function FeelGrid(props: Props) {
  return (
    <React.Fragment>
      <Grid2 container spacing={2}>
        {props.feels.map((x) => (
          <Grid2 key={x.name} size={{ xs: 6, sm: 6, md: 4 }}>
            <FeelCard feeling={x.name} amount={x.amount} />
          </Grid2>
        ))}
      </Grid2>
    </React.Fragment>
  )
}
