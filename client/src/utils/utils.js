import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const imgUrl = "https://cisco-5aze.onrender.com/uploads/";
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
