function average(list) {
    let sum = 0;
    for (const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}

function best(list) {
    const max = Math.max(...list.map(m => m.rating));
    return list.find(m => m.rating === max);
}

function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}

function yearsSince(dateStr) {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

function posterUrl(path, size) {
    return "https://image.tmdb.org/t/p/" + size + path;
}

console.log("평균:", average(movies));
console.log("최고:", best(movies).title);
console.log("8점 이상:", filterByRating(movies, 8).length + "편");

function renderCards(list) {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        if (m.rating >= 8) { card.classList.add("hot"); }
        card.innerHTML = `
        <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
        <span class="badge">${m.rating}</span>
        <div class="info">
        <h2>${m.title}</h2>
        <p class="year">${m.year}</p>
        </div>`;
        board.appendChild(card);
    }
    document.getElementById("count").textContent = list.length + "편";
}

function sortBy(list, key, desc) {
    const copy = [...list];
    copy.sort((a, b) => {
        if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
        return a[key] - b[key];
    });
    if (desc) copy.reverse();
    return copy;
}

function applySort() {
    const key = document.getElementById("sort").value;
    renderCards(sortBy(movies, key, key !== "title"));
}

applySort();