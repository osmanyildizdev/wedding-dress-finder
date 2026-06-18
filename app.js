const dresses = [
  { name: "Aurora Bloom", image: "images/dress-aurora.png", silhouette: "ball", vibe: "romantic", venue: "palace", tags: ["Cathedral train", "Floral lace", "Corset waist"] },
  { name: "Celeste Pearl", image: "images/dress-celeste.png", silhouette: "mermaid", vibe: "glam", venue: "hotel", tags: ["Pearl shimmer", "Sculpted fit", "Evening glow"] },
  { name: "Luna Silk", image: "images/dress-luna.png", silhouette: "slip", vibe: "minimal", venue: "garden", tags: ["Liquid satin", "Soft neckline", "Quiet luxury"] },
  { name: "Rosa Tea", image: "images/dress-rosa.png", silhouette: "tea", vibe: "playful", venue: "garden", tags: ["Tea length", "Dancing skirt", "Vintage rose"] },
  { name: "Sera Garden", image: "images/dress-sera.png", silhouette: "ball", vibe: "romantic", venue: "garden", tags: ["Botanical lace", "Airy skirt", "Soft volume"] },
  { name: "Mira Sunset", image: "images/dress-mira.png", silhouette: "mermaid", vibe: "boho", venue: "beach", tags: ["Warm ivory", "Textured lace", "Golden hour"] }
];

const toggle = document.querySelector("[data-menu]");
if (toggle) {
  toggle.addEventListener("click", () => document.body.classList.toggle("menu-open"));
}

function renderMatches(list) {
  const target = document.querySelector("[data-results]");
  if (!target) return;
  target.innerHTML = list.map((dress, index) => `
    <article class="match-card">
      <img src="${dress.image}" alt="${dress.name} wedding dress">
      <div>
        <span class="match-score">${Math.max(96 - index * 7, 78)}% match</span>
        <h3>${dress.name}</h3>
        <p>${dress.tags.join(" · ")}</p>
        <div class="tags">${dress.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

const finder = document.querySelector("[data-finder]");
if (finder) {
  const inputs = finder.querySelectorAll("input, select");
  function update() {
    const data = Object.fromEntries([...inputs].map((input) => [input.name, input.value]));
    const ranked = dresses.map((dress) => {
      let score = 0;
      if (dress.silhouette === data.silhouette) score += 4;
      if (dress.vibe === data.vibe) score += 4;
      if (dress.venue === data.venue) score += 3;
      const height = Number(data.height || 170);
      if (height < 162 && ["tea", "slip"].includes(dress.silhouette)) score += 2;
      if (height > 172 && ["ball", "mermaid"].includes(dress.silhouette)) score += 2;
      return { ...dress, score };
    }).sort((a, b) => b.score - a.score);
    renderMatches(ranked.slice(0, 3));
  }
  inputs.forEach((input) => input.addEventListener("input", update));
  update();
}

document.querySelectorAll("[data-booking-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector("[data-note]");
    note.textContent = "Your bridal fitting request is ready. In a real site this would be sent to the atelier calendar.";
  });
});
