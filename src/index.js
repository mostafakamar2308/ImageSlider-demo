import gsap from "gsap";
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
  // line.id = `line-${lineContainer.children.length + 1}`;
  line.addEventListener("click", function () {
    if (!line.classList.contains("active")) {
      let index = Array.from(lineContainer.children).indexOf(line);
      for (let i = 0; i < lineContainer.children.length; i++) {
        lineContainer.children[i].classList.remove("active");
      }
      line.classList.add("active");
      gsap.to(imgContainer.parentNode, { duration: 0.5, x: -800, opacity: 0 });
      setTimeout(() => {
        imgContainer.src = images[Object.keys(images)[index]]["default"];
      }, 500);
      setTimeout(() => {
        gsap.fromTo(
          imgContainer.parentNode,
          { x: 300, opacity: 0 },
          {
            duration: 0.5,
            x: 0,
            opacity: 1,
          }
        );
      }, 700);
    }
  });
  lineContainer.appendChild(line);
}
createImgLine();
createImgLine();
createImgLine();
createImgLine();
lineContainer.children[0].classList.add("active");
