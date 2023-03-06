//* See More Section

const getMoreAi = async () =>{
    console.log('this is the starting of a big fight');
    const URL = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(URL);
    const data = await res.json();
    seeMore(data);
  }
  
 

  const seeMore = (ais) =>{
    console.log(ais.data.tools[0].features)
    const moreAiData = ais.data.tools;
    const displayMoreAiData = moreAiData.slice(6);
    const moreAiContainer = document.getElementById('more-ais-container');

    displayMoreAiData.forEach(ai => {
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
              <h4>${ai.name}</h4>
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
        moreAiContainer.appendChild(aiDiv);
    });
    
    toggleSpinner(false);
  }
  const loadSpinner = document.getElementById('See-More').addEventListener('click', function(){
    toggleSpinner(true);
    
  })

  const toggleSpinner = isLoading => {
    const loadSpinner = document.getElementById('toggleSpinner');
    if (isLoading){
      loadSpinner.classList.remove('d-none')
    } else{
      loadSpinner.classList.add('d-none');
    }
  }
   

