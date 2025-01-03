import { gsap } from "gsap";
import { projectAList } from "./projects";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const toBlurb = (projectName: string, projectDescription: string) => `<a>${projectName}</a> <br/> ${projectDescription}`;

const reduceLangs = (languages: readonly string[], tools: readonly string[]) => [...languages, ...tools]
  .reduce((acc, language, idx, self) => {
    acc += `<li>${language}</li>`
    if (idx === self.length - 1) {
      acc += "\n</ul>";
    }
    return acc;
  }, `<ul class="tech-list">\n`);

document.addEventListener("DOMContentLoaded", () => {
  /**
    * Used to update the CSS variables in realtime for the flashlight effect
    * @param {MouseEvent} event: the mouse move event
  */
  function trackMouse(event: MouseEvent): void {
    const main = document.querySelector("main"); 

    main.style.setProperty(
      '--cursorXPos',
      `${event.clientX}px`
    );
    main.style.setProperty(
      '--cursorYPos',
      `${event.clientY}px`
    );
  }

  // Only add mouse tracking effect if the user is on a big enough screen
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', trackMouse);
  }
    const numImages = 6;
    const minimap = document.querySelector(".minimap .preview");
    const imageContainer = document.querySelector(".images");

    const getRandomLeft = () => {
      const values = [-1, -0.5, 0, 0.5, 1];
      return values[Math.floor(Math.random() * values.length)].toString() + "rem";
    }

  minimap.innerHTML = "";
  imageContainer.innerHTML = "";

  let activeThumbnail: null | HTMLDivElement = null;
  for (const [ projectName, projectInfo ] of projectAList) {
    const randomLeft = getRandomLeft();
    const imagePath = projectInfo.image.src;

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "img-thumbnail";
    thumbnailDiv.style.left = getRandomLeft();
    const imgThumbnail = document.createElement("img");
    imgThumbnail.src = imagePath;
    thumbnailDiv.appendChild(imgThumbnail);
    minimap!.appendChild(thumbnailDiv);
    
    const imgDiv = document.createElement("div");
    imgDiv.className = "img";
    imgDiv.classList.add("appear");
  
    const blurbContainer = document.createElement("div");
    blurbContainer.className = "blurb-container";

    const blurb = document.createElement("p");
    blurb.innerHTML = toBlurb(projectName, projectInfo.description);

    const techDiv = document.createElement("div");
    techDiv.className = "tech-container";
    techDiv.innerHTML = reduceLangs(projectInfo.languages, projectInfo.tools);

    const imgFull = document.createElement("img");
    imgFull.src = imagePath;

    blurbContainer.appendChild(blurb);
    blurbContainer.appendChild(techDiv);

    imgDiv.appendChild(imgFull);
    imgDiv.appendChild(blurbContainer);

    imageContainer!.appendChild(imgDiv);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: imgDiv,
      start: "top center",
      end: "bottom center",
      onToggle: self => {
        if (self.isActive) {
          if (activeThumbnail && activeThumbnail !== thumbnailDiv) {
            animateThumbnail(activeThumbnail, false);
          }
          animateThumbnail(thumbnailDiv, true);
          activeThumbnail = thumbnailDiv;
        } else if (activeThumbnail === thumbnailDiv) {
            animateThumbnail(thumbnailDiv, false);
        }
      }
    });
  }

  const animateThumbnail = (thumbnail: HTMLDivElement, isActive: boolean) => {
    gsap.to(thumbnail, {
      border: isActive ? "1px solid #fff" : "none",
      opacity: isActive ? 1 : 0.5,
      scale: isActive ? 1.3 : 1,
      zIndex: isActive ? 10000 : 1,
      duration: 0.3
    });
  }

  const appearElements = document.querySelectorAll(".appear");
  const cb = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("inview");
      } 
    });
  };

  const io = new IntersectionObserver(cb);
  appearElements.forEach(e => io.observe(e));

  
  const handleContactSpanClick = () => {
    document.execCommand("copy");
  }

  const contactSpan = document.getElementById("contact-anchor");
  contactSpan.onclick = handleContactSpanClick;
  contactSpan.addEventListener("copy", (e) => {
    e.preventDefault();  
    if (e.clipboardData) {
      e.clipboardData.setData("text/plain", contactSpan.textContent);
    }
  });
});

