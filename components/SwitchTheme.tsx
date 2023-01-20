import IconButton from "@mui/material/IconButton";
import { useThemeColorContext } from "../context/ColorModeContext";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";

const SwitchTheme = () => {
  const { toggleColorMode, mode } = useThemeColorContext();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {mode === "light" ? <ModeNightIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default SwitchTheme;
