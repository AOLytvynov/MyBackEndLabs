import { useState } from "react";

const initialForm = {
    title: "",
    author: "",
    year: "2024",
    genre: "Programming",
    rating: "4.5",
    description: "",
    image: ""
};

function AddItemForm({ onAdd }) {
    const [formData, setFormData] = useState(initialForm);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.title.trim() || !formData.author.trim()) {
            return;
        }

        onAdd(formData);
        setFormData(initialForm);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-grid">
                <label>
                    Назва
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Назва книги"
                    />
                </label>

                <label>
                    Автор
                    <input
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Автор"
                    />
                </label>

                <label>
                    Рік
                    <input
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Жанр
                    <select name="genre" value={formData.genre} onChange={handleChange}>
                        <option value="Programming">Programming</option>
                        <option value="Web">Web</option>
                        <option value="Software">Software</option>
                    </select>
                </label>

                <label>
                    Рейтинг
                    <input
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Зображення URL
                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Необов'язково"
                    />
                </label>
            </div>

            <label>
                Опис
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Короткий опис"
                />
            </label>

            <button type="submit">Додати книгу</button>
        </form>
    );
}

export default AddItemForm;
