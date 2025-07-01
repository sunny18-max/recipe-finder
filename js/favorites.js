document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const favoritesStats = document.getElementById('favorites-stats');
    const filterBtn = document.getElementById('filter-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    const sortBtn = document.getElementById('sort-btn');
    const sortDropdown = document.getElementById('sort-dropdown');
    const exportBtn = document.getElementById('export-btn');
    const exportModal = document.getElementById('export-modal');
    const closeModal = document.querySelector('.close-modal');
    const exportPreview = document.getElementById('export-preview');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const burger = document.querySelector('.burger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');

    const sampleRecipes = [
        {
            id: 1,
            title: 'Butter Chicken',
            image: 'https://images.unsplash.com/photo-1631898030817-6d2d7bb55c1f',
            time: 45,
            servings: 4,
            cuisine: 'indian',
            difficulty: 'medium',
            dateAdded: new Date('2023-05-15'),
            ingredients: ['chicken', 'yogurt', 'tomatoes', 'spices'],
            tags: ['curry', 'comfort food'],
            rating: 4.8
        },
        {
            id: 2,
            title: 'Vegetable Biryani',
            image: 'https://images.unsplash.com/photo-1633163928171-8a3c8c829c4a',
            time: 60,
            servings: 6,
            cuisine: 'indian',
            difficulty: 'medium',
            dateAdded: new Date('2023-06-20'),
            ingredients: ['rice', 'vegetables', 'spices', 'yogurt'],
            tags: ['vegetarian', 'rice dish'],
            rating: 4.5
        },
        {
            id: 3,
            title: 'Spaghetti Carbonara',
            image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c',
            time: 25,
            servings: 2,
            cuisine: 'italian',
            difficulty: 'easy',
            dateAdded: new Date('2023-07-10'),
            ingredients: ['pasta', 'eggs', 'pancetta', 'parmesan'],
            tags: ['pasta', 'quick meal'],
            rating: 4.7
        },
        {
            id: 4,
            title: 'Margherita Pizza',
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
            time: 40,
            servings: 4,
            cuisine: 'italian',
            difficulty: 'medium',
            dateAdded: new Date('2023-04-05'),
            ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'basil'],
            tags: ['classic', 'vegetarian'],
            rating: 4.9
        },
        {
            id: 5,
            title: 'Chicken Tacos',
            image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
            time: 30,
            servings: 4,
            cuisine: 'mexican',
            difficulty: 'easy',
            dateAdded: new Date('2023-08-12'),
            ingredients: ['chicken', 'tortillas', 'avocado', 'salsa'],
            tags: ['quick meal', 'family favorite'],
            rating: 4.6
        },
        {
            id: 6,
            title: 'Beef Enchiladas',
            image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
            time: 55,
            servings: 6,
            cuisine: 'mexican',
            difficulty: 'medium',
            dateAdded: new Date('2023-03-18'),
            ingredients: ['beef', 'tortillas', 'cheese', 'enchilada sauce'],
            tags: ['comfort food', 'freezer friendly'],
            rating: 4.4
        },
        {
            id: 7,
            title: 'Kung Pao Chicken',
            image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
            time: 35,
            servings: 4,
            cuisine: 'chinese',
            difficulty: 'medium',
            dateAdded: new Date('2023-09-05'),
            ingredients: ['chicken', 'peanuts', 'vegetables', 'soy sauce'],
            tags: ['spicy', 'takeout favorite'],
            rating: 4.7
        },
        {
            id: 8,
            title: 'Vegetable Stir Fry',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
            time: 20,
            servings: 2,
            cuisine: 'chinese',
            difficulty: 'easy',
            dateAdded: new Date('2023-07-22'),
            ingredients: ['mixed vegetables', 'tofu', 'soy sauce', 'ginger'],
            tags: ['vegetarian', 'quick meal'],
            rating: 4.2
        },
        {
            id: 9,
            title: 'Chicken Teriyaki',
            image: 'https://images.unsplash.com/photo-1604977046805-6b8d6a2e3b3b',
            time: 30,
            servings: 4,
            cuisine: 'japanese',
            difficulty: 'easy',
            dateAdded: new Date('2023-08-30'),
            ingredients: ['chicken', 'teriyaki sauce', 'rice', 'vegetables'],
            tags: ['family favorite', 'meal prep'],
            rating: 4.6
        },
        {
            id: 10,
            title: 'Miso Soup',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
            time: 15,
            servings: 4,
            cuisine: 'japanese',
            difficulty: 'easy',
            dateAdded: new Date('2023-06-10'),
            ingredients: ['miso paste', 'tofu', 'seaweed', 'green onions'],
            tags: ['soup', 'light meal'],
            rating: 4.3
        },
        {
            id: 11,
            title: 'Greek Salad',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554',
            time: 15,
            servings: 2,
            cuisine: 'mediterranean',
            difficulty: 'easy',
            dateAdded: new Date('2023-05-28'),
            ingredients: ['cucumber', 'tomatoes', 'feta', 'olives'],
            tags: ['vegetarian', 'healthy'],
            rating: 4.5
        },
        {
            id: 12,
            title: 'Chicken Shawarma',
            image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143',
            time: 50,
            servings: 6,
            cuisine: 'mediterranean',
            difficulty: 'medium',
            dateAdded: new Date('2023-04-15'),
            ingredients: ['chicken', 'pita', 'garlic sauce', 'spices'],
            tags: ['sandwich', 'meal prep'],
            rating: 4.8
        }
    ];

    let favorites = JSON.parse(localStorage.getItem('favorites')) || sampleRecipes;
    let activeFilters = {
        cuisines: ['indian', 'italian', 'mexican', 'chinese', 'japanese', 'mediterranean'],
        time: ['quick', 'medium', 'long'],
        difficulty: ['easy', 'medium', 'hard']
    };
    let currentSort = 'date-desc';
    let selectedRecipes = new Set();

    const displayFavorites = () => {
        let filteredFavorites = [...favorites];
        
        filteredFavorites = filteredFavorites.filter(recipe => {
            return activeFilters.cuisines.includes(recipe.cuisine);
        });
        
        filteredFavorites = filteredFavorites.filter(recipe => {
            if (activeFilters.time.includes('quick') && recipe.time < 30) return true;
            if (activeFilters.time.includes('medium') && recipe.time >= 30 && recipe.time <= 60) return true;
            if (activeFilters.time.includes('long') && recipe.time > 60) return true;
            return false;
        });
        
        filteredFavorites = sortRecipes(filteredFavorites, currentSort);
        
        updateStats(filteredFavorites);
        
        if (filteredFavorites.length === 0) {
            favoritesContainer.innerHTML = `
                <div class="no-favorites scale-in">
                    <img src="images/heart-broken.png" alt="No favorites" class="broken-heart animate__animated animate__pulse">
                    <h3>No recipes match your filters</h3>
                    <p>Try adjusting your filters to see more recipes</p>
                    <button class="btn" id="reset-filters-view">Reset Filters</button>
                </div>
            `;
            
            document.getElementById('reset-filters-view').addEventListener('click', () => {
                resetFilters();
                displayFavorites();
            });
            
            favoritesStats.style.display = 'none';
            return;
        }
        
        favoritesContainer.innerHTML = filteredFavorites.map(recipe => `
            <div class="recipe-card ${selectedRecipes.has(recipe.id) ? 'selected' : ''}" data-id="${recipe.id}" data-cuisine="${recipe.cuisine}" data-time="${getTimeCategory(recipe.time)}">
                <div class="recipe-image" style="background-image: url('${recipe.image}')">
                    <span class="cuisine-badge">${formatCuisine(recipe.cuisine)}</span>
                    <button class="quick-action" data-id="${recipe.id}">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <div class="recipe-rating">
                        ${renderRatingStars(recipe.rating)}
                        <span>${recipe.rating}</span>
                    </div>
                    <div class="select-checkbox">
                        <input type="checkbox" id="select-${recipe.id}" ${selectedRecipes.has(recipe.id) ? 'checked' : ''}>
                        <label for="select-${recipe.id}"></label>
                    </div>
                </div>
                <div class="recipe-info">
                    <h3>${recipe.title}</h3>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.time} mins</span>
                        <span><i class="fas fa-user"></i> ${recipe.servings} ${recipe.servings === 1 ? 'serving' : 'servings'}</span>
                        <span><i class="fas fa-utensils"></i> ${formatDifficulty(recipe.difficulty)}</span>
                    </div>
                    <div class="recipe-tags">
                        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="recipe-actions">
                        <button class="btn-icon remove-favorite" data-id="${recipe.id}" title="Remove from favorites">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="btn-outline view-recipe" data-id="${recipe.id}">
                            <i class="fas fa-book-open"></i> View
                        </button>
                        <button class="btn-icon add-to-cart" data-id="${recipe.id}" title="Add ingredients to shopping list">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        addRecipeEventListeners();
        favoritesStats.style.display = 'grid';
    };

    const renderRatingStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    };

    const sortRecipes = (recipes, sortOption) => {
        switch(sortOption) {
            case 'name-asc': return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
            case 'name-desc': return [...recipes].sort((a, b) => b.title.localeCompare(a.title));
            case 'time-asc': return [...recipes].sort((a, b) => a.time - b.time);
            case 'time-desc': return [...recipes].sort((a, b) => b.time - a.time);
            case 'date-asc': return [...recipes].sort((a, b) => a.dateAdded - b.dateAdded);
            case 'date-desc': return [...recipes].sort((a, b) => b.dateAdded - a.dateAdded);
            case 'rating-asc': return [...recipes].sort((a, b) => a.rating - b.rating);
            case 'rating-desc': return [...recipes].sort((a, b) => b.rating - a.rating);
            default: return recipes;
        }
    };

    const updateStats = (filteredFavorites) => {
        if (filteredFavorites.length === 0) return;
        
        document.getElementById('total-favorites').textContent = filteredFavorites.length;
        
        const uniqueCuisines = new Set(filteredFavorites.map(recipe => recipe.cuisine));
        document.getElementById('total-cuisines').textContent = uniqueCuisines.size;
        
        const totalTime = filteredFavorites.reduce((sum, recipe) => sum + recipe.time, 0);
        const avgTime = Math.round(totalTime / filteredFavorites.length);
        document.getElementById('avg-time').textContent = avgTime;
    };

    const getTimeCategory = (time) => {
        if (time < 30) return 'quick';
        if (time <= 60) return 'medium';
        return 'long';
    };

    const formatCuisine = (cuisine) => {
        const cuisines = {
            'indian': 'Indian',
            'italian': 'Italian',
            'mexican': 'Mexican',
            'chinese': 'Chinese',
            'japanese': 'Japanese',
            'mediterranean': 'Mediterranean'
        };
        return cuisines[cuisine] || cuisine;
    };

    const formatDifficulty = (difficulty) => {
        const difficulties = {
            'easy': 'Easy',
            'medium': 'Medium',
            'hard': 'Hard'
        };
        return difficulties[difficulty] || difficulty;
    };

    const addRecipeEventListeners = () => {
        document.querySelectorAll('.remove-favorite').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(button.getAttribute('data-id'));
                removeFavorite(recipeId);
            });
        });
        
        document.querySelectorAll('.view-recipe').forEach(button => {
            button.addEventListener('click', (e) => {
                const recipeId = parseInt(button.getAttribute('data-id'));
                viewRecipe(recipeId);
            });
        });
        
        document.querySelectorAll('.quick-action').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(button.getAttribute('data-id'));
                showQuickActions(recipeId, button);
            });
        });
        
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeId = parseInt(button.getAttribute('data-id'));
                addToShoppingList(recipeId);
            });
        });
        
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.quick-action') && !e.target.closest('.remove-favorite') && !e.target.closest('.add-to-cart')) {
                    const recipeId = parseInt(card.getAttribute('data-id'));
                    viewRecipe(recipeId);
                }
            });
        });
        
        document.querySelectorAll('.select-checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const recipeId = parseInt(checkbox.id.replace('select-', ''));
                if (checkbox.checked) {
                    selectedRecipes.add(recipeId);
                    checkbox.closest('.recipe-card').classList.add('selected');
                } else {
                    selectedRecipes.delete(recipeId);
                    checkbox.closest('.recipe-card').classList.remove('selected');
                }
                updateBulkActions();
            });
        });
    };

    const updateBulkActions = () => {
        const bulkActions = document.getElementById('bulk-actions');
        if (!bulkActions) return;
        
        if (selectedRecipes.size > 0) {
            bulkActions.style.display = 'flex';
            bulkActions.querySelector('#selected-count').textContent = selectedRecipes.size;
        } else {
            bulkActions.style.display = 'none';
        }
    };

    const removeFavorite = (recipeId) => {
        favorites = favorites.filter(recipe => recipe.id !== recipeId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        selectedRecipes.delete(recipeId);
        displayFavorites();
        showNotification('Recipe removed from favorites', 'success');
    };

    const viewRecipe = (recipeId) => {
        const recipe = favorites.find(r => r.id === recipeId);
        if (recipe) {
            const modal = createRecipeModal(recipe);
            document.body.appendChild(modal);
            modal.style.display = 'block';
        }
    };

    const createRecipeModal = (recipe) => {
        const modal = document.createElement('div');
        modal.className = 'recipe-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-header" style="background-image: url('${recipe.image}')">
                    <div class="header-overlay">
                        <h2>${recipe.title}</h2>
                        <div class="recipe-meta">
                            <span><i class="fas fa-clock"></i> ${recipe.time} mins</span>
                            <span><i class="fas fa-user"></i> ${recipe.servings} servings</span>
                            <span><i class="fas fa-utensils"></i> ${formatDifficulty(recipe.difficulty)}</span>
                            <span>${renderRatingStars(recipe.rating)} ${recipe.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="ingredients-section">
                        <h3><i class="fas fa-shopping-basket"></i> Ingredients</h3>
                        <ul>
                            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                        <button class="btn add-all-to-cart" data-id="${recipe.id}">
                            <i class="fas fa-cart-plus"></i> Add All to Shopping List
                        </button>
                    </div>
                    <div class="tags-section">
                        <h3><i class="fas fa-tags"></i> Tags</h3>
                        <div class="tags-container">
                            ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-outline close-modal-btn">
                        <i class="fas fa-times"></i> Close
                    </button>
                    <button class="btn add-to-meal-plan" data-id="${recipe.id}">
                        <i class="fas fa-calendar-plus"></i> Add to Meal Plan
                    </button>
                </div>
            </div>
        `;
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.add-all-to-cart').addEventListener('click', () => {
            addToShoppingList(recipe.id);
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.querySelector('.add-to-meal-plan').addEventListener('click', () => {
            addToMealPlan(recipe.id);
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        return modal;
    };

    const showQuickActions = (recipeId, button) => {
        let menu = document.querySelector('.quick-actions-menu');
        
        if (!menu) {
            menu = document.createElement('div');
            menu.className = 'quick-actions-menu';
            document.body.appendChild(menu);
        }
        
        const recipe = favorites.find(r => r.id === recipeId);
        
        menu.innerHTML = `
            <div class="quick-actions-header">
                <h4>${recipe.title}</h4>
                <button class="close-actions"><i class="fas fa-times"></i></button>
            </div>
            <div class="quick-actions-list">
                <button class="quick-action-item" data-action="view">
                    <i class="fas fa-book-open"></i> View Recipe
                </button>
                <button class="quick-action-item" data-action="add-to-plan">
                    <i class="fas fa-calendar-plus"></i> Add to Meal Plan
                </button>
                <button class="quick-action-item" data-action="add-to-cart">
                    <i class="fas fa-shopping-cart"></i> Add to Shopping List
                </button>
                <button class="quick-action-item" data-action="share">
                    <i class="fas fa-share-alt"></i> Share
                </button>
                <button class="quick-action-item" data-action="remove">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        
        const rect = button.getBoundingClientRect();
        menu.style.top = `${rect.bottom + window.scrollY}px`;
        menu.style.left = `${rect.left + window.scrollX - 150}px`;
        menu.style.display = 'block';
        
        menu.querySelector('.close-actions').addEventListener('click', () => {
            menu.style.display = 'none';
        });
        
        menu.querySelectorAll('.quick-action-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                handleQuickAction(action, recipeId);
                menu.style.display = 'none';
            });
        });
        
        const closeMenu = (e) => {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.style.display = 'none';
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 100);
    };

    const handleQuickAction = (action, recipeId) => {
        switch(action) {
            case 'view': viewRecipe(recipeId); break;
            case 'add-to-plan': addToMealPlan(recipeId); break;
            case 'add-to-cart': addToShoppingList(recipeId); break;
            case 'share': shareRecipe(recipeId); break;
            case 'remove': removeFavorite(recipeId); break;
        }
    };

    const addToMealPlan = (recipeId) => {
        const recipe = favorites.find(r => r.id === recipeId);
        if (recipe) {
            let mealPlan = JSON.parse(localStorage.getItem('mealPlan')) || [];
            mealPlan.push({
                recipeId: recipe.id,
                title: recipe.title,
                dateAdded: new Date()
            });
            localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
            showNotification('Recipe added to meal plan', 'success');
        }
    };

    const addToShoppingList = (recipeId) => {
        const recipe = favorites.find(r => r.id === recipeId);
        if (recipe) {
            let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
            recipe.ingredients.forEach(ingredient => {
                if (!shoppingList.includes(ingredient)) {
                    shoppingList.push(ingredient);
                }
            });
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            showNotification('Ingredients added to shopping list', 'success');
        }
    };

    const shareRecipe = (recipeId) => {
        const recipe = favorites.find(r => r.id === recipeId);
        if (navigator.share) {
            navigator.share({
                title: recipe.title,
                text: `Check out this ${recipe.title} recipe on SpiceTrail!`,
                url: window.location.href
            }).catch(err => {
                console.error('Error sharing:', err);
            });
        } else {
            const shareUrl = `${window.location.origin}/recipe/${recipeId}`;
            prompt('Copy this link to share:', shareUrl);
        }
    };

    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type} animate__animated animate__fadeInUp`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('animate__fadeInUp');
            notification.classList.add('animate__fadeOutDown');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    };

    const resetFilters = () => {
        activeFilters = {
            cuisines: ['indian', 'italian', 'mexican', 'chinese', 'japanese', 'mediterranean'],
            time: ['quick', 'medium', 'long']
        };
        
        document.querySelectorAll('input[name="cuisine"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        document.querySelectorAll('input[name="time"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    };

    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sortDropdown.style.display = 'none';
        filterDropdown.style.display = filterDropdown.style.display === 'block' ? 'none' : 'block';
    });

    sortBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.style.display = 'none';
        sortDropdown.style.display = sortDropdown.style.display === 'block' ? 'none' : 'block';
    });

    applyFiltersBtn.addEventListener('click', () => {
        activeFilters.cuisines = [];
        document.querySelectorAll('input[name="cuisine"]:checked').forEach(checkbox => {
            activeFilters.cuisines.push(checkbox.value);
        });
        
        activeFilters.time = [];
        document.querySelectorAll('input[name="time"]:checked').forEach(checkbox => {
            activeFilters.time.push(checkbox.value);
        });
        
        filterDropdown.style.display = 'none';
        displayFavorites();
    });

    resetFiltersBtn.addEventListener('click', () => {
        resetFilters();
        displayFavorites();
    });

    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', () => {
            currentSort = option.getAttribute('data-sort');
            sortDropdown.style.display = 'none';
            displayFavorites();
        });
    });

    exportBtn.addEventListener('click', () => {
        exportModal.style.display = 'block';
        generateExportPreview();
    });

    closeModal.addEventListener('click', () => {
        exportModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === exportModal) {
            exportModal.style.display = 'none';
        }
        
        if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.style.display = 'none';
        }
        
        if (!sortBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
            sortDropdown.style.display = 'none';
        }
    });

    const generateExportPreview = () => {
        exportPreview.innerHTML = `
            <h4>Your Favorites Collection</h4>
            <p>${favorites.length} recipes</p>
            <div class="export-recipes-list">
                ${favorites.slice(0, 5).map(recipe => `
                    <div class="export-recipe-item">
                        <img src="${recipe.image}" alt="${recipe.title}">
                        <div>
                            <h5>${recipe.title}</h5>
                            <p>${formatCuisine(recipe.cuisine)} • ${recipe.time} min • ${recipe.rating} ★</p>
                        </div>
                    </div>
                `).join('')}
                ${favorites.length > 5 ? `<p>+ ${favorites.length - 5} more recipes...</p>` : ''}
            </div>
            <div class="export-format-options">
                <h5>Select Export Format:</h5>
                <div class="format-options">
                    <label><input type="radio" name="export-format" value="pdf" checked> PDF</label>
                    <label><input type="radio" name="export-format" value="json"> JSON</label>
                    <label><input type="radio" name="export-format" value="csv"> CSV</label>
                    <label><input type="radio" name="export-format" value="print"> Print</label>
                </div>
            </div>
            <button class="btn" id="confirm-export">
                <i class="fas fa-file-export"></i> Export Now
            </button>
        `;
        
        document.getElementById('confirm-export').addEventListener('click', () => {
            const format = document.querySelector('input[name="export-format"]:checked').value;
            exportFavorites(format);
            exportModal.style.display = 'none';
        });
    };

    const exportFavorites = (format) => {
        switch(format) {
            case 'pdf': exportToPDF(); break;
            case 'json': exportToJSON(); break;
            case 'csv': exportToCSV(); break;
            case 'print': window.print(); break;
        }
    };

    const exportToPDF = () => {
        showNotification('Preparing PDF export...', 'info');
        setTimeout(() => {
            showNotification('PDF export would be generated here in production', 'info');
        }, 1500);
    };

    const exportToJSON = () => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(favorites, null, 2))}`;
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'spicetrail-favorites.json');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        showNotification('Favorites exported as JSON', 'success');
    };

    const exportToCSV = () => {
        const headers = ['Title', 'Cuisine', 'Time (min)', 'Servings', 'Difficulty', 'Rating', 'Ingredients'];
        const rows = favorites.map(recipe => [
            `"${recipe.title}"`,
            `"${formatCuisine(recipe.cuisine)}"`,
            recipe.time,
            recipe.servings,
            `"${formatDifficulty(recipe.difficulty)}"`,
            recipe.rating,
            `"${recipe.ingredients.join(', ')}"`
        ]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
        
        const dataStr = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'spicetrail-favorites.csv');
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        showNotification('Favorites exported as CSV', 'success');
    };

    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', () => {
        burger.classList.remove('toggle');
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    const createBulkActions = () => {
        const bulkActions = document.createElement('div');
        bulkActions.id = 'bulk-actions';
        bulkActions.innerHTML = `
            <div class="bulk-info">
                <span id="selected-count">0</span> recipes selected
            </div>
            <div class="bulk-buttons">
                <button class="btn-outline" id="clear-selection">
                    <i class="fas fa-times"></i> Clear
                </button>
                <button class="btn" id="add-selected-to-cart">
                    <i class="fas fa-cart-plus"></i> Add to Shopping List
                </button>
                <button class="btn-outline danger" id="remove-selected">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        
        bulkActions.querySelector('#clear-selection').addEventListener('click', () => {
            selectedRecipes.clear();
            document.querySelectorAll('.recipe-card').forEach(card => {
                card.classList.remove('selected');
                const checkbox = card.querySelector('.select-checkbox input');
                if (checkbox) checkbox.checked = false;
            });
            bulkActions.style.display = 'none';
        });
        
        bulkActions.querySelector('#add-selected-to-cart').addEventListener('click', () => {
            let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
            favorites.forEach(recipe => {
                if (selectedRecipes.has(recipe.id)) {
                    recipe.ingredients.forEach(ingredient => {
                        if (!shoppingList.includes(ingredient)) {
                            shoppingList.push(ingredient);
                        }
                    });
                }
            });
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            selectedRecipes.clear();
            bulkActions.style.display = 'none';
            showNotification('Selected recipes added to shopping list', 'success');
            displayFavorites();
        });
        
        bulkActions.querySelector('#remove-selected').addEventListener('click', () => {
            favorites = favorites.filter(recipe => !selectedRecipes.has(recipe.id));
            localStorage.setItem('favorites', JSON.stringify(favorites));
            selectedRecipes.clear();
            bulkActions.style.display = 'none';
            showNotification('Selected recipes removed', 'success');
            displayFavorites();
        });
        
        return bulkActions;
    };

    const initBulkActions = () => {
        const existingBulkActions = document.getElementById('bulk-actions');
        if (existingBulkActions) existingBulkActions.remove();
        
        const bulkActions = createBulkActions();
        document.querySelector('.favorites-section .container').prepend(bulkActions);
        bulkActions.style.display = 'none';
    };

    document.getElementById('current-year').textContent = new Date().getFullYear();
    initBulkActions();
    displayFavorites();
});