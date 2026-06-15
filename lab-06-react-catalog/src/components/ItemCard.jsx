function ItemCard({ item, onDelete, onRate }) {
    return (
        <article className="item-card">
            <img src={item.image} alt={item.title} />

            <div className="item-content">
                <p className="item-genre">{item.genre}</p>
                <h3>{item.title}</h3>
                <p className="item-meta">
                    {item.author} · {item.year}
                </p>
                <p>{item.description}</p>

                <div className="card-actions">
                    <span className="rating">★ {item.rating}</span>
                    <button type="button" onClick={() => onRate(item.id)}>
                        + рейтинг
                    </button>
                    <button className="danger" type="button" onClick={() => onDelete(item.id)}>
                        Видалити
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ItemCard;
