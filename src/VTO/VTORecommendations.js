import { useEffect, useCallback } from "react";
import { useVTOProvider } from "./VTOContext";
// import PropTypes from "prop-types";

const VTORecommendations = ({
  variationData,
  takeSnapshotIcon,
  takeSnapshot,
  loadProduct,
  view,
}) => {
  const { setCurrentProduct } = useVTOProvider();

  const TakeSnapshotIcon = takeSnapshotIcon;
  let isDragging = false;
  const TakeSnapshotButton = useCallback(() => {
    return (
      <div
        className={`vto-recommendation-item vto-snapshot ${
          variationData.length === 0 ? "no-recommendations" : ""
        }`}
        onMouseUp={() => {
          if (!isDragging) {
            takeSnapshot();
          }
        }}
      >
        <TakeSnapshotIcon color={view === "3d" ? "#80C8C1" : "#ffffff"} />
      </div>
    );
  }, [variationData, view]);
  const ProductButton = useCallback(
    ({ item }) => {
      return (
        <div
          className={`vto-recommendation-item${view === "3d" ? " view3d" : ""}`}
          key={item.variations[item.index].code}
          onMouseUp={() => {
            if (!isDragging) {
              console.log("loading SKU", item.variations[item.index].code);
              setTimeout(loadProduct(item.variations[item.index].code), 200);
              setCurrentProduct({ ...item });
            }
          }}
        >
          <img src={item.variations[item.index].thumbnailUrl} alt="thumbnail" />
        </div>
      );
    },
    [view]
  );
  useEffect(() => {
    if (variationData.length > 0) {
      let ele = document.querySelector(".vto-recommendation-wrapper");
      ele.scrollLeft = (ele.scrollWidth - ele.clientWidth) / 2;

      // Drag to scroll feature
      ele.style.cursor = "grab";
      let pos = {
        top: 0,
        left: (ele.scrollWidth - ele.clientWidth) / 2,
        x: 0,
        y: 0,
      };

      const mouseDownHandler = function (e) {
        ele.style.cursor = "grabbing";
        ele.style.userSelect = "none";
        if (isDragging) isDragging = false;
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

        if (dx !== 0 && dx !== null) {
          isDragging = true;
        }
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
        variationData.map((item, i) => {
          return (
            <>
              {i <= variationData.length / 2 &&
                i + 1 > variationData.length / 2 && (
                  <TakeSnapshotButton key={i} />
                )}
              <ProductButton item={item} key={i} />
            </>
          );
        })
      ) : (
        <TakeSnapshotButton />
      )}
    </div>
  );
};

//Add proptypes

export default VTORecommendations;
