// Get elements from the DOM
const primaryColorInput = document.getElementById('primary-color');
const backgroundColorInput = document.getElementById('background-color');
const textColorInput = document.getElementById('text-color'); // New text color input
const fontSizeInput = document.getElementById('font-size');
const fontFamilySelect = document.getElementById('font-family');
const applyButton = document.getElementById('apply-btn');

// Target the preview section and its elements
const sampleElement = document.getElementById('sample');
const sampleButton = sampleElement.querySelector('button');
const sampleHeading = sampleElement.querySelector('h3');
const sampleParagraph = sampleElement.querySelector('p');

// Apply button click event
applyButton.addEventListener('click', () => {
    // Apply primary color to the button (button background)
    sampleButton.style.backgroundColor = primaryColorInput.value;

    // Apply background color to the sample section
    sampleElement.style.backgroundColor = backgroundColorInput.value;

    // Apply text color to all text inside the sample section
    sampleElement.style.color = textColorInput.value;

    // Apply font size to heading and paragraph
    sampleHeading.style.fontSize = `${fontSizeInput.value}px`;
    sampleParagraph.style.fontSize = `${fontSizeInput.value}px`;

    // Apply font family to the entire preview section
    sampleElement.style.fontFamily = fontFamilySelect.value;
});

// Initial setup to apply the default values on page load
window.addEventListener('load', () => {
    sampleButton.style.backgroundColor = primaryColorInput.value;
    sampleElement.style.backgroundColor = backgroundColorInput.value;
    sampleElement.style.color = textColorInput.value;
    sampleHeading.style.fontSize = `${fontSizeInput.value}px`;
    sampleParagraph.style.fontSize = `${fontSizeInput.value}px`;
    sampleElement.style.fontFamily = fontFamilySelect.value;
});
