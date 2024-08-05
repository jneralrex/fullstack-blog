import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/post/CommunitySearch.css'


const CommunitySearch = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return (
        <>
            <div className="post-nav"><p className='post'>Create post</p> <p className='draft'>Draft</p></div>
            <FormControl sx={{ m: 1, minWidth: 200, borderRadius:'50ch',marginLeft:'25px' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Select a community</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
          sx={{ minWidth: 200, borderRadius:'50ch' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
        </>
    )
}

export default CommunitySearch;

