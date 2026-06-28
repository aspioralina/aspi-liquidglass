import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('card-wrapper');
  const card = document.getElementById('glass-showcase');
  const glare = document.getElementById('glass-glare');

  if (wrapper && card && glare) {
    // Bind hover event listener to the stable wrapper (prevents tilt jitter feedback)
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse x position inside the stable wrapper
      const y = e.clientY - rect.top;  // Mouse y position inside the stable wrapper
      
      // Calculate normalized relative position (from -0.5 to 0.5)
      const px = (x / rect.width) - 0.5;
      const py = (y / rect.height) - 0.5;

      // 1. Calculate 3D Rotation based on stable wrapper coordinates
      const rotateX = -(py * 16).toFixed(2);
      const rotateY = (px * 16).toFixed(2);

      // 2. Calculate Specular Glare translation
      // Since glare is oversized, shifting it relative to center is safe and has no edge artifacts
      const translateX = (px * 30).toFixed(2);
      const translateY = (py * 30).toFixed(2);

      // Apply transformations to the child card
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.025)`;
      glare.style.transform = `translate3d(${translateX}%, ${translateY}%, 0) scale(1.15)`;
    });

    // Reset transformations smoothly on mouse leave
    wrapper.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
      glare.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
  }
});
