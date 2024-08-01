import { useLoaderData, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiCall from '../util/apiCall';

const User = () => {
  const { id, name, username, email } = useLoaderData();

  const { data: albumsData, isLoading: albumsLoading, error: albumsError, isError: isAlbumsError } = useQuery({
    queryKey: ['get-albums', id], // The key of the query in the cache.
    queryFn: () => apiCall.get(`/users/${id}/albums`), // The function that fetches the list of albums for the user.
    retry: 2, // The number of times the query should retry if it fails.
    refetchOnWindowFocus: false, // Whether the query should refetch the data when the window is focused.
  });

  const { data: todosData, isLoading: todosLoading, error: todosError, isError: isTodosError } = useQuery({
    queryKey: ['get-todos', id], // The key of the query in the cache.
    queryFn: () => apiCall.get(`/users/${id}/todos`), // The function that fetches the list of todos for the user.
    retry: 2, // The number of times the query should retry if it fails.
    refetchOnWindowFocus: false, // Whether the query should refetch the data when the window is focused.
  });

  if (albumsLoading || todosLoading) return <p>Loading...</p>;
  if (isAlbumsError) return <p>Error loading albums: {albumsError.message}</p>;
  if (isTodosError) return <p>Error loading todos: {todosError.message}</p>;

  return (
    <article>
      <h1>Profile</h1>
      <p>ID: {id}</p>
      <h2>User: {name}</h2>
      <p>Username: {username}</p>
      <p>Email: {email}</p>

      <div className='album-section'>
        <h2>Albums</h2>
        <ol className='album-list'>
          {albumsData?.data?.length > 0 &&
            albumsData.data.map(({ id, title }) => (
              <li key={id}>
            
                <Link to={`/albums/${id}`}>{title}</Link>
                
              </li>
            ))}
        </ol>
      </div>

      <div className='todos-section'>
        <h2>Todos</h2>
        <ol className='todos-list'>
          {todosData?.data?.length > 0 &&
            todosData.data.map(({ id, title }) => (
              <li key={id}>
                <Link to={`/todos/${id}`}>{title}</Link>
              </li>
            ))}
        </ol>
      </div>
    </article>
  );
}

export default User;
