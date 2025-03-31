import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox , Radio } from 'antd';
import { Prices } from '../Components/Prices';

const Homepage = () => {
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);

    //get all category
    const getAllCategory = async ()=>{
      try {
        const {data}= await axios.get(`http://localhost:5000/api/v1/category/get-category`);
        if(data?.success){
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(()=>{
      getAllCategory();
    },[]);

  //get Products

  const getAllProducts= async()=>{
    try {
      const {data}= await axios.get('http://localhost:5000/api/v1/product/get-product');
      setProducts(data.products);
      
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong")
    }
  }

  //filter all Category

  const handleFilter =(value, id)=>{
    let all = [...checked]
    if(value){
      all.push(id);
    }else{
     all = all.filter((c)=> c!== id);
    }
    setChecked(all)
  }


  useEffect(()=>{
   if(!checked.length || !radio.length) getAllProducts();
  },[checked.length, radio.length])

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
   },[checked,radio])

  // get filter

  const filterProduct = async()=>{
    try {
      const {data} = await axios.post('http://localhost:5000/api/v1/product/product-filters',{checked,radio,})
      setProducts(data?.products);

    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-3 m-1">
        <div className="col-md-2">
          <h6 className="ms-4">Filter by Category</h6>
          <div className="d-flex flex-column ms-5">
          {categories?.map(c=>(
            <Checkbox key={c._id} onChange={(e)=>{handleFilter(e.target.checked , c._id)}}>{c.name}</Checkbox>
          ))}
          </div>
          <h6 className="mt-2 ms-4">Filter by Price</h6>
          <div className="d-flex flex-column ms-5">
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
              {Prices?.map(p=>(
                <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))

              }
            </Radio.Group>
          </div>
        </div>
        <div className="col-md-10" >
          {JSON.stringify(radio,null,4)}
          <div className="text-center"><h1>All Products</h1>
          <div className="d-flex flex-wrap">
          {products?.map(p=>(
                    
                    <div class="card m-1" style={{width: "300px", height:"480px"}} >
                    <img src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`} style={{width:"298px", height:"300px"}} class="card-img-top" alt={p.name}/>
                    <div className="card-body">
                      <h5 className="card-title text-start">{p.name}</h5>
                      <p class="card-text text-start">{p.description}</p>
                      <p class="card-text text-danger fw-bold text-start"> ₹ {p.price}</p>
                      <button className="btn btn-secondary">More Details</button>
                      <button className="btn btn-primary ms-2">ADD TO CART</button>
                    </div>
                  </div>

                ))}

          </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Homepage
