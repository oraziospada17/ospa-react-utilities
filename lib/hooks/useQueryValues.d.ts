export type TQueryValuesProps = {
    queryKeys: string[];
};
export interface IQueryValues {
    [key: string]: string | null;
}
export type TQueryValuesContext = {
    query: URLSearchParams;
    queryValues: IQueryValues;
    encodeValues: (url: string, keys?: (keyof IQueryValues)[], values?: IQueryValues, onlyNewValues?: boolean) => string;
    replaceEncodedValue: (keys: (keyof IQueryValues)[], values: string[]) => string;
};
export declare const useQueryValues: (props: TQueryValuesProps) => TQueryValuesContext;
