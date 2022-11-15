import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Jewellery_dashboard from './Jewellery_dashboard/Dashboards/Jewellery_dashboard';

function Sidebar(props) {

    const { window } = props;

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <CssBaseline />
            <Jewellery_dashboard />
        </>
    );
}

Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     */
    window: PropTypes.func,
};

export default Sidebar;
