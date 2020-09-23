import axios from "axios";

export const addNew = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post("https://afternoon-inlet-07962.herokuapp.com/todos/add", user)
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
      .get("https://afternoon-inlet-07962.herokuapp.com/todos/")
      .then((res) => {
        if (res.status === 200) {
          resolve(
            res.data.map((e) => {
              let list = {
                id: e._id,
                username: e.username,
                description: e.description,
                date: e.date,
                duration: e.duration,
              };
              return list;
            })
          );
        } else {
          reject(res.res);
        }
      })
      .catch(reject);
  });
};

export const getById = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://afternoon-inlet-07962.herokuapp.com/todos/${id}`)
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

export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://afternoon-inlet-07962.herokuapp.com/todos/${id}`)
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

// export const getByFilter = (filter) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get("https://afternoon-inlet-07962.herokuapp.com/", filter)
//       .then((res) => {
//         if (res.status === 200) {
//           resolve(res.data);
//         } else {
//           reject(res.res);
//         }
//       })
//       .catch(reject);
//   });
// };
