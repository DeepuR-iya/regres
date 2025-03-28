import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await res.json();
      setUsers(data.data);
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-5">
      <button onClick={handleLogout} className="bg-red-500 text-white p-2">
        Logout
      </button>
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4">
            <img src={user.avatar} className="w-20 h-20 rounded-full" />
            <p>
              {user.first_name} {user.last_name}
            </p>
            <button
              onClick={() => navigate(`/edit-user/${user.id}`)}
              className="bg-green-500 text-white p-1"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white p-1 ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Pagination page={page} setPage={setPage} totalPages={2} />
      </div>
    </div>
  );
}
