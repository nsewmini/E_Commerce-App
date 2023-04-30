import React,{useState, useEffect} from 'react';
import Layout from './../../components/layout/layout';
import AdminMenu from './../../components/layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} = Select;

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [name,setname] = useState("")
  const [description,setdescription] = useState("")
  const [price,setPrice] = useState("")
  const [category,setcategory] = useState("")
  const [quantity,setquantity] = useState("")
  const [shipping,setshipping] = useState("")
  const [photo,setPhoto] = useState("")


  //get all category
  const getAllCategory = async () =>{
    try {
      const {data} = await axios.get('/api/v1/category/get-category');
      if(data?.success){
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong in getting category');

   }
  };
  useEffect(() =>{
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async(e) =>{
     e.preventDefault();
     try {
      const productData =new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);
      const {data} = axios.post('/api/v1/product/create-product', 
      productData );
      if(data?.success){
        toast.error(data?.message);
      }else{
       
        toast.success("product Created Sucessfully");
        navigate('/dashboard/admin/products');
      }
     } catch (error) {
       console.log(error);
       toast.error('something went wrong');
     }
  };

  return (
<Layout  title={"Dashboard - Create Product"}>
<div className="container-fluid m-3 p-3">
    <div className="row">
       <div className="col-md-3">
    
           <AdminMenu/>
       </div>
    <div className="col-md-9">
        <h1>Create product</h1>
        <div className='m-1 W-75'>
           <Select bordered={false} 
                   placeholder="select a category"
                   size="large"
                   className='form-select mb-3'
                   onChange={(value) => {setcategory(value)}}>

                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                         {c.name}
                      </Option>
                    ))}

           </Select>
           <div className='mb-3'>
              <label className='btn btn-outline-secondary col-md-12'>

              {photo ? photo.name : "Upload photo" }
              <input 
              type="file" 
              name="photo" 
              accept='image/*'
              onChange={(e) => setPhoto(e.target.files[0])}  
              hidden/>
              </label>
           </div>
           <div className='mb-3'>
            {photo && (
              <div className='text-center'>
                <img src={URL.createObjectURL(photo)}
                 alt="product_photo"
                 height={"200px"}
                 className='img img-responsive' />
              </div>
               )}
           </div>
              <div className='mb-3'>
                <input
                  type="text"
                  value={name}
                  placeholder='write a name'
                  className='form-control'
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                  type="text"
                  value={description}
                  placeholder='write a description'
                  className='form-control'
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                  type="number"
                  value={price}
                  placeholder='write a price'
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                  type="number"
                  value={quantity}
                  placeholder='write a quantity'
                  className='form-control'
                  onChange={(e) => setquantity(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <Select
                  bordered={false}
                  placeholder="select shipping"
                  size='large'
                  className='from-select mb-3'
                  onChange={(value) => {
                    setshipping(value);
                  }}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
        </div>
   </div>
  </div>
</div>
    </Layout>
  );
};

export default CreateProduct;