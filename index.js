const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.right')
const prevButton = document.querySelector('.left')
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);


// Arrange the slides next to one another

// slides[0].style.left = slideWidth*0 + 'px'
// slides[1].style.left = slideWidth*1 + 'px'
// slides[2].style.left = slideWidth*2 + 'px'
const setSlidePosition = (slide, index)=> {
    slide.style.left = slideWidth*index +'px'
}
slides.forEach(setSlidePosition)


const moveToSlide = (track, currentSlide, targetSlide) =>{
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot)=> {
    currentDot.classList.remove('current-slide')
    targetDot.classList.add('current-slide')

}


const showHideArrow = (slides, prevButton, nextButton, targetIndex)=> {
    if (targetIndex === 0) {
        prevButton.classList.add('isHidden')
        nextButton.classList.remove('isHidden')
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('isHidden')
        nextButton.classList.add('isHidden')
    } else {
        prevButton.classList.remove('isHidden')
        nextButton.classList.remove('isHidden')
    }
}


// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling;

    const prevIndex = slides.findIndex(slide => slide === prevSlide)

    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDots = currentDot.previousElementSibling;
    // move to the next slide
    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDots)
    showHideArrow(slides, prevButton, nextButton, prevIndex)
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');

    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    const nextDots = currentDot.nextElementSibling;
    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDots)
    showHideArrow(slides, prevButton, nextButton, nextIndex)
})

// when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // What indicator was clicked on?
    const targetDot = e.target.closest('button')
    if (!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide)
    updateDots(currentDot, targetDot)
    showHideArrow(slides, prevButton, nextButton, targetIndex)
})



 






