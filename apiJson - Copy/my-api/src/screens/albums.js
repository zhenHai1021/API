
import {Link} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import apiCall from '../util/apiCall';

function Albums(){
    const {data, isLoading, error, isError} = useQuery({
        queryKey: ['get-albums'], //The key of the query in the cache.
        queryFn: () => apiCall.get('/albums'), //The function that fetches the list of albums from the server.
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const errorMessage = error?.response?.data?.message ?? error?.message;


    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>{errorMessage}</p>

    return(
        <section className='App'>
            <h1 className='heading'>List of Albums</h1>
            <ol className='list'>
                {data?.data?.length > 0 &&
                    data?.data?.map(({ id, title }) => (
                        <li key={id}>
                            <Link to={`/albums/${id}`}>{title}</Link>
                        </li>
                    ))}
            </ol>
        </section>
    );
};

export default Albums;