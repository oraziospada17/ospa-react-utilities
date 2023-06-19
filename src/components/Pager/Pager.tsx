import React from 'react';
interface Props {
    pageSize: number,
    items: any[],
    renderItem: (x: any) => React.ReactNode;
    renderContainer: (children:React.ReactNode,handleScroll:(e:any)=>void)=>React.ReactNode 
}
const Pager: React.FC<Props> = ({ renderContainer, pageSize, items, renderItem }) => {
    const [page, setPage] = React.useState(0);
    const handleScroll = (e: any) => {
        const el = e.target;
        var scroll_limit = el.scrollHeight - document.body.clientHeight;
        if(e.target.scrollTop >= scroll_limit - 200){
            setPage(page + 1)
        }
    }
    const [visibleItems, setVisibleItems] = React.useState<any[]>(items.slice(page, (page + 1) * pageSize));
    React.useEffect(()=>{
        setVisibleItems(items.slice(0,(page + 1)*pageSize))
    },[page,items])
    

    return renderContainer(<>{visibleItems.map((x) => renderItem(x))}</>,handleScroll)
}
export { Pager }