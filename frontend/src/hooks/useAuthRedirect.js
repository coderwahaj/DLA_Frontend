import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useAuthRedirect = (redirectTo = '/platform') => {
  const { isAuth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (! loading && isAuth) {
      navigate(redirectTo);
    }
  }, [isAuth, loading, navigate, redirectTo]);

  return { isAuth, loading };
};

export default useAuthRedirect;