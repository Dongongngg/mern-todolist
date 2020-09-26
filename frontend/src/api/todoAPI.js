import axios from "axios";
import Api_prefix from "../url";

export const addNew = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(Api_prefix + "/todos/add", user)
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
      .get(Api_prefix + "/todos/")
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
      .get(Api_prefix + `/todos/${id}`)
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
      .delete(Api_prefix + `/todos/${id}`)
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
//       .get(Api_prefix+"/", filter)
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
