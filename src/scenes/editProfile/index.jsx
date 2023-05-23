import React, { useState } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography, Box,} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import DatePicker from 'react-datepicker'
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import moment from 'moment';
import Axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
export const EditProfile = (props) => {

    const text={color:"white"}
    const paperStyle={padding :20,height:'75vh',width:500, margin:"50px auto"}
    const avatarStyle={backgroundColor:'grey'}
  const userData = JSON.parse(localStorage.getItem('user'));	
    const [email, setEmail] = useState(userData[0].Email);
    const [name, setName] = useState(userData[0].UserName);
    const [age, setAge] = useState(userData[0].age);
    const [fname, setFName] = useState(userData[0].FName);
    const [lname, setLName] = useState(userData[0].LName);
        const [city, setCity] = useState(userData[0].City);
        const [state, setState] = useState(userData[0].State);
        const [phone, setPhone] = useState(userData[0].PhoneNumber);
        const [birth, setBirth] = useState(dayjs(userData[0].Birthday.slice(0,10)));
        const navigate = useNavigate();
    	const userid = userData[0].UserID;
	const [updateStatus, setUpdateStatus] = useState( "");
	var ValidUserName = "True"
    const update = async (e) => {

	  e.preventDefault();
        console.log(birth.$d)
        const date = moment(birth.$d).format("YYYY-MM-DD")
        console.log(date)
                var ValidUserName = "True"
	    var updated = "False"
	    setUpdateStatus("")
        if (!name.trim() || !email.trim() || !fname.trim() || !lname.trim() || age === "" || !city.trim() || !state.trim()) {
                 setUpdateStatus("Fill out all the boxes")
            } else if (!isNaN(+age) === false){
                setUpdateStatus("Age is not correct")

        }else if (!isNaN(+phone) === false || phone.length < 10){
                setUpdateStatus("Phone number must be at least 10 numbers")
        }else if(moment(birth).isValid() !== true){
                setUpdateStatus("Enter your birthday")
         }else if (!(validator.isEmail(email))){
            setUpdateStatus("Please enter valid email")

        }else{
                    console.log(date)
await Axios.get("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getUserNames").then(response => {
                        response.data.forEach(row=>{
                                if (row.UserName === name && row.UserName !== userData[0].UserName){
                                        setUpdateStatus("Username is taken Please enter another one")
                                        ValidUserName = "False"
                                }
                        })
})



              if (ValidUserName === "True") {
        await Axios.post("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/updateProfile", {
            username: name,
            email: email,
        fname: fname,
                        lname: lname,
                        age: age,
                        city: city,
                        state: state,
                        phone: phone,
                birth: date,
		userID: userData[0].UserID

        }).then((response) => {
            if(response.data.message){
                setUpdateStatus(response.data.message);
		updated = "True";
		//localStorage.setItem('change', JSON.stringify(response.data));
		//navigate('/profile')
            }else{
                setUpdateStatus("Error");
            }
	      
	      } )

        }
		if(updated === "True")
		{
			console.log(userid)
		 await Axios.post("http://ec2-54-203-249-218.us-west-2.compute.amazonaws.com:3002/DBApi/getUserByID", {userID: userid}).then((response) => {
                if(response.data){

			 localStorage.setItem('user', JSON.stringify(response.data));
		}
		})
		navigate('/profile')
		}
                ValidUserName = "True"
		updated = "False"
}



    }
    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
               <Avatar style={avatarStyle}><EditIcon/></Avatar>
                <h2> Edit Your Profile</h2>
            </Grid>

            <Grid container spacing={2}>
            <Grid item xs={6}>
	            <TextField required id="standard-required" label="First Name" value={fname} onChange={(e) => setFName(e.target.value)} type="fname" variant="filled" fullWidth/>
            
	    <TextField required id="standard-required"  label='Last Name' value={lname} onChange={(e) => setLName(e.target.value)} type="lname" variant="filled" fullWidth/>

            <TextField label='Age' value={age} onChange={(e) => setAge(e.target.value)} type="age" variant="filled" fullWidth required/>
                        <TextField label='City' value={city} onChange={(e) => setCity(e.target.value)} type="city" variant="filled" fullWidth required/>
                        <TextField label='State' value={state} onChange={(e) => setState(e.target.value)} type="state" variant="filled" fullWidth required/>
            </Grid>
            <Grid item xs={6}>
                        <TextField label='Username' value={name} onChange={(e) => setName(e.target.value)} type="name" variant="filled" fullWidth required/>
                        <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)}type="email" variant="filled" fullWidth required/>
             <TextField label='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" variant="filled" fullWidth required/>

                 <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker label='Choose your birthday' value={birth} onChange={(e) => setBirth(e)} type="birth" slotProps={{ textField: { fullWidth: true, variant: 'filled' } }} sx={{svg: 'grey', label: 'grey'}}/>
            </LocalizationProvider>
            </Grid>
                </Grid>
            <p style={{color: 'red', marginTop: "10px", fontSize:'13px'}}>{updateStatus}</p>
            <Box mt={1}>
                <Button type='submit' variant="contained" onClick = {update} size="large" >Update Profile</Button>
            <Typography mt={1}>
                    <Link to = "/profile"  style= {text}>
                        Cancel
                </Link>
            </Typography>
            </Box>

        </Paper>
    </Grid>
    )
}
export default EditProfile                     
