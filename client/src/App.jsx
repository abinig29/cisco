import {
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";
import Public from "./pages/public"
import Prefetch from "./Prefetch";
import DashBoardlayout from "./components/dashBoardlayout";
import CoursesList from "./features/courses/ui/cousesList";
import RegistreeList from "./features/registree/ui/registreeList";
import UserList from "./features/user/ui/userList";
import AddEditCourse from "./features/courses/ui/addEditCourse";
import ProtectedPrefetch from "./protectedPrefetch";
import AddEditUser from "./features/user/ui/addEditUser";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {


  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" >
          <Route element={<Prefetch />} >
            <Route index element={<Public />} />
            <Route element={<ProtectedPrefetch />} >
              <Route path="dash" element={<DashBoardlayout />} >
                <Route index element={<Navigate to="registrees" />} />
                <Route path="courses">
                  <Route index element={<CoursesList />} />
                  <Route path=":id" element={<AddEditCourse />} />
                  <Route path="create" element={<AddEditCourse />} />
                </Route>
                <Route path="registrees">
                  <Route index element={<RegistreeList />} />
                  {/* <Route path=":id" element={<EditCourse />} />
                      <Route path="new" element={<New />} /> */}
                </Route>
                <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path=":id" element={<AddEditUser />} />
                  <Route path="create" element={<AddEditUser />} />
                </Route>
              </Route>
            </Route  >
          </Route>
        </Route>

      </Routes>

    </>
  )
}

export default App
