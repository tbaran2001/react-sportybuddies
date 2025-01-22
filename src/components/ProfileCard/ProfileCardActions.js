import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import ExpandMore from './ExpandMore';

export default function ProfileCardActions({ expanded, onExpandClick }) {
    return (
        <CardActions disableSpacing>
            <ExpandMore expand={expanded} onClick={onExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
    );
}
