import React from 'react';
interface Props {
    pageSize: number;
    items: any[];
    renderItem: (x: any) => React.ReactNode;
    renderContainer: (children: React.ReactNode, handleScroll: (e: any) => void) => React.ReactNode;
}
declare const Pager: React.FC<Props>;
export { Pager };
