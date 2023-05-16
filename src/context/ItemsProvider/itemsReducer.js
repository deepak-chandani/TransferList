
function debug(state, action) {
  console.group(action.type)
  console.log(action.payload)
  console.log("state", state)
  console.groupEnd()
}

export default function itemsReducer(state, action) {
  debug(state, action)
  const { payload } = action
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const { id } = payload
      const newItem = {
        ...state.itemsById[id],
      }
      newItem.isSelected = !newItem.isSelected
      return {
        ...state,
        itemsById: { ...state.itemsById, [id]: newItem },
      }
    }
    case "ADD_ITEM": {
      const { listKey, newItem } = payload
      const id = newItem.id
      const newList = state[listKey].concat(id)
      return {
        ...state,
        itemsById: { ...state.itemsById, [id]: newItem },
        [listKey]: newList,
      }
    }
    case "MOVE_ITEMS": {
      const { sourceListKey, destListKey } = payload
      const { itemsById } = state
      const sourceList = state[sourceListKey].slice()
      const destList = state[destListKey].slice()
      const transferItemIds = []
      sourceList.forEach((id) => {
        if (itemsById[id].isSelected) {
          transferItemIds.push(id)
          destList.push(id)
        } else {
        }
      })

      return {
        ...state,
        [sourceListKey]: sourceList.filter(
          (id) => !transferItemIds.includes(id)
        ),
        [destListKey]: destList,
      }
    }
    case "TOGGLE_ALL": {
      const { listKey } = payload
      const { itemsById } = state
      const itemIds = state[listKey]
      const allSelected = itemIds.every((id) => itemsById[id].isSelected)
      if (allSelected) {
        // unselect all of them
        itemIds.forEach((id) => (itemsById[id].isSelected = false))
      } else {
        // select remaining items
        itemIds.forEach((id) => (itemsById[id].isSelected = true))
      }

      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}
