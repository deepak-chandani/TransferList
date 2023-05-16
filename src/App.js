import { useEffect, useId, useReducer, useRef } from "react"
import TransferList from "./components/TransferList"
import "./styles.css"
import { useItems } from "./context/ItemsProvider"

export default function App() {  
  const { list1, list2, itemsById, dispatch } = useItems()

  function handleTransfer(sourceListKey) {
    const destListKey = sourceListKey === "list1" ? "list2" : "list1"
    dispatch({ type: "MOVE_ITEMS", payload: { sourceListKey, destListKey } })
  }

  const hasSelectedItemsInLeft = list1.some((id) => itemsById[id].isSelected)
  const hasSelectedItemsInRight = list2.some((id) => itemsById[id].isSelected)

  const list1Items = list1.map((id) => itemsById[id])
  const list2Items = list2.map((id) => itemsById[id])

  return (
    <div className="app-container">
      <TransferList listKey="list1" items={list1Items} />
      <div className="actions">
        <button
          aria-label="Transfer selected items to left list"
          disabled={!hasSelectedItemsInRight}
          onClick={() => handleTransfer("list2")}
        >
          <span aria-hidden="true">&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to right list"
          disabled={!hasSelectedItemsInLeft}
          onClick={() => handleTransfer("list1")}
        >
          <span aria-hidden="true">&gt;</span>
        </button>
      </div>
      <TransferList listKey="list2" items={list2Items} />
    </div>
  )
}

