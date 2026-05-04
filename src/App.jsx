import React, { useState, useEffect } from 'react';
import './index.css'; 

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const currentImages = products.slice(index, index + itemsPerPage);

  const handleNext = () => {
    if (index + itemsPerPage < products.length) {
      setIndex(index + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (index - itemsPerPage >= 0) {
      setIndex(index - itemsPerPage);
    }
  };

  return (
    <div className="container">
      <h1>Simple React Gallery</h1>

      <div className="grid">
        {currentImages.map((item) => (
          <div key={item.id} className="card">
            <img src={item.thumbnail} alt={item.title} />
          </div>
        ))}
      </div>

      <div className="controls">
        <button 
          className="nav-button" 
          onClick={handlePrev} 
          disabled={index === 0}
        >
          Previous
        </button>

        <span>
          Showing {index + 1} - {Math.min(index + itemsPerPage, products.length)}
        </span>

        <button 
          className="nav-button" 
          onClick={handleNext} 
          disabled={index + itemsPerPage >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
