import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// export const imgUrl = "https://cisco-5aze.onrender.com/uploads/";
export const imgUrl = "http://localhost:5001/uploads/";

export const ROLES = {
  lecture: "Lecture",
  admin: "Admin",
};
export const registreeType = [
  {
    key: "aauUGStudentPrice",
    value: "AAU UG Student ",
  },
  {
    key: "aauPGStudentPrice",
    value: "AAU PG Student ",
  },
  {
    key: "aauExtensionStudentPrice",
    value: "AAU Extension Student ",
  },
  {
    key: "aauStaffPrice",
    value: "AAU Staff ",
  },
  {
    key: "noneAAUSelfSponsoredPrice",
    value: "None AAU Self-Sponsored ",
  },
  {
    key: "noneAAUOrganizationSponsoredPrice",
    value: "None AAU Self-Organization ",
  },
];
export const gender = ["Male", "Female"];
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
