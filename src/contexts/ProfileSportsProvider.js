import React, {createContext, useContext, useEffect, useState, useCallback} from 'react';
import {useApi} from "./ApiProvider";
import {addUserSport, getCurrentUserSports, removeUserSport} from "../api/sports";
import {useUser} from "./UserProvider";

const UserSportsContext = createContext(null);

export const useProfileSports = () => {
    return useContext(UserSportsContext);
};

export const ProfileSportsProvider = ({children}) => {
    const api = useApi();
    const {user} = useUser();
    const [profileSports, setProfileSports] = useState(user.sports || []);

    useEffect(() => {
        setProfileSports(user.sports || []);
    }, [user.sports]);

    const addSport = useCallback(
        async (sport) => {
            const success = await addUserSport(api, sport.id);
            if (success) {
                setProfileSports((prev) => [...prev, sport]);
            }
        },
        [api]
    );

    const removeSport = useCallback(
        async (sportId) => {
            const success = await removeUserSport(api, sportId);
            if (success) {
                setProfileSports((prev) => prev.filter((s) => s.id !== sportId));
            }
        },
        [api]
    );

    return (
        <UserSportsContext.Provider value={{userSports: profileSports, addSport, removeSport}}>
            {children}
        </UserSportsContext.Provider>
    );
};
