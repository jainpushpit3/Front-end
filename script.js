// =======================
// LOADER ANIMATION
// =======================
function loaderAnimation() {
    const tl = gsap.timeline();
    const count = { val: 0 };
  
    // Hide main content initially
    gsap.set("#main", { opacity: 0, visibility: "hidden" });
    gsap.set("html, body", {
      overflow: "hidden",
      backgroundColor: "black",
      height: "100%",
    });
    gsap.set("#loader", { y: 0, height: "100vh", backgroundColor: "#888" });
  
    // COUNTING TEXT
    gsap.to(count, {
      val: 100,
      duration: 1.5,
      ease: "power1.inOut",
      onUpdate: () => {
        document.querySelector("#loader h1").textContent =
          "ruk jaa load ho rha hai...... " + Math.floor(count.val) + "%";
      },
    });
  
    // SHUTTER UP
    tl.to("#loader", {
      y: "-100%",
      duration: 2.6,
      delay: 1.3,
      ease: "expo.inOut",
      onStart: () => {
        // Prevent any background flicker
        gsap.set("html, body", {
          backgroundColor: "black",
          overflow: "hidden",
          height: "100%",
        });
      },
      onComplete: () => {
        // Reveal main content smoothly
        gsap.set("#main", { visibility: "visible" });
        gsap.set("#loader", { display: "none" });
        gsap.set("html, body", {
          overflow: "hidden", // keeps scrollbar hidden
          height: "100%",
        });
        window.scrollTo(0, 0);
  
        // Start first animations
        firstPageAnim();
        initScroll();
      },
    });
  }
  loaderAnimation();
  
  // =======================
  // NORMAL SCROLL (Scrollbar hidden)
  // =======================
  function initScroll() {
    // Keeping native scroll hidden (still scrollable via mouse/touch)
    document.body.style.overflowY = "scroll"; // enable scrolling
    document.body.style.scrollbarWidth = "none"; // hide scrollbar (Firefox)
    document.body.style.msOverflowStyle = "none"; // hide scrollbar (IE/Edge)
    const style = document.createElement("style");
    style.innerHTML = `
      ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
    `;
    document.head.appendChild(style);
  }
  
  // =======================
  // FIRST PAGE ANIMATION
  // =======================
  function firstPageAnim() {
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
  
    // Fade in the page itself first to avoid flicker
    tl.to("#main", {
      opacity: 1,
      duration: 0.3,
    })
      .from("#nav", {
        y: -10,
        opacity: 0,
        duration: 0.5,
      })
      .to(".boundingelem", {
        y: 0,
        duration: 1,
        stagger: 0.3,
      })
      .from(
        "#herofeet",
        {
          y: 10,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.8"
      ); // overlaps for smooth timing
  }
  
  // =======================
  // MOUSE FOLLOWER
  // =======================
  let timeout;
  
  function circlechapta() {
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;
  
    window.addEventListener("mousemove", (dets) => {
      clearTimeout(timeout);
  
      xscale = gsap.utils.clamp(0.8, 1.2, (dets.clientX - xprev) / 100);
      yscale = gsap.utils.clamp(0.8, 1.2, (dets.clientY - yprev) / 100);
  
      xprev = dets.clientX;
      yprev = dets.clientY;
  
      circleMouseFollower(xscale, yscale);
  
      timeout = setTimeout(() => {
        document.querySelector(
          "#minicircle"
        ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
      }, 100);
    });
  }
  circlechapta();
  
  function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", (dets) => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
  }
  circleMouseFollower();
  
  // =======================
  // IMAGE HOVER EFFECT
  // =======================
  document.querySelectorAll(".elem").forEach((elem) => {
    let rotate = 0;
    let diff = 0;
    const img = elem.querySelector("img");
  
    elem.addEventListener("mousemove", (details) => {
      const rect = elem.getBoundingClientRect();
      const x = details.clientX - rect.left - img.offsetWidth / 1.8;
      const y = details.clientY - rect.top - img.offsetHeight / 3;
      diff = details.clientX - rotate;
      rotate = details.clientX;
  
      gsap.to(img, {
        opacity: 0.9,
        x,
        y,
        ease: "power3.out",
        duration: 0.5,
        rotate: gsap.utils.clamp(-35, 35, diff * 0.5),
      });
    });
  
    elem.addEventListener("mouseleave", () => {
      gsap.to(img, {
        opacity: 0,
        ease: "power3.out",
        duration: 0.5,
      });
    });
  });
  