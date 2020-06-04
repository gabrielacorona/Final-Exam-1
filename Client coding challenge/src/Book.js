import React from 'react';

function Book( props ){
    return(
        <div>
            <div onLoad = {handleJSON} className='resultDiv'>
            </div>
        </div>
    );
}
/*
 1) Title of the book
 2) Just 1 author
 3) Thumbnail of the book
 4) TextSnippet of the book
*/
function handleJSON(res){
    let title = ""
    let authors = []
    let arrAuth = []
    for(let i = 0; i < res.length;i++){
        title = res.items[i].title
        authors = res.items[i].authors
        authors.forEach(auth => {
            arrAuth.push(auth)
        });
    }

}

export default Book;