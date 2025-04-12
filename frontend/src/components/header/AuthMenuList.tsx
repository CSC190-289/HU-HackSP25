import { MenuList } from "@mui/material"
import MenuItem from "./MenuItem"
import {
  AccountCircle,
  // BarChart,
  Book,
  // CalendarViewMonth,
  // Dashboard,
  EditNote,
  ExitToApp,
  // HowToVote,
} from "@mui/icons-material"
import api from "@/core/api/firebase"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/core/hooks"

interface AuthMenuListProps {
  handleClose: () => void
}

export default function AuthMenuList(props: AuthMenuListProps) {
  const { handleClose } = props
  const navigate = useNavigate()
  const { user, loading, error } = useAuthContext()

  const handleLogout = () => {
    api.auth
      .logout()
      .then(() => {
        void navigate("/")
        handleClose()
      })
      .catch((err) => console.debug(err))
  }

  if (error) {
    console.error(error)
    return <></>
  }

  if (loading) {
    return <></>
  }

  if (!user || user?.isAnonymous) {
    return <></>
  }

  return (
    <MenuList>
      <MenuItem icon={Book} to='/journey/log' onClick={handleClose}>
        Journey Log
      </MenuItem>
      <MenuItem icon={EditNote} to='/' onClick={handleClose}>
        Create Entry
      </MenuItem>
      {/* <MenuItem
        icon={CalendarViewMonth}
        to='/journey/today'
        onClick={handleClose}>
        Journey Today
      </MenuItem> */}
      <MenuItem icon={AccountCircle} to={"/profile"} onClick={handleClose}>
        Profile
      </MenuItem>
      <MenuItem icon={ExitToApp} onClick={handleLogout}>
        Logout
      </MenuItem>
    </MenuList>
  )
}
