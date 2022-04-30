import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
function AuthorDetail(){
const [infoAuthor, setInfoAuthor] = useState([])
const [infoBooks, setInfoBooks] = useState([])
const [isLoading, setIsLoading] = useState(true)
const params = useParams();
  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:3000/catalog/author/${params.id}`)
     .then((response) => response.json())
     .then(data => setInfoBooks(data.author_books))
     fetch(`http://localhost:3000/catalog/author/${params.id}`)
     .then((response) => response.json())
     .then(data => setInfoAuthor(data.author))
   }, [params.id]);
   
   const author_books = infoBooks.map((book) =>
   <li key={book._id}>
    <h3><Link to={`/book/${book._id}`}>{book.title}</Link></h3>
    <br></br>
    <p>{book.summary}</p>
   </li>
   );
   const author = infoAuthor
   return(
       <>
       <h1>{params.id}</h1>
       <h2>{author.first_name} {author.family_name}</h2>
       <ul className='text-xl'>
        {author_books}
        </ul>
       </>
   )
}


export default AuthorDetail