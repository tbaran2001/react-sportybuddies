import {createContext, useContext, useState, useEffect} from "react";
import {useApi} from "./ApiProvider";
import {getCurrentUser, loginUser, logoutUser, updateUserPreferences} from "../api/users";

const UserContext = createContext();

export default function UserProvider({children}) {
    const [user, setUser] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const currentUser = await getCurrentUser(api);
            setUser(currentUser);
        })();
    }, [api]);

    const login = async (email, password) => {
        const user = await loginUser(api, email, password);
        setUser(user);
        return user;
    };

    const logout = async () => {
        await logoutUser(api);
        setUser(null);
    };

    const updatePreferences = async (minAge, maxAge, maxDistance, gender) => {
        await updateUserPreferences(api, minAge, maxAge, maxDistance, gender);
    }

    return (
        <UserContext.Provider value={{user, setUser, login, logout, updatePreferences}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
