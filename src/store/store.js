//store

import {configureStore} from "@reduxjs/toolkit"
import reducer from "../features/todoSlice"

const store = configureStore({
    reducer: {
        todos: reducer,
    },
});

export default store;