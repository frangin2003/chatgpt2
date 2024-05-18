// Function to clone the button, append it to the right of the specified div, modify the SVG inside it, and add a hover effect
function cloneAndPlaceButtonWithHover() {
    // Correctly escape the class names and find the button
    const buttonSelector = '.h-10.rounded-lg.px-2\\.5.text-token-text-secondary.focus-visible\\:outline-0.hover\\:bg-token-sidebar-surface-secondary.focus-visible\\:bg-token-sidebar-surface-secondary';
    const button = document.querySelector(buttonSelector);
    
    // Clone the button
    const clonedButton = button.cloneNode(true);
    
    // Find the div where the button should be placed
    const targetDiv = document.querySelector('div.flex.items-center.gap-2.overflow-hidden.juice\\:gap-0');
    
    // Append the cloned button to the right of the div
    targetDiv.appendChild(clonedButton);
  
    // Apply a rotation transformation to the cloned button
    clonedButton.style.transform = 'rotate(180deg)';
  
    // Modify the SVG inside the cloned button
    const svg = clonedButton.querySelector('svg');
    svg.innerHTML = `<path fill="currentColor" fill-rule="evenodd" d="M2,2 L22,2 L22,22 L2,22 L2,2 M12,2 L12,22" stroke="black" stroke-width="2"/>`;
  
    // Add hover effect with CSS
    clonedButton.style.position = 'relative';
    clonedButton.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
    clonedButton.style.transition = 'box-shadow 0.3s ease-in-out';
    clonedButton.onmouseover = function() {
      this.style.boxShadow = `0 0 0 2px darkgray inset`;
    };
    clonedButton.onmouseout = function() {
      this.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
    };
  
    // Add click event to toggle visibility of newDiv and adjust height of specific divs
    clonedButton.onclick = function() {
        const newDiv = document.querySelector('.one-chat-at-a-time');
        const messageDivs = document.querySelectorAll('[data-message-author-role]');

        // Toggle visibility of newDiv
        newDiv.style.display = newDiv.style.display === 'block' ? 'none' : 'block';

        // Toggle height of messageDivs
        messageDivs.forEach(div => {
            if (newDiv.style.display === 'block') {
                div.style.height = '65px';
            } else {
                div.style.height = 'auto';
            }
        });
    };
}

// Call the function to execute the operation
cloneAndPlaceButtonWithHover();


// Create a new div to display the copied content and hide it by default
const targetDiv = document.querySelector('#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col');
const newDiv = document.createElement('div');
newDiv.classList.add('one-chat-at-a-time');
newDiv.style.cssText = 'overflow-y: scroll; max-height: 100%; width: 50%; display: none;'; // Added 'display: none;' to hide by default
newDiv.innerHTML = '<h3><i>Load selected chat here</i></h3>';
targetDiv.parentNode.insertBefore(newDiv, targetDiv.nextSibling);

// Add event listener to all target divs
document.querySelectorAll('div.w-full.text-token-text-primary').forEach(div => {
  div.addEventListener('click', function() {
    // Copy the clicked div's content to the new div
    newDiv.innerHTML = div.innerHTML;

    // Select all divs inside newDiv with the attribute data-message-author-role and remove their height style
    newDiv.querySelectorAll('[data-message-author-role]').forEach(innerDiv => {
        innerDiv.style.height = '';
        });
  });
});
