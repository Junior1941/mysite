$(function() {
  var $grid = $('.gridder').isotope({
    itemSelector: '.grid-item',
    percentPosition: true
  });
  
  // filter items on button click
  $('.filterable-button').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
  
  $('.testi-carousel').owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    items: 1,
  });
  
  // Nice select
  $('.vg-select').niceSelect();
  
  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();
  
  // Page animation initialize
  new WOW().init();
  
  // Back to top
  var backTop = $(".btn-back_to_top");
  
  $(window).scroll(function() {
    if($(document).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    }
    else if($(document).scrollTop() < 400) {
      backTop.css('visibility', 'hidden');
    }
  });
  
  backTop.click(function() {
    $('html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
  
  $.fn.toggleSelected = function(options) {
    var defaults = $.extend({
      classes: 'selected',
      itemSelector: this.children(),
    });
    
    return this.each(function() {
      var o = defaults;
      var sel = o.itemSelector;
      
      sel.click(function() {
        var self = $(this);
        self.addClass(o.classes);
        self.siblings().removeClass(o.classes);
      });
    });
  };
  
  $('[data-toggle="selected"]').toggleSelected();
});

$(document).ready(function () {
  
  /* Sticky nvigation */
  
  var sticky = {
    $sticky: $('.sticky'),
    offsets: [],
    targets: [],
    stickyTop: null,
    
    set: function () {
      var self = this;
      
      var windowTop = Math.floor($(window).scrollTop());
      
      self.offsets = [];
      self.targets = [];
      
      // Get current top position of sticky element
      self.stickyTop = self.$sticky.data('offset') ? self.$sticky.css('position', 'absolute').data('offset') : self.$sticky.css('position', 'absolute').offset().top;
      
      // Cache all targets and their top positions
      self.$sticky.find('a').map(function () {
        var $el = $(this),
        href = $el.data('target') || $el.attr('href'),
        $href = /^#./.test(href) && $(href);
        
        return $href && $href.length && $href.is(':visible') ? [[$href[0].getBoundingClientRect().top + windowTop, href]] : null;
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0]);
        self.targets.push(this[1]);
      });
    },
    
    update: function () {
      var self = this;
      
      var windowTop = Math.floor($(window).scrollTop());
      var $stickyLinks = self.$sticky.find('.navbar-nav .nav-item').removeClass('active');
      var stickyPosition = 'fixed';
      var currentIndex = 0;
      
      // Toggle fixed position depending on visibility
      if ($(window).width() < 800 || $(window).height() < 500 || self.stickyTop > windowTop) {
        stickyPosition = 'absolute';
        self.$sticky.removeClass('floating');
        
      } else {
        
        for (var i = self.offsets.length; i--;) {
          if (windowTop >= self.offsets[i] - 2 && (self.offsets[i + 1] === undefined || windowTop <= self.offsets[i + 1] + 2)) {
            currentIndex = i;
            
            break;
          }
        }
        
      }
      
      self.$sticky.css({ 'position': stickyPosition});
      
      if(stickyPosition == 'absolute') {
        self.$sticky.removeClass('floating');
      }
      else {
        self.$sticky.addClass('floating');
      }
      
      $stickyLinks.eq(currentIndex).addClass('active');
    },
    
    init: function () {
      var self = this;
      
      $(window).on('resize', function () {
        self.set();
        
        self.update();
      });
      
      $(window).on('scroll', function () {
        self.update();
      });
      
      $(window).trigger('resize');
    }
  }
  
  if($('.navbar').hasClass('sticky')) {
    sticky.init();
  }
  
});

$(document).ready(function() {
  $('#sideel').click(function() {
    $(this).parents('.config').toggleClass('active');
  });
  
  $('body').data('bodyClassList', '');
  
  $('.color-item').click(function() {
    var cls = $(this).data('class');
    
    $('body').attr('class', $('body').data('bodyClassList'));
    $('body').addClass(cls);
  });
  
  $('#change-page').on('change', function() {
    var url = $(this).val() + '.html';
    
    if($(this).val()) {
      window.location.assign(url);
    }
  });
  
  $('[data-animate="scrolling"]').each(function() {
    var self = $(this);
    var target = $(this).data('target') ? $(this).data('target') : $(this).attr('href');
    
    self.click(function(e) {
      $('body, html').animate({ scrollTop: $(target).offset().top }, 1000);
      return false;
    });
  });
});


/*
 *  Counter
 *
 *  Require(" jquery.animateNumber.min.js ", " jquery.waypoints.min.js ")
 */
$(document).ready(function() {
  var counterInit = function() {
    if ( $('.section-counter').length > 0 ) {
      $('.section-counter').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
          $('.number').each(function(){
            var $this = $(this),
              num = $this.data('number');
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step
              }, 5000
            );
          });
          
        }

      } , { offset: '95%' } );
    }

  }
  counterInit();
});



// /--------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

// -------------------------------------------------------------------------------------------------------------------------------------------

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

// JAVASCRIPT //

// หาความยาวเส้นรอบวง //

function calculateCircleCircumference(radius) {
  return 2 * Math.PI * radius;
}
function calculateAndDisplayCircumference() {
  let inputElement = document.getElementById('input');
  let resultElement = document.getElementById('show3');

  let radius = parseFloat(inputElement.value);

  if (!isNaN(radius)) {
      let circumference = calculateCircleCircumference(radius);
      resultElement.textContent = circumference.toFixed(2);
  } else {
      resultElement.textContent = 'กรุณากรอกค่าที่ถูกต้อง';
  }
}

// หาความยาวเส้นแทยงสี่เหลี่ยมผืนผ้า //

function calculateHypotenuse(base, height) {
  let result = Math.sqrt(base ** 2 + height ** 2);
  document.getElementById('show5').innerHTML = result.toFixed(3);
}


// แยกฟังก์ชันที่เกี่ยวข้องกับการแปลงอุณหภูมิ //
function fahrenheitToCelsius() {
  let inputFahrenheit = prompt("Enter temperature in Fahrenheit:");
  let celsiusValue = (parseFloat(inputFahrenheit) - 32) * (5 / 9);
  document.getElementById(
    "show1"
  ).innerText = `Fahrenheit: ${inputFahrenheit}°F, Celsius: ${celsiusValue.toFixed(
    2
  )}°C`;
}

// ฟังก์ชันคำนวณคะแนน //
function number() {
  let number = prompt('What is your number');
  let grade;

  if (number > 80) {
      grade = 'A';
  } else if (number < 80 && number >= 70) {
      grade = 'B';
  } else if (number < 70 && number >= 60) {
      grade = 'C';
  } else if (number < 60 && number >= 50) {
      grade = 'D';
  } else {
      grade = 'F';
  }
  document.getElementById('number').innerHTML = `คะแนนเกรดของคุณ : ${grade}`;
}


// แยกฟังก์ชันที่เกี่ยวข้องกับการแปลงวันเป็นวินาที //
function dayToSeconds() {
  let inputDays = document.getElementById("daysInput").value;
  if (!isNaN(inputDays)) {
    let seconds = inputDays * 86400;
    document.getElementById(
      "show2"
    ).innerText = `จำนวนวัน : ${inputDays} วัน, ${seconds} นาที`;
  } else {
    alert("Please enter a valid number of days.");
  }
}


// -------------------------------------------------------------------------------------------------------------------------------------------

// แยกฟังก์ชันที่เกี่ยวข้องกับ Chart.js //
// Chart.js //
function createPolarAreaChart() {
  var ctx = document.getElementById("polarAreaChart").getContext("2d");
  var data = {
    labels: ["snake", "Fish", "rabbit", "Cat", "Dog"],
    datasets: [
      {
        data: [10, 20, 35, 25, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };
  var options = {};

  var myChart = new Chart(ctx, {
    type: "polarArea",
    data: data,
    options: options,
  });
}

createPolarAreaChart();

// Chart.js2 //
const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};



// Form //


// -------------------------------------------------------------------------------------------------------------------------------------------

// Nationalize API //
function fetchNationality() {
  var name = document.getElementById('name').value;
  if (name.trim() === "") {
      alert("Please enter a name");
      return;
  }

  fetch(`https://api.nationalize.io?name=${name}`)
      .then(response => response.json())
      .then(data => {
          displayResult(data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          alert('Error fetching data. Please try again.');
      });
}

// Your displayResult function
function displayResult(data) {
  var resultDiv = document.getElementById('result');
  var countryData = data.country[0];

  if (countryData) {
      var countryId = countryData.country_id;
      var probability = (countryData.probability * 100).toFixed(2);
      resultDiv.innerHTML = `<p>Your most likely country is ${countryId} with a probability of ${probability}%.</p>`;
  } else {
      resultDiv.innerHTML = "<p>No data available for the provided name.</p>";
  }
}


// แยกฟังก์ชันที่เกี่ยวข้องกับ API Crypto //
// API CRYPTO //
function fetchPrices() {
  var now = new Date();
  var currentTime = now.toLocaleTimeString();

  fetch('https://api.coinbase.com/v2/exchange-rates?currency=USDT')
      .then(response => response.json())
      .then(data => {
          displayPrices(data);
          displayLastUpdateTime(currentTime);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          alert('Error fetching data. Please try again.');
      });
}

function displayPrices(data) {
  var pricesDiv = document.getElementById('prices');
  var rates = data.data.rates;

  var currencies = ['1INCH', 'AAVE', 'ABT', 'ACH', 'ACS', 'ADA', 'AED', 'BTC', 'ETH'];
  var pricesHtml = '<p>1 USDT can buy:</p><ul>';

  currencies.forEach(currency => {
      if (rates[currency]) {
          pricesHtml += `<li>${currency}: ${rates[currency]}</li>`;
      } else {
          pricesHtml += `<li>${currency}: N/A</li>`;
      }
  });

  pricesHtml += '</ul>';
  pricesDiv.innerHTML = pricesHtml;
}

function displayLastUpdateTime(currentTime) {
  var updateTimeDiv = document.getElementById('lastUpdateTime');
  updateTimeDiv.innerHTML = `<p>Last Update Time: ${currentTime}</p>`;
}

fetchPrices();

setInterval(fetchPrices, 3000);



