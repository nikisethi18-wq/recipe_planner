/* ==========================================================================
   RECIPE DISCOVERY - JAVASCRIPT LOGIC
   Minimalistic White & Sage Green Pinterest Aesthetic
   Concepts used: Arrays, Objects, DOM Manipulation, LocalStorage, Functions
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. RECIPE DATASET (Array of Objects with Pinterest Food Aesthetic Images)
// --------------------------------------------------------------------------
const recipes = [
    {
        id: 1,
        name: "Creamy Garlic Fettuccine Pasta",
        cuisine: "Italian",
        category: "Main Course",
        time: "25 mins",
        difficulty: "Easy",
image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",        ingredients: [
            "200g Fettuccine pasta",
            "3 cloves garlic, minced",
            "1 cup heavy cream",
            "1/2 cup grated Parmesan cheese",
            "2 tbsp unsalted butter",
            "Salt & fresh cracked black pepper",
            "Fresh parsley for garnish"
        ],
        instructions: [
            "Boil pasta in salted water according to package instructions until al dente.",
            "In a large skillet, melt butter over medium heat and sauté minced garlic for 1 minute.",
            "Pour in heavy cream and bring to a gentle simmer for 3-4 minutes.",
            "Stir in grated Parmesan cheese until melted and sauce becomes silky smooth.",
            "Toss cooked pasta into sauce, season with salt and pepper, garnish with chopped parsley, and serve warm."
        ]
    },
    {
        id: 2,
        name: "Neapolitan Margherita Pizza",
        cuisine: "Italian",
        category: "Main Course",
        time: "30 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "1 ready-made pizza base dough",
            "1/2 cup San Marzano tomato sauce",
            "150g fresh Mozzarella cheese, sliced",
            "Fresh basil leaves",
            "1 tbsp extra virgin olive oil",
            "Pinch of dried oregano"
        ],
        instructions: [
            "Preheat oven to 220°C (425°F).",
            "Spread tomato sauce evenly over pizza base leaving a small rim around edges.",
            "Arrange fresh Mozzarella slices evenly over sauce.",
            "Bake for 12-15 minutes until crust turns golden brown and cheese melts completely.",
            "Top with fresh basil leaves, drizzle with extra virgin olive oil, slice, and serve."
        ]
    },
    {
        id: 3,
        name: "Classic Chicken Tikka Masala",
        cuisine: "Indian",
        category: "Main Course",
        time: "40 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "400g boneless chicken, diced",
            "1/2 cup Greek yogurt",
            "1 tbsp ginger-garlic paste",
            "1 onion, finely chopped",
            "1 cup tomato puree",
            "1/2 cup heavy cream",
            "Spices: Garam masala, cumin powder, turmeric, red chili powder",
            "2 tbsp butter or ghee"
        ],
        instructions: [
            "Marinate chicken cubes with yogurt, ginger-garlic paste, and spices for 20 minutes.",
            "Sear marinated chicken pieces in a hot skillet with oil until browned; set aside.",
            "In same pan, sauté chopped onions until golden, then add tomato puree and remaining spices.",
            "Simmer sauce until oil separates, stir in heavy cream, then add cooked chicken.",
            "Simmer for 10 minutes until chicken is tender. Serve hot with naan or basmati rice."
        ]
    },
    {
        id: 4,
        name: "Vegetable Stir-Fry Noodles",
        cuisine: "Asian",
        category: "Main Course",
        time: "20 mins",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "200g Egg noodles or ramen noodles",
            "1 cup mixed sliced vegetables (bell peppers, carrots, broccoli, cabbage)",
            "2 tbsp dark soy sauce",
            "1 tbsp sesame oil",
            "1 tsp chili garlic sauce",
            "2 cloves garlic, minced",
            "Sesame seeds for topping"
        ],
        instructions: [
            "Cook noodles according to package instructions, drain and set aside.",
            "Heat sesame oil in a wok or large frying pan over high heat.",
            "Add minced garlic and sliced vegetables; stir-fry for 3-4 minutes until crisp-tender.",
            "Add cooked noodles, soy sauce, and chili sauce.",
            "Toss everything together on high heat for 2 minutes. Garnish with sesame seeds before serving."
        ]
    },
    {
        id: 5,
        name: "Avocado & Poached Egg Toast",
        cuisine: "American",
        category: "Breakfast",
        time: "15 mins",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "2 slices whole grain sourdough bread",
            "1 ripe avocado",
            "2 eggs",
            "1 tsp lemon juice",
            "Sea salt & red pepper flakes",
            "1 tbsp olive oil"
        ],
        instructions: [
            "Toast bread slices until golden brown and crispy.",
            "Mash ripe avocado in a bowl with lemon juice, salt, and black pepper.",
            "Poach or fry eggs according to preference.",
            "Spread mashed avocado generously over toasted bread.",
            "Top each toast with an egg and sprinkle red pepper flakes."
        ]
    },
    {
        id: 6,
        name: "Creamy Tomato Basil Soup",
        cuisine: "French",
        category: "Starter",
        time: "25 mins",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "500g ripe tomatoes, chopped",
            "1 small onion, chopped",
            "2 cloves garlic, minced",
            "1 cup vegetable broth",
            "1/4 cup heavy cream",
            "Handful of fresh basil leaves",
            "2 tbsp olive oil",
            "Salt & black pepper"
        ],
        instructions: [
            "Heat olive oil in soup pot and sauté onions and garlic until translucent.",
            "Add chopped tomatoes and vegetable broth; bring to boil then simmer for 15 minutes.",
            "Blend soup using an immersion blender until velvety smooth.",
            "Stir in heavy cream and fresh basil leaves; simmer for 2 additional minutes.",
            "Season with salt and pepper. Serve hot with garlic bread."
        ]
    },
    {
        id: 7,
        name: "Mediterranean Greek Salad",
        cuisine: "Mediterranean",
        category: "Salad",
        time: "15 mins",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "2 large cucumbers, diced",
            "3 ripe tomatoes, cut into wedges",
            "1/2 red onion, sliced thinly",
            "100g Feta cheese, cubed",
            "1/2 cup Kalamata olives",
            "Dressing: 3 tbsp extra virgin olive oil, 1 tbsp lemon juice, 1 tsp dried oregano, salt & pepper"
        ],
        instructions: [
            "In a large salad bowl, combine cucumbers, tomatoes, red onion, and olives.",
            "Whisk olive oil, lemon juice, dried oregano, salt, and pepper together in a small bowl.",
            "Pour dressing over fresh salad ingredients and toss gently.",
            "Top salad with feta cheese cubes and serve immediately."
        ]
    },
    {
        id: 8,
        name: "Molten Chocolate Lava Cake",
        cuisine: "French",
        category: "Dessert",
        time: "35 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "100g dark chocolate, chopped",
            "100g unsalted butter",
            "2 eggs + 2 egg yolks",
            "1/2 cup powdered sugar",
            "3 tbsp all-purpose flour",
            "1 tsp vanilla extract"
        ],
        instructions: [
            "Preheat oven to 200°C (400°F). Grease ramekins with butter and dust with cocoa powder.",
            "Melt dark chocolate and butter together in glass bowl over double boiler.",
            "Whisk eggs, egg yolks, powdered sugar, and vanilla extract until light and fluffy.",
            "Fold melted chocolate mixture into eggs, then gently fold in flour.",
            "Divide batter into prepared ramekins. Bake for 12 minutes until edges are set and center is soft.",
            "Invert carefully onto dessert plate and serve warm with vanilla ice cream."
        ]
    },
    {
        id: 9,
        name: "Glazed Teriyaki Salmon Bowl",
        cuisine: "Japanese",
        category: "Main Course",
        time: "30 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "2 salmon fillets",
            "1 cup cooked Jasmine rice",
            "2 tbsp soy sauce",
            "1 tbsp mirin or honey",
            "1 tsp brown sugar",
            "Steamed broccoli & edamame",
            "Sliced green onions & sesame seeds"
        ],
        instructions: [
            "Mix soy sauce, mirin/honey, and brown sugar in a small bowl to make teriyaki sauce.",
            "Heat oil in a skillet over medium-high heat. Sear salmon skin-side down for 4 minutes.",
            "Flip salmon fillets and pour teriyaki sauce into skillet, cooking until glazed and flaky.",
            "Assemble bowl with base of warm jasmine rice, steamed broccoli, and edamame.",
            "Place glazed teriyaki salmon on top, garnish with sliced green onions and sesame seeds."
        ]
    },
    {
        id: 10,
        name: "Fluffy Blueberry Pancakes",
        cuisine: "American",
        category: "Breakfast",
        time: "20 mins",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "1 cup all-purpose flour",
            "1 tbsp sugar",
            "1 tsp baking powder",
            "3/4 cup milk",
            "1 egg",
            "2 tbsp melted butter",
            "Fresh blueberries & maple syrup"
        ],
        instructions: [
            "Whisk flour, sugar, and baking powder together in a large mixing bowl.",
            "In a separate bowl, combine milk, egg, and melted butter.",
            "Pour wet ingredients into dry ingredients and mix until just combined (do not overmix).",
            "Pour 1/4 cup batter onto hot greased griddle; cook until bubbles form on surface, then flip.",
            "Stack warm pancakes, top with fresh blueberries and generous drizzle of maple syrup."
        ]
    },
    {
        id: 11,
        name: "Tacos de Carne Asada",
        cuisine: "Mexican",
        category: "Main Course",
        time: "35 mins",
        difficulty: "Medium",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "300g flank steak, thin strips",
            "8 small corn tortillas",
            "1 tbsp lime juice",
            "1 tsp cumin powder & chili powder",
            "Finely chopped white onion & cilantro",
            "Salsa verde of choice"
        ],
        instructions: [
            "Season steak strips with lime juice, cumin, chili powder, salt, and pepper.",
            "Heat skillet or grill pan over high heat and sear steak strips for 3-4 minutes per side.",
            "Warm corn tortillas on dry skillet until pliable.",
            "Fill warm tortillas with grilled steak strips.",
            "Top with diced white onion, fresh chopped cilantro, and salsa."
        ]
    },
    {
        id: 12,
        name: "Mango Sago Coconut Pudding",
        cuisine: "Asian",
        category: "Dessert",
        time: "15 mins",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        ingredients: [
            "1/2 cup small tapioca sago pearls",
            "1 cup coconut milk",
            "1 cup mango puree",
            "1 fresh mango, diced",
            "2 tbsp condensed milk or honey"
        ],
        instructions: [
            "Boil sago pearls in water for 10 minutes until translucent; drain and rinse under cold water.",
            "In a pitcher, mix coconut milk, mango puree, and condensed milk until smooth.",
            "Add cooked sago pearls to coconut mango mixture and stir gently.",
            "Chill in refrigerator for 30 minutes.",
            "Pour into dessert glasses and top with fresh diced mango pieces before serving."
        ]
    }
];

// --------------------------------------------------------------------------
// 2. LOCAL STORAGE HELPERS (Favourites Only)
// --------------------------------------------------------------------------

function getFavourites() {
    const stored = localStorage.getItem('favRecipes');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    return [];
}

function saveFavourites(favList) {
    localStorage.setItem('favRecipes', JSON.stringify(favList));
}

function toggleFavourite(recipeId) {
    let favs = getFavourites();
    const index = favs.indexOf(recipeId);
    
    if (index > -1) {
        favs.splice(index, 1);
    } else {
        favs.push(recipeId);
    }
    
    saveFavourites(favs);
    return index === -1; // true if added, false if removed
}

function isFavourite(recipeId) {
    const favs = getFavourites();
    return favs.includes(recipeId);
}

// --------------------------------------------------------------------------
// 3. UI GENERATOR FUNCTIONS
// --------------------------------------------------------------------------

function createRecipeCard(recipe) {
    const favourited = isFavourite(recipe.id);
    const heartIcon = favourited ? "♥" : "♡";
    const favClass = favourited ? "fav-btn active" : "fav-btn";

    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <div class="card-image-container">
                <img src="${recipe.image}" alt="${recipe.name}" class="card-image" loading="lazy" />
                <button class="${favClass}" onclick="handleFavClick(event, ${recipe.id})" title="Toggle Favourite">
                    ${heartIcon}
                </button>
            </div>
            <div class="card-content">
                <div class="card-badges">
                    <span class="badge badge-cuisine">${recipe.cuisine}</span>
                    <span class="badge badge-category">${recipe.category}</span>
                </div>
                <h3 class="card-title">${recipe.name}</h3>
                <div class="card-meta">
                    <span>⏱ ${recipe.time}</span>
                    <span>📊 ${recipe.difficulty}</span>
                </div>
                <div class="card-actions">
                    <a href="recipe-details.html?id=${recipe.id}" class="btn btn-primary btn-sm w-100">View Recipe</a>
                </div>
            </div>
        </div>
    `;
}

function handleFavClick(event, recipeId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const wasAdded = toggleFavourite(recipeId);
    const btn = event.currentTarget;

    if (wasAdded) {
        btn.innerHTML = "♥";
        btn.classList.add("active");
    } else {
        btn.innerHTML = "♡";
        btn.classList.remove("active");
    }

    if (window.location.pathname.includes('favourites.html')) {
        renderFavouritesPage();
    }
}

// --------------------------------------------------------------------------
// 4. PAGE SPECIFIC INITIALIZERS
// --------------------------------------------------------------------------

function initHomePage() {
    const featuredContainer = getElementByIdSafe('featured-recipes-grid');
    if (!featuredContainer) return;

    // "Featured Recipes" = simply the first 6 recipes from our local dataset.
    // No algorithm needed — just a straightforward slice of the array.
    const featuredList = recipes.slice(0, 6);
    let html = '';
    featuredList.forEach(recipe => {
        html += createRecipeCard(recipe);
    });
    featuredContainer.innerHTML = html;

    const searchForm = getElementByIdSafe('home-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = getElementByIdSafe('home-search-input');
            if (input && input.value.trim() !== '') {
                window.location.href = `recipes.html?search=${encodeURIComponent(input.value.trim())}`;
            }
        });
    }
}

function initRecipesPage() {
    const gridContainer = getElementByIdSafe('recipes-grid');
    if (!gridContainer) return;

    const searchInput = getElementByIdSafe('recipe-search-input');
    const cuisineSelect = getElementByIdSafe('cuisine-filter');
    const categorySelect = getElementByIdSafe('category-filter');
    const noResults = getElementByIdSafe('no-results-message');

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam && searchInput) {
        searchInput.value = searchParam;
    }

    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedCuisine = cuisineSelect ? cuisineSelect.value : 'all';
        const selectedCategory = categorySelect ? categorySelect.value : 'all';

        const filtered = recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(query);
            const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine === selectedCuisine;
            const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;

            return matchesSearch && matchesCuisine && matchesCategory;
        });

        if (filtered.length === 0) {
            gridContainer.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            if (noResults) noResults.style.display = 'none';
            let html = '';
            filtered.forEach(recipe => {
                html += createRecipeCard(recipe);
            });
            gridContainer.innerHTML = html;
        }
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (cuisineSelect) cuisineSelect.addEventListener('change', applyFilters);
    if (categorySelect) categorySelect.addEventListener('change', applyFilters);

    applyFilters();
}

function initRecipeDetailsPage() {
    const detailsContainer = getElementByIdSafe('recipe-details-content');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get('id'), 10);
    const recipe = recipes.find(r => r.id === recipeId);

    if (!recipe) {
        detailsContainer.innerHTML = `
            <div class="text-center py-5">
                <h2>Recipe Not Found</h2>
                <p>The recipe you are looking for does not exist.</p>
                <a href="recipes.html" class="btn btn-primary mt-3">Back to Recipes</a>
            </div>
        `;
        return;
    }

    const favourited = isFavourite(recipe.id);
    const heartText = favourited ? "♥ Saved in Favourites" : "♡ Add to Favourites";

    let ingredientsHtml = '';
    recipe.ingredients.forEach(item => {
        ingredientsHtml += `<li><span class="bullet"></span> ${item}</li>`;
    });

    let instructionsHtml = '';
    recipe.instructions.forEach((step, idx) => {
        instructionsHtml += `
            <div class="instruction-step">
                <span class="step-number">${idx + 1}</span>
                <p class="step-text">${step}</p>
            </div>
        `;
    });

    detailsContainer.innerHTML = `
        <div class="details-header">
            <a href="recipes.html" class="btn btn-outline btn-sm mb-3">← Back to Recipes</a>
            <h1 class="details-title">${recipe.name}</h1>
            <div class="details-badges">
                <span class="badge badge-cuisine">${recipe.cuisine}</span>
                <span class="badge badge-category">${recipe.category}</span>
                <span class="badge badge-meta">⏱ ${recipe.time}</span>
                <span class="badge badge-meta">📊 ${recipe.difficulty}</span>
            </div>
        </div>

        <div class="details-grid">
            <div class="details-media">
                <img src="${recipe.image}" alt="${recipe.name}" class="details-image" />
                <div class="details-actions mt-4">
                    <button id="fav-toggle-btn" class="btn ${favourited ? 'btn-primary' : 'btn-outline'} w-100 mb-2">
                        ${heartText}
                    </button>
                </div>
            </div>

            <div class="details-info">
                <div class="info-section">
                    <h2 class="section-heading">Ingredients</h2>
                    <ul class="ingredients-list">
                        ${ingredientsHtml}
                    </ul>
                </div>

                <div class="info-section mt-4">
                    <h2 class="section-heading">Preparation Instructions</h2>
                    <div class="instructions-list">
                        ${instructionsHtml}
                    </div>
                </div>
            </div>
        </div>
    `;

    const favBtn = getElementByIdSafe('fav-toggle-btn');
    if (favBtn) {
        favBtn.addEventListener('click', function() {
            const added = toggleFavourite(recipe.id);
            if (added) {
                favBtn.innerHTML = "♥ Saved in Favourites";
                favBtn.className = "btn btn-primary w-100 mb-2";
            } else {
                favBtn.innerHTML = "♡ Add to Favourites";
                favBtn.className = "btn btn-outline w-100 mb-2";
            }
        });
    }
}

function renderFavouritesPage() {
    const favGrid = getElementByIdSafe('favourites-grid');
    const emptyState = getElementByIdSafe('favourites-empty');
    if (!favGrid) return;

    const favIds = getFavourites();
    const favRecipesList = recipes.filter(r => favIds.includes(r.id));

    if (favRecipesList.length === 0) {
        favGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        let html = '';
        favRecipesList.forEach(recipe => {
            html += createRecipeCard(recipe);
        });
        favGrid.innerHTML = html;
    }
}

function initFavouritesPage() {
    renderFavouritesPage();
}

function getElementByIdSafe(id) {
    return document.getElementById(id);
}

// --------------------------------------------------------------------------
// 4b. LOGIN / REGISTER SYSTEM (Client-Side Demo using localStorage)
// --------------------------------------------------------------------------
// NOTE FOR VIVA: This is NOT real/secure authentication. There is no server,
// so anyone could technically read localStorage. This only demonstrates the
// CONCEPT of login/register/session using localStorage + JSON.

// Get the list of registered users. We store an ARRAY of {username, password}
// objects as a single JSON string under the key "users".
function getUsers() {
    const stored = localStorage.getItem('users');
    if (stored) {
        try {
            return JSON.parse(stored); // JSON.parse: turn the saved string back into a real array/object
        } catch (e) {
            return [];
        }
    }
    return [];
}

// Save the users array back to localStorage. JSON.stringify converts the
// JavaScript array/object into a plain string, because localStorage can
// only store strings.
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Register a new account. Returns an object describing what happened so the
// UI can show a success or error message.
function registerUser(username, password) {
    const users = getUsers();
    const alreadyExists = users.some(function (u) {
        return u.username.toLowerCase() === username.toLowerCase();
    });

    if (alreadyExists) {
        return { success: false, message: 'That username is already taken. Please choose another.' };
    }

    users.push({ username: username, password: password });
    saveUsers(users);
    return { success: true, message: 'Account created! You can now log in.' };
}

// Check the entered username/password against the stored users list.
// If correct, mark the user as logged in using localStorage.setItem().
function loginUser(username, password) {
    const users = getUsers();
    const match = users.find(function (u) {
        return u.username === username && u.password === password;
    });

    if (match) {
        localStorage.setItem('isLoggedIn', 'true'); // simple login "flag"
        localStorage.setItem('currentUser', username);
        return true;
    }
    return false;
}

// Logout simply removes the login flag and sends the user back to login.html.
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function initLoginPage() {
    const loginForm = getElementByIdSafe('login-form');
    const registerForm = getElementByIdSafe('register-form');
    if (!loginForm && !registerForm) return; // not on the login page

    // Tab switching between "Login" and "Create Account"
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');

            const target = tab.getAttribute('data-tab');
            if (loginForm) loginForm.style.display = target === 'login' ? 'flex' : 'none';
            if (registerForm) registerForm.style.display = target === 'register' ? 'flex' : 'none';

            const loginMsg = getElementByIdSafe('login-error');
            const regMsg = getElementByIdSafe('register-message');
            if (loginMsg) loginMsg.style.display = 'none';
            if (regMsg) regMsg.style.display = 'none';
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = getElementByIdSafe('login-username').value.trim();
            const password = getElementByIdSafe('login-password').value;
            const errorEl = getElementByIdSafe('login-error');

            const success = loginUser(username, password);
            if (success) {
                window.location.href = 'index.html'; // redirect to Home after login
            } else if (errorEl) {
                errorEl.textContent = 'Incorrect username or password.';
                errorEl.style.display = 'block';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = getElementByIdSafe('register-username').value.trim();
            const password = getElementByIdSafe('register-password').value;
            const msgEl = getElementByIdSafe('register-message');

            if (!username || !password) {
                if (msgEl) {
                    msgEl.textContent = 'Please fill in both username and password.';
                    msgEl.className = 'auth-message auth-error';
                    msgEl.style.display = 'block';
                }
                return;
            }

            const result = registerUser(username, password);
            if (msgEl) {
                msgEl.textContent = result.message;
                msgEl.className = result.success ? 'auth-message auth-success' : 'auth-message auth-error';
                msgEl.style.display = 'block';
            }
            if (result.success) {
                registerForm.reset();
            }
        });
    }
}

// --------------------------------------------------------------------------
// 4c. ONE-DAY MEAL PLANNER + AUTOMATIC SHOPPING LIST
// --------------------------------------------------------------------------
// Only 4 meal slots now (no more Monday-Sunday). "key" is the property name
// saved in localStorage, "label" is what is shown on screen.
const mealSlots = [
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'snacks', label: 'Snacks' },
    { key: 'dinner', label: 'Dinner' }
];

// The meal plan is a simple object like: { breakfast: 3, lunch: 7, snacks: 2, dinner: 5 }
// where each value is the recipe "id" chosen for that slot.
function getMealPlan() {
    const stored = localStorage.getItem('mealPlan');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return {};
        }
    }
    return {};
}

function saveMealPlan(plan) {
    localStorage.setItem('mealPlan', JSON.stringify(plan));
}

// Renders the 4 meal-slot cards (Breakfast/Lunch/Snacks/Dinner) and fills
// each dropdown with every recipe name. Re-uses the existing .day-card /
// .day-select / .day-selected CSS classes so the look stays identical.
function renderMealPlanner() {
    const container = getElementByIdSafe('meal-planner-grid');
    if (!container) return;

    const plan = getMealPlan();
    let html = '';

    mealSlots.forEach(function (slot) {
        const selectedId = plan[slot.key] || '';

        let options = '<option value="">-- Select Recipe --</option>';
        recipes.forEach(function (recipe) {
            const isSelected = String(recipe.id) === String(selectedId) ? 'selected' : '';
            options += `<option value="${recipe.id}" ${isSelected}>${recipe.name}</option>`;
        });

        const selectedRecipe = selectedId ? recipes.find(function (r) { return String(r.id) === String(selectedId); }) : null;

        html += `
            <div class="day-card">
                <h3 class="day-name">${slot.label}</h3>
                <select class="day-select filter-select" data-slot="${slot.key}">${options}</select>
                ${selectedRecipe ? `<div class="day-selected">🍽 ${selectedRecipe.name}</div>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;

    // When a recipe is chosen/changed/removed for a slot, update the saved plan.
    const selects = container.querySelectorAll('.day-select');
    selects.forEach(function (select) {
        select.addEventListener('change', function () {
            const slotKey = this.getAttribute('data-slot');
            const currentPlan = getMealPlan();

            if (this.value) {
                currentPlan[slotKey] = this.value; // save chosen recipe id
            } else {
                delete currentPlan[slotKey]; // "-- Select Recipe --" = clear that meal
            }

            saveMealPlan(currentPlan);
            renderMealPlanner();   // re-draw cards so the selected name shows
            renderShoppingList();  // ingredients changed, so rebuild the shopping list
        });
    });
}

// Checked/unchecked state of each shopping list item, saved as an object
// like: { "200g Fettuccine pasta": true, "Fresh basil leaves": false }
function getCheckedIngredients() {
    const stored = localStorage.getItem('shoppingChecked');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return {};
        }
    }
    return {};
}

function saveCheckedIngredients(checkedMap) {
    localStorage.setItem('shoppingChecked', JSON.stringify(checkedMap));
}

// CORE SHOPPING LIST LOGIC:
// Selected meals -> find selected recipes -> read their ingredients
// -> combine ingredients (no duplicates) -> return the final list.
function generateShoppingList() {
    const plan = getMealPlan();
    const ingredientSet = new Set(); // a Set automatically ignores duplicate values

    Object.values(plan).forEach(function (recipeId) {
        const recipe = recipes.find(function (r) { return String(r.id) === String(recipeId); });
        if (recipe) {
            recipe.ingredients.forEach(function (ingredient) {
                ingredientSet.add(ingredient);
            });
        }
    });

    return Array.from(ingredientSet); // convert the Set back into a normal array
}

function renderShoppingList() {
    const container = getElementByIdSafe('shopping-list-container');
    const emptyState = getElementByIdSafe('shopping-empty');
    if (!container) return;

    const ingredients = generateShoppingList();
    const checked = getCheckedIngredients();

    if (ingredients.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    container.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    ingredients.forEach(function (ingredient) {
        const isChecked = checked[ingredient] ? 'checked' : '';
        const rowClass = checked[ingredient] ? 'shopping-item checked' : 'shopping-item';
        html += `
            <label class="${rowClass}">
                <input type="checkbox" class="shopping-checkbox" data-ingredient="${ingredient.replace(/"/g, '&quot;')}" ${isChecked} />
                <span>${ingredient}</span>
            </label>
        `;
    });
    container.innerHTML = html;

    const checkboxes = container.querySelectorAll('.shopping-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const ingredient = this.getAttribute('data-ingredient');
            const checkedMap = getCheckedIngredients();
            checkedMap[ingredient] = this.checked;
            saveCheckedIngredients(checkedMap);
            this.closest('.shopping-item').classList.toggle('checked', this.checked);
        });
    });
}

function initMealPlannerPage() {
    const container = getElementByIdSafe('meal-planner-grid');
    if (!container) return; // not on the meal planner page

    renderMealPlanner();
    renderShoppingList();

    // "Clear Plan" empties all 4 meal slots and refreshes both the
    // planner cards and the shopping list (since it depends on the plan).
    const clearPlanBtn = getElementByIdSafe('clear-meal-plan');
    if (clearPlanBtn) {
        clearPlanBtn.addEventListener('click', function () {
            saveMealPlan({});
            renderMealPlanner();
            renderShoppingList();
        });
    }

    const clearBtn = getElementByIdSafe('clear-shopping-list');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            // "Clear Shopping List" resets every ingredient back to unchecked
            // (the meal plan itself is left untouched).
            saveCheckedIngredients({});
            renderShoppingList();
        });
    }
}

// --------------------------------------------------------------------------
// 4d. HERO SECTION — INTERACTIVE PERSPECTIVE / PARALLAX TILT

// --------------------------------------------------------------------------
// 5. GLOBAL DOM LOADED ENTRY POINT
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
    initRecipesPage();
    initRecipeDetailsPage();
    initFavouritesPage();

    initLoginPage();
    initMealPlannerPage();

    const navToggle = getElementByIdSafe('nav-toggle');
    const navLinks = getElementByIdSafe('nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // LOGOUT: clears the login flag (localStorage.removeItem) and sends
    // the user back to the login page. Present on every protected page.
    const logoutLink = getElementByIdSafe('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
});
