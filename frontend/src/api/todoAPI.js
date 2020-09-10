import axios from "axios";

export const addNew = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/todos/add", user)
      .then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res.res);
        }
      })
      .catch(reject);
  });
};

export const getAll = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/todos/")
      .then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res.res);
        }
      })
      .catch(reject);
  });
};

export const getByFilter = (filter) => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/", filter)
      .then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res.res);
        }
      })
      .catch(reject);
  });
};
