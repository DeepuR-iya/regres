import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination({ page, setPage, totalPages }) {
  const pageNumbers = [
    ...new Set([...Array(totalPages).keys()].map((n) => n + 1)),
  ];

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-white border-1 border-gray-300 px-2 py-1 rounded disabled:opacity-80"
      >
        <IoIosArrowBack className="" />
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`px-3 py-1 rounded border-1 border-gray-300 ${
            pageNum === page ? "bg-black text-white border-black " : "bg-white"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="bg-white px-2 py-1 rounded disabled:opacity-80 border-1 border-gray-300"
      >
        <IoIosArrowForward className="" />
      </button>
    </div>
  );
}
