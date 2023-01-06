import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postItem } from "../Queries";
interface AddItemFormProps {
  
}
 
const AddItemForm: React.FC<AddItemFormProps> = () => {
  // The cache hook will help invalidate our data when we add an item
  const cache = useQueryClient();
  const initialFormState = { name: "", quantity: "", info: "" };
  const [item, setItem] = useState(initialFormState);

  const {mutate, error} = useMutation(postItem, {
    onSuccess: () => {
      // cache.invalidateQueries("shopping");
    },
  }) as any;

  // We bind our form input elements to React
  // and automatically update our state on user input change
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  // On form submit, use the Mutation hook provided by React query
  // and the function set up to update our data
  const handleFormSubmit = (event:any) => {
    event.preventDefault();
    mutate({data:{...item}});
    setItem(initialFormState);
  };

  
  return (
    <div>
      {error && <div className="error">{error.message}</div>}
      <h2>Add an Item</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleInputChange}
        />
        <label>Quantity</label>
        <input
          type="text"
          name="quantity"
          value={item.quantity}
          onChange={handleInputChange}
        />
        <label>Info</label>
        <input
          type="text"
          name="info"
          value={item.info}
          onChange={handleInputChange}
        />
        <br />
        <button onClick={handleFormSubmit}>Add item</button>
      </form>
    </div>
  );
}
 
export default AddItemForm;