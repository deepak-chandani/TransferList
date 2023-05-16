import { createRoot } from "react-dom/client";

import App from "./App";
import { ItemsProvider } from "./context/ItemsProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <ItemsProvider><App /></ItemsProvider>
);
