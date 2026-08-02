/* ======================================================
   HAPPY BIRTHDAY WEBSITE
   SCRIPT.JS
   PART 1
====================================================== */

const scenes = document.querySelectorAll(".scene");

const loader = document.getElementById("loader");

const startBtn = document.getElementById("startBtn");

const bgMusic = document.getElementById("bgMusic");

const progressBar = document.getElementById("progressBar");

const countNumber = document.getElementById("countNumber");

const typingText = document.getElementById("typingText");

const loveBtn = document.getElementById("loveBtn");

let currentScene = 0;

let autoSlide;

const sceneDuration = 9000;

/* ==========================================
            LOVE LETTER
========================================== */

const letter = `

Selamat ulang tahun ya, sayangkuu. ❤️

Makasih ya sudah ada dan bertahan sejauh ini. Aku bersyukur buangett bisa ketemu kamu dan jalan bareng sama kamu sampai detik ini.

Makasih juga buat kesabaranmu ngadepin aku. Aku sadar aku masih banyak kurangnya. Kurang duit contohnya ehehe... Tapi aku bakal terus berusaha jadi pasangan yang baik dan yang selalu ngertiin kamu. Banyak hal kecil yang kamu lakuin selama ini yang paling berarti buat aku seperti cara kamu peduli sama aku, perhatian and everything you do.

Ga terasa juga perjalanan kita sudah sejauh ini, hampir 4 tahun hubungan ini terus berlanjut dan semoga untuk waktu yang sangat lama. Semua berawal dari iseng-iseng, ingin kenal kamu lebih lanjut hingga aku memutuskan bertemu kamu untuk pertama kalinya di Kopi Clebek, terdengar lucu yaa tapi itulah awal perjalanan kita. Ga cuma itu masih banyak lain cerita yang sudah kita lalui dari hal yang sederhana pun selalu jadi cerita yang berkesan.

Di umur yang ke-23 ini, semoga semua hal yang kamu inginkan pelan-pelan bisa tercapai, jadi miliarder kan yahh?? Aamiin. Semoga sayangkuu selalu sehat, bahagia dan dijauhkan dari hal-hal yang bikin capek pikiran. Aamiin ya Allah.

Kalau nanti ada hari-hari yang terasa berat, inget ya kamu ga sendirian. Ada SUPERMAN disini, siap nemenin dan dengerin kapan saja.. HAHAHA

Selamat bertambah usia yang ke-23 sayangkuu. Semoga kita masih punya banyak waktu buat tumbuh dan jalan bareng ke depannya.

Aku sayang kamu❤️

`;

/* ==========================================
            LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("loaderHide");

    },2000);

});

/* ==========================================
            SHOW SCENE
========================================== */

function showScene(index){

    scenes.forEach(scene=>{

        scene.classList.remove("active");

    });

    scenes[index].classList.add("active");

    currentScene = index;

    updateProgress();

}

/* ==========================================
            PROGRESS BAR
========================================== */

function updateProgress(){

    const percent =

    ((currentScene+1)/scenes.length)*100;

    progressBar.style.width = percent + "%";

}

/* ==========================================
            START BUTTON
========================================== */

startBtn.addEventListener("click",()=>{

    if(bgMusic){

        bgMusic.volume = 0.4;

        bgMusic.play().catch(()=>{});

    }

    startCountdown();

});

/* ==========================================
            COUNTDOWN
========================================== */

function startCountdown(){

    showScene(1);

    let number = 3;

    countNumber.innerHTML = number;

    const timer = setInterval(()=>{

        number--;

        if(number>0){

            countNumber.innerHTML = number;

        }

        if(number===0){

            countNumber.innerHTML = "❤️";

        }

        if(number<0){

            clearInterval(timer);

            showScene(2);

            startStory();

        }

    },1000);

}

/* ==========================================
            STORY
========================================== */

function startStory(){

    let page = currentScene + 1;

    autoSlide = setInterval(()=>{

        if(page >= scenes.length){

            clearInterval(autoSlide);

            return;

        }

        showScene(page);

        if(page === 6){

        clearInterval(autoSlide);

        typeLetter();

        }

        page++;

    },sceneDuration);

}

/* ==========================================
            TYPEWRITER
========================================== */

let typingIndex = 0;

function typeLetter(){

    typingText.innerHTML = "";

    typingIndex = 0;

    typingLoop();

}

function typingLoop(){

    if(typingIndex < letter.length){

        typingText.innerHTML += letter.charAt(typingIndex);

        typingText.scrollTop = typingText.scrollHeight;
        
        typingIndex++;

        setTimeout(typingLoop,50);

    }else{

        setTimeout(()=>{

            nextScene();

            startStory();

        },3000);

    }

}

/* ==========================================
            NEXT
========================================== */

function nextScene(){

    if(currentScene < scenes.length-1){

        showScene(currentScene+1);

    }

}

/* ==========================================
            PREVIOUS
========================================== */

function prevScene(){

    if(currentScene >0){

        showScene(currentScene-1);

    }

}

/* ==========================================
            KEYBOARD
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextScene();

    }

    if(e.key==="ArrowLeft"){

        prevScene();

    }

});

/* ==========================================
            TOUCH
========================================== */

let touchStart = 0;

let touchEnd = 0;

document.addEventListener("touchstart",(e)=>{

    touchStart = e.changedTouches[0].screenX;

});

document.addEventListener("touchend",(e)=>{

    touchEnd = e.changedTouches[0].screenX;

    if(touchStart-touchEnd>70){

        nextScene();

    }

    if(touchEnd-touchStart>70){

        prevScene();

    }

});

/* ==========================================
            LOVE BUTTON
========================================== */

if(loveBtn){

    loveBtn.addEventListener("click",()=>{

        alert("Peluk Virtual ❤️");

    });

}

/* ==========================================
            INIT
========================================== */

showScene(0);

updateProgress();

/* ======================================================
   SCRIPT.JS
   PART 2
   Animation Engine
====================================================== */

/* ==========================================
            HEART RAIN
========================================== */

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    const hearts = ["❤️","💖","💕","💗","💓"];

    heart.innerHTML =
        hearts[Math.floor(Math.random()*hearts.length)];

    heart.style.left = Math.random()*100 + "vw";

    heart.style.fontSize =
        (18 + Math.random()*24) + "px";

    heart.style.animationDuration =
        (5 + Math.random()*5) + "s";

    heart.style.setProperty(
        "--move",
        (Math.random()*200-100)+"px"
    );

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,900);


/* ==========================================
            SHOOTING STAR
========================================== */

function shootingStar(){

    const star = document.createElement("div");

    star.className="shooting-star";

    star.style.top =
        Math.random()*40 + "vh";

    star.style.left =
        (80 + Math.random()*20)+"vw";

    star.style.animation =
        "shooting 1.4s linear forwards";

    document.querySelector(".background")
        .appendChild(star);

    setTimeout(()=>{

        star.remove();

    },1600);

}

setInterval(shootingStar,7000);


/* ==========================================
            FLOATING SPARKLE
========================================== */

function createSparkle(){

    const s = document.createElement("div");

    s.className="sparkle";

    s.style.left =
        Math.random()*100+"vw";

    s.style.top =
        (60+Math.random()*40)+"vh";

    document.body.appendChild(s);

    setTimeout(()=>{

        s.remove();

    },3000);

}

setInterval(createSparkle,500);


/* ==========================================
            GALLERY EFFECT
========================================== */

const galleryImages =
document.querySelectorAll(".gallery img");

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        img.classList.toggle("zoom");

    });

});


/* ==========================================
            PHOTO PARALLAX
========================================== */

const photos =
document.querySelectorAll(".photo");

document.addEventListener("mousemove",(e)=>{

    const x =
    (window.innerWidth/2-e.clientX)/80;

    const y =
    (window.innerHeight/2-e.clientY)/80;

    photos.forEach(photo=>{

        photo.style.transform=
        `translate(${x}px,${y}px)`;

    });

});


/* ==========================================
            MUSIC BUTTON
========================================== */

const musicBtn =
document.createElement("div");

musicBtn.className="musicBtn";

musicBtn.innerHTML="🎵";

document.body.appendChild(musicBtn);

musicBtn.onclick=()=>{

    if(bgMusic.paused){

        bgMusic.play();

        musicBtn.innerHTML="🎵";

    }else{

        bgMusic.pause();

        musicBtn.innerHTML="🔇";

    }

};


/* ==========================================
            AUTO GALLERY ZOOM
========================================== */

let galleryIndex=0;

function autoGallery(){

    if(galleryImages.length===0) return;

    galleryImages.forEach(img=>{

        img.style.transform="scale(1)";

    });

    galleryImages[galleryIndex]
        .style.transform="scale(1.12)";

    galleryIndex++;

    if(galleryIndex>=galleryImages.length){

        galleryIndex=0;

    }

}

setInterval(autoGallery,2500);


/* ==========================================
            SCENE TITLE EFFECT
========================================== */

const titles =
document.querySelectorAll("h1");

function titlePulse(){

    titles.forEach(title=>{

        title.animate(

        [

            {
                transform:"scale(1)"
            },

            {
                transform:"scale(1.03)"
            },

            {
                transform:"scale(1)"
            }

        ],

        {

            duration:2500

        });

    });

}

setInterval(titlePulse,3000);


/* ==========================================
            LOVE BUTTON EFFECT
========================================== */

if(loveBtn){

loveBtn.addEventListener("click",()=>{

    for(let i=0;i<40;i++){

        setTimeout(()=>{

            createHeart();

        },i*60);

    }

});

}


/* ==========================================
            BACKGROUND BREATHING
========================================== */

const bg =
document.querySelector(".background");

let scale=1;

let direction=1;

setInterval(()=>{

    scale+=0.0005*direction;

    if(scale>=1.02){

        direction=-1;

    }

    if(scale<=1){

        direction=1;

    }

    bg.style.transform=
        `scale(${scale})`;

},30);


/* ==========================================
            END PART 2
========================================== */

/* ======================================================
   SCRIPT.JS
   PART 3
   Ending Engine
====================================================== */

/* ==========================================
            FIREWORK
========================================== */

function firework(x, y) {

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.width = "6px";
        particle.style.height = "6px";
        particle.style.borderRadius = "50%";
        particle.style.pointerEvents = "none";

        particle.style.background =
            `hsl(${Math.random() * 360},100%,70%)`;

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;

        const distance = 80 + Math.random() * 100;

        let progress = 0;

        const timer = setInterval(() => {

            progress += 3;

            particle.style.left =
                x + Math.cos(angle) * progress + "px";

            particle.style.top =
                y + Math.sin(angle) * progress + "px";

            particle.style.opacity =
                1 - progress / distance;

            if (progress >= distance) {

                clearInterval(timer);

                particle.remove();

            }

        }, 16);

    }

}

/* ==========================================
            AUTO FIREWORK
========================================== */

function randomFirework() {

    firework(

        Math.random() * window.innerWidth,

        Math.random() * (window.innerHeight * 0.6)

    );

}

setInterval(randomFirework, 6000);

/* ==========================================
            HAPPY BIRTHDAY EFFECT
========================================== */

const scene3 = document.getElementById("scene3");

const observer = new MutationObserver(() => {

    if (scene3.classList.contains("active")) {

        createConfetti();

        firework(
            window.innerWidth / 2,
            window.innerHeight / 3
        );

    }

});

observer.observe(scene3, {

    attributes: true

});

/* ==========================================
            LOVE RAIN
========================================== */

function massiveHeartRain() {

    let total = 100;

    const timer = setInterval(() => {

        createHeart();

        total--;

        if (total <= 0) {

            clearInterval(timer);

        }

    }, 80);

}

/* ==========================================
            LOVE BUTTON
========================================== */

if (loveBtn) {

    loveBtn.addEventListener("click", () => {

        massiveHeartRain();

        createConfetti();

        firework(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        loveBtn.innerHTML = "❤️ I Love You ❤️";

        loveBtn.disabled = true;

    });

}

/* ==========================================
            ENDING REPLAY
========================================== */

function replayStory() {

    currentScene = 0;

    showScene(0);

    updateProgress();

}

const lastScene = document.getElementById("scene13");

const endObserver = new MutationObserver(() => {

    if (lastScene.classList.contains("active")) {

        setTimeout(() => {

            const replay = document.createElement("button");

            replay.innerHTML = "🔄 Lihat Lagi";

            replay.style.marginTop = "30px";

            replay.onclick = () => {

                replay.remove();

                replayStory();

            };

            lastScene.appendChild(replay);

        }, 4000);

    }

});

endObserver.observe(lastScene, {

    attributes: true

});

/* ==========================================
            SCREEN FADE
========================================== */

function fadeOutScene(scene) {

    scene.style.opacity = 0;

}

function fadeInScene(scene) {

    scene.style.opacity = 1;

}

/* ==========================================
            VIBRATION
========================================== */

function vibrate(ms = 100) {

    if (navigator.vibrate) {

        navigator.vibrate(ms);

    }

}

if (startBtn) {

    startBtn.addEventListener("click", () => {

        vibrate(120);

    });

}

if (loveBtn) {

    loveBtn.addEventListener("click", () => {

        vibrate([100, 50, 100]);

    });

}



async function enterFullscreen() {

    try {

        if (document.documentElement.requestFullscreen) {

            await document.documentElement.requestFullscreen();

        }

    } catch (e) {

        // browser mungkin tidak mengizinkan

    }

}



let lastTap = 0;

document.addEventListener("touchend", () => {

    const now = new Date().getTime();

    if (now - lastTap < 350) {

        enterFullscreen();

    }

    lastTap = now;

});



function musicFadeIn() {

    if (!bgMusic) return;

    bgMusic.volume = 0;

    const timer = setInterval(() => {

        bgMusic.volume += 0.05;

        if (bgMusic.volume >= 0.4) {

            bgMusic.volume = 0.4;

            clearInterval(timer);

        }

    }, 200);

}

if (startBtn) {

    startBtn.addEventListener("click", musicFadeIn);

}

console.log("Birthday Website Loaded ❤️");
