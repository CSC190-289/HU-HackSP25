import { RA } from "@/styles"
import { Card, CardContent, Typography } from "@mui/material"

// function decimalToTenScale(decimal: number): number {
//   return +(decimal * 10).toFixed(1) // one decimal place
// }

interface Props {
  feeling: string
  amount: number
}

export default function FeelCard(props: Props) {
  return (
    <RA.Zoom>
      <Card
        sx={{
          alignItems: "center",
          backgroundColor: "#7E4274",
          color: "#FFF",
        }}>
        <CardContent>
          <Typography variant='h6'>{props.feeling}</Typography>
          <Typography variant='h5'>{props.amount} %</Typography>
        </CardContent>
      </Card>
    </RA.Zoom>
  )
}
