import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const BrushCustomization = ({
  selectedFont,
  setSelectedFont,
  outerBackgroundColor,
  setOuterBackgroundColor,
  defaultBackgroundColor,
  mainBackgroundColor,
  setMainBackgroundColor,
  defaultMainColor,
  showCustomizeBox,
  showColorOptions,
  setShowColorOptions,
  showMainColorOptions,
  setShowMainColorOptions,
}) => {
  const outerLayerColors = [
    { name: "Ocean Blue", color: "#b0c9d8" },
    { name: "Olive Green", color: "#c9da9c" },
    { name: "Soft Blush", color: "#ffe6f2" },
    { name: "Lilac Mist", color: "#e4def4" },
    { name: "Classic White", color: "#ffffff" },
  ];

  const mainPanelColors = [
    { name: "Lavender Fog", color: "#f4f0fa" },
    { name: "Soft Cream", color: "#fff6e9" },
    { name: "Sky Mist", color: "#e8f3fa" },
    { name: "Rose Blush", color: "#ffeef2" },
    { name: "Pale Mint", color: "#e7f8f2" },
  ];

  return (
    <AnimatePresence>
      {showCustomizeBox && (
        <motion.div
          key="customizeBox"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          className="fixed top-[90px] right-1 w-[345px] bg-white rounded-[15px] shadow-md border border-gray-200 p-4 z-50"
        >
          <div className="flex flex-col space-y-4">
            {/* Font Picker */}
            <div className="flex flex-col">
              <label htmlFor="fontSelect" className="text-sm text-gray-600 mb-1">
                Font
              </label>
              <select
                id="fontSelect"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="Arial" style={{ fontFamily: "Arial" }}>Arial</option>
                <option value="Cursive" style={{ fontFamily: "Cursive" }}>Cursive</option>
                <option value="Comic Sans MS" style={{ fontFamily: "Comic Sans MS" }}>Comic Sans</option>
                <option value="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</option>
                <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
              </select>
            </div>

            {/* Outer Background Color Toggle */}
            <div className="flex flex-col">
            <button 
              onClick={() => setShowColorOptions((prev) => !prev)}
                className="flex items-center justify-between px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Background
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-sm border ml-2" style={{ backgroundColor: outerBackgroundColor }}></div>
                  <span>{showColorOptions ? "▾" : "▸"}</span>
                </span>
              </button>
              <AnimatePresence>
                {showColorOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {outerLayerColors.map(({ name, color }) => (
                      <div
                        key={name}
                        title={name}
                        onClick={() => setOuterBackgroundColor(color)}
                        className="w-6 h-6 rounded-[4px] cursor-pointer border border-gray-300 hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                    <button
                      onClick={() => setOuterBackgroundColor(defaultBackgroundColor)}
                      className="mt-2 px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-100 transition"
                    >
                      Reset Background
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Panel Color Toggle */}
            <div className="flex flex-col">
            <button
              onClick={() => setShowMainColorOptions((prev) => !prev)}
              className="flex items-center justify-between px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Main Panel
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm border ml-2" style={{ backgroundColor: mainBackgroundColor }}></div>
                <span>{showMainColorOptions ? "▾" : "▸"}</span>
              </span>
            </button>
              <AnimatePresence>
                {showMainColorOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {mainPanelColors.map(({ name, color }) => (
                      <div
                        key={name}
                        title={name}
                        onClick={() => setMainBackgroundColor(color)}
                        className="w-6 h-6 rounded-[4px] cursor-pointer border border-gray-300 hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                    <button
                      onClick={() => setMainBackgroundColor(defaultMainColor)}
                      className="mt-2 px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-100 transition"
                    >
                      Reset Panel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

BrushCustomization.propTypes = {
  selectedFont: PropTypes.string.isRequired,
  setSelectedFont: PropTypes.func.isRequired,
  outerBackgroundColor: PropTypes.string.isRequired,
  setOuterBackgroundColor: PropTypes.func.isRequired,
  defaultBackgroundColor: PropTypes.string.isRequired,
  mainBackgroundColor: PropTypes.string.isRequired,
  setMainBackgroundColor: PropTypes.func.isRequired,
  defaultMainColor: PropTypes.string.isRequired,
  showCustomizeBox: PropTypes.bool.isRequired,
  showColorOptions: PropTypes.bool.isRequired,
  setShowColorOptions: PropTypes.func.isRequired,
  showMainColorOptions: PropTypes.bool.isRequired,
  setShowMainColorOptions: PropTypes.func.isRequired,
};

export default BrushCustomization;
