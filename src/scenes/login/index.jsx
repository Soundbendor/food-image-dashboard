import React, { useState } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";

const Login=(props)=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'grey'}
    const text={color:"white"}
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>                     
                   <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                    <h2> Sign In</h2>
                </Grid>
                <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)}type="email" variant="filled" fullWidth required/>
                <TextField label='Password' value={pass} onChange={(e) => setPass(e.target.value)} type="password" variant="filled" fullWidth required/>
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
                    <Button type='submit' variant="contained" fullWidth>Login</Button>
                </Link>
                <Typography > 
                    <Link to = "/register"  style= {text}>
                        Sign Up 
                </Link>

                </Typography>
            </Paper>
        </Grid>
    )
}
export default Login