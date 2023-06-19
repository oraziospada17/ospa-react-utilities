export type WindowSizeProps = {
    mainContentId?: string;
    sidebarId?: string;
    topbarId?: string;
    bottombarId?: string;
};
export type TWindowSize = {
    width: number | undefined;
    height: number | undefined;
    mainContentWidth?: number;
    mainContentHeight: undefined | number;
    sidebarWidth: undefined | number;
    sidebarHeight: undefined | number;
    topbarWidth: undefined | number;
    topbarHeight: undefined | number;
    bottombarWidth: undefined | number;
    bottombarHeight: undefined | number;
};
declare const useWindowSize: (props: WindowSizeProps) => TWindowSize;
export default useWindowSize;
