"use client";

import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import { addNewLink } from "csc-start/utils/data";
import { useState, useEffect } from "react";

const Profile = () => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState("");
  const [currentList, setCurrentList] = useState([]);

  // the user hook, will, provide us with the following, and it is completely abstracted away
  //  - user, and update whenever it's changed (undefined if loading, set if loaded)

  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useUserMustBeLogged(user, "in", "/login");

  const addList = async (e) => {
    e.preventDefault();

    const priority = currentList.length + 1;
    const addedLink = await addNewLink(user.id, items, title, priority);
    if (addedLink.success == false) {
      //handle error
      return;
    }
    setItems("");
    setTitle("");
    //@todo update this to either fake get the List (by taking the latest DB load + adding in the latest pushed list)
    //  or make a new request....
    refreshUser();
    //handle success
  };

  return (
    <div className="barge">
      {!!error && (
        <div
          className={`bg-red-200 border-2 border-red-800 text-red-800 py-2 px-5 my-10 text-center`}
        >
          <span className="font-bold">{error.message}</span>
        </div>
      )}
      {!error && loading && <p>Loading...</p>}
      {!error && !loading && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {currentList.map((list) => {
                return (
                  <tr key={list.id}>
                    <td>{list.items}</td>
                    <td>{list.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <form onSubmit={addList}>
            <p className="h2">Add New list</p>
            <p className="my-5">
              <label htmlFor="title" className="inline-block w-[75px]">
                Title:
              </label>
              <input
                id="title"
                className="border border-2 border-black px-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                type="text"
              />
            </p>
            <p className="my-5">
              <label htmlFor="items" className="inline-block w-[75px]">
                items:
              </label>
              <input
                className="border border-2 border-black px-2"
                id="items"
                value={items}
                onChange={(e) => setItems(e.target.value)}
                required
                type="items"
              />
            </p>
            <p className="text-center">
              <input type="submit" className="button small" />
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
