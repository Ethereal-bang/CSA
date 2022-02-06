import {add} from "./add.js";
import "./stylesheets/main.css";
import "./stylesheets/second.scss";
import Image1 from "./images/img.jpg";
import Image2 from "./images/btn.png";

document.querySelector("h2").innerText = add(1, 3);

// 处理图片：
const img1 = new Image();
img1.src = Image1;
document.querySelector("div.img").appendChild(img1);
const img2 = new Image();
img2.src = Image2;
document.querySelector("button").appendChild(img2);