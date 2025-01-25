import React, {createContext, useContext, useEffect, useState, useCallback} from 'react';
import {useApi} from "./ApiProvider";
import {addProfileSport, getCurrentProfileSports, removeProfileSport} from "../api/sportApi";

const UserSportsContext = createContext(null);

export const useProfileSports = () => {
    return useContext(UserSportsContext);
};

export const ProfileSportsProvider = ({children}) => {
    const api = useApi();
    const [profileSports, setProfileSports] = useState([]);

    useEffect(() => {
        (async () => {
            const sports = await getCurrentProfileSports(api);
            setProfileSports(sports);
        })();
    }, [api]);

    const addSport = useCallback(
        async (sport) => {
            const success = await addProfileSport(api, sport.id);
            if (success) {
                setProfileSports((prev) => [...prev, sport]);
            }
        },
        [api]
    );

    const removeSport = useCallback(
        async (sportId) => {
            const success = await removeProfileSport(api, sportId);
            if (success) {
                setProfileSports((prev) => prev.filter((s) => s.id !== sportId));
            }
        },
        [api]
    );

    return (
        <UserSportsContext.Provider value={{profileSports, addSport, removeSport}}>
            {children}
        </UserSportsContext.Provider>
    );
};
