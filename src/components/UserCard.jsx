import { useNavigate } from "react-router-dom";

export default function UserCard({ user, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="border p-4 flex flex-col items-center shadow-lg rounded-lg">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-20 h-20 rounded-full mb-2"
      />
      <p className="font-semibold">
        {user.first_name} {user.last_name}
      </p>
      <p className="text-sm text-gray-500">{user.email}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => navigate(`/edit-user/${user.id}`)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
