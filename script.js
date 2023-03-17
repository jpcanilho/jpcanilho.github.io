const background = document.querySelector('.background');
const circle = document.createElement('span');

circle.classList.add('circle');
background.appendChild(circle);

background.addEventListener('mousemove', (e) => {
    circle.style.top = e.pageY + 'px';
    circle.style.left = e.pageX + 'px';
});
