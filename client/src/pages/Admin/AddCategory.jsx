import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //category add 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://cannedjuice-backend.onrender.com/category', { name });
            if (data?.success) {
                toast.success(`${name} is created.`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    }

    //getting all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('https://cannedjuice-backend.onrender.com/category');
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong get category!`);
        }
    };

    //get all category initially
    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`https://cannedjuice-backend.onrender.com/category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} updated successfully.`);
                setSelected(null);
                setUpdatedName('');
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    }

    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`https://cannedjuice-backend.onrender.com/category/${pId}`);
            if (data.success) {
                toast.success(`Category is deleted.`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    }
    return (
        <div className='dashboard'>
            <Layout>
                <div className='container-fluid m-3 p-4'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-6'>
                            <h1 className='adminManage'>Manage Category</h1>
                            <div className='p-3'>
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>
                            <div>
                                <div className='w-75'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories?.map((category) => (
                                                <tr key={category._id}>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(category.name); setSelected(category); }}>Edit</button>
                                                        <button className='btn btn-danger ms-2' onClick={() => { handleDelete(category._id) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}><CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} /></Modal>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AddCategory