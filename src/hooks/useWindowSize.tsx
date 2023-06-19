import { useEffect, useState } from "react";
export type WindowSizeProps = {
    mainContentId?:string
    sidebarId?:string
    topbarId?:string
    bottombarId?:string
}
export type TWindowSize = {
    width:number | undefined,
    height:number | undefined,
    mainContentWidth?:number,
    mainContentHeight:undefined | number,
    sidebarWidth:undefined | number,
    sidebarHeight:undefined | number,
    topbarWidth:undefined | number,
    topbarHeight:undefined | number,
    bottombarWidth:undefined | number,
    bottombarHeight:undefined | number
}
// Hook
const useWindowSize : (props:WindowSizeProps) => TWindowSize =  (props) => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<TWindowSize>({
        width: undefined,
        height: undefined,
        mainContentWidth:undefined,
        mainContentHeight:undefined,
        sidebarWidth:undefined,
        sidebarHeight:undefined,
        topbarWidth:undefined,
        topbarHeight:undefined,
        bottombarWidth:undefined,
        bottombarHeight:undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            const mainContentRect = document.getElementById(props.mainContentId ?? "mainContent")?.getBoundingClientRect();
            const sidebarRect = document.getElementById(props.sidebarId ?? "sidebar")?.getBoundingClientRect();
            const topbarRect = document.getElementById(props.topbarId ?? "topbar")?.getBoundingClientRect();
            const bottombarRect = document.getElementById(props.bottombarId ?? "bottombar")?.getBoundingClientRect();
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                mainContentWidth: mainContentRect?.width,
                mainContentHeight:mainContentRect?.height,
                sidebarWidth:sidebarRect?.width,
                sidebarHeight:sidebarRect?.height,
                topbarHeight:topbarRect?.height,
                topbarWidth:topbarRect?.width,
                bottombarHeight:bottombarRect?.height,
                bottombarWidth:bottombarRect?.width,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default useWindowSize;