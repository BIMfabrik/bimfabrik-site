const projects = [
  { name: "Genossenschaftsradar", link: "/projects/genossenschaftsradar/" },
  { name: "Famili", link: "/projects/famili/" },
  { name: "Xtraktor", link: "/projects/xtraktor/" },
  { name: "BIM Copilot", link: "/projects/bim-copilot/" },
];

const container = document.getElementById("project-list");
projects.forEach(p => {
  const a = document.createElement("a");
  a.href = p.link;
  a.textContent = p.name;
  container.appendChild(a);
  container.appendChild(document.createElement("br"));
});
