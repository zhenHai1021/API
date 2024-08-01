import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Users from './users';
import User from './user';
import Albums from './albums';
import Album from './album';
import Post from './post';
import Posts from './posts';
import Todo from './todo';


// This client will be used to manage and cache asynchronous queries throughout the application.
const queryClient = new QueryClient();

export const Root = () =>{
    return(
        <header>
            <nav className = 'nav'>
                <NavLink to='/users' style={({isActive}) => (isActive ? {color: 'red'} : {color: 'black'})}>
                    Users
                </NavLink>
                <NavLink to='/albums' style={({isActive}) => (isActive ? {color: 'red'} : {color: 'black'})}>
                    Albums
                </NavLink>
                <NavLink to='/posts' style={({isActive}) => (isActive ? {color: 'red'} : {color: 'black'})}>
                    Posts
                </NavLink>
            </nav>
            <Outlet/>
        </header>
    );
}

export const routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <QueryClientProvider client={queryClient}>
                <Root />
               
            </QueryClientProvider>
        ),
        children:[
            {
                path: 'users',
                element : <Users/>
            }, 
            {
                path: '/users/:userId',
                element: <User/>,
// Loader function to fetch post data
                /**
                 * Asynchronously fetches a single post by its ID from the JSONPlaceholder API.
                 * This loader leverages the Fetch API, incorporating cancellation through the AbortController signal.
                 * @param {Object} context - An object containing the request and params information.
                 * @param {Request} context.request - The request object, used here to pass the AbortController's signal for request cancellation.
                 * @param {Object} context.params - Parameters passed through the route, used here to extract the postId.
                 * @returns {Promise<Object>} The JSON response containing the post data.
                 */
                loader: async ({ request, params }) => {
                    // Construct the request URL with the postId
                    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`, {
                        signal: request.signal, // Pass the AbortController signal for fetch cancellation
                    });
                    const user = await response.json(); // Parse the JSON response
                    return user; // Return the post data
                },
            },
            {
                path: '/albums',
                element : <Albums/>
            }, 
            {
                path: '/albums/:id',
                element: <Album/>,
// Loader function to fetch post data
                /**
                 * Asynchronously fetches a single post by its ID from the JSONPlaceholder API.
                 * This loader leverages the Fetch API, incorporating cancellation through the AbortController signal.
                 * @param {Object} context - An object containing the request and params information.
                 * @param {Request} context.request - The request object, used here to pass the AbortController's signal for request cancellation.
                 * @param {Object} context.params - Parameters passed through the route, used here to extract the postId.
                 * @returns {Promise<Object>} The JSON response containing the post data.
                 */
                loader: async ({ request, params }) => {
                    // Construct the request URL with the postId
                    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${params.id}`, {
                        signal: request.signal, // Pass the AbortController signal for fetch cancellation
                    });
                    const user = await response.json(); // Parse the JSON response
                    return user; // Return the post data
                },
            },
            {
                path: 'posts',
                element : <Posts/>
            }, 
            {
                path: '/posts/:postId',
                element: <Post/>,
// Loader function to fetch post data
                /**
                 * Asynchronously fetches a single post by its ID from the JSONPlaceholder API.
                 * This loader leverages the Fetch API, incorporating cancellation through the AbortController signal.
                 * @param {Object} context - An object containing the request and params information.
                 * @param {Request} context.request - The request object, used here to pass the AbortController's signal for request cancellation.
                 * @param {Object} context.params - Parameters passed through the route, used here to extract the postId.
                 * @returns {Promise<Object>} The JSON response containing the post data.
                 */
                loader: async ({ request, params }) => {
                    // Construct the request URL with the postId
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
                        signal: request.signal, // Pass the AbortController signal for fetch cancellation
                    });
                    const post = await response.json(); // Parse the JSON response
                    return post; // Return the post data
                },
            },
            {
                path: '/todos/:id',
                element: <Todo/>,
// Loader function to fetch post data
                /**
                 * Asynchronously fetches a single post by its ID from the JSONPlaceholder API.
                 * This loader leverages the Fetch API, incorporating cancellation through the AbortController signal.
                 * @param {Object} context - An object containing the request and params information.
                 * @param {Request} context.request - The request object, used here to pass the AbortController's signal for request cancellation.
                 * @param {Object} context.params - Parameters passed through the route, used here to extract the postId.
                 * @returns {Promise<Object>} The JSON response containing the post data.
                 */
                loader: async ({ request, params }) => {
                    // Construct the request URL with the postId
                    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`, {
                        signal: request.signal, // Pass the AbortController signal for fetch cancellation
                    });
                    const post = await response.json(); // Parse the JSON response
                    return post; // Return the post data
                },
            },

        ]
    }
]);