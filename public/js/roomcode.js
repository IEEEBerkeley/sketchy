//import { customAlphabet } from "nanoid";
//import "./styles.css";

//const getId = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);
//const id = getId();

const { nanoid } = require('nanoid')
const id = nanoid(6);

//document.getElementById("room-code").innerHTML = `<div>${id}</div>`;

//const id = nanoid();
document.getElementById("room-code").innerHTML = `<div>${id}</div>`;

//const nanoid = require('nanoid');
//function generate_room_code() {
//    document.getElementById("room-code").innerHTML = nanoid();
//}
//generate_room_code()
