import React from "react";
import { useQuery } from "../hooks/useQuery";
export type TQueryValuesProps = {
    queryKeys: string[]
}
export interface IQueryValues {
    [key:string]:string|null
}
export type TQueryValuesContext = {
    query: URLSearchParams,
    queryValues:IQueryValues,
    encodeValues:(url: string, keys?: (keyof IQueryValues)[], values?: IQueryValues, onlyNewValues?: boolean)=>string,
    replaceEncodedValue:(keys: (keyof IQueryValues)[], values: string[])=>string,
}
export const useQueryValues: (props: TQueryValuesProps) => TQueryValuesContext = (props) => {
    const query = useQuery();
    const queryValues: IQueryValues = React.useMemo(() => {
        return Object.fromEntries(props.queryKeys.map((k)=>[k,query.get(k)??null]))
    }, [query])
    const encodeValues = React.useCallback((url: string, keys?: (keyof IQueryValues)[], values?: IQueryValues, onlyNewValues?: boolean) => {
        let result: string = '';
        let keysToEncode: (keyof IQueryValues)[] = keys ? keys : Object.keys(queryValues) as (keyof IQueryValues)[]
        keysToEncode.forEach((k, index) => {
            let value = values && values[k] ? values[k] : queryValues[k];
            if (onlyNewValues && values) {
                value = values[k]
            }
            if (value) {
                if (!result) {
                    result = url.endsWith('?') ? url : `${url}?`
                }
                result += `${k}=${value}${index < keysToEncode.length - 1 ? '&' : ''}`
            }
        });
        if (!result) {
            return url;
        }
        return result.endsWith('&') ? result.slice(0, -1) : result;
    },[queryValues])
    const replaceEncodedValue = React.useCallback((keys: (keyof IQueryValues)[], values: string[]) => {
        let used_keys: (keyof IQueryValues)[] = [];
        let used_values: (string|null)[] = []
        Object.entries(queryValues).forEach(([k, v]) => {
            const needed_key = keys.includes(k as keyof IQueryValues);
            if (v || needed_key) {
                used_keys.push(k as keyof IQueryValues)
                used_values.push(needed_key ? values[keys.indexOf(k as keyof IQueryValues)] : v)
            }
        })
        return encodeValues(window.location.pathname, used_keys, Object.fromEntries(used_values.map((x, i) => [used_keys[i], x])) as any)
    },[encodeValues])
    return {
        query,
        queryValues,
        encodeValues,
        replaceEncodedValue,
    }
}