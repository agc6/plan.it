import { useState } from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({ customIcon, selectedIcon, marginRight }) => {
  const [isHovered, setIsHovered] = useState(false); // not hovered by default
  const [isClicked, setIsClicked] = useState(false); // not clicked by default

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle clicked state
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-9 h-9 mt-2.75 mb-2 ml-2 inline-flex items-center justify-center rounded-[10px] transition-transform hover:scale-105
        ${isClicked ? 'outline-gray-400 outline-[0.75px] rounded-[3px] bg-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]' : ''}`}
      style={{ marginRight }}
    >
      <img
        src={isClicked ? selectedIcon : isHovered ? selectedIcon : customIcon}
        alt="My Icon"
        className={`w-5.5 h-5.5 transition-transform ${
          isClicked ? 'hover:scale-100' : 'hover:scale-105'
        }`}
      />
    </button>
  );
};

//place prop types after the component definition
CustomButton.propTypes = {
  customIcon: PropTypes.string.isRequired,
  selectedIcon: PropTypes.string.isRequired,
  marginRight: PropTypes.string,
};

export default CustomButton;
