import React from "react"
import "./styles/App.css"
import { Route, Routes } from "react-router-dom"
import { Screen } from "./screens"
import AppBar from "./components/header/AppBar"

export default function App() {
  return (
    <React.Fragment>
      <AppBar />
      <Routes>
        <Route path='/' element={<Screen.Main />} />
        <Route path='/debug' element={<Screen.Debug />} />
        <Route path='/entry/create/' element={<Screen.JournalEditor />} />
        <Route path='/entry/details/:id' element={<Screen.JourneyDetails />} />
        <Route path='/login' element={<Screen.Login />} />
        <Route path='/register' element={<Screen.Register />} />
        <Route path='/get-started' element={<Screen.GetStarted />} />
        <Route path='/privacy-policy' element={<Screen.PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<Screen.TermsOfService />} />
        <Route path='/profile' element={<Screen.Profile />} />
        <Route path='*' element={<Screen.NotFound />} />
      </Routes>
    </React.Fragment>
  )
}
