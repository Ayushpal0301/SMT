import React from 'react'
import { NavLink } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';
import '../index.css'

const AdminMenu = () => {
  return (
    <>
    <div className='text-center'>
    <h4>Admin Panel</h4>
    <ListGroup as="ul" className='mt-3'> 
      <NavLink className='NavLink' to="/dashboard/admin/create-category" ><ListGroup.Item as="li" active>Create Category</ListGroup.Item></NavLink>
     <NavLink className='NavLink' to="/dashboard/admin/create-product"> <ListGroup.Item as="li">Create Product</ListGroup.Item></NavLink>
     <NavLink className='NavLink' to="/dashboard/admin/products"> <ListGroup.Item as="li">All Products</ListGroup.Item></NavLink>
      <NavLink className='NavLink' to="/dashboard/admin/users"><ListGroup.Item as="li" > Users</ListGroup.Item></NavLink>
    </ListGroup>

</div>
    </>
  )
}

export default AdminMenu
