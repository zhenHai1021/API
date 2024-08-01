import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import apiCall from '../util/apiCall';

function Users(){
     //The query that fetches the list of posts & used to fetch the list of posts from the server and cache the result.
     const {data, isLoading, error, isError} = useQuery({
        queryKey: ['get-users'], //The key of the query in the cache.
		queryFn: () => apiCall.get('/users'), //The function that fetches the list of posts from the server.
		retry: 1, // The number of times the query should retry if it fails.
		refetchOnWindowFocus: false, // Whether the query should refetch the data when the window is focused.
    });

    const errorMessage = error?.response?.data?.message ?? error?.message;

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>{errorMessage}</p>

    return (
        <section className='App'>
            <h1 className='heading'>List of Users</h1>
			<ol className='list'>
				{data?.data?.length > 0 &&
					data?.data?.map(({ name, id }) => (
						<li key={id}>
							<Link to={`/users/${id}`}>{name}</Link>
						</li>
					))}
			</ol>
        </section>
    );
}

export default Users;

