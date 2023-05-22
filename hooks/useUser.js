import { getCurrentUser } from "csc-start/utils/data";
import supabase from "csc-start/utils/supabase";
import { useRef, useEffect, useState } from "react";

const useUser = () => {
  // we set both of these to undefeind so that if they change to null it triggers a change in useEffect
  // removed fullyLoaded, so we can use if the user is undefined then the user is loading

  const isMounted = useRef(false);

  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(undefined);

  const refreshUser = async () => {
    setError(undefined);
    setUser(undefined);
    getUser();
  };

  const getUser = async () => {
    const currentUser = await getCurrentUser();

    // lets expose an error if one exists
    // we only care if an error has gone from 0 to something
    if (!currentUser.success) {
      setError(currentUser.error);
      return;
    }

    if (!currentUser.data) {
      // triggers a useEffect change
      // as we go from 0 (which in this case is "unset") or a user object to null in the case of signing out
      setUser(null);
      return;
    }

    setUser(currentUser.data);
  };

  // this is where it all begins, when any component
  // using this hook mounts, let's call useEffect
  // remember useEffect takes two parameters, a function and an array
  // if the array is empty it fires when the component mounts, if the
  // array is set to values, it will fire when those values change
  // if you do not set a second argument it fires whenever
  // ANYTHING changes, which is likely undesireable!
  useEffect(() => {
    if (!isMounted.current) {
      const { subscription } = supabase.auth.onAuthStateChange(
        authStateChangeListener
      );
      getUser();
      isMounted.current = true;
      return () => {
        subscription?.unsubscribe();
      };
    }
  }, []);

  // since we are not reloading our page after auth takes place (in or out)
  // let's refresh the user in this state when either a sign in or out happens

  const authStateChangeListener = (event, session) => {
    if (["SIGNED_IN", "SIGNED_OUT"].includes(event)) {
      getUser();
    }
  };

  // provide to any component using this hook the current values of
  // user object, error object (or falsy) and if we are not yet fullyLoaded

  //@todo only refresh the links, not the user....

  return {
    user,
    error,
    refreshUser,
    loading: user === undefined,
  };
};

export default useUser;
