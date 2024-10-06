// Select elements from the DOM
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Toggle play/pause function
function togglePlay() {
    if (video.paused) {
        video.play();
        toggle.textContent = '❚ ❚'; // Change button to pause symbol
    } else {
        video.pause();
        toggle.textContent = '►'; // Change button to play symbol
    }
}

// Update progress bar as video plays
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

// Scrub function to allow users to click on the progress bar
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Change volume based on slider input
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Skip function for the skip buttons
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', scrub);
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

// Optional: Hide the controls when not hovering over the player
player.addEventListener('mouseenter', () => {
    player.querySelector('.player__controls').style.opacity = '1';
});
player.addEventListener('mouseleave', () => {
    player.querySelector('.player__controls').style.opacity = '0.5';
});
