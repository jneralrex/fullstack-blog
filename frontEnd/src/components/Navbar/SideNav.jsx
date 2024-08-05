import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoIosAdd } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { LuArrowUpRightFromCircle } from "react-icons/lu";
import '../styles/nav/SideNav.css';


const SideNav = () => {
    const drawerWidth = 250;

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                zIndex: '1',
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    height: '90vh', 
                    marginTop:'70px',
                    padding: '10px',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <div className="left-sec-one">
                    <div className="left-sec-one-items">
                    <GrHomeRounded size={20} style={{color:'black'}}/>
                    <p>Home</p>
                    </div>
                    <div className="left-sec-one-items">
                    <LuArrowUpRightFromCircle size={20} style={{color:'black'}}/>
                    <p>Popular</p>
                    </div>
                </div>
            <List>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography><span className="accordion-title">CUSTOM FEEDS</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div className="accordion1-inner">
                    <IoIosAdd size={35} /> Create a custom feed
                    </div>
                    </AccordionDetails>
                </Accordion>
            </List>
            <List>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography><span className="accordion-title">RECENT</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </List>
            <List>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography><span className="accordion-title">COMMUNIITIES</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </List>
            <List>
                <Accordion className="last-accordion">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography><span className="accordion-title">RESOURCES</span></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </List>
        </Drawer>
    );
};

export default SideNav;
