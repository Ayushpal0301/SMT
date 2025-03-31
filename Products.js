import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/AdminMenu'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Products = () => {
    const [products, setProducts]=useState([])

    //get all products
        const getallProducts =async()=>{
            try {
                const {data} = await axios.get('http://localhost:5000/api/v1/product/get-product')
                setProducts(data.products)
            } catch (error) {
                console.log(error);
                toast.error("Somthing went wrong")
            }
        }

        useEffect(()=>{
            getallProducts();
        },[])

  return (
    <Layout>
      <div className="row m-2">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <div className="card">
            <h1 className="text-center">All Product lists</h1>
            <div className='mt-2 d-flex flex-wrap'>
                {products?.map(p=>(
                    <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link '>
                    
                    <div class="card m-2" style={{width: "18rem"}} >
                    <img src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p class="card-text">{p.description}</p>
                      {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                  </div>
                  </Link>

                ))}
            </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
