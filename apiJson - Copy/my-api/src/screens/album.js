import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiCall from '../util/apiCall';

const Album = () => {
     const { id, title } = useLoaderData();

     const { data, isLoading, error, isError } = useQuery({
        queryKey: ['get-albums', id], //The key of the query in the cache.
        queryFn: () => apiCall.get(`/albums/${id}/photos`), //The function that fetches the list of posts from the server.
        retry: 2, // The number of times the query should retry if it fails.
        refetchOnWindowFocus: false, // Whether the query should refetch the data when the window is focused.
    });

    if (isLoading) return <p>Loading Photos...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return(
        <article>
            <h1>Album {id}</h1>
           
            <h2>Album Title: {title}</h2>
            <ol className='list'>
                {data?.data?.length > 0 &&
                    data.data.map(({ albumId, id, title, url, thumbnailUrl }) => (
                        <li key={id}>
                        
                            <p>Photo Title: {title}</p>
                            <img src={url} alt={title} style={{ maxWidth: '6.7%' }} />
                            <p>{thumbnailUrl}</p>
                        
                        </li>
                    ))}
            </ol>
        </article>
    );
}

export default Album;