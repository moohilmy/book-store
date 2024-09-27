import React, { Fragment , useEffect } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { useDispatch, useSelector} from 'react-redux';
import { deleteBook, getBooks , getBookInfo } from '../../store/bookSlice';
import './book.css';

const PostContainer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch]);
  const { isLoading, books , bookInfo} = useSelector(state => state.books)
  const {isLoggedIn} = useSelector(state => state.auth)
  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} books={books} isLoggedIn={isLoggedIn} deleteBook={deleteBook} getBookInfo={getBookInfo}/>
        </div>
        <div className='col side-line'>
          <BookInfo bookInfo={bookInfo}/>
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
