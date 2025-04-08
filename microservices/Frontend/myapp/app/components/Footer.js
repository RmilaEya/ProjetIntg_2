// components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Section Informations */}
          <div className="mb-4 sm:mb-0">
            <h5 className="text-lg font-semibold">Boutique en ligne</h5>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400">À propos</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">Conditions d'utilisation</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">Politique de confidentialité</a>
              </li>
            </ul>
          </div>

          {/* Section Réseaux sociaux */}
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-indigo-400">
              <i className="fab fa-facebook-f"></i> {/* Icône Facebook */}
            </a>
            <a href="#" className="text-white hover:text-indigo-400">
              <i className="fab fa-twitter"></i> {/* Icône Twitter */}
            </a>
            <a href="#" className="text-white hover:text-indigo-400">
              <i className="fab fa-instagram"></i> {/* Icône Instagram */}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm">
        <p>&copy; 2025 Boutique en ligne. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
