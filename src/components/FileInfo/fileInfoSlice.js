import { createSlice } from '@reduxjs/toolkit'

export const fileInfoSlice = createSlice({
    name: 'fileInfo',
    initialState: {
        value: require("./template.json")
    },
    reducers: {
        update: {
            reducer(state, action) {
                state.value[action.payload.field] = action.payload.data
                console.log({...state.value})
                console.log(action.payload)
            },
            prepare(field, data) {
                return {
                    payload: {
                        field,
                        data,
                    }
                }
            }
        },
        reset: state => {
            state.value = require("./template.json")
        },

    }
})

// Action creators are generated for each case reducer function
export const { update, reset } = fileInfoSlice.actions

export default fileInfoSlice.reducer