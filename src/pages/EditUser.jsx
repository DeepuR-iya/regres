// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function EditUser() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch(`https://reqres.in/api/users/${id}`);
//       const data = await res.json();
//       setUser(data.data);
//     };
//     if (id) fetchUser();
//   }, [id]);

//   const handleUpdate = async () => {
//     const res = await fetch(`https://reqres.in/api/users/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });

//     if (res.ok) navigate("/users");
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold">Edit User</h2>
//       <input
//         className="border p-2 my-2"
//         placeholder="First Name"
//         value={user.first_name}
//         onChange={(e) => setUser({ ...user, first_name: e.target.value })}
//       />
//       <input
//         className="border p-2 my-2"
//         placeholder="Last Name"
//         value={user.last_name}
//         onChange={(e) => setUser({ ...user, last_name: e.target.value })}
//       />
//       <input
//         className="border p-2 my-2"
//         placeholder="Email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//       />
//       <button onClick={handleUpdate} className="bg-blue-500 text-white p-2">
//         Update
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

        if (res.ok && data.data) {
          setUser({
            first_name: data.data.first_name,
            last_name: data.data.last_name,
            email: data.data.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
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
        alert("User updated successfully!");
        navigate("/users"); // Redirect to user list page
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Edit User</h2>
      <input
        className="border p-2 my-2 w-full"
        placeholder="First Name"
        value={user.first_name}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
      />
      <input
        className="border p-2 my-2 w-full"
        placeholder="Last Name"
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
      />
      <input
        className="border p-2 my-2 w-full"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-2 mt-3"
      >
        Update
      </button>
    </div>
  );
}
