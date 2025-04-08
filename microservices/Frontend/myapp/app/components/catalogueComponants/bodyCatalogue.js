"use client";
import { useEffect, useState } from "react";
import axios from "axios";


//*************get all product****** */ 
const bodyCatalogue = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/catag/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des produits:", err);
            });
    }, []);

 
    


    return (
        <div>

            <ul className="grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <li key={product.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="h-56 w-full">
                            <a href="#">
                                <img className="mx-auto h-full dark:hidden" src={product.image || ""} alt={product.name} />
                            </a>
                        </div>
                        <div className="pt-6">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                    {product.category || ""}
                                </span>
                            </div>

                            <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                                {product.name}
                            </a>

                            <div className="mt-4 flex items-center justify-between gap-4">
                                <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                    {product.price} €
                                </p>

                            


                                <button
                                    type="button"
                                    
                                   
                                    className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >

                                    <svg
                                        className="-ms-2 me-2 h-5 w-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                        />
                                    </svg>
                                    <span>Ajouter au panier</span>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default bodyCatalogue
