"use client";

import useUser from "csc-start/hooks/useUser";
import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import { addNewLink } from "csc-start/utils/data";
import { useState, useEffect } from "react";

const Profile = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [linkType, setLinkType] = useState("link");
  const [currentLinks, setCurrentLinks] = useState([]);

  // the user hook, will, provide us with the following, and it is completely abstracted away
  //  - user, and update whenever it's changed (undefined if loading, set if loaded)

  const { user, refreshUser, error, loading } = useUser();
  // we removed the useUser in the userMustBeLogged component, and now are supplying the user
  useUserMustBeLogged(user, "in", "/login");

  useEffect(() => {
    if (user) {
      let tempCurrentLinks = user.socialLinks;
      if (linkType === "link") {
        tempCurrentLinks = user.linkLinks;
      }

      setCurrentLinks(tempCurrentLinks);
    }
  }, [user, linkType]);

  const addLink = async (e) => {
    e.preventDefault();

    const order = currentLinks.length + 1;
    const addedLink = await addNewLink(user.id, url, title, order, linkType);
    if (addedLink.success == false) {
      //handle error
      return;
    }
    setUrl("");
    setTitle("");
    //@todo update this to either fake get the links (by taking the latest DB load + adding in the latest pushed link)
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
          <div className="flex justify-between my-5">
            <button
              disabled={linkType === "social"}
              onClick={() => setLinkType("social")}
              className="button small"
            >
              Social
            </button>
            <button
              disabled={linkType === "link"}
              onClick={() => setLinkType("link")}
              className="button small"
            >
              Links
            </button>
          </div>

          <p className="h2 my-5">
            Currently Viewing <span className="capitalize">{linkType}</span>{" "}
            Links
          </p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {currentLinks.map((link) => {
                return (
                  <tr key={link.id}>
                    <td>{link.url}</td>
                    <td>{link.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <form onSubmit={addLink}>
            <p className="h2">Add New Link</p>
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
              <label htmlFor="url" className="inline-block w-[75px]">
                URL:
              </label>
              <input
                className="border border-2 border-black px-2"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                type="url"
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
