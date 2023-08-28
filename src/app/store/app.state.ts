import { createAction, createReducer, on, props } from "@ngrx/store";

export interface IAppState{
    idPokemon: number;
}
//initializing variable value
export const appInitialState: IAppState = {
    idPokemon: 1
}
//creating the application action
export const modifyValue = createAction('[App] modify value', props<{newValue: number}>())

//initializing the application reducer and defining initial state
export const appReducer = createReducer(
    appInitialState,
    on(modifyValue, (state, {newValue}) => {
        state = {
            ...state,
            idPokemon: newValue
        }
        return state
    })
) 