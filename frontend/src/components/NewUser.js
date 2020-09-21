import React, { useEffect, useState, useRef } from "react";
//
import * as userAPI from "../api/userAPI";
const NewUser = () => {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [alertOpen, setAlertOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setAlertOpen(false));

  const [user, setUser] = useState({
    username: "",
  });

  const [submitFlag, setSubmitFlag] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleInput = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const handleSubmit = async () => {
    setSubmitFlag(true);
    if (user.username !== "") {
      let res = await userAPI.addNew(user);
      console.log(res);

      if (res.status === 200) {
        setUser({
          username: "",
        });
        setAlertMsg(res.data);
        setAlertOpen(true);
        setSubmitFlag(false);
      } else {
        setAlertMsg("User existed");
        setAlertOpen(true);
        setSubmitFlag(false);
      }
    }
  };

  // Hook
  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }

          handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }

  return (
    <div id="1">
      <label htmlFor="basic-url">Username *</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className={
            "form-control" +
            (submitFlag && user.username === "" ? " is-invalid" : "")
          }
          name="username"
          value={user.username}
          onChange={handleInput}
          id="input"
        ></input>
      </div>

      <div className="button-box mt-5">
        <button type="button" className="btn btn-dark" onClick={handleSubmit}>
          submit
        </button>

        {alertOpen ? (
          <div
            className={
              "ml-3 d-inline alert " +
              ((alertMsg === "User added" && "alert-success") ||
                (alertMsg === "User existed" && "alert-danger"))
            }
            role="alert"
            id="alert"
            ref={ref}
          >
            {alertMsg}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewUser;
