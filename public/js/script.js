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
  return `rgb(${Math.floor(data[0] * 255)}, ${Math.floor(data[1] * 255)}, ${Math.floor(data[2] * 255)})`;
}

// Show a random mole
async function showRandomMole() {
    clearMoles();
    const moles = await getMolesData();
    const secondMole = moles[1];
    console.log(secondMole.Data_mole[2]);
    // Add a check to ensure that moles data is not undefined and has the correct structure
    if (!moles || !moles.length) {
      console.error('Moles data is not in the expected format or is missing.');
      return;
    }
     // console.log(moles.length); // 3 for each object
    // Choose a random mole from the array
  
    // Choose a random hole index
    const randomHoleIndex = Math.floor(Math.random() * holes.length);
    
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

    mole_1_hole = getUniqueHole(); // Gets a unique hole
    mole_2_hole = getUniqueHole(); // Different from mole_1_hole
    mole_3_hole = getUniqueHole(); // Different from mole_1_hole and mole_2_hole
    let myArray = [];
    moles.forEach((mole) => {
        // console.log(`Mole ID: ${mole.ID}, Data: ${mole.Data[1]}`);
        myArray.push(mole.Data_mole.slice(1, 4)) // 2nd to 4th number represents values for the color.
        console.log(myArray)
    });
    holes[mole_1_hole].style.backgroundColor = floatsToCssColor(myArray[0]); // fill hole one with mole 1 data
    holes[mole_2_hole].style.backgroundColor = floatsToCssColor(myArray[1]);
    holes[mole_3_hole].style.backgroundColor = floatsToCssColor(myArray[2]);

    holes[mole_2_hole]
    
    // Hide mole after a delay and repeat
    setTimeout(showRandomMole, 1000);
}
// Initiate the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', showRandomMole);