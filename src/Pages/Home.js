import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../Components/BookShelf';
import { getAll, update as updateBooks } from '../BooksAPI';

class Home extends React.Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        getAll().then(books => {
            this.setState({ books })
            this.filterBooks()
        })
    }

    filterBooks = () => {
        const books = this.state.books
        const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
        const wantToRead = books.filter(book => book.shelf === "wantToRead")
        const read = books.filter(book => book.shelf === "read")
        this.setState({ currentlyReading, wantToRead, read })
    }

    updateBookState = (book, newBookShelf) => {
        this.setState(prevState => ({
            books: prevState.books.map((b) => {
                if (b.id === book.id) {
                    b.shelf = newBookShelf
                }
                return b
            })
        }))

        this.filterBooks()
    }

    handleChange = (book, newBookShelf) => {
        updateBooks(book, newBookShelf).then(() => {
            this.updateBookState(book, newBookShelf)
        })
    }

    render() {
        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf books={this.state.currentlyReading} handleChange={this.handleChange} title="Currently Reading" />
                    <BookShelf books={this.state.wantToRead} handleChange={this.handleChange} title="Want To Read" />
                    <BookShelf books={this.state.read} handleChange={this.handleChange} title="Have Read" />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>);
    }
}

export default Home;