import FeelGrid from "@/components/FeelGrid"
import Feeling from "@/components/feeling/FeelingForm"
import { Feel } from "@/core/types"
import { Container } from "@mui/material"

const arr: Feel[] = [
  {
    name: "Sadness",
    amount: 0.1,
  },
  {
    name: "Anger",
    amount: 0.1,
  },
  {
    name: "Fear",
    amount: 0.2,
  },
  {
    name: "Freaky",
    amount: 0.3,
  },
  {
    name: "Joy",
    amount: 0.3,
  },
  {
    name: "Love",
    amount: 0.6,
  },
]

export default function Debug() {
  return (
    <Container>
      {/* <FeelGrid feels={arr} /> */}
      <Feeling/>
    </Container>
  )
}
