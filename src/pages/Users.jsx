import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { IoMdLogOut } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfylly");
    setTimeout(() => navigate("/"), 1500);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://reqres.in/api/users?page=${page}`);
        const data = await res.json();
        setUsers(data.data);
      } catch (err) {
        toast.error(
          err.message || "Something went wrong while fetching users."
        );
      }
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== id));
      toast.error("User Deleted Succesfully");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="p-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex w-100vw justify-between items-center">
        <h2 className="text-3xl font-bold mb-4">Users List</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded-md h-10 px-2 py-1"
        >
          <span className="flex justify-between items-center w-18 cursor-pointer">
            Logout
            <IoMdLogOut />
          </span>
        </button>
      </div>
      {users.length === 0 ? (
        <div className="h-full w-full  md:grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map(() => {
            return (
              <div class="border border-gray-400 shadow rounded-md px-2 py-4  max-w-sm w-full mx-auto h-56 my-4">
                <div class="animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-300 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-300 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                        <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-300 rounded"></div>
                      <div className="flex md:justify-evenly justify-start md:w-[60%]">
                        <div className="h-10 w-18 bg-slate-300 mx-2"></div>
                        <div className="h-10 w-18 bg-slate-300 mx-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="md:grid grid-cols-3 gap-4 place-items-center">
          {users.map((user) => (
            <div className="border p-4 flex flex-col items-center shadow-lg rounded-lg my-4 sm:w-80 w-60">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full mb-2"
              />
              <p className="font-semibold">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-2 space-x-2 w-1/2 flex justify-center">
                <button
                  onClick={() => navigate(`/edit-user/${user.id}`)}
                  className="bg-blue-500 text-white px-3 py-2 rounded flex justify-evenly items-center cursor-pointer"
                >
                  Edit
                  <BiSolidEdit className="ml-2" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-2  rounded-md flex justify-evenly items-center cursor-pointer"
                >
                  Delete
                  <MdDeleteForever className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className=" md:mt-40 mx-auto">
        <Pagination page={page} setPage={setPage} totalPages={2} />
      </div>
    </div>
  );
}

{
  /* <div key={user.id} className="border p-4">
              <img src={user.avatar} className="w-20 h-20 rounded-full" />
              <p>
                {user.first_name} {user.last_name}
              </p>
              <button
                onClick={() => navigate(`/edit-user/${user.id}`)}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-2 py-1 ml-2 rounded-md"
              >
                Delete
              </button>
            </div> */
}
