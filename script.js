/* eslint-disable linebreak-style */
const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'], ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'], ['Control', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu']];

function createKeyboard() {
  const keyboard = document.getElementById('keyboard');

  for (const row of keyboardLayout) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('keyboard-row');

    for (const key of row) {
      const keyElement = document.createElement('div');
      keyElement.classList.add('key');
      keyElement.textContent = key === 'Control' ? 'Ctrl' : key;
      keyElement.dataset.key = key;
      rowElement.appendChild(keyElement);
    }

    keyboard.appendChild(rowElement);
  }
}

function handleKeyPress(e) {
  const textArea = document.getElementById('text-area');
  const key = e.type === 'keydown' ? e.key : e.target.dataset.key;

  if (key === 'Backspace') {
    textArea.value = textArea.value.slice(0, -1);
  } else if (key === 'Tab') {
    textArea.value += '\t';
  } else if (key === 'Enter') {
    textArea.value += '\n';
  } else if (key === 'Space') {
    textArea.value += ' ';
  } else if (!e.metaKey && !e.ctrlKey && !e.altKey && key.length === 1) {
    textArea.value += key;
  }
}

function handleKeyDown(e) {
  const keyElement = document.querySelector(`.key[data-key="${e.key}"]`);
  if (keyElement) {
    keyElement.classList.add('pressed');
  }
}

function handleKeyUp(e) {
  const keyElement = document.querySelector(`.key[data-key="${e.key}"]`);
  if (keyElement) {
    keyElement.classList.remove('pressed');
  }
}

function handleMouseClick(e) {
  if (e.target.classList.contains('key')) {
    e.target.classList.add('pressed');
    handleKeyPress(e);
    setTimeout(() => {
      e.target.classList.remove('pressed');
    }, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createKeyboard();

  const keyboard = document.getElementById('keyboard');

  keyboard.addEventListener('mousedown', handleMouseClick);
  keyboard.addEventListener('mouseup', (e) => {
    if (e.target.classList.contains('key')) {
      e.target.classList.remove('pressed');
    }
  });

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
});
