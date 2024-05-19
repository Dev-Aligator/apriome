import React, { useState, useEffect } from 'react';
import './User.css';

interface UserProps {
  user: {
    name: string;
    profilePicture: string;
    interests: string[];
    wishlist: {
      id: number;
      title: string;
      poster: string;
    }[];
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const [userData, setUserData] = useState<UserProps['user']>({} as UserProps['user']);

  useEffect(() => {
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  return (
    <div className="user">
      <h1>{userData.name}</h1>
      <img src={userData.profilePicture} alt="Profile picture" />
      <p>Interests: {userData.interests.join(', ')}</p>
      <h2>Wishlist</h2>
      <ul>
        {userData.wishlist.map((anime) => (
          <li key={anime.id}>
            <img src={anime.poster} alt={anime.title} />
            <p>{anime.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
