import {useState, useEffect} from 'react';
import {Link} from "react-router-dom"

function AuthorList() {
  const [info, setInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:3000/catalog/authors`)
     .then((response) => response.json())
     .then(data => setInfo(data.author_list))
     setIsLoading(false)
   }, []);
   
   const author_list = info.map((author) =>
   <li key ={author._id}><Link to={author._id}>{author.first_name}</Link></li>
   );

    return (
    <>
      {isLoading && <p>Loading...</p>}
      {author_list.length > 0 && (
      <ul className='text-xl'>
        {author_list}
      </ul>)}
    </>
)}
export default AuthorList;