import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import Landing from '../components/Layout/Landing';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [fruitJuices, setFruitJuices] = useState([]);
  const [total,setTotal]=useState(0);
  const [loading,setLoading]=useState(false);
  const [page,setPage]=useState(1);
  const navigate=useNavigate();
  
  //get total fruitJuices
  const getTotal=async()=>{
    try {
      const {data}=await axios.get('http://localhost:8085/fruitJuice-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }

  //get all fruitJuices
  const getFruitJuices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8085/fruitJuicesList/${page}`);
      setLoading(false);
      setFruitJuices(data.fruitJuices);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handleReadmore=(fruitJuiceSlug)=>{
    navigate(`/fruitJuices/${fruitJuiceSlug}`);
  }

  //load more
  const loadMore=async()=>{
    try {
      setLoading(true);
      const {data}=await axios.get(`http://localhost:8085/fruitJuicesList/${page}`);
      setLoading(false);
      //making new array concatenating different objects  
      setFruitJuices([...fruitJuices,...data?.fruitJuices]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(()=>{
    if(page===1) return;
    loadMore();
  },[page]);

  useEffect(() => {
    getFruitJuices();
    getTotal();
  }, []);
  return (
    <Layout>
      <div className='row'>
        <div className='row'>
          <div className='col-md-12'>
            <Landing />
          </div>
        </div>
        <div className='row mt-3'>
          <h1 className='text-center'>Shop</h1>
          <div className='col-md-1'></div>
          <div className='col-md-11'>
            <div className='d-flex flex-wrap'>
              {
                fruitJuices?.map(fruitJuice => (
                  <div className="card m-2" style={{ width: '18rem' }} key={fruitJuice._id}>
                    <img src={`http://localhost:8085/fruitJuice/fruit-photo/${fruitJuice._id}`} className="card-img-top" alt={fruitJuice.name} />
                    <div className="card-body">
                      <h5 className="card-title">{fruitJuice.name}</h5>
                      <p className="card-text">{fruitJuice.description.substring(0, 30)}...</p>
                      <p className="card-text"> Rs. {fruitJuice.price}</p>
                      <p className='readmore' onClick={()=>handleReadmore(fruitJuice.slug)}>Read more . . .</p>
                      {/* <button className='btn btn-secondary ms-1' onClick={()=>{const newItem={...fruitJuice,quantity:1};setCart([...cart,newItem]);localStorage.setItem('cart',JSON.stringify([...cart,newItem]));toast.success('Item added to cart.')}}>Add to cart</button> */}
                      {/* <button className='btn btn-primary ms-1'>Buy Now</button> */}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='m-2 p-3'>
              {fruitJuices && fruitJuices.length<total && (
                <button className='btn btn-warning' onClick={(e)=>{e.preventDefault();setPage(page+1)}}>{loading?'Loading . . .':'Load More'}</button>
              )}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default HomePage 