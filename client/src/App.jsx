import {
  Route,
  Routes,
  Navigate,

} from "react-router-dom";
import Public from "./pages/public"
import Prefetch from "./utils/Prefetch";
import DashBoardlayout from "./components/dashBoardlayout";
import CoursesList from "./features/courses/ui/cousesList";
import RegistreeList from "./features/registree/ui/registreeList";
import UserList from "./features/user/ui/userList";
import AddEditCourse from "./features/courses/ui/addEditCourse";
import ProtectedPrefetch from "./utils/protectedPrefetch";
import AddEditUser from "./features/user/ui/addEditUser";
import RegistrationPage from "./features/registree/ui/registrationPage";
import SuccessFullPage from "./pages/successFullPage";
import CourseDetailPage from "./features/courses/ui/courseDetailPage";
import RegistreeviewPage from "./features/registree/ui/registreeviewPage";
import Login from "./features/auth/ui/loginPage";
import { useSelector } from "react-redux";
import { selectRole } from "./features/auth/authSlice";
import PotectedRoute from "./utils/protectedRoute";
import { ROLES } from "./utils/utils";
import CoursePublicListPage from "./features/courses/ui/coursePubliclistPage";




function App() {
  const role = useSelector(selectRole)
  return (
    <>

      <Routes>
        <Route path="/" >
          <Route element={<Prefetch />} >
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />
            <Route path="course" element={<CoursePublicListPage />} />
            <Route path="course/:id" element={<CourseDetailPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path=":id/register" element={<RegistrationPage />} />
            <Route path=":id/sucessfull" element={<SuccessFullPage />} />
            <Route element={<ProtectedPrefetch />} >
              <Route element={<PotectedRoute allowedRoles={[ROLES.admin, ROLES.lecture]} />} >
                <Route path="dash" element={<DashBoardlayout />} >
                  <Route index element={role == "Admin" ? <Navigate to="registrees" /> : <Navigate to="courses" />} />
                  <Route path="courses">
                    <Route index element={<CoursesList />} />
                    <Route path=":id" element={<AddEditCourse />} />
                    <Route path="create" element={<AddEditCourse />} />
                  </Route>
                  <Route element={<PotectedRoute allowedRoles={[ROLES.admin]} />} >
                    <Route path="registrees">
                      <Route index element={<RegistreeList />} />
                      <Route path=":id" element={<RegistreeviewPage />} />
                    </Route>
                    <Route path="users">
                      <Route index element={<UserList />} />
                      <Route path=":id" element={<AddEditUser />} />
                      <Route path="create" element={<AddEditUser />} />
                    </Route>
                  </Route>
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