import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const blurbs = {
  1: `<a href="#">BioMatch:</a> <br/> a clinical trials app that can be scaled to uniquely match hundreds of users to volunteer for a clinical trial.`,
  2: `<a href="#">MangaCoverer:</a> <br/> a full-stack project used to help over 20 students at the UVA art club for inspiration on their manga project.`,
  3: `<a href="#">Mini-Piano:</a> <br/> a satisfying full-octave piano playable on the browser!`,
  4: `<a href="#">SleepTimerer:</a> <br/> a mobile-first sleep calculator used to help me figure out when to sleep.`,
  5: `<a href="#">StickyNoter:</a> <br/> a sticky notes app made for intro full-stack development at JHU.`,
  6: `<a href="#">Flashcarder:</a> <br/> a flash cards app used to help me and my friends study for our finals`,
  7: `<a href="#">Present-er: </a> <br/> a present for my dad and mom.`
};

const techs = {
  1: `
    <ul class="tech-list">
      <li>React</li> 
      <li>MongoDB</li> 
      <li>Express</li> 
      <li>Tailwind</li> 
  </ul>`,
  2: `
    <ul class="tech-list">
      <li>HTML</li> 
      <li>Tailwind</li> 
      <li>JavaScript</li> 
    </ul>
  `,
  3: `
    <ul class="tech-list">
      <li>HTML</li>
      <li>Tailwind</li>
      <li>TypeScript</li>
    </ul>
  `,
  4: `
    <ul class="tech-list">
      <li>HTML</li>
      <li>Tailwind</li>
      <li>JavaScript</li>
    </ul>
  `,
  5: `
    <ul class="tech-list">
      <li>HTML</li>
      <li>Tailwind</li>
      <li>JavaScript</li>
    </ul>
  `,
  6: `
    <ul class="tech-list">
      <li>React</li>
      <li>Tailwind</li>
      <li>Zustand</li>
      <li>PostgreSQL</li>
      <li>NestJS</li>
    </ul>
  `,
  7: `
    <ul class="tech-list">
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  `,
}

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
    const numImages = 7;
    const minimap = document.querySelector(".minimap .preview");
    const imageContainer = document.querySelector(".images");

    const getRandomLeft = () => {
        const values = [-1, -0.5, 0, 0.5, 1];
        return values[Math.floor(Math.random() * values.length)].toString() + "rem";
    }

  minimap!.innerHTML = "";
  imageContainer!.innerHTML = "";

  let activeThumbnail: null | HTMLDivElement = null;

  for (let i = 1; i <= numImages; i++) {
    const randomLeft = getRandomLeft();
    const imagePath = `./img${i}.png`;

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "img-thumbnail";
    thumbnailDiv.style.left = randomLeft;
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
    if (blurbs[i]) {
      blurb.innerHTML = blurbs[i];
    } 

    const techDiv = document.createElement("div");
    techDiv.className = "tech-container";
    if (techs[i]) {
      techDiv.innerHTML = techs[i];
    }

    const imgFull = document.createElement("img");
    imgFull.src = imagePath;

    // Need BioMatch image to start from left
    if (i === 1) {
      imgThumbnail.classList.add("left-image");
      imgFull.classList.add("left-image");
    }

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

