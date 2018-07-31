export class UserServiceClient {
  findUserById(userId) {
    return fetch('http://localhost:4000/api/user/' + userId)
      .then(response => response.json());
  }
  findUserByUsername(username) {
    return fetch('http://localhost:4000/api/user/username/' + username)
      .then(response => response.json());
  }
  updateUser(userId, user) {
    console.log(userId);
    console.log(user);
    return fetch('http://localhost:4000/api/user/' + userId, {
      method: 'put',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  logout() {
    return fetch('http://localhost:4000/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }
  deleteUser() {
    return fetch('http://localhost:4000/api/profile', {
      method: 'delete',
      credentials: 'include'
    })
      .then(response => response.json());
  }

  profile() {
    return fetch('http://localhost:4000/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/user', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      console.log(response);
      const res = response.json();
      return res;
    });
  }
}
