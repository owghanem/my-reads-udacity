import React from 'react';
import Book from '../Components/Book';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';


class Search extends React.Component {
    state = {
        query: '',
        books: [],
    }

    updateBooks = (input) => {
        const rawInput = input.trim()
        if (rawInput) {
            search(rawInput).then(books => books && this.setState({ books }))
        }
        else {
            this.setState({ books: [] })
        }
        this.setState({ query: input })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.updateBooks(e.target.value)}
                            value={this.state.query} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => <Book key={book.id} book={book} handleChange={this.props.handleChange} />)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;