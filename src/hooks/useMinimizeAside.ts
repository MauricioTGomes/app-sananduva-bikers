import { useContext, useLayoutEffect } from 'react';
import ThemeContext from '../contexts/themeContext';

export default function useMinimizeAside() {
    const { setAsideStatus, mobileDesign } = useContext(ThemeContext);
    useLayoutEffect(() => {
        if (!mobileDesign) setAsideStatus(false);
        return () => {
            if (!mobileDesign) setAsideStatus(true);
        };
    }, [mobileDesign]);
}
