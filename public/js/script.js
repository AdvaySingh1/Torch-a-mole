const holes = document.querySelectorAll('.hole');

// Function to clear all moles (reset hole colors)
function clearMoles() {
  holes.forEach(hole => hole.style.backgroundColor = '');
}

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
    let mole_1_hole, mole_2_hole, mole_3_hole;

    // Function to get a unique random hole that isn't used yet
    function getUniqueHole() {
        let hole;
        do {
        hole = Math.floor(Math.random() * holes.length);
        } while (usedHoles.has(hole));
            usedHoles.add(hole);
        return hole;
        }
    function getRandomMole(){
        return Math.floor(Math. random() * (3 + 1)); 
    }
    function showMole(){
        let rand_number = Math. floor(Math. random() * (10 + 1)); //three in 10 prob
        console.log(rand_number);
        if (rand_number <=9){
            return true;
        }
        return false;
    }

    let colorArray = [];
    let durArray = [];
    let i = 0;
    moles.forEach((mole) => {
        // console.log(`Mole ID: ${mole.ID}, Data: ${mole.Data[1]}`);
        colorArray.push(mole.Data_mole.slice(1, 4)) // 2nd to 4th number represents values for the color.
        durArray.push(mole.Data_mole[0]);

    });

    
    function resetGame() {
        holes.forEach(hole => {
          hole.style.backgroundColor = '';
          var newHole = hole.cloneNode(true);
          hole.parentNode.replaceChild(newHole, hole);
        });
      }
      
      
      // Function to handle mole click
    function handleMoleClick(moleId) {
        console.log(`Mole ID: ${moleId} was clicked!`);
        //resetGame();
        // TODO: add logic to update game here
      }

    for (let i = 0; i < 3; i++) {
        if (showMole()) {
          const holeIndex = getUniqueHole();
          const moleID = moles[i].ID;
          const holeElement = holes[holeIndex];
          holes[holeIndex].style.backgroundColor = floatsToCssColor(colorArray[i]);
          holeElement.addEventListener('click', () => handleMoleClick(moleID));
      
          // Set a timeout to "hide" the mole after a specific duration
          setTimeout(() => {
            holes[holeIndex].style.backgroundColor = ''; // Reset color to hide mole
            // Clean up by cloning element to remove event listeners
            if (holeElement.parentNode) {
                const newHoleElement = holeElement.cloneNode(true); // Create a clone without event listeners
                holeElement.parentNode.replaceChild(newHoleElement, holeElement); // Replace the old element with the clone
            }
          }, durArray[i] * 100); // Use the corresponding duration for each mole
        }
      }
    

    
    // Hide mole after a delay and repeat
    setTimeout(showRandomMole, 200);
}
// Initiate the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', showRandomMole);