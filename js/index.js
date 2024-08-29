function convertProjectToHtmlCard(project) {
  const htmlCard = `
    <div class="col-xs-12 col-sm-6">
        <article data-category="${project.category}">
            <img
            src="${project.screenshot}"
            alt="Screenshot of ${project.website}"
            />
            <strong>${project.name}</strong>
            <a data-umami-event="${project.name}" href="${removeTrailingSlash(
    project.website
  )}">${removeTrailingSlash(project.website)}</a>
            <p>${project.headline}</p>
        </article>
    </div>
    `;

  $(htmlCard).appendTo($("#techup-projects"));
}

function removeTrailingSlash(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function sortByNameAscending(dataArray) {
  return dataArray.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}

$(async function () {
  const projects = await $.getJSON("../data/projects.json");
  const sortedProjects = sortByNameAscending(projects);

  await projects.map(convertProjectToHtmlCard);
});

$(function () {
  $("#techup-categories").change(function () {
    var selectedCategory = $(this).val();

    $("#techup-projects article").each(function () {
      var articleCategory = $(this).data("category");
      var parentDiv = $(this).closest("div");

      if (selectedCategory === "all" || articleCategory === selectedCategory) {
        parentDiv.show();
      } else {
        parentDiv.hide();
      }
    });
  });
});
