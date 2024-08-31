import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    blurb: `<a href="https://pds-dase-portal-v2.fly.dev/">PDS Developer Portal: </a> <br/> Suite of developer tools on the browser for interacting with the Personal-Digital-Space REST API. Contracted work to overhaul their legacy portal site.`,
    tech: `<ul class="tech-list">
      <li>NextJS</li>
      <li>Redis</li>
    </ul>`,
    imgSrc: "./pds-dase-portal-v2.png"
  },
  {
    blurb: `<a>Solution-Blitz:</a> <br/> Leetcode on VSCode with a competitive programming twist! Built for a school project with a team of 5.`,
    tech: `
    <ul class="tech-list">
      <li>VSCode API</li> 
      <li>MongoDB</li> 
      <li>Express</li> 
      <li>Redis</li> 
    </ul>`,
    imgSrc: "./solblitz.png"
  },
  {
    blurb: `<a href="https://ibft-catpics-8bd7cc324d04.herokuapp.com">IBFT Simulation</a> <br/> Simulate one round of the Istanbul Byzantine Fault Tolerance consensus algorithm used on many blockchains with NodeJS + C++.`,
    tech: `
    <ul class="tech-list">
      <li>C++</li> 
      <li>Express</li> 
      <li>React</li> 
    </ul>
  `,
    imgSrc: "./ibft.png"
  },
  {
    blurb: `<a>HopEats</a> <br/> An Android app that finds Hopkins students nearby restaurants along with a fully-featured rating system that brings a social presence to the app! Built for my User-Interfaces-and-Mobile-Applications course with a team of 4.`,
    tech: `
    <ul class="tech-list">
      <li>Java</li> 
      <li>Android Studio</li> 
      <li>Firebase</li> 
    </ul>
  `,
    imgSrc: "./hopeats.png"
  },
  {
    blurb: `<a>ValueStacker</a> <br/> A Redis-esque key-value pair store meant to work in a concurrent environment using mutexes to manage concurrent client connections to the server. Built for my Computer Systems Fundamentals course.`,
    tech: `
    <ul class="tech-list">
      <li>C</li>
      <li>C++</li>
    </ul>
  `,
    imgSrc: "./value-stacker.png"
  },
  {
    blurb: `<a href="https://bathan1.github.io/dad-and-jane/">Present-er: </a> <br/> a present for my dad and mom.`,
    imgSrc: "./presenter.png",
    tech: `
      <ul class="tech-list">
        <li>HTML</li>
        <li>Tailwind</li>
        <li>JavaScript</li>
      </ul>
    `,
  }
];

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

  minimap!.innerHTML = "";
  imageContainer!.innerHTML = "";

  let activeThumbnail: null | HTMLDivElement = null;

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const imagePath = project.imgSrc;

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
    blurb.innerHTML = project.blurb;

    const techDiv = document.createElement("div");
    techDiv.className = "tech-container";
    techDiv.innerHTML = project.tech;

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

