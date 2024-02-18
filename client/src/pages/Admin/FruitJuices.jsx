import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FruitJuices = () => {
    const [fruitJuices, setFruitJuices] = useState([]);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('https://cannedjuice-backend.onrender.com/fruitJuices');
            setFruitJuices(data.fruitJuices);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    }
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <div className='dashboard'>
            <Layout>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-5'>
                        <h1 className='text-center mt-5'>All Fruit Juice List</h1>
                        <div className='d-flex flex-wrap'>
                            {fruitJuices?.map(fruitJuice => (
                                <Link key={fruitJuice._id} to={`/dashboard/admin/fruit-juice/${fruitJuice.slug}`} className='fruitJuice-link'>
                                    <div className="card m-2" style={{ width: '18rem' }} key={fruitJuice._id}>
                                        <img src={`https://cannedjuice-backend.onrender.com/fruitJuice/fruit-photo/${fruitJuice._id}`} className="card-img-top" alt={fruitJuice.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{fruitJuice.name}</h5>
                                            <p className="card-text">{fruitJuice.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>

    )
}

export default FruitJuices