import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/userContext';
import { Link } from 'react-router-dom';

export function MyAccountPage () {
  const [userDeals, setUserDeals] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDeals = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/deals/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserDeals(data.userDeals);
          }
        } catch (error) {
          console.error("Error fetching user's deals:", error);
        }
      }
    };

    fetchUserDeals();
  }, [user]);

  return (
    <div>
      <h2>My Deals</h2>
      {userDeals.length > 0 ? (
        userDeals.map(deal => (
          <div key={deal.id}>
            <h3>{deal.title}</h3>
            {/* other deal details */}
            <Link to={`/deals/id/${deal.id}`}>View Deal</Link>
          </div>
        ))
      ) : (
        <p>You have not created any deals yet.</p>
      )}
    </div>
  );
};
