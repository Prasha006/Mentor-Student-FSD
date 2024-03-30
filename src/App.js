import './App.css';
import Dashboard from './Components/Dashboard';
import Teachers from './Components/Teachers';
import AddTeachers from './Components/AddTeachers';
import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import UpdateTeachers from './Components/UpdateTeachers';
import Students from './Components/Students';
import AddStudents from './Components/AddStudents';
import UpdateStudents from './Components/UpdateStudents';

function App() {
  const [teachers,setTeachers]=useState([]);
  const [students,setStudents]=useState([]);
  const [isAdded,setIsAdded] = useState(false)

  //1.create the function for get the data fro the API
useEffect(()=>{
    const  teachersData= async()=>{
      const response = await fetch("https://student-mentor-backend-bice.vercel.app/mentors/all",
      {method:'GET',});
      const data= await response.json();
      //console.log(data)
      setTeachers(data.data)
    }
    teachersData();

    const studentsData= async()=>{
      const response= await fetch("https://student-mentor-backend-bice.vercel.app/students/all",{
        method:"GET"
      }) ;
      const data = await response.json();
      //console.log(data)
      setStudents(data.data)
    }
    studentsData();
  },[isAdded])

  return (
    <div className="App">
        <Switch>
            <Route exact path="/">
                <Dashboard/>
            </Route>

            <Route path="/teachers">
                <Teachers
                teachers={teachers}
                setTeachers={setTeachers}
                />
            </Route>

            <Route path="/addteach">
                <AddTeachers
                 teachers={teachers}
                 setTeachers={setTeachers}
                 isAdded={isAdded}
                 setIsAdded={setIsAdded}
                />
            </Route>

            <Route path="/editt/:id">
                <UpdateTeachers
                 teachers={teachers}
                 setTeachers={setTeachers}
                />
            </Route>

            <Route path="/students">
              <Students
                students={students}
                setStudents={setStudents}
                />

            </Route>

            <Route path="/addstud">
                <AddStudents
                students={students}
                setStudents={setStudents}
                isAdded={isAdded}
                setIsAdded={setIsAdded}
                />
            </Route>

            <Route path="/edits/:id">
                <UpdateStudents
                students={students}
                setStudents={setStudents}
                isAdded={isAdded}
                setIsAdded={setIsAdded}
                />
            </Route>

        </Switch>

        
    </div>
  );
}

export default App;