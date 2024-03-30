import React, { useState } from 'react'
import Base from '../Base/Base'
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';

function AddStudents({students,setStudents,isAdded,setIsAdded}) {
    const history =useHistory();
    const [name,setName]=useState('');
    const [batch,setBatch]=useState('');
    const [gender,setGender]=useState('');
    const [qualification,setQualification]=useState(''); 
    
//2.create the add students function using API
const addstudents = async()=>{
    const newstudents={
        name,
        batch,
        gender,
        qualification,
    }
  try {
    const response = await fetch("https://student-mentor-backend-bice.vercel.app/students/add " ,{
      method:"POST",
      body:JSON.stringify(newstudents),
      headers :{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json()
   setIsAdded(!isAdded)
   setStudents([...students, data])
   history.push("/students")
  } catch (error) {
    console.error('Error adding teacher:', error);
  }
    
}

  return (
    <Base
    tittle={'NEW STUDENTS'}
    describe={'Enter your details below form'}
    >
      <div className='inp1'>
            <div className='inp'>
            <TextField sx={{ width: '50ch' }}
            id="outlined-basic" 
            label="Name" 
            variant="outlined"
            color="secondary"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />

            <TextField id="outlined-basic" 
            label="Batch" 
            variant="outlined"
            color="secondary"
            value={batch}
            onChange={(e)=>setBatch(e.target.value)}
            />

            <TextField id="outlined-basic" 
            label="Gender" 
            variant="outlined" 
            color="secondary"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            />

            <TextField id="outlined-basic" 
            label="Qualification" 
            variant="outlined" 
            color="secondary"
            value={qualification}
            onChange={(e)=>setQualification(e.target.value)}
            />
            </div>
            <div className='a-btn'>
            <Button variant="contained" color="secondary" 
            onClick={addstudents}
            >
            Submit</Button>
            </div>
        </div>
    </Base>
  )
}

export default AddStudents