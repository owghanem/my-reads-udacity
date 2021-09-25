import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../Components/BookShelf';

class Home extends React.Component {
    render() {
        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf books={this.props.currentlyReading} handleChange={this.props.handleChange} title="Currently Reading" />
                    <BookShelf books={this.props.wantToRead} handleChange={this.props.handleChange} title="Want To Read" />
                    <BookShelf books={this.props.read} handleChange={this.props.handleChange} title="Have Read" />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>);
    }
}

export default Home;