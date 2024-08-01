 //It also handles network errors and offline status.
 import axios from 'axios'; // Import axios library

 // Create an axios instance with the base URL set to the JSONPlaceholder API.
 const instance = axios.create({
     baseURL: 'https://jsonplaceholder.typicode.com'
 });
 
 /**
  * Intercept the response and check if the network is offline.
  * If offline, reject the promise with an error message.
  */
 instance.interceptors.response.use(
     function (config){
         return config;
     },
     function (error){
         if(onlineStatus() === 'offline'){ // Check if offline
             return Promise.reject('You are offline.'); // Reject promise
         }
         return Promise.reject(error); // Reject promise with original error
     }
 );
 
 //Get the online status of the user's network.
 function onlineStatus(){
     return navigator.onLine ? 'online' : 'offline';
 }
 
 
 //Add event listeners to detect online or offline, This updates the online status.
 window.addEventListener('online', onlineStatus);
 window.addEventListener('offline', onlineStatus);
 
 
 // Export the axios instance to be used in the application.
 export default instance;
 
 