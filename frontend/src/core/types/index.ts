import { Timestamp } from "firebase/firestore"

/**
 * Represents a user in the system.
 */
export enum ThemeType {
  SYSTEM_THEME = "system-theme",
  LIGHT = "light",
  DARK = "dark",
}

export interface User {
  display_name: string
  email: string
  photo_url: string | null
  created_at: Timestamp
}

export type FeelType = "Sadness" | "Joy" | "Love" | "Anger" | "Fear" | "Freaky"

export interface Feel {
  name: FeelType
  amount: number
}

export interface EntryNote {
  date: Timestamp
  picture: string
  text: string
  feelings: Feel[]
}
