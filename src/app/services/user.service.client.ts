import {studentUrl} from '../constant';

export class UserServiceClient {
  findUserById(userId) {
    return fetch(studentUrl + '/api/user/' + userId)
      .then(response => response.json());
  }
  findUserByUsername(username) {
    return fetch(studentUrl + '/api/user/username/' + username)
      .then(response => response.json());
  }
  updateUser(userId, user) {
    console.log(userId);
    console.log(user);
    return fetch(studentUrl + '/api/profile', {
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
    return fetch(studentUrl + '/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  logout() {
    return fetch(studentUrl + '/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }
  deleteUser() {
    return fetch(studentUrl + '/api/profile', {
      method: 'delete',
      credentials: 'include'
    })
      .then(response => response.json());
  }

  profile() {
    return fetch(studentUrl + '/api/profile',
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
    return fetch(studentUrl + '/api/register', {
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
