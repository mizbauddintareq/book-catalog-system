import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user } = useAppSelector((state) => state.user);

  const location = useLocation();

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
