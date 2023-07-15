import { Store } from "./app/store";
import { userApiSlice } from "./features/user/userApiSlice"
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ProtectedPrefetch = () => {
    useEffect(() => {

        const users = Store.dispatch(
            userApiSlice.endpoints.getUsers.initiate()
        );
        return () => {
            users.unsubscribe();
        };
    }, []);

    return <Outlet />;
};
export default ProtectedPrefetch;
