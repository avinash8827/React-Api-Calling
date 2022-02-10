import './App.css';
//  { Named Import }

import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useState } from 'react';

const config = require('./config.json')
function App() {


  const [student,setStudent] = useState({
    data:[]
  });//Empty Array

  const [paginationItem,setPaginationItem] = useState([])

  //2. Functions defination
  let goToPage = (e)=>{
    console.log(e.target.innerHTML);
    var pageno = parseInt(e.target.innerHTML);
    getStudents(pageno);
  }
  let first = (e)=>{
    console.log('First');
    if(student.meta.pagination.page !== 1){
      getStudents(1); // Actual Arguemtn
    }
    
    
  }
  let last = (e)=>{
    console.log('Last');

    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.pageCount);
    }

  }
  let prev = (e)=>{
    console.log('Prev');
    if(student.meta.pagination.page !== 1){
      getStudents(student.meta.pagination.page - 1 );
    }
    

  }
  let next = (e)=>{
    console.log('Next');
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.page + 1);
    }
    

  }

  let getStudents = (pageno=1)=>{
    console.log(config.base_url);
    try {
        fetch(`${config.base_url}/api/students?pagination[page]=${pageno}&pagination[pageSize]=10`)
        .then((data)=>{
          //let make data json readable
          return data.json();
        }).then((data)=>{
          console.log(data);
          setStudent(data);
          var start = data.meta.pagination.page
          var arr = []; //empty array;
          for (let i = start; i <= data.meta.pagination.pageCount; i++) {
            if(i == start){
              arr.push(<Pagination.Item active onClick={(e)=>{ goToPage(e) }}>{i}</Pagination.Item>); 
            }else{
              arr.push(<Pagination.Item onClick={(e)=>{ goToPage(e) }}>{i}</Pagination.Item>);
            }
            
          }

          setPaginationItem(arr)

        }).catch((err)=>{
          console.log(err);
        });


    } catch (error) {
      console.log(error)
    }
  }

  //3. Return statement JSX
  return (
    <>
          <h1>Read Operation</h1>
          <Button onClick={(e)=>{ getStudents() }} variant="outline-dark">Get My Data</Button>
        
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
                    console.log(arr[index].id);
                    console.log(arr[index].attributes.name);
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
              
                paginationItem.map(function(currentValue, index, arr){
                    return currentValue//JSX
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