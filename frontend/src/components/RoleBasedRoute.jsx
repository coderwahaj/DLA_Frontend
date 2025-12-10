import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuth, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-[#29473E]" />
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/platform" replace />;
  }

  return children;
};

export default RoleBasedRoute;