import React, {createContext} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import Router from "@/pages";
import RootStore from './store';

const store = RootStore.create({});
export const StoreContext = createContext(store);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <StoreContext.Provider value={store}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </StoreContext.Provider>
    </React.StrictMode>
)