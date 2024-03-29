import React, { useEffect, useState } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios'

const Login=(props)=>{

    const paperStyle={padding :20,height:'75vh',width:280, margin:"100px auto"}
    const avatarStyle={backgroundColor:'grey'}
    const text={color:"white"}
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

     //Axios.defaults.withCredentials = true;

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
		const loginStatus = "True" ;
                navigate('/dashboardnpm')
		localStorage.setItem('user', JSON.stringify(response.data));
		localStorage.setItem('loginStatus',loginStatus);
	    }
	    })

};
    useEffect(() =>{
    	Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/login").then((response) => {
	if (response.data.loggedInd === true){
	console.log(response.data.user[0].username);
	}
	})
    }, [])

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>                     
                   <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                    <h2> Sign In</h2>
                </Grid>
                <TextField label='Username' value={name} onChange={(e) => setName(e.target.value)}type="username" variant="filled" fullWidth required/>
                <TextField label='Password' value={pass} onChange={(e) => setPass(e.target.value)} type="password" variant="filled" fullWidth required/>
                    <Button type='submit' variant="contained" onClick = {login} fullWidth>Login</Button>
                <p style={{color: 'red', marginTop: "10px", fontSize: '13px'}}>{loginStatus}</p>
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
