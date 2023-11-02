import { configureStore } from "@reduxjs/toolkit";
import { reducer } from './reducers';
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer,
    devTools: true
})


export const useAppSelector = useSelector
export const useAppDispatch = () => useDispatch()