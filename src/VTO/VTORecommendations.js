import { useEffect, useRef, Fragment } from "react";
import { useVTOProvider } from "./VTOContext";
// import PropTypes from "prop-types";

// Note: Refactored VTORecommendation, fixed eslint warnings.

const TakeSnapshotButton = ({
  TakeSnapshotIcon,
  hasNoRecommendation,
  currentView,
  onTakeSnapshot,
}) => {
  return (
    <div
      className={`vto-recommendation-item vto-snapshot ${
        hasNoRecommendation? "no-recommendations":"recommendations"
      }`}
      onMouseUp={onTakeSnapshot}
    >
      <TakeSnapshotIcon color={currentView === "3d" ? "#80C8C1" : "#ffffff"} />
    </div>
  );
};

const ProductButton = ({ item, currentView, onSelectRecommendedProduct }) => {
  return (
    <div
      className={`vto-recommendation-item${
        currentView === "3d" ? " view3d" : ""
      }`}
      key={item.variations[item.index].code}
      onMouseUp={(e) => {
        onSelectRecommendedProduct(item);
        const elems = document.querySelectorAll(".active");
        [].forEach.call(elems, function (el) {
          el.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
      }}
    >
      <img src={item.variations[item.index].thumbnailUrl} alt="thumbnail" />
    </div>
  );
};

const VTORecommendations = ({
  variationData,
  takeSnapshotIcon,
  takeSnapshot,
  loadProduct,
  view,
}) => {
  const { setCurrentProduct } = useVTOProvider();
  const isDragging = useRef(false);

  const onTakeSnapshot = () => {
    //if (!isDragging.current) {
      takeSnapshot();
    //}
  };
  const onSelectRecommendedProduct = (item) => {
    if (!isDragging.current) {
      // console.log("loading SKU", item.variations[item.index].code);
      setTimeout(loadProduct(item.variations[item.index].code), 200);
      setCurrentProduct({ ...item });
    }
  };

  useEffect(() => {
    if (variationData.length > 0) {
      const ele = document.querySelector(".vto-recommendation-wrapper");
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
        if (isDragging.current) isDragging.current = false;
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
          isDragging.current = true;
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
    <>
      <div className="vto-recommendation-wrapper">
        {variationData.length > 0 ? (
          variationData.map((item, i) => {
            return (
              <Fragment key={i}>
                {/*i <= variationData.length / 2 &&
                  i + 1 > variationData.length / 2 && (

                  )*/}
                <ProductButton
                  item={item}
                  currentView={view}
                  onSelectRecommendedProduct={onSelectRecommendedProduct}
                />
              </Fragment>
            );
          })
        ) : (
          <TakeSnapshotButton
            hasNoRecommendation={true}
            currentView={view}
            TakeSnapshotIcon={takeSnapshotIcon}
            onTakeSnapshot={onTakeSnapshot}
          />
        )}
      </div>
      {variationData.length > 0 && (
        <TakeSnapshotButton
          hasNoRecommendation={false}
          currentView={view}
          TakeSnapshotIcon={takeSnapshotIcon}
          onTakeSnapshot={onTakeSnapshot}
        />
      )}
    </>
  );
};

//Add proptypes

export default VTORecommendations;
