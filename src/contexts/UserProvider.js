import {createContext, useContext, useState, useEffect} from "react";
import {useApi} from "./ApiProvider";
import {getCurrentProfile,updateProfilePreferences} from "../api/profileApi";
import {loginUser, logoutUser} from "../api/authApi";

const UserContext = createContext();

export default function UserProvider({children}) {
    const [user, setUser] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const currentProfile = await getCurrentProfile(api);
            setUser(currentProfile);
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
        await updateProfilePreferences(api, minAge, maxAge, maxDistance, gender);
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
