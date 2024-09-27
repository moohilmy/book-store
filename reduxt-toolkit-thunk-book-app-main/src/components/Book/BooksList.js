import React from 'react';
import { useDispatch } from 'react-redux';
const BooksList = ({isLoading , books , isLoggedIn , deleteBook , getBookInfo}) => {
  const dispatch = useDispatch()
  const bookslist = books.length > 0 ? books.map((book) =>(
    <li key={book.id} className='list-group-item d-flex  justify-content-between align-items-center'>
    <div>{book.title}</div>
    <div className='btn-group' role='group'>
      <button type='button' className='btn btn-primary' onClick={()=> dispatch(getBookInfo(book))}>
        Read
      </button>
      <button type='button' className='btn btn-danger' disabled={!isLoggedIn} onClick={()=> dispatch(deleteBook(book.id))}>
        Delete
      </button>
    </div> 
  </li>
  )) : "this no books avilable"
  return (
    <div>
      <h2>Books List</h2>
      {
        isLoading ? ('loding.....') : 
        <ul className='list-group'> {bookslist} </ul>
      }
    </div>
  );
};

export default BooksList;
