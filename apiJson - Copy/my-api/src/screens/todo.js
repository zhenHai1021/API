import { useLoaderData } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import apiCall from '../util/apiCall';

const Todo = () => {
     const { userId, id, title, completed } = useLoaderData();

    return(
        <article>
            <p>UserID: {userId}</p>
            <h1>To Do List {id}</h1>
           
            <h2>Title: {title}</h2>

            <p>Completed: {completed}</p>
            
        </article>
    );
}

export default Todo;