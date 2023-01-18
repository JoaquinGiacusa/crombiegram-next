import IconButton from "@mui/material/IconButton";
import { useThemeColorContext } from "../context/ColorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { DarkModeRounded } from "@mui/icons-material";

const SwitchTheme = () => {
  const { toggleColorMode, mode } = useThemeColorContext();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default SwitchTheme;
