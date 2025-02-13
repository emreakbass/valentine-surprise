        piece.style.left = (i % Math.sqrt(puzzlePieces)) * pieceSize + '%';
        piece.style.top = Math.floor(i / Math.sqrt(puzzlePieces)) * pieceSize + '%';
        piece.style.backgroundImage = 'url("couple-image.JPG")';
        piece.style.backgroundSize = (100 * Math.sqrt(puzzlePieces)) + '%';
