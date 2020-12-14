import {Link} from 'umi'

export default ()=>{
    return (
        <div>
            {/* A string representation of the Link location */}
            <Link to="/about">About</Link>
            {/* A string representation of the Link location, created by concatenating the location's pathname, search, and hash properties. */}
            <Link to="/courses?sort=name">Courses</Link>
            {/* An object representation of the location  */}
            <Link to={{
                pathname: '/list',
                search: '?sort=name',
                hash: '#the-hash',
                state: {fromDshboard: true},
            }}>List</Link>
            {/* A function to which current location is passed as an argument and which should return location representation as a string or as an object */}
            <Link to={location=>{
                return {...location, pathname: '/profile'};
            }}>Function</Link>
            {/* When true, clicking the link will replace the current entry in the history stack instead of adding a new one */}
            <Link to="/courses" replace text="replace" >replace</Link>
        </div>
    );
}