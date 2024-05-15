import { useColorScheme } from "react-native"
import colorsDark from "./colorsDark"
import colorsLight from "./colorsLight"

const useThemeColors = () => {
    const scheme = useColorScheme()
    return scheme === 'dark' ? colorsDark : colorsLight
}

export default useThemeColors