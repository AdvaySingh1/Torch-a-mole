const holes = document.querySelectorAll('.hole');

// Function to clear all the moles (Reset the hole colors)
function clearMoles() {
  holes.forEach(hole => hole.style.backgroundColor = '');
}

// Fetch mole data from the server and start the game
async function startGame() {
  try {
    const response = await fetch('/api/moles');
    const { moles } = await response.json();
    showRandomMole(moles);
  } catch (error) {
    console.error('Failed to start game:', error);
  }
}

// Convert an array of RGB values to a CSS color string
function rgbToCss([r, g, b]) {
  return `rgb(${r}, ${g}, ${b})`;
}

// Randomly select a hole and mole based on the probabilities and display it
function showRandomMole(moles) {
  clearMoles();
  const randomRowIndex = Math.floor(Math.random() * 3);
  const randomColIndex = Math.floor(Math.random() * 3);
  const randomHoleIndex = randomRowIndex * 3 + randomColIndex;
  
  let sumOfProbabilities = 0;
  for (const mole of moles) {
    sumOfProbabilities += mole.probabilities[randomRowIndex][randomColIndex];
  }

  const randomProbability = Math.random() * sumOfProbabilities;
  let cumulativeProbability = 0;
  for (const mole of moles) {
    cumulativeProbability += mole.probabilities[randomRowIndex][randomColIndex];
    
    if (randomProbability <= cumulativeProbability) {
      holes[randomHoleIndex].style.backgroundColor = rgbToCss(mole.color);
      break;
    }
  }

  // Hide mole after a delay and repeat
  setTimeout(() => {
    showRandomMole(moles);
  }, 1000);
}

// Initiate the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  startGame();
});