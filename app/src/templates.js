export const jobTemplate = (job) => `
<div class="card">
  <div class="card-body">
    <h4 class="card-title">${job.title} </h4>
    <h5>${job.location.display_name}</h5>
    <p class="card-text">${job.description}</p>
    <a href="${job.redirect_url}" target="_blank" class="btn btn-primary">View Job</a>
  </div>
</div>
`;
