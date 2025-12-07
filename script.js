// Load projects from JSON file
async function loadProjectsData() {
  try {
    const response = await fetch('projects.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading projects:', error);
    return { projects: [] };
  }
}

function loadProjects(projectsData) {
  const container = document.getElementById('projects-container');
  
  projectsData.projects.forEach(project => {
    const card = document.createElement('a');
    card.className = 'project-card';
    
    // Determine the primary link (demo if exists, otherwise github)
    const primaryLink = project.links.demo || project.links.github;
    card.href = primaryLink;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    
    const techTags = project.tech.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    const links = [];
    if (project.links.github) {
      links.push(`<span class="project-link-item" data-link="${project.links.github}">github</span>`);
    }
    
    card.innerHTML = `
      <div class="project-name">${project.name}</div>
      <div class="project-description">${project.description}</div>
      <div class="project-tech">${techTags}</div>
      <div class="project-links">${links.join('')}</div>
    `;
    
    // Add click handlers to link items
    card.querySelectorAll('.project-link-item').forEach(linkItem => {
      linkItem.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(linkItem.dataset.link, '_blank');
      });
    });
    
    container.appendChild(card);
  });
}

// Initialize on page load
loadProjectsData().then(data => {
  loadProjects(data);
});