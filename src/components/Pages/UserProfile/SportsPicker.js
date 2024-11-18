import React, {useEffect, useState, useReducer} from 'react';
import {Box, Checkbox} from '@mui/material';
import {styled} from '@mui/system';
import {sportsIcons} from './sportsIcons';
import {getAllSports} from "../../../api/sports";
import {useApi} from "../../../contexts/ApiProvider";
import Tooltip from "@mui/material/Tooltip";

const StyledCheckbox = styled(Checkbox)(({theme}) => ({
    '& .MuiSvgIcon-root': {
        fontSize: 40,
    },
}));

function SportsPicker({userSports, handleSportsChange}) {
    const api = useApi();
    const [allSports, setAllSports] = useState([]);

    useEffect(() => {
        (async () => {
            const sports = await getAllSports(api);
            setAllSports(sports);
        })();
    }, []);

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
            {allSports.map(({id, name}) => {
                const Icon = sportsIcons[name] || sportsIcons['default'];
                const isChecked = userSports.some((sport) => sport.id === id);
                return (
                    <Box key={id}>
                        <Tooltip title={name} arrow>
                            <StyledCheckbox
                                checked={isChecked}
                                onChange={() => handleSportsChange({id, name})}
                                icon={<Icon aria-label={name}/>}
                                checkedIcon={<Icon aria-label={name}/>}
                            />
                        </Tooltip>
                    </Box>
                );
            })}
        </Box>
    );
}

export default React.memo(SportsPicker);
