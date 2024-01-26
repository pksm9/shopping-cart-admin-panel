import React, { createContext, useContext, useReducer, useEffect  } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
      case 'CHECK_TOKEN':
        const isAuthenticated = !!localStorage.getItem('token') && !isTokenExpired();
        if (!isAuthenticated) {
            localStorage.removeItem('token');
            localStorage.removeItem('validTill');
        }          
        return { ...state, isAuthenticated };
    default:
      return state;
  }
};

const isTokenExpired = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return true;
    }
  
    try {
      
      const validTill = sessionStorage.getItem("validTill"); 
  
      return parseInt(validTill) < Date.now();
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'CHECK_TOKEN' });
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };
