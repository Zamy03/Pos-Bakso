import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import userData from '../../data/user.json'; // Import user data

function Pegawai() {
  // State to hold user data
  const [user, setUser ] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser , setEditedUser ] = useState({
    username: '',
    email: '',
    nohp: '',
    photo: null,
  });

  useEffect(() => {
    // Retrieve the user ID from local storage
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    
    // Find the user data based on the ID
    if (loggedInUserId) {
      const foundUser  = userData.find(user => user.id === parseInt(loggedInUserId, 10));
      if (foundUser ) {
        setUser (foundUser );
        setEditedUser (foundUser ); // Initialize editedUser  with foundUser  data
      }
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser (editedUser );
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { username, value } = e.target;
    setEditedUser ({ ...editedUser , [username]: value });
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

  if (!user) {
    return <div>Loading...</div>; // Handle loading state
  }

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
                  username="photo"
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
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    id="username"
                    username="username"
                    value={editedUser.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    username="email"
                    value={editedUser.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="nohp">Phone</label>
                  <input
                    type="text"
                    id="nohp"
                    username="nohp"
                    value={editedUser.nohp}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div className='Info'>
                <p><strong>Name:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.nohp}</p>
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