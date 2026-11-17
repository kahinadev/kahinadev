// ===============================================
// PORTFOLIO
// ===============================================

const language = document.documentElement.lang === "en" ? "en" : "fr";
const nameParameter = { fr: "categorie", en: "category" };

const wordsUrl = {
    fr: {
        "identite-de-marque": "branding", 
        "site-internet": "website", 
        "webdesign": "webdesign", 
        "video": "video", 
        "refonte": "redesign", 
        "personnel": "personal", 
        "flyer": "flyer", 
        "nourriture": "food", 
        "fictif": "fictional", 
        "portfolio": "portfolio", 
        "en-cours": "in-progress", 
        "tous": "tous"
    },
    en: {
        "branding": "branding", 
        "website": "website", 
        "webdesign": "webdesign", 
        "video": "video", 
        "redesign": "redesign", 
        "personal": "personal", 
        "flyer": "flyer", 
        "food": "food", 
        "fictional": "fictional", 
        "portfolio": "portfolio",
        "in-progress": "in-progress", 
        "all": "all"
    }
}; 

const projects = document.querySelectorAll(".projects-list__item"); 

function filter(category) {
    projects.forEach(function (project) {
        const tags = project.querySelectorAll(".ka-tag"); 
        let matches = false; 

        tags.forEach(function (tag) {
            if (tag.dataset.category === category) {
                matches = true;
            }
        }); 

        if (!category || matches) {
            project.classList.remove("d-none");
        } else {
            project.classList.add("d-none");
        }
    });
} 

function getUrlWord(category) {
    return Object.keys(wordsUrl[language]).find(function (word) {
        return wordsUrl[language][word] === category;
    });
}

function filterFromUrl() {
    const params = new URLSearchParams(window.location.search); 
    const wordInUrl = params.get(nameParameter[language]); 
    filter(wordsUrl[language][wordInUrl]);
}

const isPortfolioPage = document.body.dataset.page === "portfolio"; 
if (isPortfolioPage) {
    filterFromUrl(); 
    window.addEventListener("popstate", filterFromUrl);
}

document.querySelectorAll(".projects-list__item .ka-tag").forEach(function (tag) {
    tag.addEventListener("click", function (event) {
        event.preventDefault(); 
        event.stopPropagation(); 

        const category = tag.dataset.category; 
        const word = getUrlWord(category); 
        const query = "?" + nameParameter[language] + "=" + word; 

        if (isPortfolioPage) {
            filter(category); 
            history.pushState(null, "", query);
        } else {
            window.location.href = "portfolio.html" + query;
        }
    });
});