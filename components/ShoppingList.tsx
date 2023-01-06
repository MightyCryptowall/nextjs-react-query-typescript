import React from "react";
import Item from "./Item";
import { useQuery } from "react-query";

const data: any[] = [];

interface ShoppingListProps {
  setEditingIndex: any;
}

const fetchShoppingItems = async () => {
  const res = await fetch("http://localhost:1337/api/shopping-items");
  return res.json();
};

const ShoppingList: React.FC<ShoppingListProps> = (props) => {
  const { setEditingIndex } = props;
  const { status, data, error, refetch } = useQuery<any, any>(
    "shopping",
    fetchShoppingItems
  );
  console.log({data});
  return (
    <div id="items-list">
      {status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error.message as string}
          <br />
          <button onClick={() => refetch()}>Retry</button></span>
      ) : (
        <ul>
          {data.data
            ? data.data.map((item:any) => {
              return <Item key={item.id} item={item} setEditingIndex={props.setEditingIndex}></Item>;
            })
            : "Nothing to buy"}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;