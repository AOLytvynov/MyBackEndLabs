import { useEffect, useMemo, useState } from "react";
import Header from "./Header.jsx";
import Filter from "./Filter.jsx";
import ItemList from "./ItemList.jsx";
import AddItemForm from "./AddItemForm.jsx";
import Section from "./Section.jsx";
import { fetchBooks } from "../services/api.js";
import { createLocalBook, filterItems } from "../utils/helpers.js";

function App() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("title");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function loadBooks() {
            setIsLoading(true);
            setError(null);

            try {
                const books = await fetchBooks(controller.signal);
                setItems(books);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Не вдалося завантажити каталог.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadBooks();

        return () => controller.abort();
    }, []);

    const visibleItems = useMemo(() => {
        return filterItems(items, searchQuery, filter, sort);
    }, [items, searchQuery, filter, sort]);

    function handleAddItem(formData) {
        const newBook = createLocalBook(formData);
        setItems((prev) => [newBook, ...prev]);
    }

    function handleDeleteItem(id) {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }

    function handleRateItem(id) {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, rating: Number(Math.min(5, item.rating + 0.1).toFixed(1)) }
                    : item
            )
        );
    }

    return (
        <div className="app">
            <Header searchQuery={searchQuery} onSearch={setSearchQuery} />

            <main className="main-layout">
                <Section title="Фільтри">
                    <Filter
                        filter={filter}
                        sort={sort}
                        onFilterChange={setFilter}
                        onSortChange={setSort}
                        total={visibleItems.length}
                    />
                </Section>

                <Section title="Додати книгу">
                    <AddItemForm onAdd={handleAddItem} />
                </Section>

                <Section title="Каталог">
                    {isLoading && <p className="loader">Завантаження...</p>}
                    {error && <p className="error">{error}</p>}

                    {!isLoading && !error && (
                        <ItemList
                            items={visibleItems}
                            onDelete={handleDeleteItem}
                            onRate={handleRateItem}
                        />
                    )}
                </Section>
            </main>
        </div>
    );
}

export default App;
