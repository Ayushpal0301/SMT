import React from 'react'
import { NavLink } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';

const UserMenu = () => {
  return (
       <>
    <div className='text-center'>
    <h4>Dashboard </h4>
    <ListGroup as="ul" className='mt-3'> 
      <NavLink className='NavLink' to="/dashboard/user/profile" ><ListGroup.Item as="li" active>Profile</ListGroup.Item></NavLink>
     <NavLink className='NavLink' to="/dashboard/user/orders"> <ListGroup.Item as="li">Orders</ListGroup.Item></NavLink>
      
    </ListGroup>

</div>
    </>
  )
}

export default UserMenu
