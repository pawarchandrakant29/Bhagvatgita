let currentPage = 1;
function toggleClass(e, toggleClassName) {
  if (e.className.includes(toggleClassName)) {
    e.className = e.className.replace(' ' + toggleClassName, '');
  } else {
    e.className += ' ' + toggleClassName;
  }
}

function movePage(e, page) {
  console.log(e, page);
  if (page === currentPage) {
    currentPage += 2;
    toggleClass(e, "left-side");
    toggleClass(e.nextElementSibling, "left-side");
    
  }
  else if (page === currentPage - 1) {
    currentPage -= 2;
    toggleClass(e, "left-side");
    toggleClass(e.previousElementSibling, "left-side");
  }
  
}

function movePage1(e, page) {
  console.log(e.parentElement.parentElement, page);
  if (page === currentPage) {
    currentPage += 2;
    toggleClass(e.parentElement.parentElement, "left-side");
    toggleClass(e.parentElement.parentElement.nextElementSibling, "left-side");
    
  }
  else if (page === currentPage - 1) {
    currentPage -= 2;
    toggleClass(e.parentElement.parentElement, "left-side");
    toggleClass(e.parentElement.parentElement.previousElementSibling, "left-side");
  }
}


var chapterInfo;

function fetchChapters() {
  const page = document.querySelector(".page p");
  
  fetch("https://bhagavadgitaapi.in/chapters", {
    method: "GET",
    mode: 'cors',
    headers: {}
  })
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element, index) => {
      chapterInfo = data;
      page.innerHTML += `<p> chapter : ${element.chapter_number}</p><h6>${element.name}</h6><p>${element.summary.hi}</p>`;
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}
fetchChapters();

// var slockLength;
  const fetchChapters1 = async (chapterNumber) => {
    var id;
    const page1 = document.querySelector(".page .slock");
    try {

      const resChapter = await fetch(`https://bhagavadgitaapi.in/chapter/${chapterNumber}/`);
      const chapterData = await resChapter.json();
      
      // Access verses_count
      const versesCount = chapterData.verses_count;
      var cHno = chapterData.chapter_number

      page1.innerHTML = `<p> chapter : ${cHno}</p><h4>${chapterInfo[chapterNumber - 1].name}</h4>`;
      for (id = 1; id <= versesCount; id++) {
        const resSlok = await fetch(`https://bhagavadgitaapi.in/slok/${chapterNumber}/${id}/`);
        const apicall = await resSlok.json();
        page1.innerHTML += `<p>${apicall.tej.author}</p><h6>${apicall.slok}</h6><p>${apicall.tej.ht}</p>`;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const update = (newChapterNumber) => {
    fetchChapters1(newChapterNumber);
  }
  
  for (let i = 1; i <= 18; i++) {
    document.querySelector(`.btn${i}`).addEventListener('click', () => {
      update(i);
    });
  }  
