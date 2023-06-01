
    const map = L.map('map').setView([22.3511, 78.6677], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(map);

    const placeList = document.getElementById('place-list');
    const placeItems = placeList.getElementsByClassName('place-item');

    for (let i = 0; i < placeItems.length; i++) {
      placeItems[i].addEventListener('click', function () {
        const lat = parseFloat(this.querySelector('button').dataset.lat);
        const lng = parseFloat(this.querySelector('button').dataset.lng);
        const placeName = this.querySelector('button').textContent;

        highlightPlace(lat, lng, placeName);
      });
    }

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        const query = searchBar.value.toLowerCase();
        const matchedPlace = Array.from(placeItems).find(item => item.querySelector('button').textContent.toLowerCase() === query);
        if (matchedPlace) {
          const lat = parseFloat(matchedPlace.querySelector('button').dataset.lat);
          const lng = parseFloat(matchedPlace.querySelector('button').dataset.lng);
          const placeName = matchedPlace.querySelector('button').textContent;
          highlightPlace(lat, lng, placeName);
        }
      }
    });

    function highlightPlace(lat, lng, placeName) {
      map.setView([lat, lng], 8);

      clearPlaceNames();

      const placeNameElement = document.createElement('div');
      placeNameElement.classList.add('place-name');
      placeNameElement.textContent = placeName;
      map.getPanes().overlayPane.appendChild(placeNameElement);

      setTimeout(function () {
        placeNameElement.style.opacity = '1';
      }, 1000);
    }

    function clearPlaceNames() {
      const placeNames = document.getElementsByClassName('place-name');
      while (placeNames[0]) {
        placeNames[0].parentNode.removeChild(placeNames[0]);
      }
    }
  