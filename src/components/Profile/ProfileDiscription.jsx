import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ProfileDiscription() {
  const [description, setDescription] = useState('');
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // Update description from the response
        if (response.data && response.data.description) {
          setDescription(response.data.description);
        }

        // Debug log
        console.log('Fetched user desc', response.data);

      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) {
      fetchUserDetails();
    }
  }, [user?._id]);

  return (
    <div>
      <h3 className="text-cyan-400 text-lg font-semibold mb-3">
        Field of Excellence
      </h3>
      <p className="text-sm text-gray-300">
        {description || 'No description available'}
      </p>
    </div>
  );
}