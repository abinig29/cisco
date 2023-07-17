import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const imgUrl = "http://localhost:5000/uploads/";
export const ROLES = {
  lecture: "Lecture",
  admin: "Admin",
};
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
