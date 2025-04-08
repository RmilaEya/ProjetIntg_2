import React from 'react'
import Link from 'next/link';

function Header() {
    return (
      <div>
     

<header className="bg-white">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
      
        <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
      </a>
    </div>
    
    <div className="hidden lg:flex lg:gap-x-12">
      <div className="relative">
        <Link href="/" type="button" className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900" aria-expanded="false">
          Acceuil 
        </Link> 
      </div>

      <Link href="/product/ProductCategory" className="text-sm/6 font-semibold text-gray-900">Catalogue</Link>
      <Link href="#" className="text-sm/6 font-semibold text-gray-900">a propos</Link>
      <Link href="#" className="text-sm/6 font-semibold text-gray-900">Contact</Link>
    </div>
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <Link href="/authentification/Login" className="text-sm/6 font-semibold text-gray-900">connexion</Link>
    </div>
  </nav>
 
</header>



      </div>
    );
  }
  
  export default Header;
  