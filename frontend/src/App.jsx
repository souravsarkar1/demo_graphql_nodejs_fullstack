import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import './App.css'; // Add this line to import the CSS

// GraphQL Queries and Mutations
const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      address
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $address: String!) {
    createUser(name: $name, email: $email, address: $address) {
      id
      name
      email
      address
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String, $address: String) {
    updateUser(id: $id, name: $name, email: $email, address: $address) {
      id
      name
      email
      address
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [newUser, setNewUser] = useState({ name: '', email: '', address: '' });
  const [editingUser, setEditingUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser({ variables: { id: editingUser.id, ...newUser } });
    } else {
      await createUser({ variables: newUser });
    }
    setNewUser({ name: '', email: '', address: '' });
    setEditingUser(null);
    refetch(); // Refresh the user list
  };

  const handleEdit = (user) => {
    setNewUser({ name: user.name, email: user.email, address: user.address });
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    await deleteUser({ variables: { id } });
    refetch(); // Refresh the user list
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h1>User List</h1>
      <ul>
        {data?.users?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.address}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="address"
          value={newUser.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <button style={{ margin: "auto" }} type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default App;
