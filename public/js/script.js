const holes = document.querySelectorAll('.hole');

// Function to clear all moles (reset hole colors)
function clearMoles() {
  holes.forEach(hole => hole.style.backgroundColor = '');
}

var round = 0;

// Fetch mole data from the server
async function getMolesData() {
    try {
      const response = await fetch('http://localhost:3000/api/moles');
      if (!response.ok) {
        // Log or inspect the response to get more details on the error
        console.log(`Error: ${response.status} ${response.statusText}`);
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const moles = await response.json();
      return moles;
    } catch (error) {
      console.error('Failed to fetch moles data:', error);
      throw error;
    }
  }

// Convert first three floats in the array to a CSS color string
function floatsToCssColor(data) {
  return `rgb(${Math.floor(data[0] * 200)}, ${Math.floor(data[1] * 200)}, ${Math.floor(data[2] * 200)})`;
}

// Show a random mole
async function showRandomMole() {
    clearMoles();
    const moles = await getMolesData();
    const secondMole = moles[1];
    // Add a check to ensure that moles data is not undefined and has the correct structure
    if (!moles || !moles.length) {
      console.error('Moles data is not in the expected format or is missing.');
      return;
    }
     // console.log(moles.length); // 3 for each object
  

    // Set the background color of the hole to the mole's color
    let usedHoles = new Set();

    // Function to get a unique random hole that isn't used yet
    function getUniqueHole(probabilities) {
      // Sum all probabilities to find the total
      const totalProbability = probabilities.reduce((acc, curr) => acc + curr, 0);
    
      // Normalize and calculate the cumulative sum for each probability
      const cumulativeProbabilities = probabilities.map((prob, index, arr) => {
        return arr.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0) / totalProbability;
      });
    
      let holeIndex, selectedProbability;
      do {
        // Generate a random float between 0 and 1
        selectedProbability = Math.random();
    
        // Find the first hole where the cumulative probability exceeds the random number
        holeIndex = cumulativeProbabilities.findIndex(cumProb => selectedProbability <= cumProb);
      } while (usedHoles.has(holeIndex)); // Ensure it's a unique hole
    
      usedHoles.add(holeIndex); // Mark the hole as used
      return holeIndex;
    }

    function showMole(){
        let rand_number = Math. floor(Math. random() * (10 + 1)); //three in 10 prob
        // console.log(rand_number);
        if (rand_number <=9){
            return true;
        }
        return false;
    }

    let colorArray = [];
    let durArray = [];
    let probsArray = []
    let i = 0;
    function update_perams(){
      colorArray = [];
      durArray = [];
      probsArray = [];
      moles.forEach((mole) => {
        // console.log(`Mole ID: ${mole.ID}, Data: ${mole.Data[1]}`);
        colorArray.push(mole.Data_mole.slice(1, 4)) // 2nd to 4th number represents values for the color.
        durArray.push(mole.Data_mole[0]);
        probsArray.push(mole.Data_mole.slice(4, mole.Data_mole.length));

    });
    }
    update_perams();

    

    
    function resetGame() {
        holes.forEach(hole => {
          hole.style.backgroundColor = '';
          var newHole = hole.cloneNode(true);
          hole.parentNode.replaceChild(newHole, hole);
        });
        console.log(`Round number: ${++round}.`);
        update_perams();
        //setTimeout(() => {
          // Call the function to start the next round of the game
         // showRandomMole();
        //}, 3000); 
      }
      
      
      // Function to handle mole click
      function handleMoleClick(event) {
        // Prevent any further event propagation which can trigger clicks on underlying elements
        event.stopPropagation();
      
        // The mole ID is stored in the data-mole-id attribute
        const moleID = event.currentTarget.dataset.moleID;
        console.log(`Mole ID: ${moleID} was clicked!`);
        resetGame();
        // TODO: add logic to update game here
        
      }
    usedHoles.clear();
    for (let i = 0; i < 3; i++) {
        if (showMole()) {
          const holeIndex = getUniqueHole(probsArray[i]);
          const moleID = moles[i].ID;
          const holeElement = holes[holeIndex];
          holeElement.dataset.moleID = moleID;
          holes[holeIndex].style.backgroundColor = floatsToCssColor(colorArray[i]);
          // Add the click event listener to the hole element
          holeElement.addEventListener('click', handleMoleClick);
      
          // Set a timeout to "hide" the mole after a specific duration
          setTimeout(() => {
            holes[holeIndex].style.backgroundColor = ''; // Reset color to hide mole
            // Explicitly remove the click event listener
            holeElement.removeEventListener('click', handleMoleClick);
            // Remove the data attribute
            holeElement.removeAttribute('data-mole-id');
          }, durArray[i] * 3000); // Use the corresponding duration for each mole
        }
      }
    

    
    // Hide mole after a delay and repeat
    setTimeout(showRandomMole, 1000);
}
// Initiate the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', showRandomMole);