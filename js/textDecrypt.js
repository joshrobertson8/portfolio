/**
 * Text Decryption Animation
 * Creates a glitchy decoding effect where text starts as random characters
 * and gradually reveals the correct characters one by one.
 */

// Get DOM references
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if the elements exist
  if (document.querySelector('.name-container h1') && document.querySelector('.words .static')) {
    initTextDecrypt();
  }
});

// Variable to track if fireworks are active
let fireworksActive = false;

// Listen for fireworks state changes
document.addEventListener('fireworksStateChange', function(e) {
  fireworksActive = e.detail.active;
  
  // If fireworks are starting, reset decryption timers
  if (fireworksActive) {
    clearTimeout(window.nameAnimationTimeout);
    clearTimeout(window.uncAnimationTimeout);
    clearTimeout(window.cycleTimeout);
    
    // Restore original text without animation
    const nameElement = document.querySelector('.name-container h1');
    const uncElement = document.querySelector('.words .static');
    
    if (nameElement) nameElement.textContent = 'Josh Robertson';
    if (uncElement) uncElement.textContent = 'University of North Carolina 2027';
  } else {
    // When fireworks end, restart the animation after a delay
    setTimeout(() => {
      if (!fireworksActive) {
        initTextDecrypt();
      }
    }, 2000);
  }
});

function initTextDecrypt() {
  // Don't run if fireworks are active
  if (fireworksActive) return;
  
  const nameElement = document.querySelector('.name-container h1');
  const uncElement = document.querySelector('.words .static');
  
  // Store original text
  const nameText = 'Josh Robertson';
  const uncText = 'University of North Carolina 2027';
  
  // Set both to encrypted state
  randomizeText(nameElement, nameText);
  randomizeText(uncElement, uncText);
  
  // Decrypt animation timing (in milliseconds)
  const nameAnimationDuration = 3800;  // Slower animation for the name
  const uncAnimationDuration = 4800;   // Even slower for UNC text
  
  // Start decryption animation
  startDecryption(nameElement, nameText, nameAnimationDuration);
  
  // Stagger the second animation
  window.uncAnimationTimeout = setTimeout(() => {
    startDecryption(uncElement, uncText, uncAnimationDuration);
  }, 1500);
  
  // Set up animation cycle (with 10 second pause)
  setupAnimationCycle(nameElement, uncElement, nameText, uncText, nameAnimationDuration, uncAnimationDuration);
}

function setupAnimationCycle(nameElement, uncElement, nameText, uncText, nameAnimationDuration, uncAnimationDuration) {
  // Total cycle time: animations + 10s pause (approx 20s total)
  const cycleTime = 20000;  
  
  window.cycleTimeout = setTimeout(() => {
    // Check if fireworks are active before starting a new cycle
    if (!fireworksActive) {
      // Reset the text to encrypted state
      randomizeText(nameElement, nameText);
      randomizeText(uncElement, uncText);
      
      // Start decryption animation
      startDecryption(nameElement, nameText, nameAnimationDuration);
      
      // Stagger the second animation
      window.uncAnimationTimeout = setTimeout(() => {
        startDecryption(uncElement, uncText, uncAnimationDuration);
      }, 1500);
      
      // Set up the next cycle
      setupAnimationCycle(nameElement, uncElement, nameText, uncText, nameAnimationDuration, uncAnimationDuration);
    }
  }, cycleTime);
}

function randomizeText(element, originalText) {
  if (!element) return;
  
  // Create an array of scrambled characters
  const chars = [];
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`'.split('');
  
  for (let i = 0; i < originalText.length; i++) {
    // Add a random symbol (or space for spaces)
    chars.push(originalText[i] === ' ' ? ' ' : symbols[Math.floor(Math.random() * symbols.length)]);
  }
  
  // Set the element's content to the scrambled text
  element.textContent = chars.join('');
  
  // Add the glitchy effect class
  element.classList.add('decrypting');
}

function startDecryption(element, finalText, duration) {
  if (!element || fireworksActive) return;
  
  // Clear any existing animation
  clearTimeout(window.nameAnimationTimeout);
  
  // Store the current (encrypted) text as an array of characters
  const startChars = element.textContent.split('');
  const finalChars = finalText.split('');
  const totalChars = startChars.length;
  
  // Time settings for character changes
  const minCharChangeTime = 150;  // Minimum time between character changes (slower)
  const maxCharChangeTime = 250;  // Maximum time between character changes (slower)
  const spaceCharTime = 50;       // Faster for spaces
  
  // Adjust the character change timings for UNC text
  const isUnc = finalText.includes('University');
  const charMinTime = isUnc ? 140 : minCharChangeTime;
  const charMaxTime = isUnc ? 230 : maxCharChangeTime;
  
  // Add a small delay between frames for slower tick speed
  const frameDelay = 20;
  
  // Track which characters have been correctly set
  const isCharCorrect = new Array(totalChars).fill(false);
  
  // Define a function to update one character
  function updateChar(index) {
    if (fireworksActive) return;  // Skip if fireworks are active
    
    // If this character is already correct, skip it
    if (isCharCorrect[index]) return;
    
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`'.split('');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
    
    // Space characters are handled specially
    if (finalChars[index] === ' ') {
      // Higher chance for spaces to become correct quickly
      if (Math.random() < 0.4) {
        startChars[index] = ' ';
        isCharCorrect[index] = true;
      } else {
        startChars[index] = ' '; // Keep as space
      }
    } else {
      // If character is not a space
      const progress = Date.now() - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      
      // Gradually increase the probability of showing letters vs symbols
      const letterChance = 0.1 + (progressRatio * 0.7);
      
      // Gradually increase the chance this character becomes permanently correct
      const correctChance = Math.max(0.05, progressRatio * 0.8);
      
      if (Math.random() < correctChance) {
        // Set to final character and mark as correct
        startChars[index] = finalChars[index];
        isCharCorrect[index] = true;
      } else if (Math.random() < letterChance) {
        // Show a random letter instead of symbol as we progress
        startChars[index] = letters[Math.floor(Math.random() * letters.length)];
      } else {
        // Show a random symbol
        startChars[index] = symbols[Math.floor(Math.random() * symbols.length)];
      }
    }
    
    // Update the element text
    element.textContent = startChars.join('');
  }
  
  // Track start time for the animation
  const startTime = Date.now();
  
  // Animation loop function
  function animationLoop() {
    if (fireworksActive) {
      // If fireworks are active, stop the animation
      element.classList.remove('decrypting');
      return;
    }
    
    // Calculate elapsed time
    const elapsed = Date.now() - startTime;
    
    // Randomly update characters
    for (let i = 0; i < totalChars; i++) {
      if (Math.random() < 0.2 && !isCharCorrect[i]) {
        updateChar(i);
      }
    }
    
    // Check if animation should complete
    const allCorrect = isCharCorrect.every(correct => correct);
    const timeUp = elapsed >= duration;
    
    if (timeUp || allCorrect) {
      // Ensure final text is set correctly
      element.textContent = finalText;
      element.classList.remove('decrypting');
    } else {
      // Continue the animation after a short delay
      setTimeout(animationLoop, frameDelay);
    }
  }
  
  // Start the animation loop
  animationLoop();
} 