import App from "./App";
import './searchBooks.css';
import { Link } from "react-router-dom";
import serializeForm from "form-serialize";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const searchBook = ({booksShelf,onSearch,onRedirect,onChangeValue}) => {
  // const navigate = useNavigate();

  window.addEventListener('popstate', () => {
    onRedirect();
  });
  const handeInput = (e) => {
    console.log(e.target.value);
    if(e.target.value == "") {
      onRedirect();
    }else {
      onSearch(e.target.value);
    }
  }

  const getBook = (book) => {
    console.log(book);
  }

  const redirect = () => {
    onRedirect();
  }
  const getDropdown = (e) => {
    console.log(e.target.value);
    console.log(e.target.parentElement.parentElement.parentElement.querySelector(".book_id_class").innerText);
    onChangeValue(e.target.parentElement.parentElement.parentElement.querySelector(".book_id_class").innerText,e.target.value);
  }

  return (
    <div className="search-books">
          <div className="search-books-bar">
            {/* <a
              className="close-search"
              // onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a> */}
            <Link className="close-search" onClick={redirect} to="/">Close</Link>
            
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handeInput}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">

            { booksShelf['error'] != "empty query" && booksShelf.map((bookList) => <li key={bookList.id}>
            <div className="book">
            <div className="book_id_class">{bookList.id}</div>
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                      `url("${bookList.imageLinks && bookList.imageLinks['thumbnail']}")`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  {
                    bookList.shelf ? (<select defaultValue={bookList.shelf} onChange={getDropdown}>
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>):(<select defaultValue="none" onChange={getDropdown}>
                    <option value="move_to" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>)
                  }
                </div>
              </div>
              <div className="book-title">{bookList.title}</div>
              <div className="book-authors">{ bookList.authors && bookList.authors[0]}</div>
            </div>
          </li>)
          }
            </ol>
          </div>
        </div>
  )
}

searchBook.propTypes = {
  booksShelf: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired
}

export default searchBook;