"use client";

import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span className="badge badge-info">
                    {user.plan || "free"}
                  </span>
                </td>

                <td>
                  {user.role?.trim() === "admin" ? (
                    <span className="badge badge-success">
                      Admin
                    </span>
                  ) : (
                    <span className="badge badge-warning">
                      User
                    </span>
                  )}
                </td>

                <td>
                  {user.role?.trim() === "admin" ? (
                    <span className="text-green-600 font-semibold">
                      Admin Account
                    </span>
                  ) : (
                    <button className="btn btn-sm btn-primary">
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}