import React, { useState } from 'react';
import Layout from '../../components/Layout';

function Pegawai() {
  // Sample user data
  const [user, setUser ] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    photo: null, // Add a photo property
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser , setEditedUser ] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser (editedUser );
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser ({ ...editedUser , [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser ({ ...editedUser , photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
    <h2>Pegawai</h2>
      <div className="Pegawai">
        <div className="profile-container">
          <div className="profile-photo">
            {editedUser .photo ? (
              <img src={editedUser .photo} alt="Profile" className="profile-image" />
            ) : (
              <div className="placeholder-image">No Photo</div>
            )}
            {isEditing && (
              <div className="input-group">
                <label htmlFor="photo">Profile Photo</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            )}
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div>
                <div className="input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedUser .name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedUser .email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={editedUser .phone}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div className='Info'>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button onClick={handleEdit} className="edit-btn">Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pegawai;