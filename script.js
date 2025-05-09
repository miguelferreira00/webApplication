window.onload = function () {
    const path = window.location.pathname;

    const home = document.getElementById('home');
    const profile = document.getElementById('profile');

    const homeImg = home.querySelector('img');
    const profileImg = profile.querySelector('img');


    // ----- NAVIGATION BAR ----- //
    // if user is on home page, the icon will be active
    if (path.includes("index.html")) {
        homeImg.src = "src/home-active.png";
        homeImg.classList.add("active");
    }

    // if user is on profile page, the icon will be active
    if (path.includes("about-me.html")) {
        profileImg.src = "src/profile-active.png";
        profileImg.classList.add("active");
    }

    if(path.includes("country.html")) {
        const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry")); // get the selected counstry from local storage
        const countryFlag = document.getElementById("country-flag");
        const countryLanguage = document.getElementById("country-language");
        const countryName = document.getElementById("country-name");
        const countryCapital = document.getElementById("country-capital");
        const countryPopulation = document.getElementById("country-population");
        const countryCurrency = document.getElementById("country-currencies");

        // show the flag of the selected country
        countryFlag.src = selectedCountry.flag; //
        countryName.textContent = selectedCountry.name; //
        countryCapital.textContent = selectedCountry.capital; //
        countryPopulation.textContent = selectedCountry.population.toLocaleString(); //
        // gets the array of languages and put them in a string
        countryLanguage.textContent = Object.values(selectedCountry.language).join(", "); 
        // gets the array of currencies and put them in a string
        countryCurrency.textContent = Object.values(selectedCountry.currency).map(currency => currency.name).join(", ");

        if(selectedCountry.name == "Portugal"){
            const foodSection = document.getElementsByClassName("food-section")[0];
            foodSection.classList.add("food-section");

            const dish1 = document.createElement("div");
            dish1.classList.add("dish");
            dish1.innerHTML = '<p>Bacalhau à brás</p><img src="src/food/pt-bacalhau_bras.jpg" alt="Bacalhau Bras">';

            const dish2 = document.createElement("div");
            dish2.classList.add("dish");
            dish2.innerHTML = '<p>Carne de Porco à Alentejana</p><img src="src/food/pt-carne_porco_alent.jpg" alt="Carne Porco Alent">';

 
            // Add elements to the food section
            foodSection.appendChild(dish1);
            foodSection.appendChild(dish2);
            foodSection.appendChild(dishName);
            foodSection.appendChild(dishImage);
            
    
            document.querySelector(".container").appendChild(foodSection);
        }

        if(selectedCountry.name == "Brazil"){
            const foodSection = document.getElementsByClassName("food-section")[0];
            foodSection.classList.add("food-section");

            const dish1 = document.createElement("div");
            dish1.classList.add("dish");
            dish1.innerHTML = '<p>Feijoada</p><img src="src/food/br-feijoada.png" alt="Feijoada">';

            const dish2 = document.createElement("div");
            dish2.classList.add("dish");
            dish2.innerHTML = '<p>Coxinha</p><img src="src/food/br-coxinha.jpg" alt="Coxinha">';

 
            // Add elements to the food section
            foodSection.appendChild(dish1);
            foodSection.appendChild(dish2);
            foodSection.appendChild(dishName);
            foodSection.appendChild(dishImage);
            
    
            document.querySelector(".container").appendChild(foodSection);
        }

        if(selectedCountry.name == "Japan"){
            const foodSection = document.getElementsByClassName("food-section")[0];
            foodSection.classList.add("food-section");

            const dish1 = document.createElement("div");
            dish1.classList.add("dish");
            dish1.innerHTML = '<p>Soba</p><img src="src/food/jp-soba.avif" alt="Soba">';

            const dish2 = document.createElement("div");
            dish2.classList.add("dish");
            dish2.innerHTML = '<p>Rámen</p><img src="src/food/jp-ramen.jpg" alt="Ramen">';

 
            // Add elements to the food section
            foodSection.appendChild(dish1);
            foodSection.appendChild(dish2);
            foodSection.appendChild(dishName);
            foodSection.appendChild(dishImage);
            
    
            document.querySelector(".container").appendChild(foodSection);
        }
    }




    // ----- REGION CATEGORY BUTTONS ----- //
    const categoriesButtons = document.querySelectorAll('.categories button'); // LIST OF CATEGORIES btns
    let selectedRegion = null; // region category selected by the user

    // Will go through the list of categories btns and add a click event to each one
    categoriesButtons.forEach(button => {
        // if the button is clicked, it's executed the function below
        button.addEventListener('click', function(){
            const region = this.getAttribute("data-category"); //gets the region name
            const isActive = this.style.backgroundColor === "black"; // checks if the button is already active (when background is black)

            // Reset other button that is active
            categoriesButtons.forEach(btn => {
                btn.style.backgroundColor = "rgb(209, 181, 3)";
                btn.style.color = "black";
            });

            // if button is not active, it will be activated 
            if (!isActive) {
                this.style.backgroundColor = "black";
                this.style.color = "white";
                selectedRegion = region;
                // go through the array of countries and filter them by region selected
                const filtered = countries.filter(country => country.region === selectedRegion);
                renderCountries(filtered);
            }
            // if the button is already active, it will be deactivated
            else {
                selectedRegion = null;
                renderCountries(countries);
            }
        });    
    });

    const countriesContainer = document.querySelector(".countries");
    const countriesNames = ["Portugal", "Brazil", "Japan",]; // predefined countries array
    let countries = []; // array with countries that will be shown

    // Function that will show the countries on home page
    function renderCountries(countriesList) {
        countriesContainer.innerHTML = ""; // cleans the actual content of the container
        
        // if there are no countris to be show, show a message
        if (countriesList.length === 0) {
            const noCountryMes = document.createElement("div");
            noCountryMes.textContent= "Nenhum país encontrado.";
            noCountryMes.classList.add("no-countries");
            countriesContainer.appendChild(noCountryMes); //add new element (with class="no-countries") to the container
            return;
        }
        // will go through the array of countries and create a button for each one (with respective name and flag)
        countriesList.forEach(country => {
            // Create a button for each country and add it to the container with a class name
            const button = document.createElement("button");
            button.classList.add("country-button");
            
            // Adds the information of the country to the button
            button.innerHTML = `
                <p class="country-name">${country.name}</p>
                <img src="${country.flag}" alt="Bandeira de ${country.name}" />
            `;

            button.addEventListener("click", function(){
                localStorage.setItem("selectedCountry", JSON.stringify(country)); //Saves the selected country in local storage
                window.location.href = "country.html"; // when the button is clicked, it will redirect to the country 
            });
            
            countriesContainer.appendChild(button); // add the button to the container
            
            // Add a divising line between buttons
            const hr = document.createElement("hr");
            hr.classList.add("line");
            countriesContainer.appendChild(hr);
        });
        
        // Creates a button to see more countries **STILL NEEDS TO BE FUNCTIONAL**
        const moreBtn = document.createElement("button");
        moreBtn.classList.add("more-button");
        moreBtn.textContent = "See more";
        moreBtn.onclick = alertMessage; // FOR NOW IT'S SHOWING AN ALERT MESSAGE
    
        countriesContainer.appendChild(moreBtn);
    }
    

    // ----- FETCHING COUNTRIES ----- //

    // Fetch all countries
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json()) //converts the response to something we can use
        // will build the array of country based on predifined country-names array
        .then(data => { 
            countries = data
                .filter(country => countriesNames.includes(country.name.common))
                .map(country => ({
                    name: country.name.common,
                    flag: country.flags.png,
                    language: country.languages,
                    currency: country.currencies,
                    capital: country.capital?.[0] || "N/A",
                    population: country.population,
                    region: country.region,
                }));

            renderCountries(countries); // show the countries on the page
        });


}
function alertMessage() {
    alert("Não há mais países para mostrar no momento.");
}
