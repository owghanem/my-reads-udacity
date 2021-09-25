import React from 'react'
import Home from './Pages/Home';
import { Switch, Route } from 'react-router-dom';
import { getAll, update as updateBooks } from './BooksAPI';
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
    const books = this.state.books
    const currentlyReading = books.filter(book => book.shelf === "currentlyReading")
    const wantToRead = books.filter(book => book.shelf === "wantToRead")
    const read = books.filter(book => book.shelf === "read")
    this.setState({ currentlyReading, wantToRead, read })
  }

  updateBookState = (book, newBookShelf) => {
    this.setState(prevState => {
      prevState.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = newBookShelf
        }
        return book
      })
    })

    this.filterBooks()
  }

  handleChange = (book, newBookShelf) => {
    updateBooks(book, newBookShelf).then(() => {
      this.updateBookState(book, newBookShelf)
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <Home
              handleChange={this.handleChange}
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
            />
          )} />
          <Route exact path="/search" render={() => (
            <Search
              handleChange={this.handleChange}
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
            />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
