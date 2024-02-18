import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart';
import { NavLink } from 'react-router-dom';

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const removeCartItem = (pid) => {
        try {
            //spreading cart
            let myCart = [...cart];
            //find index that match the removing id 
            let index = myCart.findIndex(item => item._id === pid);
            //removing matched id from myCart
            myCart.splice(index, 1);
            //setting new removed cart
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));

        } catch (error) {

        }
    }

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price * item.quantity});
            const Currency = total.toLocaleString({
                style: 'currency',
                currency: 'NPR',
            });
            const formattedCurrency = `Rs. ${Currency}`;
            return formattedCurrency;
        } catch (error) {
            console.log(error);
        }
    }
    //decrease quantity
    const decreaseQuantity = (fruitJuiceId) => {
        // Find the item in the cart with the specified ID
        const editItem = cart.find(item => item._id === fruitJuiceId);

        // If the item is found and its quantity is greater than 1
        if (editItem && editItem.quantity > 1) {
            // Update the quantity of the item
            const updatedCart = cart.map(item => {
                if (item._id === fruitJuiceId) {
                    // Decrease the quantity by 1
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            // Update the cart state with the updated item
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            totalPrice();
        } else {
            // If the item is not found or its quantity is already 1, do nothing
            return;
        }
    }
    //increase quantity
    const increaseQuantity = (fruitJuiceId) => {
        // Find the item in the cart with the specified ID
        const editItem = cart.find(item => item._id === fruitJuiceId);

        // If the item is found and its quantity is greater than 1
        if (editItem) {
            // Update the quantity of the item
            const updatedCart = cart.map(item => {
                if (item._id === fruitJuiceId) {
                    // Decrease the quantity by 1
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            // Update the cart state with the updated item
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            totalPrice();
        } else {
            // If the item is not found or its quantity is already 1, do nothing
            return;
        }
    }
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mt-4'>
                        <h1 className='text-center p-2'>
                            {`Hello,${auth?.token && auth?.user?.username}`}
                        </h1>
                        <h4 className='text-center mt-1'>
                            {cart?.length ? `You have ${cart?.length} item in your cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {
                            cart?.map(fruitJuice => (
                                <div className='row mb-2 card flex-row p-4' key={fruitJuice._id}>
                                    <div className='col-md-3'>
                                        <img src={`https://cannedjuice-backend.onrender.com/fruitjuice/fruit-photo/${fruitJuice._id}`} className='card-img-top cartImage' alt={fruitJuice.name} />
                                    </div>
                                    <div className='col-md-9'>
                                        <p>{fruitJuice.name}</p>
                                        <p>{fruitJuice.description}</p>
                                        <p>{fruitJuice.price}</p>
                                        <div className='btn-group' role='group' aria-label='Quantity'>
                                            <button type='button' className='btn btn-secondary' onClick={() => decreaseQuantity(fruitJuice._id)}>-</button>
                                            <button type='button' className='btn btn-outline-secondary'>{cart.find(item => item._id === fruitJuice._id)?.quantity}</button>
                                            <button type='button' className='btn btn-secondary' onClick={() => increaseQuantity(fruitJuice._id)}>+</button>
                                        </div>
                                        <button className='btn btn-danger ms-2' onClick={() => { removeCartItem(fruitJuice._id) }}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-md-4 text-center'>
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <h4>Total: {totalPrice()}</h4>
                        <NavLink to='/checkout' className='btn btn-success'>Proceed to checkout</NavLink>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage