import { useMutation, useQueryClient } from "react-query";

interface ItemProps {
  item: any,
  setEditingIndex: any
}

export const patchItem = async (body: any) => {
  const settings = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({data:{...body}}),
  };
  try {
    const fetchResponse = await fetch(
      `http://localhost:1337/api/shopping-items/${body.id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};
// Delete
export const deleteItem = async (id: any) => {
  const settings = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      `http://localhost:1337/api/shopping-items/${id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

const Item: React.FC<ItemProps> = (props) => {
  const item = props.item;
  const cache = useQueryClient();
  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      cache.invalidateQueries("shopping");
    },
  }) as any;
  const handleRemoveItem = (event: any) => {
    event.preventDefault();
    mutation.mutate(item.id);
    props.setEditingIndex(null);
  };
  
  const mutationPatch = useMutation(patchItem, {
    onSuccess: () => {
      cache.invalidateQueries("shopping");
    },
  }) as any;
  const updateChecked = (event: any) => {
    mutationPatch.mutate({ ...item, bought: !item.Bought });
  };
  return (
    <li className="flex-row">
      {mutation.error && <div className="error">{mutation.error?.message}</div>}
      <div className="flex-large three-fourths">
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              checked={item.attributes.bought}
              className="form-check-input"
              onChange={updateChecked}
            />
            {item.Name} | {item.attributes.quantity}
            <i className="input-frame"></i>
          </label>
        </div>
        <p className="small">{item.attributes.info}</p>
      </div>
      <div className="flex-large one-fourths actions">
        <button onClick={() => {
          props.setEditingIndex(item.id);
        }} >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>
        <button onClick={handleRemoveItem}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </li>);
}

export default Item;