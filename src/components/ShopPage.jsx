import React from "react";
import ShopIcon from "./ShopIcon";

const ShopPage = (props) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <ShopIcon />
            <ShopIcon />
            <ShopIcon />
            <ShopIcon />
        </div>
    )
}

export default ShopPage;