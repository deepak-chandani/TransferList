import { useEffect, useId, useRef } from "react"
import { getId } from "../utils"
import { useDispatch } from "../context/ItemsProvider"

export default function TransferList({ listKey, items }) {
  const dispatch = useDispatch()
  const componentId = useId()
  const selectAllCheckboxRef = useRef()

  // effect: sync checkbox based on selected items
  useEffect(() => {
    const selectedCount = items.reduce(
      (count, item) => (item.isSelected ? count + 1 : count),
      0
    )
    const allSelected = selectedCount === items.length
    const someSelected = selectedCount > 0 && !allSelected
    selectAllCheckboxRef.current.checked = allSelected
    selectAllCheckboxRef.current.indeterminate = someSelected // some are selected
  }, [items])

  function handleItemSelection(e) {
    const id = +e.target.dataset.id
    dispatch({ type: "TOGGLE_ITEM", payload: { id, listKey } })
    return false
  }

  function handleAll() {
    dispatch({ type: "TOGGLE_ALL", payload: { listKey } })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const nameInput = form.elements.name
    const name = nameInput.value.trim()
    if (name.length === 0) return
    const newItem = {
      id: getId(),
      name,
      isSelected: false,
    }
    dispatch({ type: "ADD_ITEM", payload: { listKey, newItem } })
    nameInput.value = ""
  }

  const selectedCount = items.reduce(
    (acc, item) => (item.isSelected ? acc + 1 : acc),
    0
  )
  return (
    <div className="transfer-list-container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="add new item" />
      </form>
      <div className="stats">
        <p>
          <input
            id={"selectAll-" + componentId}
            type="checkbox"
            ref={selectAllCheckboxRef}
            onChange={handleAll}
          />{" "}
          <label htmlFor={"selectAll-" + componentId}>
            {selectedCount}/{items.length} Selected
          </label>
        </p>
      </div>
      <ul className="item-list">
        {items.map((item) => {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                data-id={item.id}
                checked={item.isSelected}
                onChange={handleItemSelection}
              />{" "}
              <label htmlFor={item.id}>{item.name}</label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}