import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography, useTheme} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";

const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'grey'}
    const btnstyle={margin:'8px 0'}
    const text={color:"white"}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>                     
                   <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                    <h2> Sign In</h2>
                </Grid>
                <TextField label='Username' variant="filled" fullWidth required/>
                <TextField label='Password' type='password' variant="filled" fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Link to="/dashboardnpm">
                    <Button type='submit' variant="contained" fullWidth>Sign in</Button>
                </Link>
                <Typography > 
                    <Link to = "#"  style= {text}>
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
export default Login