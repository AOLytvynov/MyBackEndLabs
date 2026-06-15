import ItemCard from "./ItemCard.jsx";

function ItemList({ items, onDelete, onRate }) {
    if (items.length === 0) {
        return <p className="empty">Нічого не знайдено.</p>;
    }

    return (
        <div className="item-list">
            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    onDelete={onDelete}
                    onRate={onRate}
                />
            ))}
        </div>
    );
}

export default ItemList;
