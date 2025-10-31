const scriptURL = "https://script.google.com/macros/s/AKfycbxDxgAeZUcBfHEdmUSDa7zha7qeCvD6aI147o2tj2vDhk6KSlrJmBB2cfl4HkINMXbb/exec";
const icons = {
  pdf: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
  doc: "https://upload.wikimedia.org/wikipedia/commons/1/19/Microsoft_Office_Word_%282019%E2%80%932025%29.svg",
  docx: "https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg",
  xls: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg",
  xlsx: "https://upload.wikimedia.org/wikipedia/commons/f/f3/.xlsx_icon.svg",
  jpg: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnQkzSeVQi8ppmQguKCvfNinYRRW9XUeET_7cSnu54pso-CcxkGus_qYmR7nmoeNo8z4rvlUCNaJVdR6VkhbXBMt6NsqrE7Wo3ysjIb_TWQEgLfroxpSDzsnJgsD1rdUdbtNwGns58ZW92HuB9BOnMOMuIlRTOrFGvKBzij3EhlqPkzNrd5thm3IN6u6yJ/s512/10260602.png",
  jpeg: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhpKX2-ZVo6azybTvj3Vl3AtW4Oy2pRd9YhZrCsYYVsuzH7DSsmcx7v_OrSryY_A537ER9rhlysXcAVClkWN4I_VT7FNtsz_Vyztrt62U0Lodz611bmHyBb5mmZZZkJF75ZCw0ZEKYX2rS6x3vb09BVOTzGGZm2HLHgkAm9k-PyNePF9YYExjMAEIvIeXP/s512/jpeg-icon.png",
  png: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9Vw_IZLHStYLWLaLidFZ1No2av_DkU4UkZ_pki8oVyukaJPjtASiq6rkI41NIjdi1dRheNPouEzZD-6-rrmH_K7txCq55TSWYZYbGCqPCnEmPk9Um5QFkK8cpfPuFynniDGYpwa5TvH4dT2zKn36qzyJNVrsufDdSBWsZW8mYI-by8jbvKOaprPiJdcRb/s512/337948.png",
  gif: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhDkryULS8JC8QobL_zIoRCdyoSOGMIoVoP-KK-E1dnMp-HvmHwkHtfV7OQuwLgvyS90bYBJ-xmNPfUXPu1Iqs-T54U5cgdVgdmLmPI28kd-gbF8oPGBg0538apuQDcJFUy9FFEJHlhnphqiMPfFzye_-o0cNMMAtYB7ztPP78Q3UtziX3k9oPihwXxrvEr/s640/11237482.gif",
  html: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
  css: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
  js: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Javascript-shield.svg",
  php: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
  zip: "https://upload.wikimedia.org/wikipedia/commons/1/14/Deepin_Icon_Theme_%E2%80%93_application-x-zip_%2841%29.svg",
  rar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Deepin_Icon_Theme_%E2%80%93_application-x-rar_%2830%29.svg",
  txt: "https://upload.wikimedia.org/wikipedia/commons/2/23/Text-txt.svg",
  xml: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Deepin_Icon_Theme_%E2%80%93_text-xml_%289%29.svg",
  default: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyNCOzrzK3J0RskO1sKDtlFSkng5cq1Mn9vF7vjAAGMXbrOjqiEx2B6VL7prPKm_XiE_DE_89jiRg01npfB-BIoR7I9nSUqSbLvZG5DtCgs58Lx15Vzlzb_fHFGHWVrNSdNZVpWvNe3iO8dp0NPIOjAmIQtXY6sfNNh5hprqcB7hPpfmEOU3hgGrcxlP-1/s512/44386.png"
};

/* ðŸ”¹ Load Drive Files */
function loadFiles() {
  fetch(scriptURL + "?folderId=" + folderId)
    .then(r => r.json())
    .then(files => {
      const container = document.getElementById('fileContainer');
      container.innerHTML = "";
      if(files.error){ container.innerHTML = "<p>"+files.error+"</p>"; return; }
      files.forEach(file => {
        const ext = (file.ext || "").toLowerCase();
        const icon = icons[ext] || icons.default;
        const card = document.createElement("div");
        card.className = "file-card";
        card.innerHTML = `
          <img class="file-icon" src="${icon}">
          <div class="file-info">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${file.size}</div>
          </div>
          <a href="#" class="download-btn" data-link="${file.download}" title="Download">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path fill="white" d="M12 16l4-4h-3V4h-2v8H8l4 4zm4 4H8c-1.1 0-2-.9-2-2v-2h2v2h8v-2h2v2c0 1.1-.9 2-2 2z"/>
            </svg>
          </a>
        `;
        container.appendChild(card);
      });

      document.querySelectorAll(".download-btn").forEach(btn=>{
        btn.addEventListener("click",e=>{
          e.preventDefault();
          const link = btn.getAttribute("data-link");
          showAdBeforeDownload(link);
        });
      });
    })
    .catch(()=>{ document.getElementById('fileContainer').innerHTML = "<p>Error loading files. Please Refresh the Page again.</p>"; });
}

/* ðŸ”¹ Show Blogger Ad Overlay */
function showAdBeforeDownload(downloadLink){
  const overlay = document.getElementById("ad-overlayd");
  const container = document.getElementById("ad-container");
  const timerLabel = document.getElementById("ad-timer");
  const blogUrl = "https://dahcdn.blogspot.com";
  const labels = ["Darma co","Dress","Shoes","Mobile","Dot & Key","Cream"];
  const maxResults = 500;
  let collected = [], fetched = 0;

  labels.forEach(label=>{
    const s = document.createElement("script");
    s.src = `${blogUrl}/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json-in-script&max-results=${maxResults}&callback=collectPosts`;
    document.body.appendChild(s);
  });

  window.collectPosts = function(data){
    const entries = data.feed.entry || [];
    collected = collected.concat(entries);
    fetched++;
    if(fetched === labels.length){
      const entry = collected[Math.floor(Math.random() * collected.length)];
      if (!entry) return;
      const title = entry.title.$t;
      const defaultLink = entry.link.find(l => l.rel === "alternate").href;
      const imgMatch = entry.content.$t.match(/<img[^>]+src="([^">]+)/i);
      const img = imgMatch ? imgMatch[1] : "https://via.placeholder.com/300";
      const linkMatch = entry.content.$t.match(/<a[^>]+href="([^">]+)"/i);
      const firstLink = linkMatch ? linkMatch[1] : defaultLink;

      let descdHTML = entry.content.$t
        .replace(/<img[^>]*>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<(\/?)(b|i|u|em|strong|span|font|p|br|small|sub|sup|a)([^>]*)>/gi, "<$1$2$3>")
        .substring(0, 300);

      container.innerHTML = `
        <div class="ad-cardd">
          <a href="${firstLink}" class="ad-imaged" target="_blank">
            <div class="ad-labeld">AD</div>
            <img src="${img}" alt="${title}">
          </a>
          <div class="ad-textd">
            <h3>${title}</h3>
            <div class="descd">${descdHTML}</div>
            <a href="${firstLink}" class="ad-buttond" target="_blank">Get Now</a>
          </div>
        </div>
      `;

      overlay.classList.remove("hidden");
      let seconds = 15;
      const countdown = setInterval(()=>{
        seconds--;
        if(seconds>0){
          timerLabel.textContent = `Please wait ${seconds}s`;
        } else {
          clearInterval(countdown);
          timerLabel.textContent = "Close x";
          timerLabel.classList.add("closable");
          timerLabel.onclick = ()=>{
            overlay.classList.add("hidden");
            timerLabel.textContent = "Please wait 15s";
            timerLabel.classList.remove("closable");
            window.open(downloadLink, "_blank");
          };
        }
      },1000);
    }
  };
}

loadFiles();