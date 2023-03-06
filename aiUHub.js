//* Get Ai Data from the API.
const getAi = async () => {
  
  const URL = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(URL);
  const data = await res.json();
  displayAi(data);
}

//* AI Display Function...
const displayAi = (ais) => {
  const aiData = ais.data.tools;
  const aiDataDisplay = aiData.slice(0, 6);
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
      aisContainer.appendChild(aiDiv);
  });

}

//*  sort by dated ===
const sortByDate = () => {
  const aisContainer = document.getElementById('ais-container');
  const aiCards = Array.from(aisContainer.querySelectorAll('.card'));
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
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  try {
      const res = await fetch(URL);
      const data = await res.json();
      displayAiDetails(data);
      return data;
  } catch (error) {
      console.error(error);
  }
}

//* Display Ai Details Modal...
const displayAiDetails = (data) => {
 // console.log(data.data.features['1'].feature_name);
 console.log(data.data.accuracy.score);

  //******* */
const aiHeadline = document.getElementById('ai-description');
//console.log(aiHeadline);
// *****************Ai plans and pricing
aiHeadline.innerHTML = data.data.description;
const aiBasicPlan = document.getElementById('ai-plan1');
aiBasicPlan.innerHTML = data.data.pricing[0].plan;
const aiBasicPricing = document.getElementById('ai-pricing');
aiBasicPricing.innerHTML = data.data.pricing[0].price;
const aiProPlan = document.getElementById('aiProPlan');
aiProPlan.innerHTML = data.data.pricing[1].plan
const aiProPricing = document.getElementById('ai-pro-pricing');
aiProPricing.innerHTML = data.data.pricing[1].price;
const enterpriecPlan = document.getElementById('enterpriec-plan');
enterpriecPlan.innerText = data.data.pricing[2].plan;
const enterpricePricing = document.getElementById('enterpriec-pricing');
enterpricePricing.innerHTML = data.data.pricing[2].price;
// *****************Ai plans and pricing done </>

//******************Featears Section */



const features = data.data.features['1'].feature_name;
if(features && features.length > 0){
  const aiFeatures = document.getElementById('features');
  aiFeatures.innerText = 'features:';
  console.log(aiFeatures);
}

console.log(data.data.features['1'].feature_name);

  //** */

 //* Integration 
 const integrations = data.data.integrations;
if (integrations && integrations.length > 0) {
const aiIntegrations = document.getElementById('integrations');
aiIntegrations.innerText = 'Integrations:';
const integrationsList = document.createElement('ul');
integrations.forEach(integration => {
  const integrationItem = document.createElement('li');
  integrationItem.innerText = integration;
  integrationsList.appendChild(integrationItem);
});
aiIntegrations.appendChild(integrationsList);
}
//*************** */

// clear the contents of the modal-img-div element
document.getElementById('modal-img-div').innerHTML = '';

// create a new img element
const logoUrl = data.data.image_link[0];
const logoImage = document.createElement('img');
logoImage.classList.add('img-fluid');
logoImage.src = logoUrl;

// append the new image element to the modal-img-div element
document.getElementById('modal-img-div').appendChild(logoImage);
};


const accuracyScore = document.getElementById('accuracy-score');
console.log(accuracyScore)
// accuracyScore.innerHTML = data.data;

//* Call getAi function >>>
getAi();


//* onclick function to SortByDated button
const sortByDateBtn = document.getElementById('sort-by-date');
sortByDateBtn.addEventListener('click', sortByDate);