import React, { useContext, useReducer } from "react"
import itemsReducer from "./itemsReducer"
import { createItem } from "../../utils"

const ItemsContext = React.createContext()

const itemsById = [
  "HTML",
  "JavaScript",
  "CSS",
  "TypeScript",
  "React",
  "Angular",
  "Vue",
  "Svelte",
].reduce((acc, name) => {
  const newItem = createItem(name)
  acc[newItem.id] = newItem
  return acc
}, {})

const ids = Object.keys(itemsById)
const initialState = {
  itemsById,
  list1: ids.slice(0,4),
  list2: ids.slice(4),
}

export function ItemsProvider({ children }) {
  const [state, dispatch] = useReducer(itemsReducer, initialState)
  const value = {
    ...state,
    dispatch,
  }

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}

export function useItems(){
  const contextValue  = useContext(ItemsContext)
  if (contextValue === undefined) {
    throw new Error(`useItems must be used within a ItemsProvider`)
  }
  return contextValue
}

export function useDispatch(){
  const contextValue  = useContext(ItemsContext)
  if (contextValue === undefined) {
    throw new Error(`useItems must be used within a ItemsProvider`)
  }
  return contextValue.dispatch
}