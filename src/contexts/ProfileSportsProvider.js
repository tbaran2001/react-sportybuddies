import React, {createContext, useContext, useEffect, useState, useCallback} from 'react';
import {useApi} from "./ApiProvider";
import {addUserSport, removeUserSport} from "../api/sports";
import {useUser} from "./ProfileProvider";

const UserSportsContext = createContext(null);

export const useUserSports = () => {
    return useContext(UserSportsContext);
};

export const ProfileSportsProvider = ({children}) => {
    const api = useApi();
    const {user} = useUser();
    const [userSports, setUserSports] = useState(user.sports || []);

    useEffect(() => {
        setUserSports(user.sports || []);
    }, [user.sports]);

    const addSport = useCallback(
        async (sport) => {
            const success = await addUserSport(api, sport.id);
            if (success) {
                setUserSports((prev) => [...prev, sport]);
            }
        },
        [api]
    );

    const removeSport = useCallback(
        async (sportId) => {
            const success = await removeUserSport(api, sportId);
            if (success) {
                setUserSports((prev) => prev.filter((s) => s.id !== sportId));
            }
        },
        [api]
    );

    return (
        <UserSportsContext.Provider value={{userSports, addSport, removeSport}}>
            {children}
        </UserSportsContext.Provider>
    );
};
