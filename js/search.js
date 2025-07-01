document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const recipeResults = document.getElementById('recipe-results');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    let currentPage = 1;
    let totalPages = 1;
    let currentQuery = '';
    
    // Mock API function (in a real app, you would use Spoonacular API)
    const searchRecipes = async (query, page = 1, cuisine = '', diet = '', time = '') => {
        // Show loading spinner
        recipeResults.innerHTML = '<div class="spinner"></div>';
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRecipes = [
            {
                id: 1,
                title: 'Avocado Toast',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
                time: 10,
                servings: 2,
                missedIngredients: 1,
                usedIngredients: 3
            },
            // More mock recipes...
        ];
        
        // Filter based on cuisine, diet, time if provided
        let filteredRecipes = mockRecipes.filter(recipe => {
            let match = true;
            if (cuisine && recipe.cuisine !== cuisine) match = false;
            if (diet && recipe.diet !== diet) match = false;
            if (time && recipe.time > parseInt(time)) match = false;
            return match;
        });
        
        // Pagination logic
        totalPages = Math.ceil(filteredRecipes.length / 6);
        const startIdx = (page - 1) * 6;
        const paginatedRecipes = filteredRecipes.slice(startIdx, startIdx + 6);
        
        return {
            recipes: paginatedRecipes,
            totalResults: filteredRecipes.length,
            totalPages
        };
    };
    
    // Display recipes
    const displayRecipes = (recipes) => {
        if (recipes.length === 0) {
            recipeResults.innerHTML = `
                <div class="no-results">
                    <img src="images/empty-plate.png" alt="No results" class="empty-plate">
                    <p>No recipes found. Try a different search!</p>
                </div>
            `;
            return;
        }
        
        recipeResults.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="recipe-info">
                    <h3>${recipe.title}</h3>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.time} mins</span>
                        <span><i class="fas fa-user"></i> ${recipe.servings} servings</span>
                    </div>
                    <div class="recipe-meta">
                        <span><i class="fas fa-check-circle"></i> ${recipe.usedIngredients} ingredients</span>
                        <span><i class="fas fa-shopping-basket"></i> ${recipe.missedIngredients} to buy</span>
                    </div>
                    <button class="btn btn-small save-recipe" data-id="${recipe.id}">
                        <i class="far fa-heart"></i> Save
                    </button>
                    <a href="#" class="btn btn-small">View Recipe</a>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to save buttons
        document.querySelectorAll('.save-recipe').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const recipeId = btn.getAttribute('data-id');
                saveRecipe(recipeId, btn);
            });
        });
    };
    
    // Save recipe to favorites
    const saveRecipe = (recipeId, btn) => {
        // In a real app, you would save to localStorage or a backend
        btn.innerHTML = '<i class="fas fa-heart"></i> Saved';
        btn.classList.add('saved');
        
        // Show confirmation animation
        const heart = btn.querySelector('i');
        heart.classList.add('heartbeat');
        
        setTimeout(() => {
            heart.classList.remove('heartbeat');
        }, 1000);
    };
    
    // Perform search
    const performSearch = async () => {
        const query = searchInput.value.trim();
        const cuisine = document.getElementById('cuisine').value;
        const diet = document.getElementById('diet').value;
        const time = document.getElementById('time').value;
        
        if (!query) {
            recipeResults.innerHTML = `
                <div class="no-results">
                    <img src="images/empty-plate.png" alt="No search" class="empty-plate">
                    <p>Please enter some ingredients to search for recipes!</p>
                </div>
            `;
            return;
        }
        
        currentQuery = query;
        currentPage = 1;
        
        const { recipes, totalPages: pages } = await searchRecipes(query, currentPage, cuisine, diet, time);
        totalPages = pages;
        
        displayRecipes(recipes);
        updatePagination();
    };
    
    // Update pagination controls
    const updatePagination = () => {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    };
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    prevPageBtn.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            const { recipes } = await searchRecipes(currentQuery, currentPage);
            displayRecipes(recipes);
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    nextPageBtn.addEventListener('click', async () => {
        if (currentPage < totalPages) {
            currentPage++;
            const { recipes } = await searchRecipes(currentQuery, currentPage);
            displayRecipes(recipes);
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Sort recipes
    document.getElementById('sort-by').addEventListener('change', async (e) => {
        const sortBy = e.target.value;
        // In a real app, you would re-fetch or sort the recipes
        console.log(`Sorting by ${sortBy}`);
    });
    
    // Initial empty state
    recipeResults.innerHTML = `
        <div class="no-results">
            <img src="images/search-icon.png" alt="Search for recipes" class="empty-plate">
            <p>Enter ingredients to find delicious recipes!</p>
        </div>
    `;
});