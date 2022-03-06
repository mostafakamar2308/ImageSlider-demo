import gsap from "gsap";
const images = {};

const imgContainer = document.querySelector(".image");
const lineContainer = document.querySelector(".photos-lines");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");

function importAll(r) {
  r.keys().map((key) => {
    images[key] = r(key);
    createImgLine();
  });
}
importAll(require.context("/src/img", false, /\.jpg$/));
console.log(images[Object.keys(images)[0]]["default"]);

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

lineContainer.children[0].classList.add("active");

forward.addEventListener("click", function () {
  const activeLine = document.querySelector(".active");
  if (activeLine.nextSibling) {
    activeLine.nextSibling.click();
  } else {
    lineContainer.firstChild.click();
  }
});

backward.addEventListener("click", function () {
  const activeLine = document.querySelector(".active");
  if (activeLine.previousSibling) {
    activeLine.previousSibling.click();
  } else {
    lineContainer.lastChild.click();
  }
});
