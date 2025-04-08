// import React from 'react'
// import HeaderPreIns from "../../components/HeaderPreIns"


// const page = () => {
//   return (
//     <div>
//        <HeaderPreIns/>

//     </div>
//   )
// }

// export default page;


"use client"; // Directive pour utiliser des hooks React

import React, { useState } from "react";
import HeaderPreIns from "../../components/HeaderPreIns"
const Panier = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Produit 1", price: 20.0, quantity: 1 },
    { id: 2, name: "Produit 2", price: 15.0, quantity: 2 },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">

      <HeaderPreIns/>
      <br/><br/><br/>
      <h1 className="text-2xl font-bold mb-6">Mon Panier</h1>

      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Prix : {item.price.toFixed(2)} €</p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <div className="text-right">
            <h2 className="text-xl font-bold">
              Total : {total.toFixed(2)} €
            </h2>
          </div>

          <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Passer au paiement
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Panier;
