import {createContext, useContext, useState, useEffect} from "react";
import {useApi} from "./ApiProvider";
import {getCurrentProfile, loginUser, logoutUser, updateProfilePreferences} from "../api/profiles";

const UserContext = createContext();

export default function ProfileProvider({children}) {
    const [profile, setProfile] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const currentProfile = await getCurrentProfile(api);
            setProfile(currentProfile);
        })();
    }, [api]);

    const login = async (email, password) => {
        const profile = await loginUser(api, email, password);
        setProfile(profile);
        return profile;
    };

    const logout = async () => {
        await logoutUser(api);
        setProfile(null);
    };

    const updatePreferences = async (minAge, maxAge, maxDistance, gender) => {
        await updateProfilePreferences(api, minAge, maxAge, maxDistance, gender);
    }

    return (
        <UserContext.Provider value={{profile, setProfile, login, logout, updatePreferences}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
