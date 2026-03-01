import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files from dist directory
app.use('/static/*', serveStatic({ root: './' }))

// Default route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="az">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#1e40af">
        <meta name="description" content="BDU Tələbə Köməkçisi - Akademik bal hesablayıcı">
        <title>BDU Tələbə Köməkçisi</title>
        <link rel="manifest" href="/static/manifest.json">
        <link rel="icon" type="image/png" href="/static/icon-192.png">
        <link rel="apple-touch-icon" href="/static/icon-192.png">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <!-- WhatsApp Banner (Sabit üst hissə) -->
        <div id="whatsapp-banner" class="fixed top-0 left-0 right-0 bg-green-600 text-white py-2 px-4 flex items-center justify-between z-50 shadow-lg">
            <span class="text-sm font-semibold">🎓 ən ucuz sərbəst iş hazırlanması</span>
            <a href="https://wa.me/994559406018" target="_blank" class="bg-white text-green-600 px-3 py-1 rounded-full font-bold flex items-center gap-2 hover:bg-green-50 transition">
                <i class="fab fa-whatsapp text-xl"></i>
                Yazın
            </a>
        </div>

        <!-- Main Container -->
        <div id="app" class="pt-16 pb-8 px-4">
            <!-- Ana səhifə -->
            <div id="home-page" class="max-w-4xl mx-auto">
                <header class="text-center mb-8">
                    <h1 class="text-4xl font-bold text-blue-900 mb-2">🎓 BDU Tələbə Köməkçisi</h1>
                    <p class="text-gray-600">Akademik hesablamalarınız üçün ən yaxşı köməkçi</p>
                </header>

                <!-- Install Button -->
                <div id="install-container" class="mb-6 hidden">
                    <button id="install-button" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition flex items-center justify-center gap-3">
                        <i class="fas fa-download text-2xl"></i>
                        <span>Tətbiqi Quraşdırın</span>
                    </button>
                </div>

                <!-- Menu Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Semestr Bal Hesablama -->
                    <div class="menu-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition cursor-pointer" onclick="navigateTo('semestr')">
                        <div class="flex items-center gap-4 mb-3">
                            <div class="bg-blue-100 p-4 rounded-full">
                                <i class="fas fa-calculator text-3xl text-blue-600"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">Semestr Bal</h2>
                        </div>
                        <p class="text-gray-600">Semestr balınızı hesablayın</p>
                    </div>

                    <!-- ÜOMG Hesablama -->
                    <div class="menu-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition cursor-pointer" onclick="navigateTo('uomg')">
                        <div class="flex items-center gap-4 mb-3">
                            <div class="bg-green-100 p-4 rounded-full">
                                <i class="fas fa-chart-line text-3xl text-green-600"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">ÜOMG</h2>
                        </div>
                        <p class="text-gray-600">ÜOMG-nizi hesablayın</p>
                    </div>

                    <!-- 25% İmtahan Pulu -->
                    <div class="menu-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition cursor-pointer" onclick="navigateTo('exam-fee')">
                        <div class="flex items-center gap-4 mb-3">
                            <div class="bg-yellow-100 p-4 rounded-full">
                                <i class="fas fa-money-bill-wave text-3xl text-yellow-600"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">Kəsr Pulu</h2>
                        </div>
                        <p class="text-gray-600">25% imtahan pulunu hesablayın</p>
                    </div>

                    <!-- Yaş Hesablayıcı -->
                    <div class="menu-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition cursor-pointer" onclick="navigateTo('age')">
                        <div class="flex items-center gap-4 mb-3">
                            <div class="bg-purple-100 p-4 rounded-full">
                                <i class="fas fa-birthday-cake text-3xl text-purple-600"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">Yaş Hesablayıcı</h2>
                        </div>
                        <p class="text-gray-600">Yaşınızı və günlərinizi öyrənin</p>
                    </div>

                    <!-- Lüğət -->
                    <div class="menu-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition cursor-pointer" onclick="navigateTo('dictionary')">
                        <div class="flex items-center gap-4 mb-3">
                            <div class="bg-red-100 p-4 rounded-full">
                                <i class="fas fa-book text-3xl text-red-600"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">Lüğət</h2>
                        </div>
                        <p class="text-gray-600">Akademik terminlər lüğəti</p>
                    </div>

                    <!-- Məlumat -->
                    <div class="menu-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition cursor-pointer" onclick="navigateTo('info')">
                        <div class="flex items-center gap-4 mb-3">
                            <div class="bg-indigo-100 p-4 rounded-full">
                                <i class="fas fa-info-circle text-3xl text-indigo-600"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">Məlumat</h2>
                        </div>
                        <p class="text-gray-600">Faydalı məlumatlar</p>
                    </div>

                    <!-- Sürətli Linklər -->
                    <div class="menu-card bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition cursor-pointer" onclick="navigateTo('links')">
                        <div class="flex items-center gap-4 mb-3">
                            <div class="bg-pink-100 p-4 rounded-full">
                                <i class="fas fa-link text-3xl text-pink-600"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">Sürətli Linklər</h2>
                        </div>
                        <p class="text-gray-600">BDU linkləri və əlaqələr</p>
                    </div>
                </div>

                <!-- Haqqında Butonu -->
                <div class="text-center mt-8">
                    <button onclick="toggleInfo()" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full transition">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <div id="info-text" class="hidden mt-4 bg-white p-4 rounded-xl shadow-lg">
                        <p class="text-gray-700 font-semibold">O, boşluq yaradır.</p>
                    </div>
                </div>
            </div>

            <!-- Semestr Bal Səhifəsi -->
            <div id="semestr-page" class="hidden max-w-4xl mx-auto">
                <!-- Dinamik olaraq JavaScript ilə doldurulacaq -->
            </div>

            <!-- ÜOMG Səhifəsi -->
            <div id="uomg-page" class="hidden max-w-4xl mx-auto">
                <!-- Dinamik olaraq JavaScript ilə doldurulacaq -->
            </div>

            <!-- Kəsr Pulu Səhifəsi -->
            <div id="exam-fee-page" class="hidden max-w-4xl mx-auto">
                <!-- Dinamik olaraq JavaScript ilə doldurulacaq -->
            </div>

            <!-- Yaş Hesablayıcı Səhifəsi -->
            <div id="age-page" class="hidden max-w-4xl mx-auto">
                <!-- Dinamik olaraq JavaScript ilə doldurulacaq -->
            </div>

            <!-- Lüğət Səhifəsi -->
            <div id="dictionary-page" class="hidden max-w-4xl mx-auto">
                <!-- Dinamik olaraq JavaScript ilə doldurulacaq -->
            </div>

            <!-- Məlumat Səhifəsi -->
            <div id="info-page" class="hidden max-w-4xl mx-auto">
                <!-- Dinamik olaraq JavaScript ilə doldurulacaq -->
            </div>

            <!-- Sürətli Linklər Səhifəsi -->
            <div id="links-page" class="hidden max-w-4xl mx-auto">
                <!-- Dinamik olaraq JavaScript ilə doldurulacaq -->
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
