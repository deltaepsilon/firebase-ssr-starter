import React from 'react';
import { list } from 'postcss';

export default function UsersTable({ users }) {
  console.log('users', users);
  return (
    <div>
      <h1>users table</h1>
      <ul>{users.map(user => <li key={user.__id}>{user.email}</li>)}</ul>
    </div>
  );
}
