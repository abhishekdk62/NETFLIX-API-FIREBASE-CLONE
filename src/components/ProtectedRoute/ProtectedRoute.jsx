import { Navigate } from 'react-router-dom';
import { getUserSession } from '../../utils/session';

const ProtectedRoute = ({ children }) => {
  const user = getUserSession();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute; 