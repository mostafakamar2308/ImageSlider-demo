const images = {};

function importAll(r) {
  r.keys().map((key) => {
    images[key] = r(key);
  });
}
importAll(require.context("/src/img", false, /\.jpg$/));
console.log(images[Object.keys(images)[0]]["default"]);

const imgContainer = document.querySelector(".image");
const lineContainer = document.querySelector(".photos-lines");

imgContainer.src = images[Object.keys(images)[0]]["default"];

function createImgLine() {
  let line = document.createElement("div");
  line.classList.add("line");
  line.id = `line-${lineContainer.children.length + 1}`;
  lineContainer.appendChild(line);
}
createImgLine();
createImgLine();
createImgLine();
createImgLine();
