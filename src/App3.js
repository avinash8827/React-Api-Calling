import './App.css';
import { Button,Table } from 'react-bootstrap';
import React, { useState } from 'react';
import swal from 'sweetalert';
const axios = require('axios');
const config = require('./config.json')
function App3() {
  const [student,setStudent] = useState({
    data:[],
    meta:{
      pagination:{
        page: '',
        pageCount: '',
        pageSize: '',
        total: ''
      }
    } 
  });
  let handleDelete = (e)=>{
     var tr = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); 
    var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    console.log(delid);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {

       //API Call
       try {
          let po = await axios.delete(`http://localhost:1337/api/students/${delid}`);
          tr.remove();
       } catch (error) {
          console.log(error)
       }
      } else {
      }
        
    });
  }

  let goToPage = (e)=>{
    console.log(e.target.innerHTML);
    var pageno = parseInt(e.target.innerHTML);
    getStudents(pageno);
  }

  let getStudents = (pageno=1)=>{
   // console.log(config.base_url);
   // console.log('good morning')
   
    try {
        fetch(`${config.base_url}/api/students?pagination[page]=${pageno}&pagination[pageSize]=10`)
        .then((data)=>{
          return data.json();
        }).then((data)=>{
          console.log(data);
          setStudent({
            ...student,
            data: student.data.concat(data.data),
            meta:data.meta
          });
        }).catch((err)=>{
          console.log(err);
        });


    } catch (error) {
      console.log(error)
    }
  }

  let loadMore = (e)=>{
   
      getStudents(student.meta.pagination.page + 1 );
    
    
  }
  return (
    <>
        <div >
          <h1 className="d-flex justify-content-center">Read Operation With Load More</h1>
          <Button onClick={(e)=>{ getStudents() }} variant="outline-dark">Get My Data</Button>
        </div>
        
        <br />
        <br />
        {
          student.data.length > 0 &&
          <React.Fragment>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
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
                            <Button variant="danger" onClick={(e)=>{ handleDelete(e) }} size="sm">Delete</Button>
                          </td>
                        </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            {
              (student.meta.pagination.page !== student.meta.pagination.pageCount) &&
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={(e)=>{ loadMore(e);  }}>Load More</Button>
              </div>
            }
           
          </React.Fragment>
        }
        
    </>
  );
}

export default App3;
