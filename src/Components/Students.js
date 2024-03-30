import React from 'react'
import Base from '../Base/Base'
import { Button, CardActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Students({students,setStudents}) {
    
    const history = useHistory();
async function deletestudents(studx){
     const response = await fetch(`https://student-mentor-backend-bice.vercel.app/students/delete/${studx}`,{
        method:'DELETE',
     })
     const data = await response.json();
     if(data.data){
    const remainstudents= students.filter((stud,idx)=>stud._id !==studx)
    setStudents(remainstudents)
    history.push("/students")
     }
}
  return (
   <Base
   tittle={'STUDENTS LIST'}
   describe={'You can edit and delete your details anytime'}
   >
     <div className='teach-card'>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table" >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><h3>S.No</h3></TableCell>
                      <TableCell align="center"><h3>NAME</h3></TableCell>
                      <TableCell align="center"><h3>BATCH</h3></TableCell>
                      <TableCell align="center"><h3>GENDER</h3></TableCell>
                      <TableCell align="center"><h3>QUALIFICATION</h3></TableCell>
                      <TableCell align="center"><h3>ACTION</h3></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((stud,idx) => (
                      <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                         <TableCell align="center">{idx+1}</TableCell>
                        <TableCell align="center" component="th" scope="row">{stud.name}</TableCell>
                        <TableCell align="center">{stud.batch}</TableCell>
                        <TableCell align="center">{stud.gender}</TableCell>
                        <TableCell align="center">{stud.qualification}</TableCell>
                        <TableCell align="center">

                        <CardActions>
                          <Button size="small"
                            onClick={()=>history.push(`/edits/${stud._id}`)}
                            ><EditIcon /></Button>

                            <Button size="small"
                             onClick={()=>deletestudents(stud._id)}
                            ><DeleteIcon color="error"/></Button>
                         </CardActions>
                        </TableCell>
                       
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>   
     </div>
   </Base>
  )
}

export default Students