import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
function App() {
  const [info, setInfo] = useState({})
  useEffect(() => {
    fetch(`http://localhost:3000/catalog/authors`)
     .then((response) => response.json())
     .then(data => setInfo(data.author_list))
   }, []);
  /* let author_list = info.author_list.map(author =>
    <li key={author.id}>
      {author.first_name}
      {author.family_name && author.family_name}
    </li>

    
    );*/
   const author_list = info.map((author) =>
   <li key ={author._id}>{author.first_name}</li>
   );
    return (
    <div className="App">
    <ul>
      {author_list}
    </ul>
    </div>
)}
export default App;


