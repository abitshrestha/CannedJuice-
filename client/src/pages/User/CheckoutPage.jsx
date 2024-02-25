import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const [cart, setCart] = useCart();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});

    const navigate=useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price * item.quantity;
            });
            const Currency = total.toLocaleString({
                style: "currency",
                currency: "NPR",
            });
            const formattedCurrency = `Rs. ${Currency}`;
            return formattedCurrency;
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!email.trim()) {
            errors.email = "Email is required";
        }
        if (!address.trim()) {
            errors.address = "Address is required";
        }
        if (!city.trim()) {
            errors.city = "City is required";
        }
        if (!phone.trim()) {
            errors.phone = "Phone is required";
        }

        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully");
            const orderData = {
                name: name,
                email: email,
                address: address,
                city: city,
                phone: phone,
                fruitJuices: cart.map((fruitJuice) => ({
                    name: fruitJuice.name,
                    price: fruitJuice.price,
                    quantity: fruitJuice.quantity,
                    total: fruitJuice.price * fruitJuice.quantity,
                })),
            };
            try {
                const response = await axios.post(
                    `https://cannedjuice-backend.onrender.com/orders`,
                    orderData
                );
                if(response.status===201){
                    setName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                    setCity('');
                    toast.success(response.data.message);
                }
            } catch (error) {
                console.log(error);
                if(error){
                    toast.success('Need to login!');
                    navigate('/login');
                }
            }
        } else {
            setErrors(errors);
        }
    };
    return (
        <Layout>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h2>Checkout</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <h4>Billing Information</h4>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && (
                                    <Form.Text className="text-danger">{errors.name}</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <Form.Text className="text-danger">{errors.email}</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {errors.address && (
                                    <Form.Text className="text-danger">
                                        {errors.address}
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                {errors.city && (
                                    <Form.Text className="text-danger">{errors.city}</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicZip">
                                <Form.Label>Phone No.</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your phone number . . ."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {errors.phone && (
                                    <Form.Text className="text-danger">{errors.phone}</Form.Text>
                                )}
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Place Order
                            </Button>
                        </Form>
                    </Col>
                    <Col md={4}>
                        <h4>Order Summary</h4>
                        <ul className="list-group mb-3">
                            {cart?.map((fruitJuice) => (
                                <li
                                    className="list-group-item d-flex justify-content-between lh-sm"
                                    key={fruitJuice._id}
                                >
                                    <div>
                                        <h6 className="my-0">{fruitJuice.name}</h6>
                                        <small className="text-muted">Rs. {fruitJuice.price}</small>
                                        <small className="text-muted">
                                            {" "}
                                            X {fruitJuice.quantity}
                                        </small>
                                    </div>
                                    <span className="text-muted">
                                        Rs. {fruitJuice.price * fruitJuice.quantity}
                                    </span>
                                </li>
                            ))}
                            {/* Add more items dynamically */}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>{totalPrice()}</strong>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default CheckoutPage;
