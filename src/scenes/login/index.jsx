import React, { useState } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'

const Login=(props)=>{

    const paperStyle={padding :20,height:'70vh',width:280, margin:"100px auto"}
    const avatarStyle={backgroundColor:'grey'}
    const text={color:"white"}
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();
    const login = (e) => {
        e.preventDefault();
        Axios.post("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/login", {
            username: name,
            password: pass,
        }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message);
            }else{
                setLoginStatus(response.data[0].name);
                navigate('/dashboardnpm')
            }
        })
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>                     
                   <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                    <h2> Sign In</h2>
                </Grid>
                <TextField label='Username' value={name} onChange={(e) => setName(e.target.value)}type="username" variant="filled" fullWidth required/>
                <TextField label='Password' value={pass} onChange={(e) => setPass(e.target.value)} type="password" variant="filled" fullWidth required/>
                {/* <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                     label="Remember me"
                 /> */}
                {/* <Link to="/dashboardnpm"> */}
                    <Button type='submit' variant="contained" onClick = {login} fullWidth>Login</Button>
                {/* </Link> */}
                <h10 style={{color: 'red', marginTop: "10px"}}>{loginStatus}</h10>
                <Typography style={{marginTop: "10px"}}> 
                    <Link to = "/register"  style= {text}>
                        Sign Up 
                </Link>

                </Typography>
            </Paper>
        </Grid>
    )
}
export default Login
