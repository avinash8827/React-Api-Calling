import './App.css';
import { Button, Pagination, Table } from 'react-bootstrap';
import React, { useState } from 'react';

const config = require('./config.json')
function App() {
  const [student,setStudent] = useState({
    data:[]
  });//Empty Array

  const [paginationItem,setPaginationItem] = useState([<Pagination.Item >1</Pagination.Item>,<Pagination.Item>2</Pagination.Item>,<Pagination.Item>3</Pagination.Item>])// Empty Array

  let first = (e)=>{
    //console.log('First');
    if(student.meta.pagination.page !== 1){
      getStudents(1); 
    }
    
    
  }
  let last = (e)=>{

    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.pageCount);
    }

  }
  let prev = (e)=>{
    if(student.meta.pagination.page !== 1){
      getStudents(student.meta.pagination.page - 1 );
    }
    

  }
  let next = (e)=>{
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.page + 1);
    }
    

  }

  let getStudents = (pageno=1)=>{
    try {
        fetch(`${config.base_url}/api/students?pagination[page]=${pageno}&pagination[pageSize]=10`)
        .then((data)=>{
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
          <Button onClick={(e)=>{ getStudents() }} variant="outline-dark">Get My Friends</Button>
        
        <br />
        <br />
        {
          student.data.length > 0 &&
          <React.Fragment>
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
                   // console.log(arr[index].id);
                   // console.log(arr[index].attributes.name);
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
                    )//JSX
                  })
                }
                

              </tbody>
            </Table>
            <Pagination className="d-flex justify-content-center">
              <Pagination.First onClick={(e)=>{ first(e); }} />
              <Pagination.Prev onClick={(e)=>{ prev(e); }} />

              {
                paginationItem.length > 0 &&
                paginationItem.map(function(currentValue, index, arr){
                    return currentValue
                })
              }
              

              <Pagination.Next onClick={(e)=>{ next(e); }} />
              <Pagination.Last onClick={(e)=>{ last(e); }} />
            </Pagination>
          </React.Fragment>
        }
        
    </>
  );
}

export default App;