import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiCall from '../util/apiCall';



const Post = () => {
    const { id, userId, title, body} = useLoaderData();
    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['get-comments', id], //The key of the query in the cache.
        queryFn: () => apiCall.get(`/posts/${id}/comments`), //The function that fetches the list of posts from the server.
        retry: 2, // The number of times the query should retry if it fails.
        refetchOnWindowFocus: false, // Whether the query should refetch the data when the window is focused.
    });

    if (isLoading) return <p>Loading comments...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <article>
        <p>Post ID: {id}</p>
      <h1>Title: {title}</h1>
      <p>User ID: {userId}</p>
      <p>Body: {body}</p>
      
      <div>
        <br />
        <h2>Comments</h2>
        <ol className='list'>
          {data?.data?.length > 0 &&
            data.data.map(({ id, email, name, body }) => (
              <li key={id}>
                <h3>Email: {email}</h3>
                <p>Name: {name}</p>
                <p>Body: {body}</p>
              </li>
            ))}
        </ol>
      </div>
    </article>
  );
}

export default Post;