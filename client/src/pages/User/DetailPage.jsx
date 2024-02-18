import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart';

const DetailPage = () => {
    const { slug } = useParams();
    const [fruitJuice, setFruitJuice] = useState([]);
    const storedCart = JSON.parse(localStorage.getItem('cart'));

    const [cart, setCart] = useCart();

    useEffect(() => {
        async function getSingleJuice() {
            const response = await axios.get(`http://localhost:8085/fruitJuices/${slug}`);
            setFruitJuice(response.data.fruitJuice);
        }
        getSingleJuice();
        // console.log(storedCart);
    }, [slug]);

    return (
        <Layout>
            <Container className="mt-4">
                {fruitJuice && (
                    <Row>
                        <Col md={6}>
                            <Card>
                                <Card.Img variant="top" src={`http://localhost:8085/fruitJuice/fruit-photo/${fruitJuice._id}`} />
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{fruitJuice.name}</Card.Title>
                                    <Card.Text>{fruitJuice.description}</Card.Text>
                                    <Card.Text>Price: {fruitJuice.price}</Card.Text>
                                    <button className='btn btn-secondary ms-1' onClick={() => { 
                                        const existingItem=storedCart && storedCart.find(item=>item._id===fruitJuice._id);
                                        if(existingItem){
                                            const updatedCart=cart.map(item=>{
                                                if(item._id===fruitJuice._id){
                                                    return { ...item,quantity:item.quantity+1 };
                                                }
                                                return item;
                                            });
                                            setCart(updatedCart);
                                            localStorage.setItem('cart',JSON.stringify(updatedCart));
                                        }else{
                                            const newItem = { ...fruitJuice, quantity: 1 };
                                            setCart([...cart, newItem]); 
                                            localStorage.setItem('cart', JSON.stringify([...cart, newItem])); 
                                        }
                                         toast.success('Item added to cart.') }}>Add to cart</button>
                                    {/* <Button variant="primary" className='ms-2 p-2'>Buy now</Button> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </Layout>
    );
};

export default DetailPage;
