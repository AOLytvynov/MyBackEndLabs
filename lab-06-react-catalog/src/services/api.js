const API_URL = "https://openlibrary.org/search.json?q=javascript&limit=12";

function getCoverUrl(coverId) {
    if (!coverId) {
        return "https://placehold.co/300x420/0f172a/ffffff?text=Book";
    }

    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

export async function fetchBooks(signal) {
    const response = await fetch(API_URL, { signal });

    if (!response.ok) {
        throw new Error("Failed to load books");
    }

    const data = await response.json();
    const genres = ["Programming", "Web", "Software"];

    return data.docs.map((book, index) => ({
        id: book.key,
        title: book.title || "Untitled book",
        author: book.author_name?.[0] || "Unknown author",
        year: book.first_publish_year || "Unknown year",
        genre: genres[index % genres.length],
        rating: Number((3.8 + (index % 5) * 0.25).toFixed(1)),
        description: "Book from Open Library catalog.",
        image: getCoverUrl(book.cover_i)
    }));
}
