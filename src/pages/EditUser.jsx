import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://reqres.in/api/users/${id}`);
        const data = await res.json();
        const user = data.data;

        if (res.ok && data.data) {
          setUser({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await res.json();
      console.log("result", result);
      if (res.ok) {
        toast.success("User updated successfully!");
        setTimeout(() => navigate("/users"), 1500);
      } else {
        alert("Failed to update user.");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">Edit User</h2>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-lg font-semibold">
        Welcome! Wanna change user details?
      </h2>
      <input
        className="border p-2 my-2 w-full rounded-md"
        placeholder="First Name"
        value={user.first_name}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
      />
      <input
        className="border p-2 my-2 w-full rounded-md"
        placeholder="Last Name"
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
      />
      <input
        className="border p-2 my-2 w-full rounded-md"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-2 mt-3 mx-2 rounded-md cursor-pointer"
      >
        Update
      </button>
      <button className="bg-red-500 text-white p-2 mt-3 mx-2 rounded-md">
        <Link to="/users">back</Link>
      </button>
    </div>
  );
}
