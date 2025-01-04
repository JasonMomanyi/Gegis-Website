$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value.toLowerCase();
        const errorMessage = document.getElementById('error-message');

        if (email.includes('jkuat')) {
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        } else {
            errorMessage.style.display = 'block';
        }
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // EmailJS to mail contact form data
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
    });

    // Background audio functionality
    const audioElement = document.getElementById("background-audio");

    const enableAudio = () => {
        audioElement.play().then(() => {
            console.log("Audio started playing.");
        }).catch((error) => {
            console.log("Audio autoplay blocked. Waiting for user interaction.");
        });
    };

    // Attach event listeners for user interaction
    document.body.addEventListener("click", enableAudio, { once: true });
    document.body.addEventListener("touchstart", enableAudio, { once: true });
});

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Website | GEGIS-28'";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Website💅";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// Typed.js effect starts
var typed = new Typed(".typing-text", {
    strings: ["Access Materials💅", "View Events👁️‍🗨️", "Upload Docs", "Upload Photos", "Check for Events🤳", "Review Exam and Cat Periods", "Interact Online with coursemates"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// Show skills
function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

// Show gallery
function showGallery(gallery) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    gallery.slice(0, 10).filter(item => item.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/gallery/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
    projectsContainer.innerHTML = projectHTML;

    // Tilt.js effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

    // Scroll Reveal Animation
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.work .box', { interval: 200 });
}

fetchData().then(data => {
    showSkills(data.skills);
    showGallery(data.gallery);
});

// Tilt.js effect initialization
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};

// Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// Scroll Reveal Animation
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});




    const ws = new WebSocket('wss://your-websocket-server-url');

    ws.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'user-list') {
            updateUserList(message.users);
        } else if (message.type === 'chat-message') {
            addChatMessage(message.user, message.text);
        }
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    document.getElementById('chat-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const message = input.value;
        input.value = '';
        ws.send(JSON.stringify({ type: 'chat-message', text: message }));
    });

    function updateUserList(users) {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user;
            userList.appendChild(li);
        });
    }

    function addChatMessage(user, text) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.textContent = `${user}: ${text}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
// Scroll Reveal for different sections
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .telegram', { interval: 600 });

srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

srtop.reveal('.resources .container', { interval: 200 });
srtop.reveal('.resources .container .bar', { delay: 400 });

srtop.reveal('.lectures .box', { interval: 200 });

srtop.reveal('.work .box', { interval: 200 });

srtop.reveal('.events .timeline', { delay: 400 });
srtop.reveal('.events .timeline .container', { interval: 800 });

srtop.reveal('.contact .container', { delay: 200 });
srtop.reveal('.contact .container .form-group', { delay: 200 });