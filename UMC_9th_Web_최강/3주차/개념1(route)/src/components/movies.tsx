import {useParams} from 'react-router-dom'


const MoviesPage = () => {
    const params = useParams()
  if ( !params.movieId ) {
    return <h1>Movies Page 야호</h1>
  }
  else {
    console.log(params)

    return <h1>{params.movieId}번의 Movies Page 야호</h1>
  }
    
}

export default MoviesPage