import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-700" role="navigation">
        <div className="w-full flex justify-between items-center p-4">
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 ml-auto">
            <a href="/" className="text-white">Home</a>
            <a href="#" className="text-white">About</a>
            <a href="#" className="text-white">Contact</a>
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden text-white"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar & Overlay */}
        <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          {/* Sidebar Menu */}
          <div
            className={`absolute top-0 left-0 w-64 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col mt-16 space-y-6 p-6">
              <a href="#" className="text-white text-lg">Home</a>
              <a href="#" className="text-white text-lg">About</a>
              <a href="#" className="text-white text-lg">Contact</a>
            </nav>
          </div>
        </div>
      </nav>
      <section>

      </section>
    </>
  );
};

export default NavBar;
