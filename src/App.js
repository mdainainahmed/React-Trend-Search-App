import React, { useState, useEffect } from 'react';
import './App.scss'; // Import your CSS styles
import axios from 'axios';

function App() {
  const [trends, setTrends] = useState([]);
  const [filter, setFilter] = useState('');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const data = response.data;

        setTrends(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleWishlistClick = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <div className="app">
      <div className="search-tab">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="suggestion-box">
        {trends
          .filter((trend) => trend.title.includes(filter))
          .map((trend) => (
            <div key={trend.id} className="product">
              <h3>{trend.title}</h3>
              <button
                className={wishlist.includes(trend.id) ? 'wishlist active' : 'wishlist'}
                onClick={() => handleWishlistClick(trend.id)}
              >
                Wishlist
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
