import {Link,Outlet} from "react-router-dom"
function App() {
    return (
    <div className="App p-10">
      <ul>
        <Link to="author">Author List</Link>
      </ul>
      <Outlet />
    </div>
)}
export default App;