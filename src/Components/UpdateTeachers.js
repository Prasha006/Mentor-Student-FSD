import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { Button, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

function UpdateTeachers({teachers,setTeachers}) {
    const history=useHistory();
    const {id} =useParams()
    console.log(id)
    //console.log(teachers)
    //const editTeachers =teachers[id]
    const editTeacher = teachers.find((teacher) => teacher._id === id);
    console.log(editTeacher)
    const [name,setName]=useState('');
    const [batch,setBatch]=useState('');
    const [gender,setGender]=useState('');
    const [qualification,setQualification]=useState('');
    
    useEffect(()=>{
      setName(editTeacher.name)
      setBatch(editTeacher.batch)
      setGender(editTeacher.gender)
      setQualification(editTeacher.qualification)
   
    },[editTeacher])

   async function editTeachers(){
        const updatedTeacher={
            name,
            batch,
            gender,
            qualification,   
        }
        try {
 
        const response = await fetch(`https://student-mentor-backend-bice.vercel.app/mentors/edit/${ editTeacher._id}`,{
          method:'PUT',
          body:JSON.stringify(updatedTeacher),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const data = await response.json();
        if (data) {
          const updatedTeachers = teachers.map((teacher) =>
            teacher._id === editTeacher._id ? updatedTeacher : teacher
          );
          setTeachers(updatedTeachers);
          history.push('/teachers');
        } else {
          console.error('Failed to update teacher:', data.error);
        }
      } catch (error) {
        console.error('Error updating teacher:', error);
      }
    }
    
  return (
    <Base
    tittle={'Update your details'}
    describe={''}
    >
        <div className='inp1'>
            <div className='inp'>
            <TextField sx={{ width: '50ch' }}
            id="outlined-basic" 
            label="Name" 
            variant="outlined"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />

            <TextField id="outlined-basic" 
            label="Batch" 
            variant="outlined"
            value={batch}
            onChange={(e)=>setBatch(e.target.value)}
            />

            <TextField id="outlined-basic" 
            label="Gender" 
            variant="outlined" 
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            />

            <TextField id="outlined-basic" 
            label="Qualification" 
            variant="outlined" 
            
            value={qualification}
            onChange={(e)=>setQualification(e.target.value)}
            />
            </div>
            <div className='a-btn'>
            <Button variant="contained" color="primary" 
            onClick={editTeachers}
            >
            Submit</Button>
            </div>
        </div>
    
    </Base>
  )
}

export default UpdateTeachers