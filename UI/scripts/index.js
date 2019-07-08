const hidden = document.querySelector('.hidden');
const reader = document.querySelector('.read');


const read = () => {
    if (hidden.style.display === 'hidden') {
        hidden.style.display = 'block';
        reader.textContent = 'Read Less';
    } else {
        hidden.style.display = 'none';
        reader.textContent = 'Read More';
    }
}
