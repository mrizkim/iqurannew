// index.html
$.getJSON("https://quran-api-id.vercel.app/surahs", function (data) {
  $.each(data, function (i, data) {
    const elemenList = ` <div class="item nama_s"  no-surah="${data.number}"><div class="no-surat">
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
    console.log(data);
    let surah = data.ayahs;
    console.log(surah);
    $.each(surah, function (i, data) {
      const elemenList = `<div class="item">
    <div class="no-surat">
    <p class="number">${data.number.inSurah}</p>
    </div>
    <div class="ayat">
    <h2>${data.arab}</h2>
    <p>${data.translation}</p>
    </div>
    </div>`;
      $("#item-surah").append(elemenList);
    });
  });
};

// doa.html

$.getJSON("http://doa-doa-api-ahmadramadhan.fly.dev/api", function (data) {
  $.each(data, function (i, data) {
    const elemenList = `<div class="item">
    <div class="no-surat">
    <p class="number">${data.id}</p>
    </div>
    <div class="doa">
    <h3>${data.doa}</h3>
    <h2>${data.ayat}</h2>
    <p>${data.latin}</p>
    <h4>" ${data.artinya} "</h4>
    </div>
    </div>`;

    $("#item-doa").append(elemenList);
  });
});
