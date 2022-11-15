import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Dashboard, Dvr, JoinFull, LeakAdd, ManageSearch, PersonAdd, PostAdd, Store } from '@mui/icons-material';
import styled from 'styled-components'
import { ListItem } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
// import Header from '../Header/Header';
import Switch from '@mui/material/Switch';

const drawerWidth = 280;
export default function Jewellery_dashboard(props) {

    const Links = styled(Link)`
    width:100%;
    height:35px;
    padding:4px 0 0 6px;
    text-decoration:none;
    color:black;
    line-height:30px;
    &:hover{
        color:white;
    `
    const List = styled.div`
    &:hover{
        background-color:#3596d9;
        color:white;
    }
    `
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selector, setSelector] = useState('');

    // const [switchDashboard, setSwitchDashboard] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSelect = (event, index) => {
        setSelector(index)
    }

    const drawerList = (
        <div>
            <List>
                <ListItem >
                    <Dashboard />
                    <Links to='/' >Dashboard</Links>
                </ListItem>
            </List>

            <Divider />
            <List>
                <ListItem>
                    <JoinFull />
                    <Links to='/Sale_Reciept' >Sale Reciept</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <JoinFull />
                    <Links to='/Goods_In' >Goods In</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <JoinFull />
                    <Links to='/Plain_J_Invoice' >Plain J Invoice</Links>
                </ListItem>
            </List>
            <Divider />
            <Divider />
            <List>
                <ListItem>
                    <JoinFull />
                    <Links to='/Plain_J_Dash' >Plain J Dashboard</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <LeakAdd />
                    <Links to='/Plain_Sold_Product' >orders</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <LeakAdd />
                    <Links to='/All_stock' >All stock</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <PersonAdd />
                    {/* <AddSuppliers /> */}
                    <Links to='/userformaddsupplier' >Add Supplier</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <PostAdd />
                    <Links to='/addnewitem' >Add New Item</Links>
                    {/* <AddNewItems /> */}
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ManageSearch />
                    <Links to='/inquiry' >Inquiry</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <Dvr /><Links to='/ordertosupplier' >Order To Supplier</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <Store /><Links to='/purchaseordernew' >Purchase Order New</Links>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem >
                    <ReceiptIcon />
                    <Links to='/BullionInvoice' >Invoice</Links>
                </ListItem>
            </List>
            <Divider />

            <Divider />
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;




    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#2196f3"
                }}
            >
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
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
                        Jewellery Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', }}>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: false, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, overflowX: "scroll"
                        }}
                    >
                        {drawerList}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: "64px", zIndex: "45", overflowX: "scroll", height: "100vh" },
                        }}
                        open
                    >
                        {drawerList}
                    </Drawer>
                </Box>
            </Box>
        </div>
    )
}
