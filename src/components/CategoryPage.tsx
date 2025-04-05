import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Search, X } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  const categoryBooks = category?.toLowerCase();

  interface Format {
    [key: string]: string;
  }

  interface Book {
    title: string;
    formats: Format;
    authors: {
      name: string;
    }[];
    id: number;
  }

  const [data, setData] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchBooksData = async (pageNum: number, search: string, reset: boolean = false) => {
    try {
      setLoading(true);
      let url = `http://skunkworks.ignitesol.com:8000/books/?topic=${categoryBooks}&mime_type=image&page=${pageNum}`;
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const response = await fetch(url);
      const booksData = await response.json();

      if (reset) {
        setData(booksData.results);
      } else {
        setData(prev => [...prev, ...booksData.results]);
      }
      setHasMore(booksData.next !== null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
    setPage(1);
    fetchBooksData(1, "", true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchBooksData(1, searchText, true);
  };

  const openBook = (book: Book) => {
    // Format priority as per the requirements:
    const formatPriority = ["text/html", "application/pdf", "text/plain"];
    let selectedFormat = null;
    
    // Check each format in priority order
    for (const format of formatPriority) {
      if (book.formats[format]) {
        const url = book.formats[format];
        // Skip zip files as specified in the requirements
        if (!url.endsWith(".zip")) {
          selectedFormat = url;
          break;
        }
      }
    }
    
    if (selectedFormat) {
      window.open(selectedFormat, "_blank");
    } else {
      alert("No viewable version available");
    }
  };

  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchBooksData(nextPage, searchText);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, searchText]
  );

  useEffect(() => {
    setSearchText("");
    setPage(1);
    setData([]);
    fetchBooksData(1, "", true);
  }, [categoryBooks]);

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-2 pb-8">
      <h1 className="text-2xl font-bold text-[#5E56E7] mt-4 mb-2">{category} Books</h1>

      <form onSubmit={handleSearch} className="w-full max-w-sm my-4 relative">
        <div className="flex items-center relative">
          <input
            onChange={handleChange}
            value={searchText}
            className="rounded-md focus:outline-none focus:ring-1 focus:ring-[#5E56E7] p-3 pl-10 w-full bg-[#F0F0F6]"
            placeholder={`Search ${category} books`}
          />
          <div className="absolute left-3">
            <Search size={18} className="text-gray-500" />
          </div>
          {searchText && (
            <div className="absolute right-3 cursor-pointer" onClick={clearSearch}>
              <X size={18} className="text-gray-500 hover:text-gray-700" />
            </div>
          )}
        </div>
      </form>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 p-4 w-full bg-[#F0F0F6]">
        {data.map((book, index) => {
          const isLastElement = index === data.length - 1;
          return (
            <div
              key={book.id || index}
              ref={isLastElement ? lastBookElementRef : null}
              className="flex flex-col rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openBook(book)}
            >
              <div className="w-full pt-[150%] relative rounded-2xl overflow-hidden">
                <img
                  src={book?.formats["image/jpeg"]}
                  alt={book?.title}
                  className="absolute inset-0 w-full h-full object-contain rounded-2xl overflow-hidden"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/book-placeholder.png";
                  }}
                />
              </div>
              <div className="p-2 sm:p-3">
                <h2 className="font-bold text-sm sm:text-base leading-tight mb-1 line-clamp-2 h-10">
                  {book?.title}
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm truncate">
                  {book?.authors[0]?.name || "Unknown Author"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 w-full mt-4">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex flex-col rounded-lg shadow overflow-hidden animate-pulse bg-gray-300 h-64"
              ></div>
            ))}
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          No books found matching your search in the {category} category.
        </div>
      )}
    </div>
  );
};

export default CategoryPage;