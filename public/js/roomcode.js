import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

const id = nanoid(6);

document.getElementById("app").innerHTML = `
<div>${id}</div>
`;
