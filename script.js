// Color Inputs
const textColorInput = document.getElementById('text-color');
const backgroundColorInput = document.getElementById('background-color');

// Font Size Input
const fontSizeInput = document.getElementById('font-size');
const fontSizeValueSpan = document.getElementById('font-size-value');

// Update font size input attributes
fontSizeInput.min = 2;
fontSizeInput.max = 24;

// Add Element Buttons
const addTextButton = document.getElementById('add-text');
const addButton = document.getElementById('add-button');

// Apply and Export Buttons
const applyButton = document.getElementById('apply-btn');
const exportCSSButton = document.getElementById('export-css-btn');

// Live View Container
const liveView = document.getElementById('live-view');
let buttonCounter = 1, textCounter = 1;

// Event Listeners for Adding Elements
addTextButton.addEventListener('click', () => {
    const p = document.createElement('p');
    p.textContent = `Text ${textCounter}`;
    p.id = `text${textCounter++}`;
    p.style.fontSize = `${fontSizeInput.value}px`; // Inherit initial font size
    liveView.appendChild(p);
    createMenu(p);
});

addButton.addEventListener('click', () => {
    const button = document.createElement('button');
    button.textContent = `Button ${buttonCounter}`;
    button.id = `button${buttonCounter++}`;
    button.style.fontSize = `${fontSizeInput.value}px`; // Inherit initial font size
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
    button.style.border = '2px solid black';
    button.style.borderRadius = '10px';
    button.style.padding = '10px 20px';
    button.style.cursor = 'pointer';
    liveView.appendChild(button);
    createMenu(button);
});

// Apply Theme Button
applyButton.addEventListener('click', () => {
    liveView.style.color = textColorInput.value;
    liveView.style.backgroundColor = backgroundColorInput.value;
});

// Export CSS Button
exportCSSButton.addEventListener('click', () => {
    const css = [];
    const elements = liveView.children;

    // Export global background color
    css.push(`#live-view {\n  background-color: ${backgroundColorInput.value};\n}\n\n`);

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let elementCss = `#${element.id} {\n`;

        if (element.style.color) {
            elementCss += `  color: ${element.style.color};\n`;
        }

        if (element.style.backgroundColor) {
            elementCss += `  background-color: ${element.style.backgroundColor};\n`;
        }

        if (element.style.fontSize) {
            elementCss += `  font-size: ${element.style.fontSize};\n`;
        }

        if (element.tagName === 'BUTTON') {
            elementCss += `  border: ${element.style.border};\n`;
            elementCss += `  border-radius: ${element.style.borderRadius};\n`;
            elementCss += `  padding: ${element.style.padding};\n`;
            elementCss += `  cursor: ${element.style.cursor};\n`;
        }

        elementCss += '}\n\n';
        css.push(elementCss);
    }

    const cssString = css.join('');
    const cssWindow = window.open('', '_blank');
    cssWindow.document.write('<pre>' + cssString + '</pre>');
    cssWindow.document.title = 'Custom Theme CSS';
});

// Create Menu for Editable Elements
let currentTarget = null;
const menuTemplate = document.getElementById('menu-template');

// Function to create a menu for an element
function createMenu(target) {
    if (!target.id) {
        target.id = `element-${Math.floor(Math.random() * 1000000)}`;
    }

    const menu = menuTemplate.content.cloneNode(true);
    target.appendChild(menu);

    const menuBtns = target.querySelectorAll('.menu-btn');
    const menuColors = target.querySelectorAll('.menu-color');
    const menuInput = target.querySelector('.menu-input');

    menuBtns.forEach((btn) => {
        btn.style.display = 'none';
    });

    if (target.tagName === 'P') {
        setupTextMenu(target, menu, menuBtns, menuColors, menuInput);
    } else if (target.tagName === 'BUTTON') {
        setupButtonMenu(target, menu, menuBtns, menuColors, menuInput);
    }

    target.addEventListener('click', (e) => {
        if (e.target === target) {
            if (currentTarget) {
                currentTarget.querySelector('.menu').style.display = 'none';
            }
            target.querySelector('.menu').style.display = 'block';
            currentTarget = target;
        }
    });

    liveView.addEventListener('click', (e) => {
        if (!target.contains(e.target)) {
            target.querySelector('.menu').style.display = 'none';
        }
    });
}

// Setup menu for text elements
function setupTextMenu(target, menu, menuBtns, menuColors, menuInput) {
    menuBtns[1].textContent = 'Change Text Color';
    menuBtns[1].style.display = 'block';
    menuBtns[0].textContent = 'Change Background Color';
    menuBtns[0].style.display = 'block';

    addRenameAndDelete(target, menu, menuInput);

    menuColors[1].style.display = 'block';
    menuColors[1].addEventListener('input', () => {
        target.style.color = menuColors[1].value;
    });

    menuColors[0].style.display = 'block';
    menuColors[0].addEventListener('input', () => {
        target.style.backgroundColor = menuColors[0].value;
    });
}

// Setup menu for button elements with additional options
function setupButtonMenu(target, menu, menuBtns, menuColors, menuInput) {
    menuBtns[1].textContent = 'Change Text Color';
    menuBtns[1].style.display = 'block';
    menuBtns[0].textContent = 'Change Background Color';
    menuBtns[0].style.display = 'block';

    addRenameAndDelete(target, menu, menuInput);

    menuColors[1].style.display = 'block';
    menuColors[1].addEventListener('input', () => {
        target.style.color = menuColors[1].value;
    });

    menuColors[0].style.display = 'block';
    menuColors[0].addEventListener('input', () => {
        target.style.backgroundColor = menuColors[0].value;
    });

    // Add editable border options
    const borderInput = document.createElement('input');
    borderInput.type = 'text';
    borderInput.placeholder = 'Border (e.g. 2px solid black)';
    borderInput.style.display = 'block';
    borderInput.addEventListener('input', () => {
        target.style.border = borderInput.value;
    });
    menu.appendChild(borderInput);

    // Add editable border-radius options
    const borderRadiusInput = document.createElement('input');
    borderRadiusInput.type = 'text';
    borderRadiusInput.placeholder = 'Border Radius (e.g. 10px)';
    borderRadiusInput.style.display = 'block';
    borderRadiusInput.addEventListener('input', () => {
        target.style.borderRadius = borderRadiusInput.value;
    });
    menu.appendChild(borderRadiusInput);

    // Add editable padding options
    const paddingInput = document.createElement('input');
    paddingInput.type = 'text';
    paddingInput.placeholder = 'Padding (e.g. 10px 20px)';
    paddingInput.style.display = 'block';
    paddingInput.addEventListener('input', () => {
        target.style.padding = paddingInput.value;
    });
    menu.appendChild(paddingInput);

    // Add editable font-size options
    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'number';
    fontSizeInput.placeholder = 'Font Size (e.g. 16px)';
    fontSizeInput.style.display = 'block';
    fontSizeInput.addEventListener('input', () => {
        target.style.fontSize = `${fontSizeInput.value}px`;
    });
    menu.appendChild(fontSizeInput);

    // Add editable cursor options
    const cursorInput = document.createElement('input');
    cursorInput.type = 'text';
    cursorInput.placeholder = 'Cursor (e.g. pointer)';
    cursorInput.style.display = 'block';
    cursorInput.addEventListener('input', () => {
        target.style.cursor = cursorInput.value;
    });
    menu.appendChild(cursorInput);
}

// Helper function to add Rename and Delete buttons
function addRenameAndDelete(target, menu, menuInput) {
    const renameButton = document.createElement('button');
    renameButton.textContent = 'Rename';
    renameButton.className = 'menu-btn';
    renameButton.style.display = 'block';
    renameButton.addEventListener('click', (e) => {
        e.stopPropagation();
        menuInput.style.display = 'block';
        menuInput.value = target.textContent;
        menuInput.addEventListener('input', () => {
            target.textContent = menuInput.value;
        });
        menuInput.addEventListener('blur', () => {
            menuInput.style.display = 'none';
        });
    });
    menu.appendChild(renameButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'menu-btn';
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        target.remove(); // Delete the target element
        if (target === currentTarget) {
            currentTarget = null;
        }
    });
    menu.appendChild(deleteButton);
}
