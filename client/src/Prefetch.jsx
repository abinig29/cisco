import { Store } from "./app/store";
import { courseApiSlice } from "./features/courses/courseApiSillce";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log('jjj')

    const notes = Store.dispatch(
      courseApiSlice.endpoints.getCourses.initiate()
    );
    return () => {
      notes.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
