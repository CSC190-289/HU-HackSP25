import { storage } from "@/core/api/firebase"
import { useAuthContext } from "@/core/hooks"
import { Upload } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Image from "mui-image"
import React, { Dispatch, SetStateAction, useRef } from "react"

interface Props {
  picture: string
  setPicture: Dispatch<SetStateAction<string>>
}

export default function UploadImage(props: Props) {
  const auth = useAuthContext()
  const { picture, setPicture } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const fileUpload = async (payload: File, storagePath: string) => {
    const fileRef = ref(storage, storagePath)
    try {
      if (!auth.user) {
        throw new Error("Unauthroized")
      }
      const snapshot = await uploadBytes(fileRef, payload) // Uploads image
      const downloadURL = await getDownloadURL(snapshot.ref) // Gets download URL from firestore
      setPicture(downloadURL)
    } catch (error) {
      console.debug("An error has occurred: ", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0]
    if (chosen) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          void fileUpload(chosen, `feelings/${chosen.name}`)
          // setPicture({ name: chosen.name, buffer: reader.result }) // Update state with the file's base64 string
        }
      }
      reader.readAsDataURL(chosen)
    }
  }

  return picture ? (
    <Image src={picture} alt='your image' fit='contain' height={256} />
  ) : (
    <Box
      sx={{
        display: "flex",
        borderRadius: 3,
        borderStyle: "dashed",
        borderColor: "#f9c6c6",
        backgroundColor: "#FFEFEF",
        alignItems: "center",
        justifyContent: "center",
        height: 256,
        cursor: "pointer",
      }}
      onClick={handleClick}>
      <Box>
        <Typography>Share a picture of the day</Typography>
        <Upload color='action' />
        <input hidden type='file' onChange={handleFileChange} ref={inputRef} />
      </Box>
    </Box>
  )
}
