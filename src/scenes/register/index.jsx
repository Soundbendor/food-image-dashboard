import React, { useState } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography, Box,} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import DatePicker from 'react-datepicker'
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import moment from 'moment';
import CreateIcon from '@mui/icons-material/Create';
import Axios from 'axios'	
export const Register = (props) => {

    const text={color:"white"}
    const paperStyle={padding :20,height:'75vh',width:500, margin:"100px auto"}
    const avatarStyle={backgroundColor:'grey'}

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [phone, setPhone] = useState('');
	const [birth, setBirth] = useState('');
    const [registerStatus, setRegisterStatus] = useState( "");	
	const navigate = useNavigate();
    	var ValidUserName = "True"
    const register = async (e) => {
        e.preventDefault();	
	console.log(birth.$d)
	const date = moment(birth.$d).format("YYYY-MM-DD")
	console.log(date)
	 //password checklist
	var lowerCase = /[a-z]/g;
      var upperCase = /[A-Z]/g;
      var numbers = /[0-9]/g;
	setRegisterStatus("")
	if (!name.trim() || !email.trim() || !pass.trim() || !fname.trim() || !lname.trim() || !age.trim() || !city.trim() || !state.trim()) {
                 setRegisterStatus("Fill out all the boxes")
            } else if (!isNaN(+age) === false){
		setRegisterStatus("Age is not correct")

    	}else if (!isNaN(+phone) === false || phone.length < 10){
		setRegisterStatus("Phone number must be at least 10 numbers")
	}else if(moment(birth).isValid() !== true){
                setRegisterStatus("Enter your birthday")

	}else if (!pass.match(lowerCase) || !pass.match(upperCase) || !pass.match(numbers) || pass.length < 5){
         setRegisterStatus("Password needs to contain at least 6 characters 1 lowercase 1 uppercase 1 number");
	}else if (!(validator.isEmail(email))){
            setRegisterStatus("Please enter valid email")
            
	}else{
		    console.log(date)
await Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getUserNames").then(response => {
                        response.data.forEach(row=>{
                                if (row.UserName === name){
                                        setRegisterStatus("Username is taken Please enter another one")
                                	ValidUserName = "False"
				}
			})
})

	
		
              if (ValidUserName === "True") {
        await Axios.post("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/register", {
            username: name,
            email: email,
            password: pass,
	fname: fname,
			lname: lname,
			age: age,
			city: city,
			state: state,
			phone: phone,
		birth: date
        }).then((response) => {
            if(response.data.message){
                setRegisterStatus(response.data.message);
            }else{
                setRegisterStatus("Account Created Successfully");
		navigate('/');
	    }
        })
    	
	}
		ValidUserName = "True"
}

		
    }
    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>                     
               <Avatar style={avatarStyle}><CreateIcon/></Avatar>
                <h2> Sign Up</h2>
            </Grid>

	    <Grid container spacing={2}>
	    <Grid item xs={6}>
            <TextField label='First Name' value={fname} onChange={(e) => setFName(e.target.value)} type="fname" variant="filled" fullWidth required/>
		    <TextField label='Last Name' value={lname} onChange={(e) => setLName(e.target.value)} type="lname" variant="filled" fullWidth required/>
	    <TextField label='Age' value={age} onChange={(e) => setAge(e.target.value)} type="age" variant="filled" fullWidth required/>
                        <TextField label='City' value={city} onChange={(e) => setCity(e.target.value)} type="city" variant="filled" fullWidth required/>
                        <TextField label='State' value={state} onChange={(e) => setState(e.target.value)} type="state" variant="filled" fullWidth required/>
	    </Grid>
	    <Grid item xs={6}>
			<TextField label='Username' value={name} onChange={(e) => setName(e.target.value)} type="name" variant="filled" fullWidth required/>
			<TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)}type="email" variant="filled" fullWidth required/>
            <TextField label='Password' value={pass} onChange={(e) => setPass(e.target.value)} type="password" variant="filled" fullWidth required/>
	     <TextField label='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" variant="filled" fullWidth required/>

		 <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker label='Choose your birthday' value={birth} onChange={(e) => setBirth(e)} type="birth" slotProps={{ textField: { fullWidth: true, variant: 'filled' } }} sx={{svg: 'grey', label: 'grey'}}/>	
	    </LocalizationProvider>
	    </Grid>
		</Grid>
	    <p style={{color: 'red', marginTop: "10px", fontSize:'13px'}}>{registerStatus}</p>
	    <Box mt={1}>
                <Button type='submit' variant="contained" onClick = {register} size="large" >Submit</Button>
            <Typography mt={1}> 
                    <Link to = "/"  style= {text}>
                        Cancel
                </Link>
            </Typography>
	    </Box>

        </Paper>
    </Grid>
    )
}
export default Register
