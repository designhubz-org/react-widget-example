import { useEffect } from "react";
import PropTypes from "prop-types";

const VTORecommendations = ({ variationData }) => {
  useEffect(() => {
    if (variationData.length > 0) {
      let ele = document.querySelector(".vto-recommendation-wrapper");
      ele.scrollLeft = (ele.scrollWidth - ele.clientWidth) / 2;

      // Drag to scroll feature
      ele.style.cursor = "grab";
      let pos = { top: 0, left: (ele.scrollWidth - ele.clientWidth) / 2, x: 0, y: 0 };

      const mouseDownHandler = function (e) {
        ele.style.cursor = "grabbing";
        ele.style.userSelect = "none";

        pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
      };

      const mouseUpHandler = function () {
        ele.style.cursor = "grab";
        ele.style.removeProperty("user-select");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      // Attach the handler
      ele.addEventListener("mousedown", mouseDownHandler);
    }
  }, [variationData]);
  return (
    <div className="vto-recommendation-wrapper">
      {variationData.length > 0 ? (
        variationData.map((x, i) => {
          if (
            i <= variationData.length / 2 &&
            i + 1 > variationData.length / 2
          ) {
            return (
              <>
                <div className="vto-recommendation-item vto-snapshot"></div>
                <div className="vto-recommendation-item"></div>
              </>
            );
          }
          return <div className="vto-recommendation-item"></div>;
        })
      ) : (
        <div className="vto-recommendation-item vto-snapshot no-recommendations"></div>
      )}
    </div>
  );
};

//Add proptypes

export default VTORecommendations;
