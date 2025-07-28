const phrases = [
    `Phoenix: Reconnect. Reboot. Rise.`,
    `Burn Bright. Game Bold. Phoenix.`,
    `Your Game. Revived. Phoenix.`,
    `Rise from the Ashes. Game Without Limits.`,
    `Victory Forged in Flame.`,
   `Game Reborn. Phoenix Unleashed.`,
    `Where Every Ending Is a New Beginning.`,
    `Resilience in Every Connection. Phoenix Power.`,
    `Fueling Your Next Level—Phoenix.`,
    `Burn Past Boundaries—Phoenix`,
    `From Embers to Excellence.`,
    `made at school--7-7-7-8`,
    `made with javascript--7-7-7-8`,
    `thanks voucan--7-7-7-8`,
    `Every Restart Is Legendary—Phoenix`,
    `Let Every Crash Be a New Dawn.`,
    `When Others Burn Out, We Ignite—Phoenix`,
    `Ashes Aren’t the End—They’re the Beginning.`,
    `Evolve With Every Ember.`,
    `Rise Relentless. Burn Brighter—Phoenix.`,
    `Ascend Beyond Limits—Phoenix`,
    `Reignite. Reimagine. Phoenix Unleashed.`,
    `Every Failure Fuels the Flames of Victory.`,
    `Setbacks Fade, Phoenix Prevails.`,
    `Rise Relentless, Surf Advanced—Phoenix Proxies.`,
    `Blazing Fast. Next-Level Secure. Forever Phoenix.`,
    `Born From Ashes. Powered by Precision.`,
    `Made on a chromebook--7-7-7-8`,
    `The Fire of Rebirth. The Tech of Tomorrow.`,
    `Rise Unstoppable—Blocked Nowhere, Phoenix Proxies.`,
    `Break Barriers, Blaze Trails—The Unblockable Phoenix.`,
    `Rise, Code, Conquer—Phoenix Powers Your Projects.`,
    `Bypass Borders. Burn Bright. Phoenix Proxy.`,
    `Phoenix: Unbounded, Unrestricted, Unstoppable.`,
    `splash-messages.js`,
    `stealth mode engaged`,
    `this site bypasses everything`,
    `📎 unblocked since 2025 (how long till blocked?)`,
    `P H O E N I X`,
    `1 vCPU, 4 GB RAM, 20 GB Storage, dont use it all. seriously.`,
    `tip: use {hostname}/cloak, it doesent show on your history!`,
    `no ads!`,
    `i spent like 3 months making this site, your welcome for all my hard work`,
    `80+ games!`,
    `currently the time is: {time}`,
    `currently you are on: {hostname}`,
    `what games should i add?`,
    `you can turn off the particles in settings`,
    `{hostname} ≫ classroom.google.com`,
    `ctrl+d to save!`,
    `wifi’s down, but proxy’s up`,
    `school wifi speed: 0.01 kb/s`,
    `i’m just a splash message`,
    `console.log('hello world')`,
    `50% Code, 50% Innovation, 0% Boundaries — Phoenix`,
    `i speak fluent javascript: function saySeeICan(){console.log("See, I can");} saySeeICan();`,
    `use {hostname}/cloak, thank me later--7-7-7-8`,
    `if bored → open devtools--7-7-7-8`,
    `90% HTML, 10% JS, Infinite Possibilities — Phoenix Proxy`,
    `73.2% HTML, 25.6% Javascript, 0% homework--7-7-7-8`,
];

const paragraph = document.getElementById('dynamicParagraph');
paragraph.style.userSelect = 'none';

let userIP = null;
let flipped = false;
let currentPhrase = null;

function setFlip(state) {
        flipped = state;
        const rotation = flipped ? "180deg" : "0deg";
        ["transform", "-ms-transform", "-webkit-transform", "-o-transform", "-moz-transform"]
        .forEach(prefix => {
                document.body.style[prefix] = `rotate(${rotation})`;
        });
}

function resetFlip() {
        if (flipped) setFlip(false);
}

function getRandomPhrase() {
        if (phrases.length === 1) return phrases[0];
        let phrase;
        let attempts = 0;
        do {
                phrase = phrases[Math.floor(Math.random() * phrases.length)];
                attempts++;
                if (attempts > 10) break;
        } while (phrase === currentPhrase);
        return phrase;
}

async function changeText() {
        let randomPhrase = getRandomPhrase();
        currentPhrase = randomPhrase;

        if (typeof randomPhrase === "string") {
                if (randomPhrase.includes("{ip}")) {
                        randomPhrase = randomPhrase.replace("{ip}", userIP || "fetch error");
                }

                if (randomPhrase.includes("{hostname}")) {
                        randomPhrase = randomPhrase.replace("{hostname}", location.hostname);
                }

                if (randomPhrase.includes("{time}")) {
                        const now = new Date();
                        const timeString = now.toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit'
                        });
                        randomPhrase = randomPhrase.replace("{time}", timeString);
                }

                if (randomPhrase.includes("{battery}")) {
                        try {
                                const battery = await navigator.getBattery();
                                const batteryPercent = Math.round(battery.level * 100) + "%";
                                randomPhrase = randomPhrase.replace("{battery}", batteryPercent);
                        }
                        catch (e) {
                                randomPhrase = randomPhrase.replace("{battery}", "unknown");
                                console.error("Battery info not available", e);
                        }
                }

                paragraph.textContent = randomPhrase;

                if (randomPhrase === "🙂 dıןɟ ʎddıןɟ ɐ pıp ǝƃɐd ǝɥʇ sdooɥʍ") {
                        setFlip(true);
                }
                else {
                        resetFlip();
                }
        }
        else if (randomPhrase.type === "image") {
                paragraph.innerHTML = `<img src="${randomPhrase.src}" alt="Splash Image" style="max-width: ${randomPhrase.width}; height: auto;">`;
                resetFlip();
        }
        else if (randomPhrase.type === "video") {
                paragraph.innerHTML = `<video ${randomPhrase.other || ''} autoplay style="max-width: ${randomPhrase.width}; height: auto;" muted>
            <source src="${randomPhrase.src}" type="video/mp4">
        </video>`;
                resetFlip();
        }
}

window.onload = async () => {
        try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                userIP = data.ip;
                console.log("internet protocol fetched:", userIP);
        }
        catch (e) {
                console.error("Failed to get IP", e);
        }

        await changeText();
};

paragraph.addEventListener('click', () => {
        changeText();
});
