import React, { useState, useCallback, useEffect, FC } from "react";
import { getUsers } from "../api/users";
import CreateUser from "./CreateUser";
import UserTable from "./UserTable";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  password: string;
}

const UserPanel: FC<{}> = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const result = await getUsers();
      setUsers(result as User[]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, users]);

  return (
    <>
      <UserTable users={users} />
      <CreateUser users={users} />
    </>
  );
};

export default UserPanel;