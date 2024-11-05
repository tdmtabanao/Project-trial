import { useState, useEffect, createContext } from 'react';
import propTypes from 'prop-types';

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Current user', user);
  }, [user]);

  const logOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default UserContext;