import axios from 'axios';
import config from '../config.json';
//Handle our user requests
export default class {
  //Handle login input
  static login = async ({ email, password }) => {
    let result = {
      data: null,
      error: null
    };

    const data = {
      email: email,
      password: password
    };

    await axios.post(`${config.api}/users/login`, data)
      .then((resp) => {
        if (resp.status === 200) {
          result.data = resp.data;
        }
      })
      .catch((err) => {
        result.error = err.response.data;
      });
      return result;
    }

    //Handle singup input
    static signup = async ({ name, email, password, age, weight }) => {
      let result = {
        data: null,
        error: null
    };

    const data = {
      name: name,
      email: email,
      password: password,
      age: age,
      weight: weight
    };

    await axios.post(`${config.api}/users/signup`, data)
      .then((resp) => {
        if (resp.status === 200) {
          result.data = resp.data;
        }
      })
      .catch((err) => {
        result.error = err.response.data;
      });
    return result;
  }
}
