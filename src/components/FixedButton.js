import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
const FixedButton = () => {
  const [selected, setSelected] = React.useState(false);
  return (

      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        sx={{position: "fixed", bottom: "20px", left: "20px"}}
      >
        {selected? <DarkModeIcon sx={{color: "#fff"}}/> : <LightModeIcon/>}
      </ToggleButton>

  );
};

export default FixedButton;
