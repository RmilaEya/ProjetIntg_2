'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header'
import axios from 'axios';
import { useRouter } from 'next/router';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const [message, setMessage] = useState('');
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Envoi de la requête au backend (API Next.js)
          const res = await axios.post('http://localhost:5000/api/login', formData);
          
          // Si la connexion réussie, stockage du token dans le localStorage
          localStorage.setItem('token', res.data.token);
        //   setMessage('Connexion réussie');
          
          // Redirection vers la page après la connexion
          window.location.href = '/product/ProductCategory'; // Remplace "/dashboard" par la page de destination
        } catch (error) {
          setMessage(error.response?.data?.message || 'Une erreur est survenue');
        }
      };
    



    return (
        <div style={{ background: "linear-gradient(to bottom, white, blue)" }}>
            <Header />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Connectez-vous à votre compte
                            </h1>
                            {message && <p className="text-red-500">{message}</p>}
                            <form onSubmit={handleSubmit}  className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        e-mail
                                    </label>
                                    <input
                                        type="email" name="email" id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com" required 
                                        onChange={handleChange}
                                        />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Mot de passe
                                    </label>
                                    <input
                                        type="password" name="password" id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="••••••••" required
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Bouton Connexion au milieu */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit" 
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Connexion
                                    </button>
                                </div>

                                {/* Bouton principal de soumission */}
                                {/* <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button> */}

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Vous avez un compte ?{" "}
                                    <Link
                                        href="/authentification/Register"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        s'inscrire
                                    </Link>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default Login;
