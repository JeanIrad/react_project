import { Fragment } from "react";
import { useState } from "react";
interface ListGropProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}
function ListGroup({ items, heading, onSelectItem }: ListGropProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const handleSelect = (index: number, item: string) => {
    setSelectedIndex(index);
    onSelectItem(item);
  };
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => handleSelect(index, item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
