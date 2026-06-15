function Header({ searchQuery, onSearch }) {
    return (
        <header className="header">
            <div>
                <p className="eyebrow">React Lab 06</p>
                <h1>Book Catalog</h1>
                <p className="header-text">
                    Каталог книг з пошуком, фільтрами та формою додавання.
                </p>
            </div>

            <label className="search-box">
                <span>Пошук за назвою</span>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => onSearch(event.target.value)}
                    placeholder="Наприклад: JavaScript"
                />
            </label>
        </header>
    );
}

export default Header;
