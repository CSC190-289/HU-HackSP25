import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"

export default function SignOutButton() {
  const navigate = useNavigate()
  const auth = getAuth()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        void navigate("/")
      })
      .catch((err) => console.debug(err))
  }
  return (
    <Button sx={{ mb: 1 }} onClick={handleSignOut}>
      log out
    </Button>
  )
}
