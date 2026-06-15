function Filter({ filter, sort, onFilterChange, onSortChange, total }) {
    return (
        <div className="toolbar">
            <div className="filter-group">
                <button
                    className={filter === "all" ? "active" : ""}
                    type="button"
                    onClick={() => onFilterChange("all")}
                >
                    Всі
                </button>
                <button
                    className={filter === "high" ? "active" : ""}
                    type="button"
                    onClick={() => onFilterChange("high")}
                >
                    Рейтинг 4.5+
                </button>
                <button
                    className={filter === "modern" ? "active" : ""}
                    type="button"
                    onClick={() => onFilterChange("modern")}
                >
                    Нові книги
                </button>
                <button
                    className={filter === "Programming" ? "active" : ""}
                    type="button"
                    onClick={() => onFilterChange("Programming")}
                >
                    Programming
                </button>
            </div>

            <label className="sort-box">
                <span>Сортування</span>
                <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
                    <option value="title">За назвою</option>
                    <option value="rating">За рейтингом</option>
                    <option value="year">За роком</option>
                </select>
            </label>

            <p className="total">Знайдено: {total}</p>
        </div>
    );
}

export default Filter;
