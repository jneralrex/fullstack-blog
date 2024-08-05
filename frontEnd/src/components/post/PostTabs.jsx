import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MediaInput from './MediaInput';
import TextPost from './TextPost';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PostTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
         sx={{
         marginLeft: '20px'
        }}
        >
          <Tab
            label="Text"
            {...a11yProps(0)}
            sx={{
              color: 'black', 
              '&:hover': {
                backgroundColor: 'transparent', 
                color: 'black',
              },
              '&.Mui-selected': {
                color: 'black',
              },
            }}
          />
          <Tab
            label="Images & video"
            {...a11yProps(1)}
            sx={{
              color: 'black', 
              '&:hover': {
                backgroundColor: 'transparent', 
                color: 'black',
              },
              '&.Mui-selected': {
                color: 'black', 
              },
            }}
          />
          <Tab
            label="Link"
            {...a11yProps(2)}
            sx={{
              color: 'black', 
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'black', 
              },
              '&.Mui-selected': {
                color: 'black', 
              },
            }}
          />
          <Tab
            label="Poll"
            {...a11yProps(3)}
            sx={{
              color: 'black', 
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'black', 
              },
              '&.Mui-selected': {
                color: 'black', 
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
         <TextPost/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <MediaInput/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

export default PostTabs;