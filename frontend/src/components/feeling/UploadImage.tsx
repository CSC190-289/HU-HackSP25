import { Upload } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import Image from "mui-image"
import React, { Dispatch, SetStateAction, useRef } from "react"

interface Props {
  buffer: string | ArrayBuffer
  setBuffer: Dispatch<SetStateAction<string | ArrayBuffer>>
}

export default function UploadImage(props: Props) {
  const { buffer: img, setBuffer: setImg } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setImg(reader.result as ArrayBuffer) // Update state with the file's base64 string
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return img ? (
    <Image src={img as string} alt='your image' fit='contain' height={256} />
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
