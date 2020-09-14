import Cookies from 'js-cookie';

const API = process.env.REACT_APP_SERVER_URL;


//set cookie with 2 days expiration time
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        Cookies.set(key, value, {
            expires: 2
        });
    }
}

//get cookie
export const getCookie = (key) => {
    if (window !== 'undefined') {
        return Cookies.get(key);
    }
}

// remove cookie
export const removeCookie = (key) => {
    if (window !== 'undefined') {
        Cookies.remove(key)
    }
}



export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( response =>{
        return response.json();
    })
    .catch (err => {
        console.log(err);
    })
}


export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then( response => {
        return response.json();
    })
    .catch (err => {
        console.log(err);
    })
}


export const authenticate = (data, next) => {
   const { token, user } = data;
   if(typeof window !== 'undefined'){
       localStorage.setItem('user', JSON.stringify(user));
       setCookie('token', token);
       next();
   }
}


export const signout = next => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('user');
        localStorage.clear();
        removeCookie('token');
        next();
    }
}

 
export const isAuthenticated = () => {
    if(typeof window !== 'undefined'){
        const token = getCookie('token');
        if(token){
            const user = localStorage.getItem('user');
            if(user){
               return token;
            }
            else{
                removeCookie('token');
                return false;
            }
        }
        else{
            return false;
        }
    }  
  }


export const isAdmin = () => {
    if(typeof window !== 'undefined'){
        if(getCookie('token') && localStorage.getItem('user')){
            return JSON.parse(localStorage.getItem('user'));
        }
        else{
            return false;
        }
    } 
}


export const getUser = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('user')){
            return JSON.parse(localStorage.getItem('user'));
        }
        else{
            return false;
        }
    };
}
