// PWA və Service Worker qeydiyyatı
let deferredPrompt;
const installButton = document.getElementById('install-button');
const installContainer = document.getElementById('install-container');

// Service Worker qeydiyyatı
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/static/sw.js')
            .then(registration => console.log('SW qeydiyyatdan keçdi:', registration.scope))
            .catch(err => console.log('SW qeydiyyat xətası:', err));
    });
}

// Install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installContainer.classList.remove('hidden');
});

installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`İstifadəçi seçimi: ${outcome}`);
    deferredPrompt = null;
    installContainer.classList.add('hidden');
});

// Naviqasiya funksiyaları
function navigateTo(page) {
    // Info mətni gizlət
    document.getElementById('info-text').classList.add('hidden');
    
    // Bütün səhifələri gizlət
    document.querySelectorAll('#app > div').forEach(div => div.classList.add('hidden'));
    
    // Seçilmiş səhifəni göstər
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        // Səhifə yüklənməsini tetikləyir
        loadPage(page);
    }
}

function goBack() {
    // Bütün səhifələri gizlət
    document.querySelectorAll('#app > div').forEach(div => div.classList.add('hidden'));
    // Ana səhifəni göstər
    document.getElementById('home-page').classList.remove('hidden');
}

function toggleInfo() {
    const infoText = document.getElementById('info-text');
    infoText.classList.toggle('hidden');
}

// Səhifə yükləmə funksiyaları
function loadPage(page) {
    switch(page) {
        case 'semestr':
            loadSemestrPage();
            break;
        case 'uomg':
            loadUomgPage();
            break;
        case 'exam-fee':
            loadExamFeePage();
            break;
        case 'age':
            loadAgePage();
            break;
        case 'dictionary':
            loadDictionaryPage();
            break;
        case 'info':
            loadInfoPage();
            break;
        case 'links':
            loadLinksPage();
            break;
    }
}

// SEMESTR BAL HESABLAMA
function loadSemestrPage() {
    const page = document.getElementById('semestr-page');
    page.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <button onclick="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">📊 Semestr Bal Hesablama</h2>
            
            <div class="space-y-4">
                <!-- Seminar -->
                <div class="border-2 border-blue-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">Seminar Sayı (maks 9):</label>
                    <input type="number" id="seminar-count" min="0" max="9" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Seminar sayını daxil edin">
                    <div id="seminar-inputs" class="mt-3 space-y-2"></div>
                </div>

                <!-- Kollekvium -->
                <div class="border-2 border-green-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">Kollekvium Sayı (maks 4):</label>
                    <input type="number" id="kollekvium-count" min="0" max="4" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Kollekvium sayını daxil edin">
                    <div id="kollekvium-inputs" class="mt-3 space-y-2"></div>
                </div>

                <!-- Sərbəst İş -->
                <div class="border-2 border-purple-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">Sərbəst İş Balı (0-10):</label>
                    <input type="number" id="serbest-bal" min="0" max="10" step="0.01" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Sərbəst iş balını daxil edin">
                </div>

                <!-- Davamiyyət -->
                <div class="border-2 border-yellow-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">Dərs Saatı:</label>
                    <select id="derse-saat" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                        <option value="">Seçin</option>
                        <option value="30">30 saat</option>
                        <option value="45">45 saat</option>
                        <option value="60">60 saat</option>
                        <option value="75">75 saat</option>
                        <option value="90">90 saat</option>
                        <option value="105">105 saat</option>
                    </select>
                    <label class="block text-lg font-semibold text-gray-700 mt-3 mb-2">Qayıb Sayı:</label>
                    <input type="number" id="qayib-sayi" min="0" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Qayıb sayını daxil edin">
                </div>

                <button onclick="calculateSemestr()" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
                    Hesabla
                </button>

                <div id="semestr-result" class="hidden mt-6 p-6 rounded-xl text-center"></div>
            </div>
        </div>
    `;

    // Event listeners
    document.getElementById('seminar-count').addEventListener('input', (e) => {
        generateInputs('seminar', e.target.value);
    });
    document.getElementById('kollekvium-count').addEventListener('input', (e) => {
        generateInputs('kollekvium', e.target.value);
    });
}

function generateInputs(type, count) {
    const container = document.getElementById(type + '-inputs');
    container.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '10';
        input.step = '0.01';
        input.className = 'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none';
        input.placeholder = `${type === 'seminar' ? 'Seminar' : 'Kollekvium'} ${i} balı (0-10)`;
        input.id = `${type}-${i}`;
        container.appendChild(input);
    }
}

function calculateSemestr() {
    // Seminar ballarını topla
    const seminarCount = parseInt(document.getElementById('seminar-count').value) || 0;
    let seminarTotal = 0;
    for (let i = 1; i <= seminarCount; i++) {
        const val = parseFloat(document.getElementById(`seminar-${i}`).value) || 0;
        seminarTotal += val;
    }
    const seminarAvg = seminarCount > 0 ? seminarTotal / seminarCount : 0;

    // Kollekvium ballarını topla
    const kollekviumCount = parseInt(document.getElementById('kollekvium-count').value) || 0;
    let kollekviumTotal = 0;
    for (let i = 1; i <= kollekviumCount; i++) {
        const val = parseFloat(document.getElementById(`kollekvium-${i}`).value) || 0;
        kollekviumTotal += val;
    }
    const kollekviumAvg = kollekviumCount > 0 ? kollekviumTotal / kollekviumCount : 0;

    // Sərbəst iş
    const serbestBal = parseFloat(document.getElementById('serbest-bal').value) || 0;

    // Davamiyyət
    const derseSaat = parseInt(document.getElementById('derse-saat').value) || 0;
    const qayibSayi = parseInt(document.getElementById('qayib-sayi').value) || 0;
    const davamiyyetBal = calculateDavamiyyet(derseSaat, qayibSayi);

    // Semestr balı hesabla
    const semestrBal = (seminarAvg * 0.4 + kollekviumAvg * 0.6) * 3 + davamiyyetBal + serbestBal;

    // Nəticə
    const resultDiv = document.getElementById('semestr-result');
    const resultText = getResultText(semestrBal);
    resultDiv.className = `mt-6 p-6 rounded-xl text-center ${getResultColor(semestrBal)}`;
    resultDiv.innerHTML = `
        <div class="text-5xl font-bold mb-3">${semestrBal.toFixed(2)}</div>
        <div class="text-2xl font-semibold">${resultText}</div>
        <div class="mt-4 text-sm opacity-75">
            <p>Seminar orta: ${seminarAvg.toFixed(2)}</p>
            <p>Kollekvium orta: ${kollekviumAvg.toFixed(2)}</p>
            <p>Sərbəst iş: ${serbestBal}</p>
            <p>Davamiyyət: ${davamiyyetBal}</p>
        </div>
    `;
    resultDiv.classList.remove('hidden');
}

function calculateDavamiyyet(saat, qayib) {
    if (qayib === 0) return 10;
    
    const rules = {
        30: [[1, 2, 9], [3, 3, 8], [4, Infinity, 0]],
        45: [[1, 1, 10], [2, 3, 9], [4, 5, 8], [6, Infinity, 0]],
        60: [[1, 1, 10], [2, 4, 9], [5, 7, 8], [8, Infinity, 0]],
        75: [[1, 1, 10], [2, 5, 9], [6, 9, 8], [10, Infinity, 0]],
        90: [[1, 2, 10], [3, 6, 9], [7, 11, 8], [12, Infinity, 0]],
        105: [[1, 2, 10], [3, 7, 9], [8, 13, 8], [14, Infinity, 0]]
    };

    const rule = rules[saat];
    if (!rule) return 0;

    for (let [min, max, bal] of rule) {
        if (qayib >= min && qayib <= max) {
            return bal;
        }
    }
    return 0;
}

function getResultText(bal) {
    if (bal === 0) return '⚠️ 0 BAL ⚠️';
    if (bal >= 50) return '🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅';
    if (bal >= 45) return '🔥 ÇOX YAXŞI 📊';
    if (bal >= 41) return '💣 YAXŞI 📈';
    if (bal >= 36) return '🫂 KAFİ 📉';
    if (bal >= 26) return '🎭 ZƏİF 📴';
    return '🗿 YAXŞI OLACAQ 🆒';
}

function getResultColor(bal) {
    if (bal === 0) return 'bg-gray-800 text-white';
    if (bal >= 50) return 'bg-green-500 text-white';
    if (bal >= 45) return 'bg-blue-500 text-white';
    if (bal >= 41) return 'bg-indigo-500 text-white';
    if (bal >= 36) return 'bg-yellow-500 text-white';
    if (bal >= 26) return 'bg-orange-500 text-white';
    return 'bg-red-500 text-white';
}

// ÜOMG HESABLAMA
function loadUomgPage() {
    const page = document.getElementById('uomg-page');
    page.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <button onclick="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">📈 ÜOMG Hesablama</h2>
            
            <div class="space-y-4">
                <div class="border-2 border-blue-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">Fənn Sayı:</label>
                    <input type="number" id="fenn-count" min="1" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Fənn sayını daxil edin">
                </div>
                <div id="fenn-inputs" class="space-y-3"></div>
                <button onclick="calculateUomg()" class="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
                    Hesabla
                </button>
                <div id="uomg-result" class="hidden mt-6 p-6 rounded-xl text-center"></div>
            </div>
        </div>
    `;

    document.getElementById('fenn-count').addEventListener('input', (e) => {
        generateFennInputs(e.target.value);
    });
}

function generateFennInputs(count) {
    const container = document.getElementById('fenn-inputs');
    container.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'border-2 border-green-200 rounded-lg p-4';
        div.innerHTML = `
            <label class="block font-semibold text-gray-700 mb-2">Fənn ${i}:</label>
            <div class="grid grid-cols-2 gap-3">
                <input type="number" id="fenn-bal-${i}" min="0" max="100" step="0.01" class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Bal (0-100)">
                <input type="number" id="fenn-kredit-${i}" min="0" step="1" class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Kredit">
            </div>
        `;
        container.appendChild(div);
    }
}

function calculateUomg() {
    const fennCount = parseInt(document.getElementById('fenn-count').value) || 0;
    let totalWeighted = 0;
    let totalKredit = 0;

    for (let i = 1; i <= fennCount; i++) {
        const bal = parseFloat(document.getElementById(`fenn-bal-${i}`).value) || 0;
        const kredit = parseFloat(document.getElementById(`fenn-kredit-${i}`).value) || 0;
        totalWeighted += bal * kredit;
        totalKredit += kredit;
    }

    const uomg = totalKredit > 0 ? totalWeighted / totalKredit : 0;

    const resultDiv = document.getElementById('uomg-result');
    const resultText = getResultText(uomg);
    resultDiv.className = `mt-6 p-6 rounded-xl text-center ${getResultColor(uomg)}`;
    resultDiv.innerHTML = `
        <div class="text-5xl font-bold mb-3">${uomg.toFixed(2)}</div>
        <div class="text-2xl font-semibold">${resultText}</div>
        <div class="mt-4 text-sm opacity-75">
            <p>Cəmi kredit: ${totalKredit}</p>
        </div>
    `;
    resultDiv.classList.remove('hidden');
}

// KƏSR PULU HESABLAMA
function loadExamFeePage() {
    const page = document.getElementById('exam-fee-page');
    page.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <button onclick="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">💰 Kəsr Pulu Hesablama</h2>
            
            <div class="space-y-4">
                <div class="border-2 border-yellow-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">İllik Ödəniş (AZN):</label>
                    <input type="number" id="illik-odenis" min="0" step="0.01" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="İllik ödənişi daxil edin">
                </div>
                <div class="border-2 border-yellow-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">Fənnin Kredit Sayı:</label>
                    <input type="number" id="fenn-kredit" min="0" step="1" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Kredit sayını daxil edin">
                </div>
                <button onclick="calculateExamFee()" class="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
                    Hesabla
                </button>
                <div id="exam-fee-result" class="hidden mt-6 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl text-center"></div>
            </div>
        </div>
    `;
}

function calculateExamFee() {
    const illikOdenis = parseFloat(document.getElementById('illik-odenis').value) || 0;
    const fennKredit = parseFloat(document.getElementById('fenn-kredit').value) || 0;

    const kesrPulu = ((illikOdenis / 60) * fennKredit) / 4 + 1;

    const resultDiv = document.getElementById('exam-fee-result');
    resultDiv.innerHTML = `
        <div class="text-5xl font-bold text-yellow-800 mb-3">${kesrPulu.toFixed(2)} ₼</div>
        <div class="text-xl font-semibold text-yellow-700">25% İmtahan Pulu</div>
    `;
    resultDiv.classList.remove('hidden');
}

// YAŞ HESABLAYICI
function loadAgePage() {
    const page = document.getElementById('age-page');
    page.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <button onclick="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">🎂 Yaş Hesablayıcı</h2>
            
            <div class="space-y-4">
                <div class="border-2 border-purple-200 rounded-lg p-4">
                    <label class="block text-lg font-semibold text-gray-700 mb-2">Doğum Tarixi (GG.AA.IIII):</label>
                    <input type="text" id="birth-date" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Məsələn: 15.03.2000">
                </div>
                <button onclick="calculateAge()" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
                    Hesabla
                </button>
                <div id="age-result" class="hidden mt-6 space-y-4"></div>
            </div>
        </div>
    `;
}

function calculateAge() {
    const input = document.getElementById('birth-date').value;
    const parts = input.split('.');
    
    if (parts.length !== 3) {
        alert('Düzgün format daxil edin: GG.AA.IIII');
        return;
    }

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // JavaScript ayları 0-11 arasında
    const year = parseInt(parts[2]);

    const birthDate = new Date(year, month, day);
    const today = new Date();

    // Yaş hesablama
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Yaşanılan gün sayı
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Növbəti ad günü
    const nextBirthday = new Date(today.getFullYear(), month, day);
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNext = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    const resultDiv = document.getElementById('age-result');
    resultDiv.innerHTML = `
        <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
            <div class="text-4xl font-bold text-purple-800 mb-2">🎉 ${age} yaş</div>
            <div class="text-lg text-purple-700">Siz ${diffDays.toLocaleString()} gün yaşamısınız</div>
        </div>
        <div class="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl">
            <div class="text-2xl font-bold text-blue-800 mb-2">🎂 Növbəti ad gününüzə</div>
            <div class="text-3xl font-bold text-blue-900">${daysToNext} gün qalıb</div>
        </div>
    `;
    resultDiv.classList.remove('hidden');
}

// LÜĞƏT
function loadDictionaryPage() {
    const page = document.getElementById('dictionary-page');
    page.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <button onclick="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">📚 Lüğət</h2>
            
            <div class="space-y-3">
                <div class="border-2 border-red-200 rounded-lg p-4 hover:shadow-lg transition">
                    <h3 class="text-xl font-bold text-red-800">Mühazirə</h3>
                    <p class="text-gray-700 mt-2">Müəllimin keçdiyi dərs</p>
                </div>
            </div>
        </div>
    `;
}

// MƏLUMAT
function loadInfoPage() {
    const page = document.getElementById('info-page');
    page.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <button onclick="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">ℹ️ Məlumat</h2>
            
            <div class="space-y-3">
                <div class="border-2 border-indigo-200 rounded-lg p-4 hover:shadow-lg transition">
                    <h3 class="text-xl font-bold text-indigo-800">🏆 Əlaçı olmaq</h3>
                    <p class="text-gray-700 mt-2">Əlaçı olmaq üçün bütün fənnlər 91+ olmalıdır</p>
                </div>
            </div>
        </div>
    `;
}

// SÜRƏTLİ LİNKLƏR
function loadLinksPage() {
    const page = document.getElementById('links-page');
    page.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <button onclick="goBack()" class="mb-4 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">🔗 Sürətli Linklər</h2>
            
            <div class="space-y-3">
                <a href="https://bdu.edu.az" target="_blank" class="block border-2 border-blue-200 rounded-lg p-4 hover:shadow-lg transition hover:bg-blue-50">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-university text-2xl text-blue-600"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">BDU Rəsmi Web Saytı</h3>
                            <p class="text-sm text-gray-600">bdu.edu.az</p>
                        </div>
                    </div>
                </a>

                <a href="https://semslogin.bdu.edu.az" target="_blank" class="block border-2 border-green-200 rounded-lg p-4 hover:shadow-lg transition hover:bg-green-50">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-graduation-cap text-2xl text-green-600"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">SemsLogin - Akademik Portal</h3>
                            <p class="text-sm text-gray-600">semslogin.bdu.edu.az</p>
                        </div>
                    </div>
                </a>

                <a href="https://whatsapp.com/channel/0029Va85Ls85q08WyYoGeJ3r" target="_blank" class="block border-2 border-green-200 rounded-lg p-4 hover:shadow-lg transition hover:bg-green-50">
                    <div class="flex items-center gap-3">
                        <i class="fab fa-whatsapp text-2xl text-green-600"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">BDU WhatsApp Kanal</h3>
                            <p class="text-sm text-gray-600">Rəsmi elanlar</p>
                        </div>
                    </div>
                </a>

                <a href="https://www.instagram.com/bdu_eduaz" target="_blank" class="block border-2 border-pink-200 rounded-lg p-4 hover:shadow-lg transition hover:bg-pink-50">
                    <div class="flex items-center gap-3">
                        <i class="fab fa-instagram text-2xl text-pink-600"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">BDU Instagram</h3>
                            <p class="text-sm text-gray-600">@bdu_eduaz</p>
                        </div>
                    </div>
                </a>

                <a href="https://t.me/bdu_eduaz" target="_blank" class="block border-2 border-blue-200 rounded-lg p-4 hover:shadow-lg transition hover:bg-blue-50">
                    <div class="flex items-center gap-3">
                        <i class="fab fa-telegram text-2xl text-blue-600"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">BDU Telegram</h3>
                            <p class="text-sm text-gray-600">@bdu_eduaz</p>
                        </div>
                    </div>
                </a>

                <a href="https://www.instagram.com/desespere_etoile" target="_blank" class="block border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition hover:bg-purple-50">
                    <div class="flex items-center gap-3">
                        <i class="fab fa-instagram text-2xl text-purple-600"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">Sayt Sahibi</h3>
                            <p class="text-sm text-gray-600">@desespere_etoile</p>
                        </div>
                    </div>
                </a>

                <a href="https://t.me/+WUKxtnDjo2E5YTcy" target="_blank" class="block border-2 border-indigo-200 rounded-lg p-4 hover:shadow-lg transition hover:bg-indigo-50">
                    <div class="flex items-center gap-3">
                        <i class="fab fa-telegram text-2xl text-indigo-600"></i>
                        <div>
                            <h3 class="text-lg font-bold text-gray-800">Tələbə Chat Qrupu</h3>
                            <p class="text-sm text-gray-600">Sosiallaşma qrupu</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    `;
}
