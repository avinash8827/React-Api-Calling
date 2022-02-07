import logo from './logo.svg';
import './App.css';
import { Button,Table } from 'react-bootstrap';
import { useState } from 'react';

const config = require('./config.json')


function App() {

  const [student,setStudent] = useState({
    data:[]
  });

  //2. 
  let getStudents2 = (e)=>{
  //  console.log(student);
  }

  let getStudents = (e)=>{
    console.log(config.base_url);
   // console.log('good morning')
    
    try {
     
        fetch(`${config.base_url}/api/students`)
        .then((data)=>{
          //let make data json readable
          return data.json();
        }).then((data)=>{
          console.log(data);

         
          setStudent(data);
      


        }).catch((err)=>{
          console.log(err);
        });


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Read Operation</h1>
        <Button variant="outline-dark" onClick={(e)=>{ getStudents(e) }}>Get My Data</Button>
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Friend Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              student.data.map(function(currentValue, index, arr){
              //  console.log(arr[index].id);
              //  console.log(arr[index].attributes.name);
                return (
                    <tr key={index}>
                      <td>{arr[index].id}</td>
                      <td>{arr[index].attributes.name}</td>
                      <td>
                        <Button variant="success" size="sm">View</Button>&nbsp;
                        <Button variant="primary" size="sm">Edit</Button>&nbsp;
                        <Button variant="danger" size="sm">Delete</Button>
                      </td>
                    </tr>
                )
              })
            }
          </tbody>
        </Table>
    </>
  );
}

export default App;
