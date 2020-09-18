import axios from "axios";

export async function addNew(user) {
  await axios
    .post("http://localhost:5000/users/add", user)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => err);
}

export const getAll = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/users/")
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
      .delete(`http://localhost:5000/users/${id}`)
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
