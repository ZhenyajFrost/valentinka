import React, { useState } from 'react';
import '../fonts/Valentine.woff';
import './style.css';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img5 from '../images/5.jpg';
import img6 from '../images/6.jpg';
import img7 from '../images/7.jpg';
import img8 from '../images/8.jpg';
import img9 from '../images/9.jpg';

import ModalWindow from '../ModalWindow/ModalWindow';
import Quiz from '../Quiz/Quiz';

function Home() {
  const [visible, setVisible] = useState(false);

  // Ініціалізація зображень в сітці
  const initialImages = [
    { id: 1, src: img1, gridPosition: [0, 0] },
    { id: 2, src: img2, gridPosition: [1, 0] },
    { id: 3, src: img3, gridPosition: [2, 0] },
    { id: 4, src: img4, gridPosition: [0, 1] },
    { id: 5, src: img5, gridPosition: [1, 1] },
    { id: 6, src: img6, gridPosition: [2, 1] },
    { id: 7, src: img7, gridPosition: [0, 2] },
    { id: 8, src: img8, gridPosition: [1, 2] },
    { id: 9, src: img9, gridPosition: [2, 2] },
  ];

  // Рандомне зображення
  const randomImage = initialImages[Math.floor(Math.random() * initialImages.length)];

  const [images, setImages] = useState(initialImages);
  const [dragged, setDragged] = useState(null);

  const handleMouseDown = (e, index) => {
    setDragged({
      index,
      offsetX: e.clientX - e.target.getBoundingClientRect().left,
      offsetY: e.clientY - e.target.getBoundingClientRect().top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragged) return;

    const updatedImages = [...images];
    const newX = e.clientX - dragged.offsetX;
    const newY = e.clientY - dragged.offsetY;

    updatedImages[dragged.index] = {
      ...updatedImages[dragged.index],
      x: newX,
      y: newY,
    };

    setImages(updatedImages);
  };

  const handleMouseUp = () => {
    setDragged(null);
  };

  return (
    <div className="cont" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="imgCont">
        {images.map((image, index) => (
          <img
            key={image.id}
            className="img"
            src={image.src}
            alt={`img${image.id}`}
            style={{
              left: image.x !== undefined ? image.x + 'px' : image.gridPosition[0] * 33.33 + '%',
              top: image.y !== undefined ? image.y + 'px' : image.gridPosition[1] * 33.33 + '%',
              zIndex: dragged?.index === index ? 10 : 2, // Z-index для перетягнутого зображення
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
          />
        ))}
        <button className="button-57 btn" onClick={() => setVisible(true)}>
          🎁
        </button>
      </div>

      <ModalWindow visible={visible} setVisible={setVisible}>
        <Quiz />
      </ModalWindow>
    </div>
  );
}

export default Home;
