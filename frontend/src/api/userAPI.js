import axios from "axios";

export const addNew = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => {
        if (res.status === 200) {
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
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          resolve(
            res.data.map((e) => {
              let asd = { username: e.username, id: e._id };
              return asd;
            })
          );
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
      .post("http://localhost:5000/users", filter)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res.res);
        }
      })
      .catch(reject);
  });
};
