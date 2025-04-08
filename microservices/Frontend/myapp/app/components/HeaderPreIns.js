// "use client";
// import React, { useState } from 'react'; // Importation correcte de useState
// import Link from 'next/link';
// import { ShoppingCart, User } from 'lucide-react'; // Import des icônes
// import axios from 'axios';
// import { useRouter } from 'next/router';

// function Header() {
//   // **********************menue profile*************************
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // //********************deconnexion ************ 


// return (
//   <div>
//     <header className="bg-white">
//       <nav
//         className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//         aria-label="Global"
//       >
//         <div className="flex lg:flex-1">
//           <a href="#" className="-m-1.5 p-1.5">
//             <img
//               className="h-8 w-auto"
//               src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
//               alt=""
//             />
//           </a>
//         </div>

//         <div className="hidden lg:flex lg:gap-x-12">
//           <div className="relative">
//             <Link
//               href="/"
//               type="button"
//               className="flex items-center gap-x-1 text-sm font-semibold text-gray-900"
//               aria-expanded="false"
//             >
//               Acceuil
//             </Link>
//           </div>

//           <Link
//             href="/product/ProductCategory"
//             className="text-sm font-semibold text-gray-900"
//           >
//             Catalogue
//           </Link>
//           <Link href="#" className="text-sm font-semibold text-gray-900">
//             À propos
//           </Link>
//           <Link href="#" className="text-sm font-semibold text-gray-900">
//             Contact
//           </Link>
//         </div>

//         <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-6">
//           {/* Icône Panier */}
//           <Link href="/Account/Panier" className="text-gray-900 hover:text-indigo-600">
//             <ShoppingCart className="h-6 w-6" aria-hidden="true" />
//           </Link>

//           {/* Icône Compte avec menu déroulant */}
//           <div className="relative">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-900 hover:text-indigo-600 flex items-center"
//             >
//               <User className="h-6 w-6" aria-hidden="true" />
//             </button>

//             {/* Menu déroulant */}
//             {isMenuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
//                 <Link
//                   href="/Account/commandes"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Mes commandes
//                 </Link>

//                 <Link
//                   href="/deconnexion"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Déconnexion
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   log out
//                 </button>


//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   </div>
// );
// }

// export default Header;


"use client";
import React, { useState } from "react"; // Importation correcte de useState
import Link from "next/link";
import { ShoppingCart, User , Search } from "lucide-react"; // Import des icônes


import axios from "axios";

function Header() {
  // ********************** Menu profil *************************
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState(""); // Ajout de l'état pour gérer les messages

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ******************** Déconnexion ************ 
  const handleLogout = async () => {
    try {
      // 🔥 Correction de la requête axios
      const res = await axios.post("http://localhost:5000/api/deconnexion", {}, { withCredentials: true });

      // ✅ Supprimer le token du localStorage
      localStorage.removeItem("token");

      // ✅ Afficher un message de succès
      setMessage(res.data.message);

      // ✅ Redirection
      window.location.href = "/authentification/Login";
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
      setMessage(error.response?.data?.message || "Une erreur est survenue");
    }
  };


  return (
    <div>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/" className="text-sm font-semibold text-gray-900">
              Accueil
            </Link>
            <Link href="/product/ProductCategory" className="text-sm font-semibold text-gray-900">
              Catalogue
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              À propos
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-900">
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-6">
            <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-6">
              {/* icone recherche */}
              <div className="relative">
    <input
      type="text"
      placeholder="Rechercher..."
      className="pl-10 pr-4 py-2 border rounded-md text-gray-900"
    />
    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-indigo-600">
      <Search className="h-6 w-6" aria-hidden="true" />
    </button>
  </div>


              {/* Icône Panier */}
              <Link href="/Account/Panier" className="text-gray-900 hover:text-indigo-600">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              </Link>

              {/* icone Compte avec menu déroulant */}
              <div className="relative">
                <button onClick={toggleMenu} className="text-gray-900 hover:text-indigo-600 flex items-center">
                  <User className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Menu déroulant */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <Link href="/Account/commandes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mes commandes
                    </Link>

                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>




          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;


