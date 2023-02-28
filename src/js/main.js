// index.html
const indexPage = () => {
  function showSurah() {
    $.getJSON("https://quran-api-id.vercel.app/surahs", function (data) {
      $.each(data, function (i, data) {
        const elemenList = ` <div class="item nama_s"  no-surah="${data.number}" nama-surah="${data.name}"><div class="no-surat">
      <p class="number" >${data.number}</p>
      </div>
      <div class="nama-surat ">
      <h2>${data.name}</h2>
      <p>${data.translation}</p>
      </div>
      <div class="jumlah-ayat">
      <p>${data.numberOfAyahs} ayat</p>
      </div>
      </div>`;

        $("#list-item").append(elemenList);
      });

      $(".nama_s").click(function () {
        document.location.href = `surah.html?${$(this).attr("no-surah")}`;
      });
    });
  }
  showSurah();

  $("#searching").on("keyup", function () {
    var value = $("#searching").val().toLowerCase();
    let content = "";
    var myExp = new RegExp(value, "i");

    if (value == 0) {
      showSurah();
      return;
    }
    $.getJSON("https://quran-api-id.vercel.app/surahs", function (data) {
      $.each(data, function (i, data) {
        let replaceData = data.name.replace("-", " ");
        let replaceDataNonS = replaceData.replaceAll("'", "");
        if (replaceDataNonS.search(myExp) != -1) {
          content += ` <div class="item nama_s"  no-surah="${data.number}" nama-surah="${data.name}"><div class="no-surat">
        <p class="number" >${data.number}</p>
        </div>
        <div class="nama-surat ">
        <h2>${data.name}</h2>
        <p>${data.translation}</p>
        </div>
        <div class="jumlah-ayat">
        <p>${data.numberOfAyahs} ayat</p>
        </div>
        </div>`;
        }
      });

      $("#list-item").html(content);
      $(".nama_s").click(function () {
        document.location.href = `surah.html?${$(this).attr("no-surah")}`;
      });
    });
  });
};

// surah.html

const surahPage = () => {
  const url = window.location.href;
  let no_s = "";
  let no_a;
  if (url.search("#") != -1) {
    no_s = url.substring(url.indexOf("?") + 1, url.indexOf("#"));
    no_a = url.substr(url.indexOf("#") + 1);
  } else {
    no_s = url.substr(url.indexOf("?") + 1);
  }

  const url_api = `https://quran-api-id.vercel.app/surahs/${no_s}`;

  $.getJSON(url_api, function (data) {
    let surah = data.ayahs;
    $.each(surah, function (i, data) {
      const elemenList = `<div class="item">
    <div class="no-surat">
    <p class="number" >${data.number.inSurah}</p>
    <i class='bx bx-play play' list-audio='${data.audio.alafasy}' style='font-size: 3.5rem; margin-top:2rem' ></i>
    </div>
    <div class="ayat">
    <h2>${data.arab}</h2>
    <p>${data.translation}</p>
    </div>
    </div>`;

      $("#item-surah").append(elemenList);
    });

    let isNotPlayingSomething = true;

    $(".play").click(function () {
      if (isNotPlayingSomething) {
        isNotPlayingSomething = false;
        const audio = $(this).attr("list-audio");
        const playAudio = new Audio(audio);
        playAudio.addEventListener("ended", function () {
          isNotPlayingSomething = true;
        });
        playAudio.play();
      }
    });
  });
};

// doa.html
const doaPage = () => {
  $.getJSON("https://islamic-api-zhirrr.vercel.app/api/doaharian", function (data) {
    let doa = data.data;
    $.each(doa, function (i, data) {
      const elemenList = `<div class="item">
    <div class="no-surat">
    <p class="number">${i + 1}</p>
    </div>
    <div class="doa">
    <h3>${data.title}</h3>
    <h2>${data.arabic}</h2>
    <p>${data.latin}</p>
    <h4>" ${data.translation} "</h4>
    </div>
    </div>`;

      $("#item-doa").append(elemenList);
      i++;
    });
  });
};

// jadwalSholat.html
const jadwalPage = () => {
  $.getJSON("https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json", function (data) {
    $.each(data, function (i, data) {
      const elemenList = `
    <option value="${data}">${data}</option>`;
      $("#dropdown-jadwal").append(elemenList);
    });
  });

  $("#dropdown-jadwal").on("change", function () {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const year = d.getFullYear();
    const day = d.getDate().toString().length === 1 ? `0${d.getDate()}` : d.getDate();
    const value = $("#dropdown-jadwal option:selected").val();
    const newValue = `${value}/${year}/${month}`;
    let content = "";

    const apiSholat = `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${newValue}.json`;
    $.getJSON(apiSholat, function (data) {
      $.each(data, function (i, data) {
        const currentDate = `${year}-${month}-${day}`;
        if (currentDate === data.tanggal) {
          content += ` 

        <h2>${value} || ${currentDate}</h2>
        <div class="item-sholat">
        <div style="display: flex; align-items: center">
        <i class='bx bxs-time'></i>
        <h1>Imsyak</h1>
        </div>
        <p class="number" >${data.imsyak}</p>
        </div>
  

        <div class="item-sholat">
        <div style="display: flex">
        <i class='bx bxs-time'></i>
        <h1>Shubuh</h1>
        </div>
        <p class="number" >${data.shubuh}</p>
        </div>
        
        <div class="item-sholat">
        <div style="display: flex">
        <i class='bx bxs-time'></i>
        <h1>Dhuha</h1>
        </div>
        <p class="number" >${data.dhuha}</p>
        </div>
        
        <div class="item-sholat">
        <div style="display: flex">
        <i class='bx bxs-time'></i>
        <h1>Dzuhur</h1>
        </div>
        <p class="number" >${data.dzuhur}</p>
        </div>
        
        <div class="item-sholat">
        <div style="display: flex">
        <i class='bx bxs-time'></i>
        <h1>Ashr</h1>
        </div>
        <p class="number" >${data.ashr}</p>
        </div>
        
        <div class="item-sholat">
        <div style="display: flex">
        <i class='bx bxs-time'></i>
        <h1>Magrib</h1>
        </div>
        <p class="number" >${data.magrib}</p>
        </div>
        
        <div class="item-sholat">
        <div style="display: flex">
        <i class='bx bxs-time'></i>
        <h1>Isya</h1>
        </div>
        <p class="number" >${data.isya}</p>
        </div>`;
        }
      });

      $("#list-jadwal").html(content);
    });
  });
};

// NGAJI.HTML
const ngajiPage = () => {
  $("#dropdown-ngaji").on("change", function () {
    const value = $("#dropdown-ngaji option:selected").val();
    if (value === "hijaiyah") {
      var x = document.getElementById("content-hijaiyah");
      var y = document.getElementById("list-nabi");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
        y.style.display = "none";
      }
    } else if (value === "nabi") {
      var x = document.getElementById("content-hijaiyah");
      var y = document.getElementById("list-nabi");
      if (y.style.display === "block") {
        y.style.display = "none";
      } else {
        y.style.display = "block";
        x.style.display = "none";
      }
    } else {
      var x = document.getElementById("content-hijaiyah");
      var y = document.getElementById("list-nabi");
      y.style.display = "none";
      x.style.display = "none";
    }
  });

  // $("#hijaiyah").click(function () {
  //   var x = document.getElementById("content-hijaiyah");
  //   var y = document.getElementById("list-nabi");
  //   if (x.style.display === "block") {
  //     x.style.display = "none";
  //   } else {
  //     x.style.display = "block";
  //     y.style.display = "none";
  //   }
  // });

  // $("#kisah-nabi").click(function () {
  //   var x = document.getElementById("content-hijaiyah");
  //   var y = document.getElementById("list-nabi");
  //   if (y.style.display === "block") {
  //     y.style.display = "none";
  //   } else {
  //     y.style.display = "block";
  //     x.style.display = "none";
  //   }
  // });

  // KISAH NABI
  $.getJSON("https://islamic-api-zhirrr.vercel.app/api/kisahnabi", function (data) {
    $.each(data, function (i, data) {
      const elemenList = `<div class="content hideContent">
  <h1>${data.name}</h1>
  <p class="kisah">${data.description}</p>
</div>

<div id="show-more">
        <p>Show more</p>
    </div>`;

      $("#list-nabi").append(elemenList);
    });

    $("#show-more p").on("click", function () {
      var showMore = $(this);
      var content = showMore.parent().prev("div.content");
      var linkText = showMore.text().toUpperCase();
      if (linkText === "SHOW MORE") {
        linkText = "Show less";
        content.switchClass("hideContent", "showContent", 100);
      } else {
        linkText = "Show more";
        content.switchClass("showContent", "hideContent", 100);
      }

      showMore.text(linkText);
    });
  });
};

// KALENDER
const kalenderPage = () => {
  const d = new Date();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  const day = d.getDate().toString().length === 1 ? `0${d.getDate()}` : d.getDate();
  // const day = ("0" + (d.getDate() + 1)).slice(-2);
  // const value = $("#dropdown-jadwal option:selected").val();
  const newValue = `bogor/${year}/${month}`;
  console.log(day);
  let content = "";

  const apiSholat = `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${newValue}.json`;
  $.getJSON(apiSholat, function (data) {
    $.each(data, function (i, data) {
      content += ` 
      <tr>
        <td style="width: 25rem" id="mountDate">${data.tanggal}</td>
        <td class="dateTime">${data.imsyak}</td>
        <td class="dateTime">${data.shubuh}</td>
        <td class="dateTime">${data.dhuha}</td>
        <td class="dateTime">${data.dzuhur}</td>
        <td class="dateTime">${data.ashr}</td>
        <td class="dateTime">${data.magrib}</td>
        <td class="dateTime">${data.isya}</td>
      </tr>

        `;
    });

    $("#kalender").html(content);

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     var lat = position.coords.latitude;
    //     var lng = position.coords.longitude;
    //     console.log("Latitude: " + lat + ", Longitude: " + lng);
    //   });
    // } else {
    //   console.log("Geolocation is not supported by this browser.");
    // }
  });
};
