import React, {createContext, useContext, useEffect, useState, useCallback} from 'react';
import {useApi} from "./ApiProvider";
import {addUserSport, getCurrentUserSports, removeUserSport} from "../api/sports";

const UserSportsContext = createContext(null);

export const useUserSports = () => {
    return useContext(UserSportsContext);
};

export const UserSportsProvider = ({children}) => {
    const api = useApi();
    const [userSports, setUserSports] = useState([]);

    useEffect(() => {
        (async () => {
            const sports = await getCurrentUserSports(api);
            setUserSports(sports);
        })();
    }, [api]);

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
