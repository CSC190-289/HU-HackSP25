import { useAuthContext } from "@/core/hooks"
import { LinearProgress } from "@mui/material"
import React from "react"
import Splash from "./Splash"
import JournalEditor from "./JournalEditor"

/**
 * @brief Displays the main screen and conditionally renders based on
 * if user is authenticated.
 */
export default function Main() {
  const auth = useAuthContext()

  if (auth.loading) {
    return <LinearProgress />
  }

  return (
    <React.Fragment>
      {auth.user ? <JournalEditor /> : <Splash />}
    </React.Fragment>
  )
}
