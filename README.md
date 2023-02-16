# React Widget Example

Example code for TryOn widget integration in React projects. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting Started

To run the example app in the development mode:

```
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The example page is hosted on https://d2v6wmk4yqo2ys.cloudfront.net/flutter/demo.hml?orgId=10139402

# Usage / Integration
Simply move the `VTO` directory to your project and import the `VirtualTryOn` component.
Additionally, you may import the `VTOModal` component to embed the experience in a page modal.

```
import Modal from "./VTO/VTOModal.js";
import VirtualTryOn from "./VTO/VirtualTryOn";
```

You would still need to install designhubz widget package to your project. This package is imported in the `useVTOWidget` general custom hook:
```
import { auth, setDeployment, createEyewearWidget } from "designhubz-widget";
```


### UI Customization
All CSS styling are in gathered in one CSS file `VirtualTryOn.css`.
Making UI changes to the widget elements is as easy as applying changes to the CSS classes.

# Use Cases

In the example below, you can find the usage of VirtualTryOn component and required props.

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

The `fetchVariationData` function is meant to get full variation data from eCommerce app database.
In the example below, we are fetching the data from designhubz internal data:

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
Product object should have the structure below. In our example, we are formatting the returned variation data to match the designated structure and adding them to product object.
```
{
  index: 0,
  name: "30Sundays VALIANT",
  variations: [
    {
      code: "000241-1201",
      hexColor: "#C0C0C0",
      price: 369,
      currency: "AED",
      thumbnailUrl:
        "https://cdn.eyewa.com/cdn-cgi/image/width=900,height=900,quality=80/media/catalog/product/s/u/sunglasses-30sundays-000241-1201-1.jpg",
      name: "Gray",
      textureUrl: "",
      pdpUrl:
        "https://eyewa.com/ae-en/30sundays-valiant-000241-1201-sunglasses.html",
    },
    {
      code: "000241-2906",
      hexColor: "#ffd700",
      price: 185,
      currency: "AED",
      thumbnailUrl:
        "https://cdn.eyewa.com/cdn-cgi/image/width=900,height=900,quality=80/media/catalog/product/s/u/sunglasses-30sundays-000241-2906-1.jpg",
      name: "Yellow",
      textureUrl: "",
      pdpUrl:
        "https://eyewa.com/ae-en/30sundays-valiant-000241-2906-sunglasses.html",
    }
}
```
`index` parameter indicates the array index of the variation to be loaded initially.
## `VTOModal`

Component used for showing a modal in the middle of the screen.

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

This is the main widget component that embeds the virtual-tryon and 3D experiences.

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

It's the custom hook to expose functions from Designhubz widget to the React components.

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

