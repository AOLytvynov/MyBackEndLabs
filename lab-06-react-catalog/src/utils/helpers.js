export function filterItems(items, searchQuery, filter, sort) {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(normalizedQuery);
        const matchesFilter =
            filter === "all"
            || (filter === "high" && item.rating >= 4.5)
            || (filter === "modern" && Number(item.year) >= 2015)
            || item.genre === filter;

        return matchesSearch && matchesFilter;
    });

    return [...filteredItems].sort((first, second) => {
        if (sort === "rating") {
            return second.rating - first.rating;
        }

        if (sort === "year") {
            return Number(second.year) - Number(first.year);
        }

        return first.title.localeCompare(second.title);
    });
}

export function createLocalBook(formData) {
    return {
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        year: Number(formData.year),
        genre: formData.genre,
        rating: Number(formData.rating),
        description: formData.description.trim(),
        image: formData.image.trim() || "https://placehold.co/300x420/0f172a/ffffff?text=Book"
    };
}
