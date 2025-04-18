import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../Components/Form/Categoryform'
import {Modal} from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name , setName] = useState("");
  const [visible , setVisible] = useState(false);
  const [selected , setSelected] = useState(null);
  const [updatedName , setUpdatedName] = useState("");
  //handle form
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/api/v1/category/create-category',{name});
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
        setName("");
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form")
    }
  }
  //get all category
  const getAllCategory = async ()=>{
    try {
      const {data}= await axios.get(`http://localhost:5000/api/v1/category/get-category`);
      if(data.success){
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category')
    }
  };

  useEffect(()=>{
    getAllCategory();
  },[]);

  //update category
  const handleUpdate =async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.put(`http://localhost:5000/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
      }else{
        toast.error(data.message)

      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }

   //Delete category
   const handleDelete =async(pId)=>{
    try {
      const {data} = await axios.delete(`http://localhost:5000/api/v1/category/delete-category/${pId}`)
      if(data.success){
        toast.success(`Category is deleted`)
        getAllCategory()
      }else{
        toast.error(data.message)

      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }
  return (
    <Layout title={"Dashboard - Create Category"}>
       <div className="container-fluid mt-3 p-3">
        <div className="row ">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <div className="card">
                 <h1 className='text-center pt-2'>Manage Category</h1> 
                 <div className='p-3 w-50'><Categoryform handleSubmit={handleSubmit} value={name} setValue={setName}/></div>
                  <div className='pe-4 ps-4'>
                  <table className="table table-striped">
                    <thead>
                    <tr>
                    <th scope="col" className='w-75'>Name</th>
                    <th scope="col" className='text-center'>Actions</th>
                      </tr>
                    </thead>
                     <tbody>
                     {categories.map(c =>(

                       <tr key={c._id}>
                          <>
                          <td>{c.name}</td>
                          <td className='text-center'>
                            <button className='btn btn-primary me-1' onClick={()=>{setVisible(true) ; setUpdatedName(c.name);setSelected(c);}} >Edit</button>
                            <button className='btn btn-danger ms-1' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                          </td>
                          </>
                        </tr>
                        ))}

                      </tbody>
                  </table>
                  </div>
                  <Modal  onCancel={()=>setVisible(false)} footer={null} visible={visible}> <Categoryform  value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/></Modal>
                </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
