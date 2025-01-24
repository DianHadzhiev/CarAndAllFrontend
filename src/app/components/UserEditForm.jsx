import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiClient } from '../lib/api';

const UserEditForm = ({ userData, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        voornaam: userData?.voornaam || '',
        achternaam: userData?.achternaam || '',
        emailAddress: userData?.emailAddress || '',
        telefoonNummer: userData?.telefoonNummer || '',
        straatHuisnummer: userData?.straatHuisnummer || '',
        postcode: userData?.postcode || '',
        currentPassword: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
  
      const submitData = {
          voornaam: formData.voornaam,
          achternaam: formData.achternaam,
          emailAddress: formData.emailAddress,
          telefoonNummer: formData.telefoonNummer,
          straatHuisnummer: formData.straatHuisnummer,
          postcode: formData.postcode,
          currentPassword: formData.currentPassword || null,
          newPassword: formData.newPassword || null
      };
  
      try {
          // Remove the ID from the URL since we're getting it from the token
          const response = await apiClient.put('/api/User/EditUserProfile', submitData);
          if (response.status === 200) {
              setSuccess('Profile updated successfully!');
              onUpdate && onUpdate(submitData);
              setIsEditing(false);
              setFormData(prev => ({
                  ...prev,
                  currentPassword: '',
                  newPassword: ''
              }));
          }
      } catch (err) {
          setError(err.response?.data || 'Failed to update profile');
          console.error('Update error:', err);
      }
  };

    if (!isEditing) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <p className="mt-1 text-sm text-gray-900">{userData?.voornaam}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <p className="mt-1 text-sm text-gray-900">{userData?.achternaam}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{userData?.emailAddress}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <p className="mt-1 text-sm text-gray-900">{userData?.telefoonNummer}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <p className="mt-1 text-sm text-gray-900">{userData?.straatHuisnummer}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Postcode</label>
                        <p className="mt-1 text-sm text-gray-900">{userData?.postcode}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="voornaam"
                        value={formData.voornaam}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="achternaam"
                        value={formData.achternaam}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="telefoonNummer"
                        value={formData.telefoonNummer}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="straatHuisnummer"
                        value={formData.straatHuisnummer}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Postcode</label>
                    <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default UserEditForm;