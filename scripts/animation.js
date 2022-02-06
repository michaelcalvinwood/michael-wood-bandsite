//assign hover events to all photos
let currentHover = null;
let photos = document.querySelectorAll(".gallery__photo");

for (let i = 0; i < photos.length; ++i) {
    photos[i].addEventListener('mouseover', slideIt);
}

// assign mouseout to gallery so that all images return to original position when the mouse is moved outside the gallery area
photos = document.querySelector(".gallery");
photos.addEventListener("mouseleave", returnIt);

/*
 * slide the hovered image
*/
function slideIt () {
    // return previous image back to original position
    if (currentHover !== null) {
        currentHover.classList.remove('gallery__photo--slide');
    }

    // slide the current photo into position
    this.classList.add('gallery__photo--slide');
    currentHover = this;

    // add the mailto info to the href attribute of the corresponding link
    let imageSrc = this.getAttribute('src');
    let parent = this.parentNode;
    let link = parent.querySelector('a');
    link.setAttribute ('href', 'mailto:?subject=The Bees Knees&body=The Bees Knees begins their summer tour in June. They rock!%0D%0A%0D%0ACheck out this pic from their last tour: https://mywerld.com' + imageSrc);

    return false;
}

/*
 * Return any currently slid photo back into place.
*/
function returnIt () {
    if (currentHover !== null) currentHover.classList.remove('gallery__photo--slide');
}