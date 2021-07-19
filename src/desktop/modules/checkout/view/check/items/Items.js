import React from "react";
import Item from "./Item";

function Items(props) {
    let items = props.items.map(function(item) {
        return <Item item={item} key={item.id} />;
    });

    return <div className="check__items">{items}</div>;
}

export default Items;
