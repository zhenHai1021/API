import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import apiCall from '../util/apiCall';

function Posts(){
     
    //The query that fetches the list of posts & used to fetch the list of posts from the server and cache the result.
    const {data, isLoading, error, isError} = useQuery({
        queryKey: ['get-posts'], //The key of the query in the cache.
		queryFn: () => apiCall.get('/posts'), //The function that fetches the list of posts from the server.
		retry: 1, // The number of times the query should retry if it fails.
		refetchOnWindowFocus: false, // Whether the query should refetch the data when the window is focused.
    });

    const errorMessage = error?.response?.data?.message ?? error?.message;


    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>{errorMessage}</p>

    return (
        <section className='App'>
            <h1 className='heading'>List of Posts</h1>
			<ol className='list'>
				{data?.data?.length > 0 &&
					data?.data?.map(({ title, id }) => (
						<li key={id}>
							<Link to={`/posts/${id}`}>{title}</Link>
						</li>
					))}
			</ol>
        </section>
    );
}


export default Posts;