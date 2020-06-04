import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';


/**
 Begin by adding a form that will ask
 for the name of a book.This form needs a submit
 button that will be clicked when the search term has been provided.
 ii.When clicking the submit button you need to connect to the Google books API.Here is the
 link to its documentation: https: //developers.google.com/books/docs/v1/using

 From the list of books you will have to display:
  1) Title of the book
 2) Just 1 author
 3) Thumbnail of the book
 4) TextSnippet of the book

 For 2 extra points in this exam: display on the screen an error message whenever you get zero
 responses from the API.Gain 2 more points
 if you display the full list of authors
 for each book.

 c.Use the component structure provided in this challenge:
  i.The BookForm component is where you’ ll place the form.
 ii.The Book component is where you’ ll display the book results.
 iii.The App is where you bind everything together.


 6) Extra credit[Up to 7 points in this exam]
 a.Using flexbox and media queries add design to coding challenge 
 4. Cover all three viewports;
 make them look different;
 you decide the sizes and how to display the book’ s information.
 */
class App extends React.Component{
//usar el get specific volume para el thumbnail
  constructor( props ){
    super( props );
    this.state = {
    bookTitle: "",
    author:"",
    volId: "", 
    result: "",
    snippet : "",
    apiURL: 'https://www.googleapis.com/books/v1/volumes?q='
    }
  }
  //https://www.googleapis.com/books/v1/volumes?q=search+terms


  


  render(){
    return(
      <div>
        <BookForm 
          bookTitle = {this.bookTitle}
          result = {this.result}
          apiURL = {this.apiURL}
          >
          
        </BookForm>
        <Book
        result = {this.result}
        >

        </Book>
      </div>
    )
  }

}

export default App;
