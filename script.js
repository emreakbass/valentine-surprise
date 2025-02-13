/***********************
 *  PIN + PUZZLE SETUP  *
 ***********************/
const CORRECT_PIN = '9030';
let currentPin = '';
const puzzlePieces = 12; // Number of puzzle pieces

// Array of photo details with special notes
const photos = [
    { src: 'pic1.jpeg', caption: 'Our Photoshoot 💕', note: 'Remember this day? I love when you wear white.' },
    { src: 'pic2.jpeg', caption: 'Beautiful Memories ❤️', note: 'Every moment with you is precious.' },
    { src: 'pic3.jpeg', caption: 'Together Forever 💑', note: 'Forever isn\'t long enough when I\'m with you.' },
    { src: 'pic4.jpeg', caption: 'Special Moments ✨', note: 'Making memories with you is my favorite thing to do.' },
    { src: 'pic5.jpeg', caption: 'Love You Always 💖', note: 'You make my heart skip a beat, every single day.' },
    { src: 'pic6.jpeg', caption: 'Forever & Ever 💘', note: 'Thank you for choosing me to be your partner in life.' },
    { src: 'pic7.jpeg', caption: 'Just Us Two 🥰', note: 'You complete me and make me a better person.' },
    { src: 'pic8.jpeg', caption: 'Perfect Together 💝', note: 'We fit together like puzzle pieces.' },
    { src: 'pic9.jpeg', caption: 'Endless Love ❤️', note: 'My love for you grows stronger each day.' },
    { src: 'pic10.jpeg', caption: 'Our Sweet Journey 💫', note: 'Here\'s to our beautiful journey together!' }
];

// Music control
let bgMusic;
let musicToggle;

function initializeMusic() {
    bgMusic = document.getElementById('bgMusic');
    musicToggle = document.getElementById('musicToggle');
    
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        }
    });
}

// Interactive hearts
function initializeInteractiveHearts() {
    const container = document.querySelector('.interactive-hearts');
    container.addEventListener('click', (e) => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = (e.offsetX - 12) + 'px';
        heart.style.top = (e.offsetY - 12) + 'px';
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => heart.remove(), 1500);
    });
}

// Show memory note when clicking polaroid
function showMemoryNote(note) {
    const notesContainer = document.querySelector('.memory-notes');
    const noteText = notesContainer.querySelector('.note');
    noteText.textContent = note;
    notesContainer.classList.remove('hidden');
    
    setTimeout(() => {
        notesContainer.classList.add('hidden');
    }, 3000);
}

// Screen transition functions
function showMemories() {
    document.querySelector('.success-screen').style.display = 'none';
    const memoriesScreen = document.querySelector('.memories-screen');
    memoriesScreen.style.display = 'block';
    memoriesScreen.classList.add('show');
    
    // Create polaroids if they haven't been created yet
    if (memoriesScreen.querySelector('.polaroid-container').children.length === 0) {
        createPolaroids();
    }
}

function showSuccess() {
    document.querySelector('.memories-screen').style.display = 'none';
    document.querySelector('.success-screen').style.display = 'block';
}

// Create polaroid elements with click handlers
function createPolaroids() {
    const container = document.querySelector('.polaroid-container');
    
    photos.forEach((photo, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        
        const randomRotate = (Math.random() * 10 - 5);
        polaroid.style.setProperty('--random-rotate', `${randomRotate}deg`);
        polaroid.style.animationDelay = `${index * 0.1}s`;
        
        polaroid.innerHTML = `
            <img src="${photo.src}" alt="Memory ${index + 1}">
            <p>${photo.caption}</p>
        `;
        
        // Add click handler for showing note
        polaroid.addEventListener('click', () => {
            showMemoryNote(photo.note);
        });
        
        container.appendChild(polaroid);
    });
}

function initializePinDisplay() {
    const pinDisplay = document.querySelector('.pin-dots');
    for (let i = 0; i < 4; i++) {
        const dot = document.createElement('div');
        dot.className = 'pin-dot';
        pinDisplay.appendChild(dot);
    }
}

function initializePuzzle() {
    const puzzle = document.querySelector('.heart-puzzle');
    const pieceSize = 100 / Math.sqrt(puzzlePieces);

    for (let i = 0; i < puzzlePieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.width = pieceSize + '%';
        piece.style.height = pieceSize + '%';
        piece.style.left = (i % Math.sqrt(puzzlePieces)) * pieceSize + '%';
        piece.style.top = Math.floor(i / Math.sqrt(puzzlePieces)) * pieceSize + '%';
        piece.style.backgroundImage = 'url("couple-image.JPG")';
        piece.style.backgroundSize = (100 * Math.sqrt(puzzlePieces)) + '%';
        piece.style.backgroundPosition =
            `-${(i % Math.sqrt(puzzlePieces)) * pieceSize}% -${Math.floor(i / Math.sqrt(puzzlePieces)) * pieceSize}%`;

        // Initial scattered position
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 100;
        const randomRotate = (Math.random() - 0.5) * 180;
        piece.style.transform = `translate(${randomX}%, ${randomY}%) rotate(${randomRotate}deg)`;
        piece.style.opacity = '0';

        puzzle.appendChild(piece);
    }
}

function updatePinDisplay() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('filled', index < currentPin.length);
    });
}

function handleBackspace() {
    if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        updatePinDisplay();
    }
}

/*************************************
 *  UNLOCK SUCCESS + ENVELOPE LOGIC  *
 *************************************/
function handleSuccess() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    pieces.forEach((piece, index) => {
        setTimeout(() => {
            piece.style.transform = 'none';
            piece.style.opacity = '1';
            piece.classList.add('solved');
        }, index * 100);
    });

    setTimeout(() => {
        document.querySelector('.lock-screen').style.display = 'none';
        const successScreen = document.querySelector('.success-screen');
        successScreen.style.display = 'block';
        successScreen.classList.remove('hidden');
        
        // Start playing music when showing success screen
        bgMusic.play();
        musicToggle.classList.add('playing');
    }, pieces.length * 100 + 500);
}

/***********************
 *    INIT & EVENTS    *
 ***********************/
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing puzzle & pin display...");
    initializePinDisplay();
    initializePuzzle();
    initializeMusic();
    initializeInteractiveHearts();

    // Keypad clicks
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            if (key.classList.contains('backspace-key')) {
                handleBackspace();
            } else if (currentPin.length < 4 && !isNaN(key.textContent)) {
                currentPin += key.textContent;
                updatePinDisplay();

                if (currentPin.length === 4) {
                    console.log("4 digits entered:", currentPin);
                    if (currentPin === CORRECT_PIN) {
                        handleSuccess();
                    } else {
                        console.log("Wrong PIN! Shaking keypad...");
                        const pad = document.querySelector('.pin-pad');
                        pad.classList.add('shake');
                        setTimeout(() => {
                            currentPin = '';
                            updatePinDisplay();
                            pad.classList.remove('shake');
                        }, 500);
                    }
                }
            }
        });
    });

    // Make functions globally available for onclick handlers
    window.showMemories = showMemories;
    window.showSuccess = showSuccess;
});
