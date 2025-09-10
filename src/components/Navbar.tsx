import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="w-full bg-orange-600 text-white shadow-md">
      <div className=" flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-semibold hover:text-gray-200">
            Home
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/signup"
            className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
