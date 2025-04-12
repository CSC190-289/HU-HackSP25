import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";




export default function Header() {

    const navigate = useNavigate()
    
    const handleNavigate = () => {
        void navigate("/register")
    }

    return(
        <Box>
            <Typography variant='h4' fontWeight={700} margin={4} gutterBottom>
                Let's Journey Together
            </Typography>

            <Button
                variant='outlined'
                color='primary'
                sx={{ mb : 3 }}
                onClick={handleNavigate}>
                Write Your First Entry
            </Button>
        </Box>
    )
}