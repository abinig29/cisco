import { Store } from "../app/store";
import { registreeApiSlice } from "../features/registree/registreeApiSlice";
import { userApiSlice } from "../features/user/userApiSlice"
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ProtectedPrefetch = () => {
    useEffect(() => {

        const users = Store.dispatch(
            userApiSlice.endpoints.getUsers.initiate()
        );
        const registree = Store.dispatch(
            registreeApiSlice.endpoints.getRegistrees.initiate()
        );
        return () => {
            users.unsubscribe();
            registree.unsubscribe()
        };
    }, []);

    return <Outlet />;
};
export default ProtectedPrefetch;
