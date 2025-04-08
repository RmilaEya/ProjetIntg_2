"use client"; // Directive pour utiliser des hooks React si nécessaire

import React from "react";
import Link from "next/link";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Smartphone, Headphones, Battery, ShoppingCart } from "lucide-react"



const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header/>
      {/* Bannière */}
      <section className="relative bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenue sur notre boutique en ligne
          </h1>
          <p className="text-lg mb-6">
            Découvrez nos derniers produits et profitez des meilleures offres !
          </p>
          <Link
            href="/product/ProductCategory"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded hover:bg-gray-200"
          >
            Parcourir le catalogue
          </Link>
        </div>
      </section>

      {/* Section Catégories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Catégories populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { id: 1, name: "Électronique", image: "/images/electronics.jpg" },
              { id: 2, name: "Mode", image: "/images/fashion.jpg" },
              { id: 3, name: "Maison", image: "/images/home.jpg" },
              { id: 4, name: "Sports", image: "/images/sports.jpg" },
            ].map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.name.toLowerCase()}`}
                className="relative block rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produits Populaires */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Produits populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { id: 1, name: "Produit 1", price: 20.0, image: "/images/prod1.jpg" },
              { id: 2, name: "Produit 2", price: 35.0, image: "/images/prod2.jpg" },
              { id: 3, name: "Produit 3", price: 50.0, image: "/images/prod3.jpg" },
              { id: 4, name: "Produit 4", price: 75.0, image: "/images/prod4.jpg" },
            ].map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-indigo-600 font-bold text-xl">
                    {product.price.toFixed(2)} €
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-3 block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                  >
                    Voir le produit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Smartphone className="mx-auto h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
                <p>Find the perfect accessory for any phone model</p>
              </div>
              <div className="text-center">
                <Headphones className="mx-auto h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p>All our products meet high quality standards</p>
              </div>
              <div className="text-center">
                <Battery className="mx-auto h-16 w-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p>Quick delivery to your doorstep</p>
              </div>
            </div>
          </div>
        </section>

      <Footer/>
    </div>
  );
};

export default HomePage;
