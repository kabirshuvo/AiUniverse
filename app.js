
//* Get Ai Data from the API.
const getAi = async () =>{
    console.log('this is the starting of a big fight');
    const URL = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(URL);
    const data = await res.json();
    displayAi(data);
  }
  
  //* AI Display Function...
  const displayAi = (ais) => {
    console.log(ais.data.tools[0].id);
        const aiData = ais.data.tools;
      const  aiDataDisplay = aiData.slice(0, 6);
        const aisContainer = document.getElementById('ais-container');
  
        // * for Each Section
  
        aiDataDisplay.forEach(ai => {
            const imgUrl = ai.image ? ai.image : 'img not found';
            const aiDiv = document.createElement('div');
            aiDiv.classList.add('col');
            aiDiv.innerHTML = `
            <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top" alt="..." />
            <div class="card-body">
             <h3>${ai.name}</h3>
              <ul>
                <li>${ai.features[0]}</li>
                <li>${ai.features[1]}</li>
                <li>${ai.features[2]}</li>
              </ul>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                <h2>${ai.name}</h2>
                <div class="d-flex gap-2 align-items-center">
  
                <i class="fa-regular fa-calendar-days"></i>
                <small class="text-muted">'${ai.published_in}'</small>
  
                </div>
              
              </div>
              <div >
              <button id="footer-arrow-btn" onclick="getAiDetails('${ai.id}')" class="ps-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#aiDetailModal">&#8594;</button>
              </div>
            </div>
          </div>
            `;
            aisContainer.appendChild(aiDiv);
        });
  
  }
  
  //*  sort by dated ==I have to learn it (effectively)=
  const sortByDate = () => {
    const aisContainer = document.getElementById('ais-container');
    const aiCards = Array.from(aisContainer.getElementsByClassName('.card'));
    aiCards.sort((a, b) => {
        const dateA = new Date(a.querySelector('.text-muted').textContent);
        const dateB = new Date(b.querySelector('.text-muted').textContent);
        return dateB - dateA;
    });
    aisContainer.innerHTML = '';
    aiCards.forEach(card => {
        aisContainer.appendChild(card);
    });
  }
  
  //********************** */
  
  // * Get AI by ID
  
  //* Get Ai Details from the API.
  const getAiDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools/${id}`
    const res = await fetch(URL);
    const data = await res.json();
    displayAiDetails(data);
  }
  
  //* Display Ai Details Modal...
  const displayAiDetails = (id) => {
    console.log(id.data);
    };
    
  
  //* Call getAi function >>>
  getAi();
  
  //* onclick function to SortByDated button
  const sortByDateBtn = document.getElementById('sort-by-date');
  sortByDateBtn.addEventListener('click', sortByDate);
  
  