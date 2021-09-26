import React from 'react';
import Book from '../Components/Book';
import { Link } from 'react-router-dom';
import { search } from '../BooksAPI';


class Search extends React.Component {
    state = {
        query: '',
        result: [],
        intersect: []
    }

    updateBooks = (input) => {
        const rawInput = input.trim()
        if (rawInput) {
            search(rawInput).then(result => result && this.setState({ result }))
        }
        else {
            this.setState({ result: [] })
        }
        this.setState({ query: rawInput })
        this.handleShelves()
    }

    handleShelves = () => {
        const { result } = this.state
        result.map(book => {
            const { allBooks } = this.props
            const intersect = allBooks.find(b => b.id === book.id)

            if (intersect) {
                book.shelf = intersect.shelf
            } else {
                book.shelf = "none"
            }
            return null
        })
        this.setState({ result })
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
                        {this.state.result.map((book) => <Book key={book.id} book={book} handleChange={this.props.addBook} />)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;