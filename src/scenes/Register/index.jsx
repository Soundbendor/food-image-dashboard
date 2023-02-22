import React, { useState } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@mui/material';
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
export const Register = (props) => {

    const text={color:"white"}
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'grey'}

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>                     
               <Avatar style={avatarStyle}><CreateIcon/></Avatar>
                <h2> Sign Up</h2>
            </Grid>
            <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} type="name" variant="filled" fullWidth required/>
            <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)}type="email" variant="filled" fullWidth required/>
            <TextField label='Password' value={pass} onChange={(e) => setPass(e.target.value)} type="password" variant="filled" fullWidth required/>
            <Link to="/">
                <Button type='submit' variant="contained" fullWidth>Submit</Button>
            </Link>
            <Typography > 
                    <Link to = "/"  style= {text}>
                        Cancel
                </Link>
            </Typography>

        </Paper>
    </Grid>
    )
}
export default Register