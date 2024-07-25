

/* original
import { titles } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );

    const sliderNav = document.querySelector(".slider-nav");
    const sliderContainer = document.querySelector(".slides");
    const bgOverlay = document.querySelector(".bg-overlay");
    const slideTitle = document.querySelector(".slide-title");
    const numberOfItems = 30;
    let currentIndex = 0;

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function updateTitle(newIndex, color) {
        const title = titles[newIndex];
        const titleRows = slideTitle.querySelectorAll(".slide-title-row");

        titleRows.forEach((row, rowIndex) => {
            row.querySelectorAll(".letter").forEach((letter, letterIndex) => {
                const existingSpan = letter.querySelector("span");
                if (existingSpan) {
                    letter.removeChild(existingSpan);
                }

                const newSpan = document.createElement("span");
                const direction = newIndex > currentIndex ? 150 : -150;
                gsap.set(newSpan, {
                    x: direction,
                    color: color,
                });

                newSpan.textContent = title[rowIndex][letterIndex] || "";
                letter.appendChild(newSpan);
                gsap.to(newSpan, {
                    x: 0,
                    duration: 1,
                    ease: "hop",
                    delay: 0.125,
                });
            });
        });
    }

    for (let i = 0; i < numberOfItems; i++) {
        const navItemWrapper = document.createElement("div");
        navItemWrapper.classList.add("nav-item-wrapper");
        if (i === 0) {
            navItemWrapper.classList.add("active");
        }

        const navItem = document.createElement("div");
        navItem.classList.add("nav-item");

        navItemWrapper.appendChild(navItem);
        sliderNav.appendChild(navItemWrapper);

        navItemWrapper.addEventListener("click", () => {
            if (i === currentIndex) {
                return;
            }

            document.querySelectorAll(".nav-item-wrapper").forEach((nav) =>
                nav.classList.remove("active")
            );

            navItemWrapper.classList.add("active");

            let translateXValue = -i * 14;
            if (i >= numberOfItems) {
                translateXValue = 0;
                i = 0;
            }

            gsap.to(sliderContainer, {
                x: `${translateXValue}vw`,
                duration: 1.5,
                ease: "hop",
            });

            const newColor = getRandomColor();
            gsap.to(bgOverlay, {
                backgroundColor: newColor,
                duration: 2,
                ease: "hop",
            });

            updateTitle(i, newColor);
            currentIndex = i;

            document.querySelectorAll(".slide").forEach((slide, index) => {
                slide.classList.toggle("active", index === i);
            });
        });

        const slide = document.createElement("div");
        slide.classList.add("slide");

        if (i === 0) {
            slide.classList.add("active");
        }

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("img");

        const img = document.createElement("img");
        img.src = `./assets/img${i + 1}.jpg`;
        img.alt = `Slide ${i + 1}`;

        imgWrapper.appendChild(img);
        slide.appendChild(imgWrapper);
        sliderContainer.appendChild(slide);
    }

    updateTitle(0, getComputedStyle(bgOverlay).backgroundColor);
});

*/
import { titles } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );

    const sliderNav = document.querySelector(".slider-nav");
    const sliderContainer = document.querySelector(".slides");
    const bgOverlay = document.querySelector(".bg-overlay");
    const slideTitle = document.querySelector(".slide-title");
    const numberOfItems = 40;
    let currentIndex = 0;
    let enlargedImage = null; // Track the currently enlarged image

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function updateTitle(newIndex, color, customTitle = null) {
        const title = customTitle || titles[newIndex];
        if (!title) {
            console.error(`Title for index ${newIndex} is missing.`);
            return;
        }

        const titleRows = slideTitle.querySelectorAll(".slide-title-row");

        titleRows.forEach((row, rowIndex) => {
            row.querySelectorAll(".letter").forEach((letter, letterIndex) => {
                const existingSpan = letter.querySelector("span");
                if (existingSpan) {
                    letter.removeChild(existingSpan);
                }

                const newSpan = document.createElement("span");
                const direction = newIndex > currentIndex ? 150: -150;
                gsap.set(newSpan, {
                    x: direction,
                    color: color,
                });

                newSpan.textContent = title[rowIndex][letterIndex] || "";
                letter.appendChild(newSpan);
                gsap.to(newSpan, {
                    x: 0,
                    duration: 1,
                    ease: "hop",
                    delay: 0.2,
                });
            });
        });
    }

    function handleImageClick(img, index) {
        if (enlargedImage && enlargedImage !== img) {
            // Reset the previously enlarged image
            enlargedImage.style.zIndex = "";
            enlargedImage.style.height = "";
            enlargedImage.style.width = "";
            enlargedImage.style.position = "";
            enlargedImage.style.top = "";
            enlargedImage.style.left = "";
            enlargedImage.classList.remove("active");
        }

        // Toggle enlarged state of the clicked image
        if (img.classList.contains("active")) {
            img.style.zIndex = "";
            img.style.height = "";
            img.style.width = "";
            img.style.position = "";
            img.style.top = "";
            img.style.left = "";
            img.classList.remove("active");
            enlargedImage = null;
        } else {
            img.style.zIndex = 1000 
            img.style.height = "100vh"; 
            img.style.width = "100vw"; 
            img.style.position = "fixed"; 
            img.style.objectFit="cover";
            gsap.to(sliderContainer, {
                x: `${0}vw`,
            });
            img.style.top = "0"; 
            img.style.left = "0"; 
            img.classList.add("active");
            enlargedImage = img;

            updateTitle(index, getRandomColor(), JSON.parse(img.dataset.title));
        }
    }

    for (let i = 0; i < numberOfItems; i++) {
        const navItemWrapper = document.createElement("div");
        navItemWrapper.classList.add("nav-item-wrapper");
        if (i === 0) {
            navItemWrapper.classList.add("active");
        }

        const navItem = document.createElement("div");
        navItem.classList.add("nav-item");

        navItemWrapper.appendChild(navItem);
        sliderNav.appendChild(navItemWrapper);

        navItemWrapper.addEventListener("click", () => {
            if (i === currentIndex) {
                return;
            }

            document.querySelectorAll(".nav-item-wrapper").forEach((nav) =>
                nav.classList.remove("active")
            );

            navItemWrapper.classList.add("active");

            let translateXValue = -i * 5.2;
            if (i >= numberOfItems) {
                translateXValue = 0;
                i = 0;
            }

            gsap.to(sliderContainer, {
                x: `${translateXValue}vw`,
                duration: 1.5,
                ease: "hop",
            });

            const newColor = getRandomColor();
            gsap.to(bgOverlay, {
                backgroundColor: newColor,
                duration: 2,
                ease: "hop",
            });

            updateTitle(i, newColor);
            currentIndex = i;

            document.querySelectorAll(".slide").forEach((slide, index) => {
                slide.classList.toggle("active", index === i);
            });
        });

        const slide = document.createElement("div");
        slide.classList.add("slide");

        if (i === 0) {
            slide.classList.add("active");
        }

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("img");

        const img = document.createElement("img");
        img.src = `./assets/img${i + 1}.jpg`;
        img.alt = `Slide ${i + 1}`;
        img.dataset.title = JSON.stringify(titles[i]);

        img.addEventListener("click", () => handleImageClick(img, i),()=>{
        });

        imgWrapper.appendChild(img);
        slide.appendChild(imgWrapper);
        sliderContainer.appendChild(slide);
    }

    updateTitle(0, getComputedStyle(bgOverlay).backgroundColor);
});
