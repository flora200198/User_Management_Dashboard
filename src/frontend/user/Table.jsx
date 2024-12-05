import axios from "axios";
import React, { useEffect, useState } from "react";
import "./user.css";

const UserTable = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uname, usetName] = useState("");
  const [uemail, usetEmail] = useState("");
  const [ucompany, usetCompany] = useState("");
  const [company, setCompany] = useState("");
  const [editId, setEditId] = useState(-1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        console.log(response);
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch users. Please check your backend server.");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user.length > 0 ? user[user.length - 1].id + 1 : 1;

    try {
      const response = await axios.post("http://localhost:5000/users", {
        id,
        name,
        email,
        company: { name: company },
      });
      setUser([...user, response.data]); 
      setName("");
      setEmail("");
      setCompany("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${editId}`, {
        id: editId,
        name: uname,
        email: uemail,
        company: { name: ucompany },
      });
      setUser(
        user.map((u) =>
          u.id === editId
            ? { ...u, name: response.data.name, email: response.data.email, company: { name: response.data.company.name } }
            : u
        )
      );
      setEditId(-1);
      usetName("");
      usetEmail("");
      usetCompany("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    const selectedUser = user.find((u) => u.id === id);
    if (selectedUser) {
      usetName(selectedUser.name);
      usetEmail(selectedUser.email);
      usetCompany(selectedUser.company?.name || "");
      setEditId(id);
    }
  };

  const handldelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUser(user.filter((u) => u.id !== id)); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u) =>
            u.id === editId ? (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  <input type="text" value={uname} onChange={(e) => usetName(e.target.value)} />
                </td>
                <td>
                  <input type="text" value={uemail} onChange={(e) => usetEmail(e.target.value)} />
                </td>
                <td>
                  <input type="text" value={ucompany} onChange={(e) => usetCompany(e.target.value)} />
                </td>
                <td>
                  <button onClick={handleUpdate}>Update</button>
                </td>
              </tr>
            ) : (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.company?.name || ""}</td>
                <td>
                  <button onClick={() => handleEdit(u.id)} className="edit">
                    Edit
                  </button>
                  <button onClick={() => handldelete(u.id)} className="delete">
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
