import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

function UpdateStudents({students,setStudents,isAdded,setIsAdded}) {
    const history =useHistory();
    const {id}=useParams();
    //console.log(students)
    const editStudent= students.find((students)=>students._id ===id)
    console.log(editStudent)
    const [name,setName]=useState('');
    const [batch,setBatch]=useState('');
    const [gender,setGender]=useState('');
    const [qualification,setQualification]=useState('');

    useEffect(()=>{
        setName(editStudent.name)
        setBatch(editStudent.batch)
        setGender(editStudent.gender)
        setQualification(editStudent.qualification)
    },[editStudent])

const editStudents=async()=>{
    const newstudents={
        name,
        batch,
        gender,
        qualification,
    }
    try {
        const response = await fetch(`https://student-mentor-backend-bice.vercel.app/students/edit/${editStudent._id}`,{
        method:'PUT',
        body:JSON.stringify(newstudents),
        headers:{
            'Content-Type':'application/json'
    }
   });
   const data = await response.json();
   if(data){
    const updatedStudents = students.map((student)=>
    student._id === editStudent._id ? newstudents :student
    )
    setIsAdded(!isAdded)
    setStudents([updatedStudents])
    history.push("/students")
   }else {
    console.error('Failed to update student:', data.error);
  }
    } catch (error) {
        console.error('Error updating teacher:', error);
    }
   
}

  return (
     <Base
     tittle={'edit your details'}
     describe={''}
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
            onClick={editStudents}
            >
            Submit</Button>
            </div>
        </div>
     </Base>
  )
}

export default UpdateStudents