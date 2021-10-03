import React from 'react'
import Home from './Pages/Home';
import { Switch, Route } from 'react-router-dom';
import { getAll, update as updateBooksAPI } from './BooksAPI';
import Search from './Pages/Search';
import './App.css'

class BooksApp extends React.Component {
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
    const books = this.state.books.filter(b => (b.shelf !== "none"))
    const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
    const wantToRead = books.filter(book => book.shelf === "wantToRead")
    const read = books.filter(book => book.shelf === "read")
    this.setState({ books, currentlyReading, wantToRead, read })
  }

  updateBookShelf = (book, newBookShelf) => {
    updateBooksAPI(book, newBookShelf).then(() => {
      book.shelf = newBookShelf
      this.setState(prevState => ({ books: prevState.books.filter(b => b.id !== book.id).concat(book) }), this.filterBooks())
    })
  }

  render() {
    return (
      <div className="app" >
        <Switch>
          <Route exact path="/" render={() => (
            <Home
              handleChange={this.updateBookShelf}
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
            />
          )} />
          <Route exact path="/search" render={() => (
            <Search
              addBook={this.updateBookShelf}
              allBooks={this.state.books}
            />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp