import React, { Fragment, useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

function User() {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //I think I've saw that already, but I'll repeat: the useEffect function should not be async
  useEffect(() => {
    const sendUsersRequest = async () => {
      try {
        const data = await sendRequest("http://localhost:5000/api/users/");

        setLoadedUsers(data.users);
      } catch (err) {}
    };

    sendUsersRequest();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Fragment>
  );
}

export default User;
