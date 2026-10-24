# prompts book
a file to save prompts

## create a three.js element
Create a production-ready Three.js animated 3D visual component for the background of my single-page portfolio.

The component should depict a cohesive abstract structure—such as a stylized DNA helix, neural network, or similarly intricate procedural form—not a generic collection of particles or an entire decorative scene.

Behavior:
- Keep the component fixed behind the website content while the page scrolls over it.
- Use the page’s normalized scroll progress to choreograph the component’s movement.
- Smoothly pan, zoom, rotate, and flip the component as the user moves between portfolio sections.
- Make every transformation continuous, reversible, and deterministic when scrolling in either direction.
- Treat the component as one persistent visual subject whose position, scale, orientation, shape, and visual emphasis evolve throughout the page.
- Do not generate unrelated scenes for different sections or allow the object to drift independently after scrolling stops.

Visual direction:
- Create a refined, modern, high-tech abstract form with clear depth and structure.
- It should be visually distinctive but remain subordinate to the portfolio content.
- Avoid generic particle backgrounds, excessive glow, visual clutter, and effects that reduce text readability.
- Use lighting, depth, color, and controlled motion to make the component feel dimensional and alive.
- Preserve a coherent visual identity from the beginning to the end of the page.

Implementation:
- Build it as a reusable, self-contained component compatible with the existing project.
- First inspect and reuse the project’s framework, dependencies, styling conventions, color palette, and actual page sections.
- Derive animation stages dynamically from the positions of the existing DOM sections.
- Interpolate between section-based keyframes for position, scale, rotation, flip, camera framing, color, and structural deformation.
- Use requestAnimationFrame efficiently without causing framework re-renders on every frame.
- Handle resizing, device-pixel ratio, changing page height, initialization, and full cleanup.
- Ensure the canvas does not intercept pointer events or interfere with scrolling and navigation.
- Optimize for lightweight laptops and mobile devices.
- Respect prefers-reduced-motion and provide a graceful fallback when WebGL is unavailable.
- Do not introduce heavy dependencies unless strictly necessary.

Deliverables:
1. Complete, directly usable component code with no placeholders.
2. All required styles and supporting code.
3. Exact installation and integration steps.
4. A centralized configuration for visual design and section-specific animation keyframes.
5. A concise explanation of how scrolling controls pan, zoom, rotation, flip, and deformation.
6. Performance, responsiveness, accessibility, fallback, and cleanup safeguards.

Before implementation, briefly state:
- The detected framework and Three.js setup
- The portfolio sections that will drive the animation
- The chosen abstract form and why it complements the existing design

Then implement the complete result. Do not redesign the rest of the portfolio.

## Sync github
commit and sync in batches
