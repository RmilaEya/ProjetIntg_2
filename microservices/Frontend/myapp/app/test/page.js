'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CART_SERVICE_URL = 'http://localhost:5001/api/cartItems'; 

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    // Fonction pour récupérer les articles du panier
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${CART_SERVICE_URL}`);
            setCart(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération du panier", error);
        }
    };

    // Charger le panier au montage du composant
    useEffect(() => {
        fetchCartItems();
    }, []);

    // Ajouter un produit au panier
    const addToCart = async () => {
        if (!productId) {
            setMessage('Veuillez entrer un ID de produit.');
            return;
        }
        try {
            const response = await axios.post(`${CART_SERVICE_URL}`, { productId, quantity });
            setMessage('Produit ajouté avec succès !');
            setProductId('');
            setQuantity(1);
            fetchCartItems(); // Rafraîchir la liste des articles
        } catch (error) {
            setMessage(error.response?.data?.error || 'Erreur lors de l ajout du produit.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Panier</h1>
            {message && <p className="text-red-500">{message}</p>}
            
            {/* Formulaire pour ajouter un produit */}
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="ID du produit" 
                    value={productId} 
                    onChange={(e) => setProductId(e.target.value)} 
                    className="border p-2 mr-2"
                />
                <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    className="border p-2 mr-2 w-20"
                />
                <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2">Ajouter</button>
            </div>

            {/* Liste des articles du panier */}
            <ul className="border p-4">
                {cart.length > 0 ? (
                    cart.map(item => (
                        <li key={item._id} className="p-2 border-b">
                            {item.productName} - {item.quantity} x {item.price} = {item.price}
                        </li>
                    ))
                ) : (
                    <p>Le panier est vide.</p>
                )}
            </ul>
        </div>
    );
}

