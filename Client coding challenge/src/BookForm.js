import React from 'react';

function BookForm( props ){
    return(
        <div>
            < form onSubmit = {connectToAPI} >
                <div>
                    <label htmlFor = "bookTitle" > bookTitle </label>
                    <input type = "text" name="bookTitle" id = "bookTitle"/>
                </div>
                <div>
                    <button type ="submit">
                    Search
                    </button>
                </div>
            </form>
        </div>
    );
}

function connectToAPI  (event,props)  {
    event.preventDefault()
    const bookTitle = event.target.bookTitle.value
    const url = `${props.apiURL}` + bookTitle

    const settings={
        method : 'GET'
    }

    fetch(url,settings)
        .then(response=>{
            if(response.ok){
                return response.json()
            }
            else{
                throw new Error(response.statusText);
            }
        })
        .then(responseJSON=>{
            this.setState({
                result:responseJSON
            })
        })
        .catch(err=>{
            this.setState({
                result:err.message
            })
        })

}

export default BookForm;