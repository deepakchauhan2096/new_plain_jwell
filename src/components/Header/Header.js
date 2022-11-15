import React ,{useState} from 'react';

import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
const drawerWidth = 280;
const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function Header() {
    // const Switches = styled(Switch)`
    // display: flex;
    // justify-content: space-between;
    // `
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

  return (
    <AppBar
    position="fixed"
    sx={{
        width: { sm: `100%` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "#2196f3"
    }}
>
    <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
        <Typography
            variant="h6"
            noWrap
            component="div"
        >
            Bullion Dashboard
        </Typography>
        <div style={{display:"flex",flexDirection:"row",alignItems:"baseline"}}>
            <p>Switch Dashboard</p>
        <Switch {...label} />
        </div>
    </Toolbar>
</AppBar>
  )
}
