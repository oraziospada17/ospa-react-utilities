import React from "react";
export declare function createCtx<StateType, ActionType>(reducer: React.Reducer<StateType, ActionType>, initialState: StateType): readonly [any, (props: React.PropsWithChildren<{}>) => JSX.Element];
