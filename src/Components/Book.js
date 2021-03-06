import React from 'react';

const Book = props => {
    const { book, handleChange } = props

    const changeShelf = (e) => {
        handleChange(book, e.target.value)
    }

    const imageThumb = book.imageLinks ? book.imageLinks.smallThumbnail : null;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imageThumb})`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={changeShelf} value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="none">None</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        </li>
    );

}

export default Book;