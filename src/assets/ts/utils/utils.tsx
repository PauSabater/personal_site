import gsap from "gsap"

export function hideAllTransitionImages() {
    const elsImages: NodeListOf<HTMLElement> = document.querySelectorAll(".transition-images-container")
    Array.from(elsImages).forEach((img) => {
        gsap.set(img, {opacity: 0})
        gsap.set(img, {height: '100vh'})
    })
}

export function hidePageOverlay() {
    const elPageOverlay: HTMLElement | null = document.getElementById("page-overlay")
    if (elPageOverlay !== null) gsap.set(elPageOverlay, {opacity: 0})
}