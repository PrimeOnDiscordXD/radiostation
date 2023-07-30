var audioPlayer = document.getElementById('audio-player');
var stationSelect = document.getElementById('station-select');
var searchInput = document.getElementById('search-input');
var playPauseBtn = document.getElementById('play-pause-btn');
var volumeControl = document.getElementById('volume-control');
var stationData;


function populateStationOptions(stationData) {

  stationSelect.innerHTML = '';

  Object.keys(stationData).forEach(function (location) {
    var stations = stationData[location].urls;
    stations.forEach(function (station) {
      var option = document.createElement('option');
      option.value = station.url;
      option.text = station.name;
      stationSelect.appendChild(option);
    });
  });
}


fetch('station.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    stationData = data;
    checkRadioStations(data); 
    populateStationOptions(data);
  })
  .catch(function (error) {
    console.log(error);
  });

function checkRadioStations(stations) {

  Object.keys(stations).forEach(function (location) {
    var locationData = stations[location];
    var locationStations = locationData.urls;

    locationStations.forEach(function (station) {

      station.working = true; 
    });
  });
}

stationSelect.addEventListener("change", function () {
  var selectedStation = stationSelect.value;
  if (selectedStation !== "") {
    audioPlayer.pause(); // Pausestation
    audioPlayer.src = selectedStation;
    audioPlayer.play(); // Play the station
    playPauseBtn.textContent = "Play"; 
  }
});

// Event listener for station select
stationSelect.addEventListener('change', function () {
  var selectedStation = stationSelect.value;
  if (selectedStation !== '') {
    audioPlayer.pause(); // Pause previous station
    audioPlayer.src = selectedStation;
    audioPlayer.play(); // Play new station
    playPauseBtn.textContent = 'Play'; // text to "Play"
  }
});

//search input
searchInput.addEventListener('input', function () {
  var searchTerm = searchInput.value.toLowerCase();
  filterStations(searchTerm);
});

// filter stations from search input
function filterStations(searchTerm) {
  var filteredStations = [];
  Object.keys(stationData).forEach(function (location) {
    var stations = stationData[location].urls;
    var filteredLocationStations = stations.filter(function (station) {
      return station.name.toLowerCase().includes(searchTerm);
    });
    filteredStations = filteredStations.concat(filteredLocationStations);
  });

  // Clear select menu
  stationSelect.innerHTML = '';

  // iltered stations in select menu
  filteredStations.forEach(function (station) {
    var option = document.createElement('option');
    option.value = station.url;
    option.text = station.name;
    stationSelect.appendChild(option);
  });
}

// listener for play/pause button
playPauseBtn.addEventListener('click', function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = 'Play';
  }
});

//listener for volume control
volumeControl.addEventListener('input', function () {
  audioPlayer.volume = volumeControl.value;
});

// speaker icon
var speakerIcon = document.querySelector('.speaker-icon');

// listener for speaker icon
speakerIcon.addEventListener('click', function () {
  if (audioPlayer.muted) {
    audioPlayer.muted = false;
    speakerIcon.style.opacity = 1;
  } else {
    audioPlayer.muted = true;
    speakerIcon.style.opacity = 0.5;
  }
});

var stationUrls = {
  'NRJ-NO': 'http://nrj.p4groupaudio.com/NRJ_MM',
  'NRJ-SWE': 'http://tx-bauerse.sharp-stream.com/http_live.php?i=nrj_instreamtest_se_mp3',
  'P4Lyden': 'http://p4.p4groupaudio.com/P04_MM',
  'BBCR1': 'http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one'
  // station button featured list
};

//play a radio station
function playRadioStation(stationKey) {
  var stationUrl = stationUrls[stationKey];
  if (stationUrl) {
    audioPlayer.pause(); // Pause the station
    audioPlayer.src = stationUrl;
    audioPlayer.play(); // Play the station
    playPauseBtn.textContent = 'Pause'; // Set the button text to "Pause"
  }
}

//  listener for the buttons
var btnPlayList = document.querySelectorAll('.btn-play');
btnPlayList.forEach(function (btnPlay) {
  btnPlay.addEventListener('click', function () {
    var stationKey = btnPlay.getAttribute('data-station');
    playRadioStation(stationKey);
  });
});

// elements for the buttons
var feedbackButton = document.createElement('button');
var madeByText = document.createElement('p');
var madeByLink = document.createElement('a');
var contactButton = document.createElement('button');
var image = document.createElement('img');

//  classes to the elements
madeByText.classList.add('made-by-text');
feedbackButton.classList.add('feedback-button');
contactButton.classList.add('contact-button');

// feedback button
feedbackButton.textContent = 'Feedback';
feedbackButton.style.backgroundColor = 'transparent';
feedbackButton.style.border = 'none'; // Remove the border
feedbackButton.style.padding = '10px 20px'; // Add some padding
feedbackButton.style.marginRight = '30px'; // Add more margin on the right side
feedbackButton.style.textDecoration = 'none'; // Remove the underline
feedbackButton.style.fontWeight = 'bold'; // Make the text bolder

// Contact button
contactButton.textContent = 'Contact';
contactButton.style.backgroundColor = 'transparent'; // Change the background color
contactButton.style.border = 'none'; // Remove the border
contactButton.style.padding = '10px 20px'; // Add some padding
contactButton.style.marginLeft = '30px'; // Add more margin on the left side
contactButton.style.textDecoration = 'none'; // Remove the underline
contactButton.style.fontWeight = 'bold'; // Make the text bolder

// "Made by Prime" link
madeByLink.href = 'https://discord.com/users/256132879770189825';
madeByLink.textContent = 'Made by Prime#3243';
madeByLink.style.color = '#000';
madeByLink.style.textDecoration = 'none'; // Remove the underline
madeByLink.style.fontWeight = 'bold'; // Make the text bolder

// Image/Icon next to made by text
image.src = './stations logo/discord-icon.svg';
image.alt = 'Icon'
image.classList.add('logo');

madeByText.appendChild(feedbackButton);
madeByText.appendChild(image);
madeByText.appendChild(madeByLink);
madeByText.appendChild(contactButton);

// Append the container
document.body.appendChild(madeByText);

// listener to the Feedback button to open a new page
feedbackButton.addEventListener('click', function() {
    window.open('./pages/feedback.html', '_blank'); // The page it get redirected to
});



// Dark mode 
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);
