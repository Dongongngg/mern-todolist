import axios from "axios";

export function addNew(user) {
  const res = axios
    .post("https://afternoon-inlet-07962.herokuapp.com/users/add", user)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      console.log(res);
      return err;
    });
  return res;
}

export const getAll = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://afternoon-inlet-07962.herokuapp.com/users/")
      .then((res) => {
        if (res.status === 200) {
          resolve(
            res.data.map((e) => {
              let user = { username: e.username, id: e._id };
              return user;
            })
          );
        } else {
          reject(res.res);
        }
      })
      .catch(reject);
  });
};

export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://afternoon-inlet-07962.herokuapp.com/api/users/${id}`)
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
