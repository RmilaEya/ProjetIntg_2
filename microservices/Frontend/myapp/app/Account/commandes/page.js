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


"use client"; // Directive pour activer les hooks React

import React, { useState, useEffect } from "react";
import HeaderPreIns from "../../components/HeaderPreIns"


const MesCommandes = () => {
  const [orders, setOrders] = useState([
    // Exemples de commandes (tu peux les remplacer par des données dynamiques)
    {
      id: 1,
      date: "2025-01-20",
      total: 75.99,
      status: "Livré",
      items: [
        { name: "Produit A", quantity: 2, price: 20.0 },
        { name: "Produit B", quantity: 1, price: 35.99 },
      ],
    },
    {
      id: 2,
      date: "2025-01-15",
      total: 40.0,
      status: "En cours",
      items: [
        { name: "Produit C", quantity: 1, price: 40.0 },
      ],
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6">
        <HeaderPreIns/>
        <br/><br/><br/>

      <h1 className="text-2xl font-bold mb-6">Historique de mes commandes</h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Commande #{order.id}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Date : {order.date}
                  </p>
                </div>
                <div className="text-sm font-semibold">
                  <span
                    className={`px-3 py-1 rounded-lg ${
                      order.status === "Livré"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right">
                <h3 className="text-lg font-bold">
                  Total : {order.total.toFixed(2)} €
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucune commande trouvée.</p>
      )}
    </div>
  );
};

export default MesCommandes;
