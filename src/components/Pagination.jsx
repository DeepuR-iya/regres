export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
