import React, { useState } from "react"
import { fetchRetry } from "./utils"

export default function App2() {
  const [loading, setLoading] = useState(false)

  function handleClick() {
    setLoading(true)
    const url = "https://jsonplaceholder.typicode.com/todo/1abc" // intentionally wrong url
    fetchRetry(url)
      // .catch((err) => {
      //   console.log("all attempts failed");
      // })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Trigger"}
      </button>
    </div>
  )
}
