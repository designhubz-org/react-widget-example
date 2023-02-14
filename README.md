# React Widget Example

Example code for showcase of Designhubz TryOn widget built upon React. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting Started

To run the example app in the development mode:

```
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

To builds the app for production to the `build` folder.

```
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

The example page is hosted on https://d2v6wmk4yqo2ys.cloudfront.net/flutter/demo.hml?orgId=10139402

# Use Case

You can see the example of use VirtualTryOn component and required props.

### Example

```jsx
import React, { useState } from "react";
import {
  CloseIcon,
  ARIcon,
  ThreeDIcon,
  TakeSnapshotIcon,
} from "./assets/icons";
import Modal from "./VTO/VTOModal.js";
import VirtualTryOn from "./VTO/VirtualTryOn";

const App = () => {
  const [VTOActivated, setVTOActivated] = useState(false);
  const VTOIcons = {
    threeDSwitchIcon: ThreeDIcon,
    ARSwitchIcon: ARIcon,
    takeSnapShotIcon: TakeSnapshotIcon,
  };

  const showModal = () => {
    setVTOActivated(true);
  };

  const hideModal = () => {
    setVTOActivated(false);
  };

  const fetchVariationData = async (variationCodes) => {
    // fetch and return variation data by variation codes
    return variationData;
  };

  const addToCart = (variation) => {
    // action when a variation added to cart
  };

  return (
    <div className="App">
      <div className="sample-product">
        <button onClick={showModal}>Open Virtual TryOn Modal</button>
      </div>
      <Modal show={VTOActivated} handleClose={hideModal} CloseIcon={CloseIcon}>
        <VirtualTryOn
          product={currentProduct}
          userId={"1234"}
          checkoutCartURL={"/checkout/cart"}
          icons={VTOIcons}
          fetchVariationData={fetchVariationData}
          addToCart={addToCart}
        />
      </Modal>
    </div>
  );
};

export default App;
```

The `fetchVariationData` function will look like following:

```javascript
const fetchVariationData = async (variationCodes) => {
  // Current Eyewa: POST https://bff.eyewa.com/v1/catalog/ae-en/productList - Requires Bearer Token
  if (!variationCodes) return [];
  const response = await fetch(
    `https://prod-prd-gateway-api.designhubz.com/workspace/eyewear/variation/?&collectVariationDetails=true&collectProductDetails=true&referenceIds=${variationCodes}`,
    {
      method: "GET",
      headers: {
        Authorization: "38cff8acaa7d457a935b5db01ca4e22d",
        orgid: "23049412",
      },
    }
  );
  const variationsData = await response.json();
  const productArray = [];
  variationsData.data.forEach(function (item) {
    const variations = [
      {
        code: item.referenceId,
        hexColor: item.colorHex,
        price: 369,
        currency: "AED",
        thumbnailUrl: item.thumbnailUrl,
        name: item.name,
        textureUrl: "",
        pdpUrl:
          "https://eyewa.com/ae-en/30sundays-valiant-000241-1201-sunglasses.html",
      },
    ];
    for (const variation of item.variations) {
      variations.push({
        code: variation.referenceId,
        hexColor: variation.colorHex,
        price: 369,
        currency: "AED",
        thumbnailUrl: variation.thumbnailUrl,
        name: variation.name,
        textureUrl: "",
        pdpUrl:
          "https://eyewa.com/ae-en/30sundays-valiant-000241-1201-sunglasses.html",
      });
    }
    productArray.push({
      index: 0,
      name: item.product.name,
      variations,
    });
  });

  return productArray;
};
```

## `VTOModal`

This is a component to be used for showing modal on center of the screen.

### Example

```jsx
const [isShown, setIsShown] = useState(false);
const hideModal = () => {
  setVTOActivated(false);
};
<Modal show={isShown} handleClose={hideModal} CloseIcon={CloseIcon}>
  modal content ...
</Modal>;
```

### Props

| Prop          | Type      | Description                                           |
| :------------ | :-------- | :---------------------------------------------------- |
| `show`        | `boolean` | **Required**. show modal if it's true, hide otherwise |
| `handleClose` | `func`    | **Required**. modal close handler                     |
| `CloseIcon`   | `node`    | **Required**. a component of close icon               |

## `VirtualTryOn`

This is a main component to show designhubz widget assisting virtual-tryon expeirence and display product in 3D.

### Example

```jsx
const VTOIcons = {
  threeDSwitchIcon: ThreeDIcon,
  ARSwitchIcon: ARIcon,
  takeSnapShotIcon: TakeSnapshotIcon,
};
const fetchVariationData = (variationCodes) => variationData;
const addToCart = () => {};
<VirtualTryOn
  product={currentProduct}
  userId={"1234"}
  checkoutCartURL={"/checkout/cart"}
  icons={VTOIcons}
  fetchVariationData={fetchVariationData}
  addToCart={addToCart}
/>;
```

### Props

| Prop                 | Type       | Description                                    |
| :------------------- | :--------- | :--------------------------------------------- |
| `product`            | `IProduct` | **Required**. current product data             |
| `userId`             | `string`   | **Required**. user id registered on designhubz |
| `checkoutCartURL`    | `string`   | **Required**. the url of checkout cart         |
| `icons`              | `node[]`   | **Required**. set of icon components           |
| `fetchVariationData` | `func`     | **Required**. fetch variation handler          |
| `addToCart`          | `func`     | **Required**. add to cart handler              |

## `useVTOWidget`

It's the custom hook to expose functions from Designhubz widget to react component side.

### Example

```jsx
import useVTOWidget from "./useVTOWidget";
...
const {
  containerRef,
  vtoCreateWidget,
  vtoSetUserId,
  vtoLoadProduct,
  vtoSwitchView,
  vtoTakeSnapshot,
  vtoFetchRecommendations,
} = useVTOWidget({
  onUserInfoUpdate: (userInfo) => {
    // Process fetch recommendatation when got user info
  },
  onTrackingStatusChange: (trackingStatus) => {
    // To do something when trackingStatus is changed
  },
});
```

### Params

| Parameter                | Type   | Description                                        |
| :----------------------- | :----- | :------------------------------------------------- |
| `onUserInfoUpdate`       | `func` | **Required**. onUserInfoUpdate event handler       |
| `onTrackingStatusChange` | `func` | **Required**. onTrackingStatusChange event handler |

### Return

| Parameter                 | Type   | Description                                                                  |
| :------------------------ | :----- | :--------------------------------------------------------------------------- |
| `containerRef`            | `func` | **Required**. ref of container div element to include widget                 |
| `vtoCreateWidget`         | `func` | **Required**. callback of createWidget creates a widget                      |
| `vtoSetUserId`            | `func` | **Required**. callback of setUserId to set user id                           |
| `vtoLoadProduct`          | `func` | **Required**. callback of loadProduct to load product upon productId         |
| `vtoSwitchView`           | `func` | **Required**. callback of switchContext show in tryon or 3d mode             |
| `vtoTakeSnapshot`         | `func` | **Required**. callback of takeSnapshot takes a snapshot photo                |
| `vtoFetchRecommendations` | `func` | **Required**. callback of fetchRecommendation to get recommendation products |

# Context and Provider

Here are all possible event handlers that you can subscribe on flutter's side.

## `VTOContext`

VTOContext is the global context within VirtualTryOn component to keep all widget related statuses.

### Props

```javascript
{
  widgetStatus,
  setWidgetStatus,
  currentView,
  setCurrentView,
  trackingStatus,
  setTrackingStatus,
  currentProduct,
  setCurrentProduct,
  snapshotData,
  setSnapshotData,
  snapshotPreview,
  setSnapshotPreview,
}
```

### Description

| Parameter            | Type      | Description                                                                              |
| :------------------- | :-------- | :--------------------------------------------------------------------------------------- |
| `widgetStatus`       | `string`  | Status of the widget (`NOT_READY`, `INITIATED`)                                          |
| `setWidgetStatus`    | `func`    | Set state of widgetStatus in context                                                     |
| `currentView`        | `string`  | Status of the widget (`tryon`, `3d`)                                                     |
| `setCurrentView`     | `func`    | Set state of currentView in context                                                      |
| `trackingStatus`     | `string`  | Status of the widget (`Idle`, `CameraNotFound`, `FaceNotFound`, `Analyzing`, `Tracking`) |
| `setTrackingStatus`  | `func`    | Set state of trackingStatus in context                                                   |
| `currentProduct`     | `object`  | Status of the current product (`idle`, `loading`, `read`)                                |
| `setCurrentProduct`  | `func`    | Set state of currentProduct in context                                                   |
| `snapshotData`       | `string`  | Status of the snapshot data                                                              |
| `setSnapshotData`    | `func`    | Set state of snapshotData in context                                                     |
| `snapshotPreview`    | `boolean` | Status of the snapshot preview                                                           |
| `setSnapshotPreview` | `func`    | Set state of snapshotPreview in context                                                  |

## `useVTOProvider`

It's the custom hook to use statuses from VTOContext involving widgetStatus, trackingStatus etc..
You can access to the context props using this custom hook like following example:

### Example

```javascript
import { useVTOProvider } from "./VTOContext";
const {
  currentProduct,
  setTrackingStatus,
  setSnapshotData,
  snapshotPreview,
  setSnapshotPreview,
} = useVTOProvider();
```
