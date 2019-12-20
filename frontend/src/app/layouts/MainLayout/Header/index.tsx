import * as React from 'react';
import { getUsers } from '../requests';

export const Header: React.FunctionComponent = () => {
  const [users, setUsers] = React.useState();

  const fetchUsers = () => {
    getUsers.then(res => setUsers(res.data))
  }

  React.useEffect(() => fetchUsers())

  return (
    <div>
      {JSON.stringify(users)}
    </div>
  )
}