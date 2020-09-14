const API = process.env.REACT_APP_SERVER_URL;


export const forgotPassword = (email) => {
  return fetch(`${API}/forgot-password`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const resetPassword = (token, newPassword) => {
    const userData = {
        token: token,
        password: newPassword
    };
    
    return fetch(`${API}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}