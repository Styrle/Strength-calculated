import axios from 'axios';
import config from '../config.json';
import session from "./session";
import moment from "moment";

export default class {
  static getByUserId = async userId => {
    let result = {
      data: null,
      error: null
        };

    await axios.post(`${config.api}/lifts/all`, {userId: userId})
      .then(resp => {
        if (resp.status === 200) {
          result.data = resp.data;
          }
        })
        .catch((err) => {
          result.error = err.response.data;
      });
    return result;
  }

  static add = async json => {
    let result = {
      data: null,
      error: null
    };

    const d = {
      lifts: json,
      userId: session.get('user')._id,
      datetime: moment().format(),
    }

    await axios.post(`${config.api}/lifts`, d)
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

  static getLatestByUserId = async userId => {
    let result = {
      data: null,
      error: null
    };
    await axios.post(`${config.api}/lifts/latest`, {userId: userId})
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

    static getLatestTwoByUserId = async userId => {
      let result = {
        data: null,
        error: null
      };

      await axios.post(`${config.api}/lifts/latest-two`, {userId: userId})
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

    static getAllByUserId = async userId => {
      let result = {
        data: null,
        error: null
      };

      await axios.post(`${config.api}/lifts/all2`, {userId: userId})
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
