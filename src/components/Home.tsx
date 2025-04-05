import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    {
      name: "FICTION",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 8H9L12 2Z" fill="#5E56E7" />
          <path d="M8 10H16V22H8V10Z" fill="#F8F7FF" stroke="#5E56E7" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "DRAMA",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4C7 4 4 8 4 12C4 16 7 20 12 20C17 20 20 16 20 12C20 8 17 4 12 4Z" stroke="#5E56E7" strokeWidth="2" fill="#F8F7FF" />
          <path d="M9 10H9.01" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 10H15.01" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 16C10.5 14 13.5 14 15 16" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "HUMOR",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#5E56E7" strokeWidth="2" fill="#F8F7FF" />
          <path d="M8 10H8.01" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 10H16.01" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 14C9.5 17 14.5 17 16 14" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "POLITICS",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="8" width="12" height="8" fill="#F8F7FF" stroke="#5E56E7" strokeWidth="2" />
          <path d="M12 4V8" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 16V20H15V16" stroke="#5E56E7" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "PHILOSOPHY",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#5E56E7" strokeWidth="2" fill="#F8F7FF" />
          <path d="M12 2V22" stroke="#5E56E7" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "HISTORY",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="4" width="12" height="16" fill="#F8F7FF" stroke="#5E56E7" strokeWidth="2" />
          <path d="M9 8H15" stroke="#5E56E7" strokeWidth="2" />
          <path d="M9 12H15" stroke="#5E56E7" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "ADVENTURE",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#5E56E7" strokeWidth="2" fill="#F8F7FF" />
          <path d="M12 6V12L16 14" stroke="#5E56E7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const [, setdata] = useState([]);
  const FetchBooksData = async () => {
    try {
      const response = await fetch("http://skunkworks.ignitesol.com:8000/books/");
      const booksData = await response.json();
      setdata(booksData.results);

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    FetchBooksData();
  }, [])
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-[#5E56E7] font-semibold text-3xl sm:text-4xl md:text-5xl font-Montserrat px-4 md:w-full w-20">
          Gutenberg Project
        </h1>
        <div className="w-full px-4 max-w-full">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mt-4 break-words hyphens-auto">
            A social cataloging website that allows you to freely search its database of books, annotations, and reviews.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.name}`}
            className="flex items-center justify-between bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex items-center space-x-4">
              <span className="text-xl">{category.icon}</span>
              <span className="font-semibold text-gray-800">{category.name}</span>
            </div>
            <span className="text-blue-500 text-xl">→</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;