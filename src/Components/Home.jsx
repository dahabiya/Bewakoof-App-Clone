import React from 'react'
import { useState } from 'react';
import '../Styles/Home.css'

function Home() {
    const images = [
        'images/home1.png',
        'images/home2.png',
        'images/home3.png'
      ];
      const [currentIndex, setCurrentIndex] = useState(0);
    
    
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      };
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      };
      // Display only three images
      const displayedImages = images.slice(currentIndex, currentIndex + 3);
    
      return (
        <div className="slideshow">
          {displayedImages.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${currentIndex + index + 1}`} />
          ))}
          
        </div>
      );
    };

export default Home