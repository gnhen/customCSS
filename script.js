const textColorInput = document.getElementById('text-color');
const backgroundColorInput = document.getElementById('background-color');
const fontSizeInput = document.getElementById('font-size');
const fontSizeValueSpan = document.getElementById('font-size-value');
let buttonCounter = 1, textCounter = 1;

fontSizeInput.addEventListener('input', () => {
    fontSizeValueSpan.textContent = `${fontSizeInput.value}px`;
});

document.getElementById('add-text').addEventListener('click', () => {
    const p = document.createElement('p');
    p.textContent = `Text ${textCounter}`;
    p.id = `text${textCounter++}`;
    p.style.fontSize = `${fontSizeInput.value}px`;
    p.style.cursor = 'pointer';
    p.addEventListener('click', (e) => createMenu(e.target));
    document.getElementById('live-view').appendChild(p);
});

document.getElementById('add-button').addEventListener('click', () => {
    const button = document.createElement('button');
    button.textContent = `Button ${buttonCounter}`;
    button.id = `button${buttonCounter++}`;
    button.style.fontSize = `${fontSizeInput.value}px`;
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
    button.style.border = '2px solid black';
    button.style.borderRadius = '10px';
    button.style.padding = '10px 20px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', (e) => createMenu(e.target));
    document.getElementById('live-view').appendChild(button);
});

document.getElementById('apply-btn').addEventListener('click', () => {
    document.getElementById('live-view').style.backgroundColor = backgroundColorInput.value;
});

document.getElementById('export-css-btn').addEventListener('click', () => {
    const css = [];
    const elements = document.getElementById('live-view').children;
    css.push(`#live-view {\n  background-color: ${backgroundColorInput.value};\n}\n\n`);
    for (let element of elements) {
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

let currentTarget = null;
const menuTemplate = document.getElementById('menu-template');

function createMenu(target) {
    if (currentTarget && currentTarget !== target) {
        closeMenu();
    }

    const menu = menuTemplate.content.cloneNode(true).firstElementChild;
    document.body.appendChild(menu);
    const rect = target.getBoundingClientRect();
    menu.style.display = 'block';
    menu.style.top = `${rect.bottom}px`;
    menu.style.left = `${rect.left}px`;

    const deleteButton = menu.querySelector('.delete-icon');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        target.remove();
        closeMenu();
    });

    const bgColorPicker = menu.querySelector('.menu-color:nth-of-type(1)');
    const textColorPicker = menu.querySelector('.menu-color:nth-of-type(2)');

    bgColorPicker.addEventListener('input', (e) => {
        target.style.backgroundColor = e.target.value;
    });

    textColorPicker.addEventListener('input', (e) => {
        target.style.color = e.target.value;
    });

    currentTarget = target;
    document.addEventListener('click', outsideClickListener);
}

function outsideClickListener(event) {
    if (!currentTarget.contains(event.target)) {
        closeMenu();
    }
}

function closeMenu() {
    const existingMenu = document.querySelector('.menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    currentTarget = null;
    document.removeEventListener('click', outsideClickListener);
}
