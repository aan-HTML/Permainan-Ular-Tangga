class EnhancedSnakesLadders {
  constructor() {
    this.players = []
    this.currentPlayerIndex = 0
    this.gameBoard = []
    this.isGameActive = false
    this.selectedPlayerCount = 2
    this.currentPlayerForAvatar = 0
    this.selectedAvatar = null
    this.challengeTimer = null
    this.musicPlaying = false
    this.selectedMode = null
    this.gameRound = 1
    this.backgroundMusic = null
    this.playerChallengeStats = {} // Tracking challenge statistics

    // Enhanced snakes with head and tail positions
    this.snakes = {
      98: 78,
      95: 75,
      93: 73,
      87: 24,
      64: 60,
      62: 19,
      56: 53,
      49: 11,
      47: 26,
      16: 6,
    }

    // Enhanced ladders with bottom and top positions
    this.ladders = {
      1: 38,
      4: 14,
      9: 21,
      21: 42,
      28: 84,
      36: 44,
      51: 67,
      71: 91,
      80: 100,
    }

    // 50% challenge cells (50 out of 100 cells) - Updated!
    this.challengeCells = [
      2, 3, 5, 7, 8, 10, 11, 12, 13, 15, 17, 18, 19, 20, 22, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 37, 38, 39, 40, 41,
      42, 43, 44, 45, 46, 48, 50, 52, 54, 55, 57, 58, 59, 61, 63, 65, 66, 68, 70, 72, 74, 75, 77, 79, 81, 82, 84, 86,
      88, 89, 91, 92, 94, 96, 97, 99,
    ]

    // Mode-specific challenges - Extended for 50% coverage
    this.challengesByMode = {
      friends: {
        2: {
          type: "warm_up",
          category: "Pemanasan",
          icon: "🔥",
          title: "Pemanasan Awal",
          description: "Mari mulai dengan semangat!",
          content: "Lakukan jumping jack 15 kali untuk pemanasan!",
          timer: 30,
        },
        3: {
          type: "competition",
          category: "Kompetisi",
          icon: "🏆",
          title: "Push-up Challenge",
          description: "Siapa yang paling kuat?",
          content: "Lakukan push-up sebanyak mungkin dalam 30 detik! Yang paling sedikit mundur 2 langkah.",
          timer: 30,
        },
        5: {
          type: "brain",
          category: "Otak",
          icon: "🧠",
          title: "Teka-teki Cepat",
          description: "Asah otak!",
          content: "Sebutkan 5 benda yang berwarna merah secepat mungkin!",
          timer: 30,
        },
        7: {
          type: "dare",
          category: "Tantangan",
          icon: "😂",
          title: "Tebak Suara",
          description: "Tes kemampuan meniru!",
          content: "Tiru suara artis terkenal dan biarkan teman-teman menebak siapa!",
          timer: 60,
        },
        8: {
          type: "physical",
          category: "Fisik",
          icon: "💪",
          title: "Squat Challenge",
          description: "Kekuatan kaki!",
          content: "Lakukan squat 20 kali dengan posisi yang benar!",
          timer: 45,
        },
        10: {
          type: "creative",
          category: "Kreativitas",
          icon: "🎨",
          title: "Beatbox Dadakan",
          description: "Musik dari mulut!",
          content: "Buat beat musik keren menggunakan mulut selama 30 detik!",
          timer: 30,
        },
        11: {
          type: "speed",
          category: "Kecepatan",
          icon: "⚡",
          title: "Hitung Cepat",
          description: "Tes kecepatan berhitung!",
          content: "Hitung dari 1 sampai 20 secepat mungkin!",
          timer: 30,
        },
        12: {
          type: "game",
          category: "Permainan",
          icon: "🎯",
          title: "Suit Jepang",
          description: "Kompetisi klasik!",
          content: "Main suit jepang dengan pemain di sebelah kanan. Yang kalah mundur 1 langkah!",
          timer: 30,
        },
        13: {
          type: "balance",
          category: "Keseimbangan",
          icon: "⚖️",
          title: "Flamingo Pose",
          description: "Keseimbangan seperti flamingo!",
          content: "Berdiri dengan satu kaki selama 25 detik!",
          timer: 25,
        },
        15: {
          type: "memory",
          category: "Memori",
          icon: "🧠",
          title: "Hafal Urutan",
          description: "Tes daya ingat!",
          content: "Hafalkan urutan: Merah-Biru-Kuning-Hijau-Ungu, lalu sebutkan terbalik!",
          timer: 45,
        },
        17: {
          type: "funny",
          category: "Hiburan",
          icon: "🤪",
          title: "Wajah Lucu",
          description: "Buat semua tertawa!",
          content: "Buat ekspresi wajah paling lucu selama 15 detik tanpa tertawa!",
          timer: 15,
        },
        18: {
          type: "tongue_twister",
          category: "Bahasa",
          icon: "👅",
          title: "Tongue Twister",
          description: "Tantangan lidah!",
          content: "Ucapkan 'Kuku kaki kakek kukuh-kukuh' 5 kali dengan cepat!",
          timer: 30,
        },
        19: {
          type: "balance",
          category: "Keseimbangan",
          icon: "🤸",
          title: "Yoga Pose",
          description: "Tes keseimbangan!",
          content: "Lakukan pose yoga 'tree pose' selama 20 detik!",
          timer: 20,
        },
        20: {
          type: "trivia",
          category: "Kuis",
          icon: "❓",
          title: "Kuis Cepat",
          description: "Pengetahuan umum!",
          content: "Sebutkan 3 negara yang dimulai dengan huruf 'I'!",
          timer: 30,
        },
        22: {
          type: "skill",
          category: "Keahlian",
          icon: "🎨",
          title: "Gambar Buta",
          description: "Tes kreativitas!",
          content: "Gambar wajah teman dengan mata tertutup! Yang lain harus menebak siapa.",
          timer: 45,
        },
        24: {
          type: "trivia",
          category: "Kuis",
          icon: "🧠",
          title: "Teka-teki",
          description: "Asah otak!",
          content: "Apa yang selalu basah meski tidak pernah kehujanan? (Jawaban: Lidah)",
          timer: 30,
        },
        25: {
          type: "dance",
          category: "Tari",
          icon: "💃",
          title: "Dance Move",
          description: "Gerakan keren!",
          content: "Buat 3 gerakan dance unik dan ajari yang lain!",
          timer: 60,
        },
        26: {
          type: "acting",
          category: "Akting",
          icon: "🎭",
          title: "Mime Time",
          description: "Akting tanpa suara!",
          content: "Peragakan 'sedang mandi' tanpa suara, biarkan yang lain menebak!",
          timer: 45,
        },
        27: {
          type: "memory",
          category: "Ingatan",
          icon: "🧠",
          title: "Hafalan Cepat",
          description: "Tes daya ingat!",
          content: "Sebutkan 10 nama negara yang dimulai huruf berbeda dalam 1 menit!",
          timer: 60,
        },
        29: {
          type: "dance",
          category: "Tari",
          icon: "💃",
          title: "TikTok Dance",
          description: "Tunjukkan gerakan viral!",
          content: "Buat dance TikTok yang sedang viral selama 30 detik!",
          timer: 30,
        },
        30: {
          type: "coordination",
          category: "Koordinasi",
          icon: "🤹",
          title: "Pat & Rub",
          description: "Koordinasi tangan!",
          content: "Tepuk kepala dengan satu tangan, gosok perut dengan tangan lain!",
          timer: 20,
        },
        31: {
          type: "speed_talk",
          category: "Bicara Cepat",
          icon: "🗣️",
          title: "Bicara Kilat",
          description: "Kecepatan bicara!",
          content: "Sebutkan nama 15 hewan secepat mungkin!",
          timer: 30,
        },
        32: {
          type: "physical",
          category: "Fisik",
          icon: "🤸",
          title: "Keseimbangan",
          description: "Tes keseimbangan tubuh!",
          content: "Berdiri dengan satu kaki sambil mata tertutup selama 20 detik!",
          timer: 20,
        },
        34: {
          type: "singing",
          category: "Menyanyi",
          icon: "🎤",
          title: "Karaoke Time",
          description: "Tunjukkan suara emas!",
          content: "Nyanyikan lagu favorit dengan penuh perasaan!",
          timer: 60,
        },
        35: {
          type: "riddle",
          category: "Teka-teki",
          icon: "❓",
          title: "Teka-teki Lucu",
          description: "Pecahkan teka-teki!",
          content: "Apa yang punya mata tapi tidak bisa melihat? (Jawaban: Jarum)",
          timer: 30,
        },
        37: {
          type: "creative",
          category: "Kreativitas",
          icon: "🎭",
          title: "Akting Mime",
          description: "Akting tanpa suara!",
          content: "Peragakan 'sedang memasak' tanpa suara, biarkan yang lain menebak!",
          timer: 60,
        },
        38: {
          type: "word_game",
          category: "Kata",
          icon: "📝",
          title: "Kata Berantai",
          description: "Permainan kata!",
          content: "Buat 8 kata yang berakhiran 'ing' secepat mungkin!",
          timer: 45,
        },
        39: {
          type: "challenge",
          category: "Tantangan",
          icon: "🔥",
          title: "Plank Challenge",
          description: "Tes ketahanan!",
          content: "Lakukan plank selama 30 detik tanpa jatuh!",
          timer: 30,
        },
        40: {
          type: "flexibility",
          category: "Fleksibilitas",
          icon: "🧘",
          title: "Stretching",
          description: "Kelenturan tubuh!",
          content: "Coba sentuh ujung kaki tanpa menekuk lutut selama 15 detik!",
          timer: 15,
        },
        41: {
          type: "imitation",
          category: "Imitasi",
          icon: "🐵",
          title: "Tiru Hewan",
          description: "Jadilah hewan favorit!",
          content: "Tirukan suara dan gerakan 3 hewan berbeda!",
          timer: 60,
        },
        42: {
          type: "trivia",
          category: "Kuis",
          icon: "🤓",
          title: "Teka-teki Logika",
          description: "Asah otak!",
          content: "Apa yang bisa berlari tapi tidak punya kaki? (Jawaban: Air/Sungai)",
          timer: 30,
        },
        43: {
          type: "physical",
          category: "Fisik",
          icon: "💪",
          title: "Burpee Challenge",
          description: "Latihan intensif!",
          content: "Lakukan 5 burpee dengan sempurna!",
          timer: 60,
        },
        44: {
          type: "imitation",
          category: "Imitasi",
          icon: "🐵",
          title: "Tiru Hewan",
          description: "Jadilah hewan favorit!",
          content: "Tirukan 3 hewan berbeda dan biarkan pemain lain menebak!",
          timer: 90,
        },
        45: {
          type: "creativity",
          category: "Kreativitas",
          icon: "✏️",
          title: "Puisi Dadakan",
          description: "Buat puisi spontan!",
          content: "Buat puisi 4 baris tentang persahabatan!",
          timer: 90,
        },
        46: {
          type: "tongue_twister",
          category: "Bahasa",
          icon: "👅",
          title: "Tongue Twister",
          description: "Tantangan lidah!",
          content: "Ucapkan 'Kuku kaki kakek kukuh-kukuh' 10 kali dengan cepat!",
          timer: 60,
        },
        48: {
          type: "social",
          category: "Sosial",
          icon: "💬",
          title: "Cerita Singkat",
          description: "Berbagi pengalaman!",
          content: "Ceritakan pengalaman paling seru yang pernah kamu alami dengan teman!",
          timer: 90,
        },
        50: {
          type: "balance",
          category: "Keseimbangan",
          icon: "⚖️",
          title: "Warrior Pose",
          description: "Pose pejuang!",
          content: "Lakukan pose warrior yoga selama 30 detik!",
          timer: 30,
        },
        52: {
          type: "dance",
          category: "Tari",
          icon: "💃",
          title: "Dance Battle",
          description: "Tunjukkan gerakan terbaik!",
          content: "Buat gerakan dance freestyle selama 30 detik!",
          timer: 30,
        },
        54: {
          type: "beatbox",
          category: "Musik",
          icon: "🎵",
          title: "Beatbox",
          description: "Buat musik dengan mulut!",
          content: "Buat beat musik menggunakan mulut selama 45 detik!",
          timer: 45,
        },
        55: {
          type: "acting",
          category: "Akting",
          icon: "🎬",
          title: "Adegan Lucu",
          description: "Jadi aktor komedi!",
          content: "Perankan adegan lucu dari film favorit!",
          timer: 60,
        },
        57: {
          type: "flexibility",
          category: "Fleksibilitas",
          icon: "🧘",
          title: "Stretching",
          description: "Tes kelenturan!",
          content: "Coba sentuh ujung kaki tanpa menekuk lutut!",
          timer: 30,
        },
        58: {
          type: "memory",
          category: "Memori",
          icon: "🔢",
          title: "Urutan Angka",
          description: "Tes daya ingat!",
          content: "Hafalkan urutan: 3-7-1-9-5-2-8-4, lalu sebutkan terbalik!",
          timer: 60,
        },
        59: {
          type: "coordination",
          category: "Koordinasi",
          icon: "🤹",
          title: "Juggling",
          description: "Tes koordinasi!",
          content: "Lempar dan tangkap 2 bola secara bergantian 10 kali!",
          timer: 60,
        },
        61: {
          type: "speed_talk",
          category: "Bicara Cepat",
          icon: "🗣️",
          title: "Bicara Cepat",
          description: "Tes kecepatan bicara!",
          content: "Sebutkan nama 20 buah secepat mungkin!",
          timer: 45,
        },
        63: {
          type: "creativity",
          category: "Kreativitas",
          icon: "✏️",
          title: "Puisi Dadakan",
          description: "Buat puisi spontan!",
          content: "Buat puisi 4 baris tentang persahabatan!",
          timer: 90,
        },
        65: {
          type: "trivia",
          category: "Kuis",
          icon: "🌍",
          title: "Geografi",
          description: "Pengetahuan dunia!",
          content: "Sebutkan 5 ibukota negara ASEAN!",
          timer: 60,
        },
        66: {
          type: "memory_game",
          category: "Memori",
          icon: "🔢",
          title: "Urutan Angka",
          description: "Tes daya ingat!",
          content: "Hafalkan urutan: 7-3-9-1-5-8-2-6-4, lalu sebutkan terbalik!",
          timer: 60,
        },
        68: {
          type: "acting",
          category: "Akting",
          icon: "🎬",
          title: "Adegan Film",
          description: "Jadi aktor dadakan!",
          content: "Perankan adegan film romantis dengan dramatic!",
          timer: 60,
        },
        70: {
          type: "physical",
          category: "Fisik",
          icon: "🏃",
          title: "High Knees",
          description: "Cardio time!",
          content: "Lakukan high knees selama 30 detik!",
          timer: 30,
        },
        72: {
          type: "rap",
          category: "Musik",
          icon: "🎤",
          title: "Freestyle Rap",
          description: "Tunjukkan skill rap!",
          content: "Buat rap freestyle tentang persahabatan selama 1 menit!",
          timer: 60,
        },
        74: {
          type: "magic_trick",
          category: "Sulap",
          icon: "🎩",
          title: "Trik Sulap",
          description: "Jadi pesulap!",
          content: "Lakukan trik sulap sederhana dengan benda di sekitar!",
          timer: 90,
        },
        75: {
          type: "word_game",
          category: "Kata",
          icon: "📝",
          title: "Rhyme Time",
          description: "Permainan sajak!",
          content: "Buat 5 kata yang berima dengan 'main'!",
          timer: 30,
        },
        77: {
          type: "storytelling",
          category: "Bercerita",
          icon: "📚",
          title: "Cerita Kreatif",
          description: "Buat cerita menarik!",
          content: "Buat cerita pendek dengan kata kunci: alien, pizza, dan motor!",
          timer: 120,
        },
        79: {
          type: "impression",
          category: "Imitasi",
          icon: "🎭",
          title: "Imitasi Tokoh",
          description: "Tiru tokoh terkenal!",
          content: "Tiru cara bicara dan gaya 3 tokoh terkenal!",
          timer: 90,
        },
        81: {
          type: "balance",
          category: "Keseimbangan",
          icon: "🤸",
          title: "Handstand Attempt",
          description: "Coba handstand!",
          content: "Coba lakukan handstand atau headstand selama 10 detik!",
          timer: 30,
        },
        82: {
          type: "riddle",
          category: "Teka-teki",
          icon: "❓",
          title: "Teka-teki Sulit",
          description: "Pecahkan misteri!",
          content: "Aku punya mata tapi tidak bisa melihat. Apa aku? (Jawaban: Jarum)",
          timer: 45,
        },
        84: {
          type: "joke",
          category: "Hiburan",
          icon: "😄",
          title: "Stand Up Comedy",
          description: "Buat semua tertawa!",
          content: "Ceritakan joke atau lelucon terbaik yang kamu tahu!",
          timer: 60,
        },
        86: {
          type: "word_game",
          category: "Kata",
          icon: "📝",
          title: "Kata Berantai",
          description: "Permainan kata!",
          content: "Buat 10 kata yang berakhiran 'an' secepat mungkin!",
          timer: 60,
        },
        88: {
          type: "physical",
          category: "Fisik",
          icon: "💪",
          title: "Wall Sit",
          description: "Kekuatan kaki!",
          content: "Lakukan wall sit selama 30 detik!",
          timer: 30,
        },
        89: {
          type: "balance_challenge",
          category: "Keseimbangan",
          icon: "⚖️",
          title: "Buku di Kepala",
          description: "Tes keseimbangan!",
          content: "Jalan 10 langkah dengan buku di atas kepala tanpa jatuh!",
          timer: 60,
        },
        91: {
          type: "speed",
          category: "Kecepatan",
          icon: "⚡",
          title: "Hitung Mundur",
          description: "Tes kecepatan!",
          content: "Hitung mundur dari 50 ke 1 secepat mungkin!",
          timer: 45,
        },
        92: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Origami Cepat",
          description: "Seni melipat!",
          content: "Buat origami sederhana (burung/bunga) dalam 2 menit!",
          timer: 120,
        },
        94: {
          type: "coordination",
          category: "Koordinasi",
          icon: "🤸",
          title: "Pat Head Rub Belly",
          description: "Tes koordinasi!",
          content: "Tepuk kepala dengan satu tangan, gosok perut dengan tangan lain selama 30 detik!",
          timer: 30,
        },
        96: {
          type: "singing",
          category: "Menyanyi",
          icon: "🎵",
          title: "Opera Style",
          description: "Nyanyikan dengan gaya opera!",
          content: "Nyanyikan 'Happy Birthday' dengan gaya opera yang dramatis!",
          timer: 45,
        },
        97: {
          type: "final",
          category: "Final",
          icon: "🎊",
          title: "Tantangan Akhir",
          description: "Tantangan terakhir!",
          content: "Lakukan 3 hal: jumping jack 10x, push-up 5x, dan berteriak 'JUARA!'",
          timer: 60,
        },
        99: {
          type: "ultimate",
          category: "Ultimate",
          icon: "🏆",
          title: "Ultimate Challenge",
          description: "Tantangan terberat!",
          content: "Gabungkan: 10 squat, 5 push-up, dan dance 15 detik!",
          timer: 90,
        },
      },
      couple: {
        2: {
          type: "sweet",
          category: "Manis",
          icon: "🍯",
          title: "Senyuman Manis",
          description: "Momen manis berdua!",
          content: "Saling berikan senyuman termanis selama 30 detik tanpa berbicara!",
          timer: 30,
        },
        3: {
          type: "romantic",
          category: "Romantis",
          icon: "💕",
          title: "Pujian Manis",
          description: "Ungkapkan perasaan!",
          content: "Berikan 3 pujian termanis untuk pasangan dengan tatapan mata!",
          timer: 60,
        },
        5: {
          type: "memory",
          category: "Kenangan",
          icon: "💭",
          title: "Momen Pertama",
          description: "Nostalgia bersama!",
          content: "Ceritakan hal pertama yang disukai dari pasangan saat pertama bertemu!",
          timer: 90,
        },
        7: {
          type: "memory",
          category: "Kenangan",
          icon: "💭",
          title: "Kenangan Pertama",
          description: "Nostalgia bersama!",
          content: "Ceritakan detail kencan pertama atau pertemuan pertama kalian!",
          timer: 120,
        },
        8: {
          type: "playful",
          category: "Bermain",
          icon: "😘",
          title: "Tebak Favorit",
          description: "Seberapa kenal kalian?",
          content: "Tebak makanan, warna, dan lagu favorit pasangan!",
          timer: 60,
        },
        10: {
          type: "touch",
          category: "Sentuhan",
          icon: "🤗",
          title: "Pijat Mini",
          description: "Momen relaksasi!",
          content: "Berikan pijatan lembut di tangan pasangan selama 1 menit!",
          timer: 60,
        },
        11: {
          type: "communication",
          category: "Komunikasi",
          icon: "💬",
          title: "Bahasa Mata",
          description: "Komunikasi tanpa kata!",
          content: "Sampaikan pesan 'Aku sayang kamu' hanya dengan mata dan ekspresi!",
          timer: 45,
        },
        12: {
          type: "intimate",
          category: "Keintiman",
          icon: "🌹",
          title: "Tatapan Mata",
          description: "Koneksi jiwa!",
          content: "Tatap mata pasangan selama 30 detik tanpa berbicara atau tertawa!",
          timer: 30,
        },
        13: {
          type: "sweet",
          category: "Manis",
          icon: "🍯",
          title: "Nickname Baru",
          description: "Panggilan sayang!",
          content: "Ciptakan nickname lucu baru untuk pasangan dan jelaskan alasannya!",
          timer: 45,
        },
        15: {
          type: "dance",
          category: "Tari",
          icon: "💃",
          title: "Slow Dance",
          description: "Tari romantis!",
          content: "Buat tarian slow dance romantis berdua selama 1 menit!",
          timer: 60,
        },
        17: {
          type: "future",
          category: "Masa Depan",
          icon: "🏠",
          title: "Mimpi Bersama",
          description: "Rencanakan masa depan!",
          content: "Ceritakan 3 hal yang ingin kalian lakukan bersama dalam 5 tahun!",
          timer: 90,
        },
        18: {
          type: "gratitude",
          category: "Syukur",
          icon: "🙏",
          title: "Hal Terbaik",
          description: "Ungkapan syukur!",
          content: "Sebutkan hal terbaik yang terjadi sejak bersama pasangan!",
          timer: 60,
        },
        19: {
          type: "love_language",
          category: "Bahasa Cinta",
          icon: "💖",
          title: "Cara Mencintai",
          description: "Ekspresikan cinta!",
          content: "Tunjukkan cara unik kalian mengekspresikan cinta satu sama lain!",
          timer: 60,
        },
        20: {
          type: "promise",
          category: "Janji",
          icon: "💍",
          title: "Janji Kecil",
          description: "Komitmen manis!",
          content: "Buat satu janji kecil yang akan kalian tepati hari ini!",
          timer: 45,
        },
        22: {
          type: "appreciation",
          category: "Apresiasi",
          icon: "🙏",
          title: "Terima Kasih",
          description: "Ungkapkan rasa syukur!",
          content: "Sebutkan 3 hal yang paling disyukuri dari pasangan!",
          timer: 60,
        },
        24: {
          type: "memory",
          category: "Kenangan",
          icon: "📸",
          title: "Foto Favorit",
          description: "Kenangan indah!",
          content: "Ceritakan tentang foto bersama yang paling berkesan!",
          timer: 90,
        },
        25: {
          type: "compliment",
          category: "Pujian",
          icon: "✨",
          title: "Hal Unik",
          description: "Apresiasi khusus!",
          content: "Sebutkan 3 hal unik yang hanya dimiliki pasangan!",
          timer: 60,
        },
        26: {
          type: "playful",
          category: "Bermain",
          icon: "😘",
          title: "Tebak Lagu",
          description: "Permainan musik!",
          content: "Nyanyikan lagu favorit kalian berdua dengan harmoni!",
          timer: 60,
        },
        27: {
          type: "playful",
          category: "Bermain",
          icon: "😘",
          title: "Tebak Lagu",
          description: "Permainan musik!",
          content: "Nyanyikan lagu favorit kalian berdua dengan harmoni!",
          timer: 60,
        },
        29: {
          type: "touch",
          category: "Sentuhan",
          icon: "🤗",
          title: "Genggaman Tangan",
          description: "Koneksi fisik!",
          content: "Genggam tangan pasangan dan rasakan kehangatan selama 1 menit!",
          timer: 60,
        },
        30: {
          type: "communication",
          category: "Komunikasi",
          icon: "💬",
          title: "Cerita Masa Kecil",
          description: "Berbagi masa lalu!",
          content: "Ceritakan kenangan masa kecil yang paling lucu!",
          timer: 90,
        },
        31: {
          type: "sweet",
          category: "Manis",
          icon: "🍯",
          title: "Alasan Jatuh Cinta",
          description: "Momen spesial!",
          content: "Ceritakan kapan dan mengapa jatuh cinta pada pasangan!",
          timer: 120,
        },
        32: {
          type: "sweet",
          category: "Manis",
          icon: "🍯",
          title: "Nickname Lucu",
          description: "Panggilan sayang!",
          content: "Ciptakan nickname lucu baru untuk pasangan dan jelaskan alasannya!",
          timer: 45,
        },
        34: {
          type: "future",
          category: "Masa Depan",
          icon: "🏠",
          title: "Liburan Impian",
          description: "Rencanakan bersama!",
          content: "Rencanakan liburan impian yang ingin kalian lakukan bersama!",
          timer: 90,
        },
        35: {
          type: "gratitude",
          category: "Syukur",
          icon: "🙏",
          title: "Dukungan Terbaik",
          description: "Apresiasi dukungan!",
          content: "Ceritakan saat pasangan memberikan dukungan terbaik!",
          timer: 90,
        },
        37: {
          type: "dance",
          category: "Tari",
          icon: "💃",
          title: "Tari Romantis",
          description: "Gerakan bersama!",
          content: "Buat tarian romantis sederhana berdua selama 1 menit!",
          timer: 60,
        },
        38: {
          type: "love_language",
          category: "Bahasa Cinta",
          icon: "💖",
          title: "Kata Cinta",
          description: "Ekspresikan perasaan!",
          content: "Ungkapkan 'Aku cinta kamu' dalam 3 cara berbeda yang kreatif!",
          timer: 60,
        },
        39: {
          type: "memory",
          category: "Kenangan",
          icon: "💭",
          title: "Momen Terlucu",
          description: "Kenangan lucu!",
          content: "Ceritakan momen paling lucu yang pernah kalian alami bersama!",
          timer: 90,
        },
        40: {
          type: "compliment",
          category: "Pujian",
          icon: "✨",
          title: "Perubahan Positif",
          description: "Apresiasi pertumbuhan!",
          content: "Sebutkan perubahan positif yang terjadi sejak bersama pasangan!",
          timer: 90,
        },
        41: {
          type: "touch",
          category: "Sentuhan",
          icon: "🤗",
          title: "Pelukan Spesial",
          description: "Kehangatan cinta!",
          content: "Berikan pelukan dengan cara yang paling spesial!",
          timer: 30,
        },
        42: {
          type: "promise",
          category: "Janji",
          icon: "💍",
          title: "Janji Manis",
          description: "Komitmen cinta!",
          content: "Buat satu janji manis yang akan kalian tepati minggu ini!",
          timer: 60,
        },
        43: {
          type: "communication",
          category: "Komunikasi",
          icon: "💬",
          title: "Rahasia Kecil",
          description: "Berbagi rahasia!",
          content: "Bagikan satu rahasia kecil yang belum pernah diceritakan!",
          timer: 90,
        },
        44: {
          type: "playful",
          category: "Bermain",
          icon: "😘",
          title: "Tebak Pikiran",
          description: "Koneksi batin!",
          content: "Coba tebak apa yang sedang dipikirkan pasangan sekarang!",
          timer: 45,
        },
        45: {
          type: "sweet",
          category: "Manis",
          icon: "🍯",
          title: "Hadiah Impian",
          description: "Berbagi keinginan!",
          content: "Ceritakan hadiah impian yang ingin diberikan untuk pasangan!",
          timer: 60,
        },
        46: {
          type: "dance",
          category: "Tari",
          icon: "💃",
          title: "Dance Challenge",
          description: "Gerakan sinkron!",
          content: "Buat gerakan dance yang sinkron berdua!",
          timer: 60,
        },
        48: {
          type: "love_language",
          category: "Bahasa Cinta",
          icon: "💖",
          title: "Ungkapan Cinta",
          description: "Ekspresikan perasaan!",
          content: "Ungkapkan 'Aku cinta kamu' dalam 3 bahasa berbeda dengan penuh perasaan!",
          timer: 45,
        },
        50: {
          type: "future",
          category: "Masa Depan",
          icon: "🏠",
          title: "Rumah Impian",
          description: "Visi bersama!",
          content: "Deskripsikan rumah impian yang ingin kalian bangun bersama!",
          timer: 90,
        },
        52: {
          type: "massage",
          category: "Sentuhan",
          icon: "🤗",
          title: "Pijat Lembut",
          description: "Momen relaksasi!",
          content: "Berikan pijatan lembut di bahu pasangan selama 1 menit!",
          timer: 60,
        },
        54: {
          type: "memory",
          category: "Kenangan",
          icon: "💭",
          title: "Lagu Kenangan",
          description: "Musik cinta!",
          content: "Nyanyikan lagu yang mengingatkan pada momen spesial kalian!",
          timer: 90,
        },
        55: {
          type: "gratitude",
          category: "Syukur",
          icon: "🙏",
          title: "Kebiasaan Manis",
          description: "Apresiasi kebiasaan!",
          content: "Sebutkan kebiasaan kecil pasangan yang paling disayang!",
          timer: 60,
        },
        57: {
          type: "compliment",
          category: "Pujian",
          icon: "✨",
          title: "Hal Terfavorit",
          description: "Apresiasi khusus!",
          content: "Sebutkan 5 hal yang paling kamu suka dari pasangan!",
          timer: 90,
        },
        58: {
          type: "communication",
          category: "Komunikasi",
          icon: "💬",
          title: "Mimpi Aneh",
          description: "Berbagi mimpi!",
          content: "Ceritakan mimpi paling aneh yang pernah dialami!",
          timer: 60,
        },
        59: {
          type: "touch",
          category: "Sentuhan",
          icon: "🤗",
          title: "Sentuhan Lembut",
          description: "Kelembutan cinta!",
          content: "Berikan sentuhan lembut di pipi pasangan sambil tersenyum!",
          timer: 30,
        },
        61: {
          type: "kiss",
          category: "Ciuman",
          icon: "💋",
          title: "Ciuman Manis",
          description: "Momen romantis!",
          content: "Berikan ciuman lembut di pipi atau kening pasangan!",
          timer: 15,
        },
        63: {
          type: "promise",
          category: "Janji",
          icon: "💍",
          title: "Resolusi Bersama",
          description: "Komitmen bersama!",
          content: "Buat satu resolusi yang akan kalian capai bersama bulan ini!",
          timer: 90,
        },
        65: {
          type: "playful",
          category: "Bermain",
          icon: "😘",
          title: "Tebak Ekspresi",
          description: "Permainan wajah!",
          content: "Buat ekspresi lucu dan biarkan pasangan menebak emosinya!",
          timer: 45,
        },
        66: {
          type: "poem",
          category: "Puisi",
          icon: "📝",
          title: "Puisi Cinta",
          description: "Ungkapan kreatif!",
          content: "Buat puisi pendek 4 baris tentang perasaan untuk pasangan!",
          timer: 90,
        },
        68: {
          type: "memory",
          category: "Kenangan",
          icon: "💭",
          title: "Hari Terbaik",
          description: "Kenangan indah!",
          content: "Ceritakan hari terbaik yang pernah kalian habiskan bersama!",
          timer: 120,
        },
        70: {
          type: "future",
          category: "Masa Depan",
          icon: "🏠",
          title: "Tradisi Baru",
          description: "Ciptakan tradisi!",
          content: "Ciptakan satu tradisi baru yang akan kalian lakukan setiap bulan!",
          timer: 90,
        },
        72: {
          type: "hug",
          category: "Pelukan",
          icon: "🤗",
          title: "Pelukan Hangat",
          description: "Kehangatan cinta!",
          content: "Berikan pelukan hangat selama 30 detik tanpa berkata apa-apa!",
          timer: 30,
        },
        74: {
          type: "compliment",
          category: "Pujian",
          icon: "✨",
          title: "Kekuatan Pasangan",
          description: "Apresiasi kekuatan!",
          content: "Sebutkan kekuatan terbesar yang dimiliki pasangan!",
          timer: 60,
        },
        75: {
          type: "communication",
          category: "Komunikasi",
          icon: "💬",
          title: "Cerita Lucu",
          description: "Berbagi tawa!",
          content: "Ceritakan hal paling lucu yang pernah dilakukan untuk pasangan!",
          timer: 90,
        },
        77: {
          type: "whisper",
          category: "Bisikan",
          icon: "🗣️",
          title: "Bisikan Manis",
          description: "Kata-kata lembut!",
          content: "Bisikkan sesuatu yang manis dan romantis di telinga pasangan!",
          timer: 30,
        },
        79: {
          type: "gratitude",
          category: "Syukur",
          icon: "🙏",
          title: "Pelajaran Cinta",
          description: "Pembelajaran bersama!",
          content: "Ceritakan pelajaran terpenting yang dipelajari dari hubungan ini!",
          timer: 90,
        },
        81: {
          type: "touch",
          category: "Sentuhan",
          icon: "🤗",
          title: "Pijat Kepala",
          description: "Relaksasi bersama!",
          content: "Berikan pijatan lembut di kepala pasangan selama 1 menit!",
          timer: 60,
        },
        82: {
          type: "dream",
          category: "Mimpi",
          icon: "🌙",
          title: "Mimpi Indah",
          description: "Berbagi harapan!",
          content: "Ceritakan mimpi terindah yang pernah kamu alami bersama pasangan!",
          timer: 90,
        },
        84: {
          type: "love_language",
          category: "Bahasa Cinta",
          icon: "💖",
          title: "Cara Unik Mencintai",
          description: "Ekspresikan cinta!",
          content: "Tunjukkan cara paling unik untuk mengekspresikan cinta!",
          timer: 60,
        },
        86: {
          type: "surprise",
          category: "Kejutan",
          icon: "🎁",
          title: "Rencana Kejutan",
          description: "Ide romantis!",
          content: "Buat rencana kejutan romantis untuk pasangan minggu depan!",
          timer: 120,
        },
        88: {
          type: "memory",
          category: "Kenangan",
          icon: "💭",
          title: "Momen Haru",
          description: "Kenangan emosional!",
          content: "Ceritakan momen yang paling menyentuh hati dalam hubungan kalian!",
          timer: 120,
        },
        89: {
          type: "dance",
          category: "Tari",
          icon: "💃",
          title: "Waltz Sederhana",
          description: "Tari klasik!",
          content: "Coba lakukan gerakan waltz sederhana berdua!",
          timer: 90,
        },
        91: {
          type: "gratitude",
          category: "Syukur",
          icon: "🙏",
          title: "Rasa Syukur",
          description: "Ungkapan hati!",
          content: "Ungkapkan betapa bersyukurnya kamu memiliki pasangan ini!",
          timer: 60,
        },
        92: {
          type: "future",
          category: "Masa Depan",
          icon: "🏠",
          title: "Impian Bersama",
          description: "Visi masa depan!",
          content: "Ceritakan impian terbesar yang ingin kalian wujudkan bersama!",
          timer: 120,
        },
        94: {
          type: "communication",
          category: "Komunikasi",
          icon: "💬",
          title: "Kata Motivasi",
          description: "Dukungan cinta!",
          content: "Berikan kata-kata motivasi terbaik untuk pasangan!",
          timer: 60,
        },
        96: {
          type: "poem",
          category: "Puisi",
          icon: "📝",
          title: "Sajak Cinta",
          description: "Ungkapan puitis!",
          content: "Buat sajak pendek tentang keindahan cinta kalian!",
          timer: 90,
        },
        97: {
          type: "forever",
          category: "Selamanya",
          icon: "♾️",
          title: "Cinta Abadi",
          description: "Janji selamanya!",
          content: "Ucapkan janji cinta yang akan kalian pegang selamanya!",
          timer: 90,
        },
        99: {
          type: "ultimate",
          category: "Ultimate",
          icon: "💕",
          title: "Ultimate Love",
          description: "Puncak cinta!",
          content: "Ekspresikan cinta dengan cara paling romantis yang bisa kalian lakukan!",
          timer: 120,
        },
      },
      family: {
        2: {
          type: "gratitude",
          category: "Syukur",
          icon: "🙏",
          title: "Syukur Keluarga",
          description: "Ungkapan terima kasih!",
          content: "Sebutkan 3 hal yang membuat bersyukur memiliki keluarga ini!",
          timer: 60,
        },
        3: {
          type: "educational",
          category: "Edukasi",
          icon: "📚",
          title: "Belajar Bersama",
          description: "Pengetahuan keluarga!",
          content: "Sebutkan 5 nama planet dalam tata surya dengan urutan yang benar!",
          timer: 60,
        },
        5: {
          type: "values",
          category: "Nilai",
          icon: "🤝",
          title: "Nilai Keluarga",
          description: "Pelajaran hidup!",
          content: "Ceritakan satu nilai penting yang diajarkan keluarga!",
          timer: 90,
        },
        7: {
          type: "values",
          category: "Nilai",
          icon: "🤝",
          title: "Nilai Keluarga",
          description: "Pelajaran hidup!",
          content: "Ceritakan satu nilai penting yang diajarkan keluarga!",
          timer: 90,
        },
        8: {
          type: "knowledge",
          category: "Pengetahuan",
          icon: "🌍",
          title: "Geografi Indonesia",
          description: "Pengetahuan tanah air!",
          content: "Sebutkan 5 pulau terbesar di Indonesia!",
          timer: 60,
        },
        10: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Cerita Pendek",
          description: "Imajinasi bersama!",
          content: "Buat cerita pendek tentang petualangan keluarga ke hutan!",
          timer: 120,
        },
        11: {
          type: "math",
          category: "Matematika",
          icon: "🔢",
          title: "Hitung Sederhana",
          description: "Kemampuan berhitung!",
          content: "Hitung: 15 + 27 - 8 + 12 = ? Jelaskan caranya!",
          timer: 45,
        },
        12: {
          type: "gratitude",
          category: "Syukur",
          icon: "🙏",
          title: "Bersyukur",
          description: "Ungkapan terima kasih!",
          content: "Sebutkan 3 hal yang membuat bersyukur memiliki keluarga ini!",
          timer: 60,
        },
        13: {
          type: "tradition",
          category: "Tradisi",
          icon: "🎭",
          title: "Tradisi Keluarga",
          description: "Warisan budaya!",
          content: "Ceritakan tradisi unik yang ada dalam keluarga!",
          timer: 90,
        },
        15: {
          type: "science",
          category: "Sains",
          icon: "🔬",
          title: "Sains Sederhana",
          description: "Sains menyenangkan!",
          content: "Jelaskan mengapa air membeku menjadi es dengan bahasa sederhana!",
          timer: 60,
        },
        17: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Cerita Keluarga",
          description: "Imajinasi bersama!",
          content: "Buat cerita pendek tentang petualangan keluarga ke planet Mars!",
          timer: 120,
        },
        18: {
          type: "language",
          category: "Bahasa",
          icon: "🗣️",
          title: "Bahasa Daerah",
          description: "Kekayaan budaya!",
          content: "Ucapkan 'Terima kasih' dalam 3 bahasa daerah Indonesia!",
          timer: 60,
        },
        19: {
          type: "history",
          category: "Sejarah",
          icon: "🏛️",
          title: "Sejarah Indonesia",
          description: "Pengetahuan sejarah!",
          content: "Sebutkan 3 pahlawan nasional Indonesia dan jasanya!",
          timer: 90,
        },
        20: {
          type: "teamwork",
          category: "Kerjasama",
          icon: "🤝",
          title: "Kerja Tim",
          description: "Kekuatan bersama!",
          content: "Buat rencana kegiatan seru yang bisa dilakukan keluarga bersama!",
          timer: 120,
        },
        22: {
          type: "knowledge",
          category: "Pengetahuan",
          icon: "🌍",
          title: "Geografi",
          description: "Pengetahuan dunia!",
          content: "Sebutkan 5 negara di benua Asia dan ibukotanya!",
          timer: 90,
        },
        24: {
          type: "health",
          category: "Kesehatan",
          icon: "💪",
          title: "Hidup Sehat",
          description: "Gaya hidup sehat!",
          content: "Sebutkan 5 kebiasaan sehat yang harus dilakukan setiap hari!",
          timer: 60,
        },
        25: {
          type: "nature",
          category: "Alam",
          icon: "🌱",
          title: "Cinta Lingkungan",
          description: "Peduli alam!",
          content: "Sebutkan 5 cara sederhana untuk menjaga lingkungan!",
          timer: 60,
        },
        26: {
          type: "skill",
          category: "Keterampilan",
          icon: "🎯",
          title: "Bakat Tersembunyi",
          description: "Tunjukkan kemampuan!",
          content: "Tunjukkan satu bakat atau keterampilan unik yang dimiliki!",
          timer: 60,
        },
        27: {
          type: "memory",
          category: "Kenangan",
          icon: "📸",
          title: "Kenangan Indah",
          description: "Nostalgia keluarga!",
          content: "Ceritakan liburan keluarga paling berkesan yang pernah dialami!",
          timer: 120,
        },
        29: {
          type: "cooking",
          category: "Memasak",
          icon: "👨‍🍳",
          title: "Resep Keluarga",
          description: "Tradisi kuliner!",
          content: "Ceritakan resep masakan favorit keluarga dan cara membuatnya!",
          timer: 120,
        },
        30: {
          type: "wisdom",
          category: "Kebijaksanaan",
          icon: "🦉",
          title: "Pesan Bijak",
          description: "Berbagi hikmah!",
          content: "Berikan nasihat terbaik untuk generasi muda tentang keluarga!",
          timer: 90,
        },
        31: {
          type: "prayer",
          category: "Doa",
          icon: "🤲",
          title: "Doa Keluarga",
          description: "Berkah bersama!",
          content: "Pimpin doa untuk kebahagiaan dan kesehatan keluarga!",
          timer: 60,
        },
        32: {
          type: "skill",
          category: "Keterampilan",
          icon: "🎯",
          title: "Bakat Tersembunyi",
          description: "Tunjukkan kemampuan!",
          content: "Tunjukkan satu bakat atau keterampilan unik yang dimiliki!",
          timer: 60,
        },
        34: {
          type: "future_prediction",
          category: "Imajinasi",
          icon: "🔮",
          title: "Prediksi Masa Depan",
          description: "Ramalkan masa depan!",
          content: "Prediksi seperti apa dunia 50 tahun dari sekarang!",
          timer: 90,
        },
        35: {
          type: "language",
          category: "Bahasa",
          icon: "🗣️",
          title: "Pantun Keluarga",
          description: "Sastra tradisional!",
          content: "Buat pantun tentang kebahagiaan keluarga!",
          timer: 90,
        },
        37: {
          type: "math",
          category: "Matematika",
          icon: "🔢",
          title: "Hitung Cepat",
          description: "Kemampuan berhitung!",
          content: "Hitung: (25 x 4) + (100 ÷ 5) - 15 = ? Jelaskan caranya!",
          timer: 45,
        },
        38: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Lagu Keluarga",
          description: "Musik bersama!",
          content: "Ciptakan lagu pendek tentang keluarga dengan melodi sederhana!",
          timer: 120,
        },
        39: {
          type: "knowledge",
          category: "Pengetahuan",
          icon: "🌍",
          title: "Benua dan Samudra",
          description: "Geografi dunia!",
          content: "Sebutkan 7 benua dan 5 samudra di dunia!",
          timer: 90,
        },
        40: {
          type: "teamwork",
          category: "Kerjasama",
          icon: "🤝",
          title: "Proyek Keluarga",
          description: "Kolaborasi!",
          content: "Rencanakan proyek kecil yang bisa dikerjakan keluarga bersama!",
          timer: 120,
        },
        41: {
          type: "history",
          category: "Sejarah",
          icon: "🏛️",
          title: "Kemerdekaan Indonesia",
          description: "Sejarah bangsa!",
          content: "Ceritakan peristiwa proklamasi kemerdekaan Indonesia!",
          timer: 90,
        },
        42: {
          type: "language",
          category: "Bahasa",
          icon: "🗣️",
          title: "Bahasa Daerah",
          description: "Kekayaan budaya!",
          content: "Ucapkan 'Selamat pagi' dalam 3 bahasa daerah Indonesia!",
          timer: 60,
        },
        43: {
          type: "science",
          category: "Sains",
          icon: "🔬",
          title: "Cuaca dan Iklim",
          description: "Fenomena alam!",
          content: "Jelaskan perbedaan antara cuaca dan iklim!",
          timer: 60,
        },
        44: {
          type: "nature",
          category: "Alam",
          icon: "🌱",
          title: "Tumbuhan di Sekitar",
          description: "Pengetahuan alam!",
          content: "Sebutkan 5 jenis tumbuhan yang ada di sekitar rumah!",
          timer: 45,
        },
        45: {
          type: "math",
          category: "Matematika",
          icon: "🔢",
          title: "Pecahan Sederhana",
          description: "Belajar pecahan!",
          content: "Jelaskan apa itu 1/2, 1/4, dan 3/4 dengan contoh nyata!",
          timer: 60,
        },
        46: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Cerita Bergambar",
          description: "Seni bercerita!",
          content: "Buat cerita pendek sambil menggambar ilustrasinya!",
          timer: 120,
        },
        48: {
          type: "wisdom",
          category: "Kebijaksanaan",
          icon: "🦉",
          title: "Pesan Bijak",
          description: "Berbagi hikmah!",
          content: "Berikan nasihat terbaik untuk generasi muda tentang keluarga!",
          timer: 90,
        },
        50: {
          type: "health",
          category: "Kesehatan",
          icon: "💪",
          title: "Olahraga Keluarga",
          description: "Aktivitas sehat!",
          content: "Sebutkan 5 olahraga yang bisa dilakukan keluarga bersama!",
          timer: 60,
        },
        52: {
          type: "history",
          category: "Sejarah",
          icon: "🏛️",
          title: "Sejarah Indonesia",
          description: "Pengetahuan sejarah!",
          content: "Sebutkan 3 pahlawan nasional Indonesia dan jasanya!",
          timer: 90,
        },
        54: {
          type: "tradition",
          category: "Tradisi",
          icon: "🎭",
          title: "Upacara Adat",
          description: "Budaya Indonesia!",
          content: "Ceritakan satu upacara adat dari daerah asal keluarga!",
          timer: 90,
        },
        55: {
          type: "teamwork",
          category: "Kerjasama",
          icon: "🤝",
          title: "Gotong Royong",
          description: "Nilai luhur!",
          content: "Jelaskan pentingnya gotong royong dalam kehidupan!",
          timer: 60,
        },
        57: {
          type: "science",
          category: "Sains",
          icon: "🔬",
          title: "Eksperimen Sederhana",
          description: "Sains menyenangkan!",
          content: "Jelaskan mengapa langit berwarna biru dengan bahasa sederhana!",
          timer: 60,
        },
        58: {
          type: "cooking",
          category: "Memasak",
          icon: "👨‍🍳",
          title: "Makanan Tradisional",
          description: "Kuliner nusantara!",
          content: "Ceritakan makanan tradisional favorit dari daerah asal!",
          timer: 90,
        },
        59: {
          type: "language",
          category: "Bahasa",
          icon: "🗣️",
          title: "Peribahasa",
          description: "Kearifan lokal!",
          content: "Sebutkan 3 peribahasa Indonesia dan artinya!",
          timer: 90,
        },
        61: {
          type: "cooking",
          category: "Memasak",
          icon: "👨‍🍳",
          title: "Resep Keluarga",
          description: "Tradisi kuliner!",
          content: "Ceritakan resep masakan favorit keluarga dan cara membuatnya!",
          timer: 120,
        },
        63: {
          type: "knowledge",
          category: "Pengetahuan",
          icon: "🌍",
          title: "Keajaiban Dunia",
          description: "Pengetahuan umum!",
          content: "Sebutkan 3 keajaiban dunia yang kamu ketahui!",
          timer: 60,
        },
        65: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Puisi Keluarga",
          description: "Seni sastra!",
          content: "Buat puisi pendek tentang kasih sayang keluarga!",
          timer: 90,
        },
        66: {
          type: "nature",
          category: "Alam",
          icon: "🌱",
          title: "Cinta Lingkungan",
          description: "Peduli alam!",
          content: "Sebutkan 5 cara sederhana untuk menjaga lingkungan!",
          timer: 60,
        },
        68: {
          type: "math",
          category: "Matematika",
          icon: "🔢",
          title: "Perkalian Dasar",
          description: "Matematika dasar!",
          content: "Sebutkan tabel perkalian 7 dari 1 sampai 10!",
          timer: 60,
        },
        70: {
          type: "science",
          category: "Sains",
          icon: "🔬",
          title: "Sistem Tata Surya",
          description: "Astronomi!",
          content: "Jelaskan mengapa bumi berputar mengelilingi matahari!",
          timer: 90,
        },
        72: {
          type: "tradition",
          category: "Tradisi",
          icon: "🎭",
          title: "Tradisi Keluarga",
          description: "Warisan budaya!",
          content: "Ceritakan tradisi unik yang ada dalam keluarga!",
          timer: 90,
        },
        74: {
          type: "health",
          category: "Kesehatan",
          icon: "💪",
          title: "Makanan Sehat",
          description: "Nutrisi keluarga!",
          content: "Sebutkan 5 makanan sehat yang baik untuk pertumbuhan!",
          timer: 60,
        },
        75: {
          type: "teamwork",
          category: "Kerjasama",
          icon: "🤝",
          title: "Membantu Orang Tua",
          description: "Bakti anak!",
          content: "Sebutkan 5 cara membantu orang tua di rumah!",
          timer: 60,
        },
        77: {
          type: "future_prediction",
          category: "Imajinasi",
          icon: "🔮",
          title: "Prediksi Masa Depan",
          description: "Ramalkan masa depan!",
          content: "Prediksi seperti apa dunia 50 tahun dari sekarang!",
          timer: 90,
        },
        79: {
          type: "wisdom",
          category: "Kebijaksanaan",
          icon: "🦉",
          title: "Pelajaran Hidup",
          description: "Hikmah keluarga!",
          content: "Ceritakan pelajaran hidup terpenting yang diajarkan keluarga!",
          timer: 90,
        },
        81: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Dongeng Keluarga",
          description: "Cerita imajinatif!",
          content: "Buat dongeng pendek dengan tokoh anggota keluarga!",
          timer: 120,
        },
        82: {
          type: "teamwork",
          category: "Kerjasama",
          icon: "🤝",
          title: "Kerja Tim",
          description: "Kekuatan bersama!",
          content: "Buat rencana kegiatan seru yang bisa dilakukan keluarga bersama!",
          timer: 120,
        },
        84: {
          type: "language",
          category: "Bahasa",
          icon: "🗣️",
          title: "Cerita Rakyat",
          description: "Warisan budaya!",
          content: "Ceritakan satu cerita rakyat Indonesia yang kamu ketahui!",
          timer: 120,
        },
        86: {
          type: "health",
          category: "Kesehatan",
          icon: "💪",
          title: "Hidup Sehat",
          description: "Gaya hidup sehat!",
          content: "Sebutkan 5 kebiasaan sehat yang harus dilakukan setiap hari!",
          timer: 60,
        },
        88: {
          type: "knowledge",
          category: "Pengetahuan",
          icon: "🌍",
          title: "Hewan Langka",
          description: "Konservasi alam!",
          content: "Sebutkan 3 hewan langka Indonesia yang perlu dilindungi!",
          timer: 60,
        },
        89: {
          type: "math",
          category: "Matematika",
          icon: "🔢",
          title: "Geometri Dasar",
          description: "Bentuk dan ruang!",
          content: "Sebutkan 5 bentuk geometri dan contohnya dalam kehidupan!",
          timer: 60,
        },
        91: {
          type: "prayer",
          category: "Doa",
          icon: "🤲",
          title: "Doa Keluarga",
          description: "Berkah bersama!",
          content: "Pimpin doa untuk kebahagiaan dan kesehatan keluarga!",
          timer: 60,
        },
        92: {
          type: "tradition",
          category: "Tradisi",
          icon: "🎭",
          title: "Permainan Tradisional",
          description: "Warisan budaya!",
          content: "Ceritakan permainan tradisional yang dimainkan saat kecil!",
          timer: 90,
        },
        94: {
          type: "science",
          category: "Sains",
          icon: "🔬",
          title: "Siklus Air",
          description: "Fenomena alam!",
          content: "Jelaskan siklus air dari laut ke langit dan kembali ke bumi!",
          timer: 90,
        },
        96: {
          type: "creativity",
          category: "Kreativitas",
          icon: "🎨",
          title: "Lagu Daerah",
          description: "Musik tradisional!",
          content: "Nyanyikan satu lagu daerah Indonesia yang kamu ketahui!",
          timer: 90,
        },
        97: {
          type: "legacy",
          category: "Warisan",
          icon: "👑",
          title: "Warisan Keluarga",
          description: "Pesan untuk generasi!",
          content: "Sampaikan pesan penting yang ingin diwariskan untuk anak cucu!",
          timer: 120,
        },
        99: {
          type: "ultimate",
          category: "Ultimate",
          icon: "👨‍👩‍👧‍👦",
          title: "Ultimate Family",
          description: "Puncak kebersamaan!",
          content: "Ekspresikan rasa cinta dan kebanggaan terhadap keluarga dengan cara terbaik!",
          timer: 120,
        },
      },
    }

    // Enhanced avatar collections
    this.avatarCollections = {
      heroes: ["🦸‍♂️", "🦸‍♀️", "🦹‍♂️", "🦹‍♀️", "🧙‍♂️", "🧙‍♀️", "🧚‍♂️", "🧚‍♀️", "🧞‍♂️", "🧞‍♀️", "🧛‍♂️", "🧛‍♀️"],
      animals: [
        "🐶",
        "🐱",
        "🐭",
        "🐹",
        "🐰",
        "🦊",
        "🐻",
        "🐼",
        "🐨",
        "🐯",
        "🦁",
        "🐸",
        "🐵",
        "🐧",
        "🦆",
        "🦋",
        "🐝",
        "🦄",
      ],
      professions: [
        "👨‍⚕️",
        "👩‍⚕️",
        "👨‍🍳",
        "👩‍🍳",
        "👨‍🎓",
        "👩‍🎓",
        "👨‍💼",
        "👩‍💼",
        "👨‍🔬",
        "👩‍🔬",
        "👨‍🎨",
        "👩‍🎨",
        "👨‍🚀",
        "👩‍🚀",
        "👨‍✈️",
        "👩‍✈️",
        "👨‍🚒",
        "👩‍🚒",
      ],
      fantasy: ["🧙", "🧚", "🧞", "🧛", "🧟", "👻", "👽", "🤖", "🎃", "🦄", "🐉", "🦅", "🦉", "🦇", "🕷️", "🦂"],
      food: [
        "🍕",
        "🍔",
        "🌭",
        "🍟",
        "🍿",
        "🧀",
        "🥨",
        "🥞",
        "🧇",
        "🍰",
        "🎂",
        "🍪",
        "🍩",
        "🍫",
        "🍬",
        "🍭",
        "🍯",
        "🍎",
      ],
      sports: [
        "⚽",
        "🏀",
        "🏈",
        "⚾",
        "🎾",
        "🏐",
        "🏓",
        "🏸",
        "🥊",
        "🥋",
        "🎯",
        "⛳",
        "🏹",
        "🎣",
        "🥅",
        "⛸️",
        "🛷",
        "🏂",
      ],
    }

    this.playerColors = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ]

    this.modeInfo = {
      friends: {
        name: "👥 Mode Teman",
        description: "Tantangan seru untuk teman-teman",
      },
      couple: {
        name: "💕 Mode Pacar",
        description: "Momen romantis untuk pasangan",
      },
      family: {
        name: "👨‍👩‍👧‍👦 Mode Keluarga",
        description: "Kebersamaan keluarga yang hangat",
      },
    }

    this.initializeGame()
    this.setupMusic()
  }

  initializeGame() {
    this.setupEventListeners()
    this.populateAvatarModal()
  }

  setupMusic() {
    // Get the audio element
    this.backgroundMusic = document.getElementById("background-music")

    // Create a simple melody using Web Audio API as fallback
    this.audioContext = null
    this.musicGain = null
    this.musicOscillator = null

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.musicGain = this.audioContext.createGain()
      this.musicGain.connect(this.audioContext.destination)
      this.musicGain.gain.value = 0.3
    } catch (e) {
      console.log("Web Audio API not supported")
    }
  }

  playBackgroundMusic() {
    // Try to play the audio element first
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = 0.3
      this.backgroundMusic
        .play()
        .then(() => {
          this.musicPlaying = true
          document.getElementById("music-toggle").classList.add("playing")
        })
        .catch(() => {
          // Fallback to Web Audio API
          this.playWebAudioMusic()
        })
    } else {
      // Fallback to Web Audio API
      this.playWebAudioMusic()
    }
  }

  playWebAudioMusic() {
    if (!this.audioContext) return

    if (this.audioContext.state === "suspended") {
      this.audioContext.resume()
    }

    this.createMelody()
    this.musicPlaying = true
    document.getElementById("music-toggle").classList.add("playing")
  }

  stopBackgroundMusic() {
    // Stop audio element
    if (this.backgroundMusic) {
      this.backgroundMusic.pause()
      this.backgroundMusic.currentTime = 0
    }

    // Stop Web Audio
    if (this.musicOscillator) {
      this.musicOscillator.stop()
      this.musicOscillator = null
    }

    this.musicPlaying = false
    document.getElementById("music-toggle").classList.remove("playing")
  }

  createMelody() {
    if (!this.audioContext) return

    const notes = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88] // C major scale
    let noteIndex = 0

    const playNote = () => {
      if (!this.musicPlaying) return

      const oscillator = this.audioContext.createOscillator()
      const noteGain = this.audioContext.createGain()

      oscillator.connect(noteGain)
      noteGain.connect(this.musicGain)

      oscillator.frequency.setValueAtTime(notes[noteIndex], this.audioContext.currentTime)
      oscillator.type = "sine"

      noteGain.gain.setValueAtTime(0, this.audioContext.currentTime)
      noteGain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1)
      noteGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.2)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 1.2)

      noteIndex = (noteIndex + 1) % notes.length

      setTimeout(playNote, 1500)
    }

    playNote()
  }

  setupEventListeners() {
    // Music controls
    document.getElementById("music-toggle").addEventListener("click", () => {
      if (this.musicPlaying) {
        this.stopBackgroundMusic()
      } else {
        this.playBackgroundMusic()
      }
    })

    document.getElementById("volume-slider").addEventListener("input", (e) => {
      const volume = e.target.value / 100
      if (this.backgroundMusic) {
        this.backgroundMusic.volume = volume
      }
      if (this.musicGain) {
        this.musicGain.gain.value = volume
      }
    })

    // Mode selection
    document.querySelectorAll(".mode-card").forEach((card) => {
      card.addEventListener("click", () => {
        this.selectMode(card.dataset.mode)
      })
    })

    // Navigation
    document.getElementById("back-to-mode").addEventListener("click", () => {
      this.showScreen("mode-screen")
    })

    document.getElementById("back-to-setup").addEventListener("click", () => {
      this.showScreen("setup-screen")
    })

    // Player count buttons
    document.querySelectorAll(".count-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".count-btn").forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")
        this.selectedPlayerCount = Number.parseInt(e.target.dataset.count)
        this.generatePlayerSetup()
      })
    })

    // Avatar modal
    document.getElementById("close-avatar-modal").addEventListener("click", () => {
      this.closeAvatarModal()
    })

    document.getElementById("confirm-avatar").addEventListener("click", () => {
      this.confirmAvatarSelection()
    })

    // Avatar categories
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")
        this.showAvatarCategory(e.target.dataset.category)
      })
    })

    document.getElementById("start-game").addEventListener("click", () => {
      this.startGame()
    })

    document.getElementById("roll-dice").addEventListener("click", () => {
      this.rollDice()
    })

    document.getElementById("challenge-complete").addEventListener("click", () => {
      this.completeChallengeModal()
    })

    document.getElementById("challenge-skip").addEventListener("click", () => {
      this.skipChallenge()
    })

    document.getElementById("play-again").addEventListener("click", () => {
      this.resetGame()
    })
  }

  selectMode(mode) {
    this.selectedMode = mode
    this.updateModeDisplay()

    // Set default player count berdasarkan mode
    if (mode === "couple") {
      this.selectedPlayerCount = 2
      // Update UI untuk menunjukkan hanya 2 pemain untuk mode couple
      this.generatePlayerSetupForCouple()
    } else {
      this.selectedPlayerCount = 2
      this.generatePlayerSetup()
    }

    this.showScreen("setup-screen")
  }

  updateModeDisplay() {
    const selectedModeDisplay = document.getElementById("selected-mode-display")
    const currentModeDisplay = document.getElementById("current-mode-display")

    if (selectedModeDisplay) {
      selectedModeDisplay.textContent = this.modeInfo[this.selectedMode].name
      selectedModeDisplay.className = `selected-mode ${this.selectedMode}`
    }

    if (currentModeDisplay) {
      currentModeDisplay.textContent = this.modeInfo[this.selectedMode].name
      currentModeDisplay.className = `current-mode ${this.selectedMode}`
    }
  }

  populateAvatarModal() {
    this.showAvatarCategory("heroes")
  }

  showAvatarCategory(category) {
    const avatarGrid = document.getElementById("avatar-grid")
    avatarGrid.innerHTML = ""

    this.avatarCollections[category].forEach((avatar) => {
      const avatarOption = document.createElement("div")
      avatarOption.className = "avatar-option"
      avatarOption.textContent = avatar
      avatarOption.addEventListener("click", () => {
        document.querySelectorAll(".avatar-option").forEach((opt) => opt.classList.remove("selected"))
        avatarOption.classList.add("selected")
        this.selectedAvatar = avatar
      })
      avatarGrid.appendChild(avatarOption)
    })
  }

  openAvatarModal(playerIndex) {
    this.currentPlayerForAvatar = playerIndex
    this.selectedAvatar = null
    document.getElementById("avatar-modal").classList.add("active")
    document.querySelectorAll(".category-btn").forEach((btn) => btn.classList.remove("active"))
    document.querySelector('[data-category="heroes"]').classList.add("active")
    this.showAvatarCategory("heroes")
  }

  closeAvatarModal() {
    document.getElementById("avatar-modal").classList.remove("active")
  }

  confirmAvatarSelection() {
    if (this.selectedAvatar) {
      const avatarPreview = document.querySelector(
        `.player-setup-item:nth-child(${this.currentPlayerForAvatar + 1}) .player-avatar-preview`,
      )
      avatarPreview.textContent = this.selectedAvatar
      this.closeAvatarModal()
    }
  }

  generatePlayerSetupForCouple() {
    const playersSetup = document.getElementById("players-setup")
    const playerCountSection = document.querySelector(".player-count-section")

    // Hide player count selection for couple mode
    if (this.selectedMode === "couple") {
      playerCountSection.style.display = "none"
    } else {
      playerCountSection.style.display = "block"
    }

    playersSetup.innerHTML = ""

    const playerCount = this.selectedMode === "couple" ? 2 : this.selectedPlayerCount

    for (let i = 0; i < playerCount; i++) {
      const playerItem = document.createElement("div")
      playerItem.className = "player-setup-item"

      let placeholder = `Nama Pemain ${i + 1}`
      if (this.selectedMode === "couple") {
        placeholder = i === 0 ? "Nama Pasangan 1" : "Nama Pasangan 2"
      }

      playerItem.innerHTML = `
        <div class="player-avatar-preview" style="background: ${this.playerColors[i]}" onclick="game.openAvatarModal(${i})">
          ${this.avatarCollections.heroes[i % this.avatarCollections.heroes.length]}
        </div>
        <div class="player-input">
          <input type="text" id="player-${i}" placeholder="${placeholder}" required>
        </div>
      `
      playersSetup.appendChild(playerItem)
    }
  }

  generatePlayerSetup() {
    if (this.selectedMode === "couple") {
      this.generatePlayerSetupForCouple()
      return
    }

    const playersSetup = document.getElementById("players-setup")
    const playerCountSection = document.querySelector(".player-count-section")
    playerCountSection.style.display = "block"

    playersSetup.innerHTML = ""

    for (let i = 0; i < this.selectedPlayerCount; i++) {
      const playerItem = document.createElement("div")
      playerItem.className = "player-setup-item"
      playerItem.innerHTML = `
        <div class="player-avatar-preview" style="background: ${this.playerColors[i]}" onclick="game.openAvatarModal(${i})">
          ${this.avatarCollections.heroes[i % this.avatarCollections.heroes.length]}
        </div>
        <div class="player-input">
          <input type="text" id="player-${i}" placeholder="Nama Pemain ${i + 1}" required>
        </div>
      `
      playersSetup.appendChild(playerItem)
    }
  }

  startGame() {
    this.players = []
    this.playerChallengeStats = {} // Reset challenge stats

    const playerCount = this.selectedMode === "couple" ? 2 : this.selectedPlayerCount

    for (let i = 0; i < playerCount; i++) {
      const nameInput = document.getElementById(`player-${i}`)
      const name = nameInput.value.trim()

      if (!name) {
        const playerLabel = this.selectedMode === "couple" ? `Pasangan ${i + 1}` : `Pemain ${i + 1}`
        this.showNotification(`Mohon masukkan nama untuk ${playerLabel}`, "warning")
        return
      }

      const avatarPreview = document.querySelector(`.player-setup-item:nth-child(${i + 1}) .player-avatar-preview`)

      this.players.push({
        name: name,
        position: 0,
        color: this.playerColors[i],
        avatar: avatarPreview.textContent,
      })

      // Initialize challenge stats
      this.playerChallengeStats[name] = 0
    }

    this.currentPlayerIndex = 0
    this.isGameActive = true
    this.gameRound = 1

    this.createGameBoard()
    this.updateUI()
    this.updateModeDisplay()
    this.showScreen("game-screen")
    this.showNotification(
      `🎮 ${this.modeInfo[this.selectedMode].name} dimulai! Giliran ${this.players[0].name}`,
      "success",
    )
  }

  createGameBoard() {
    const gameBoard = document.getElementById("game-board")
    gameBoard.innerHTML = ""

    for (let row = 9; row >= 0; row--) {
      for (let col = 0; col < 10; col++) {
        let cellNumber
        if (row % 2 === 1) {
          cellNumber = row * 10 + (10 - col)
        } else {
          cellNumber = row * 10 + (col + 1)
        }

        const cell = document.createElement("div")
        cell.className = "cell"
        cell.id = `cell-${cellNumber}`

        const cellNumberDiv = document.createElement("div")
        cellNumberDiv.className = "cell-number"
        cellNumberDiv.textContent = cellNumber
        cell.appendChild(cellNumberDiv)

        if (this.snakes[cellNumber]) {
          cell.classList.add("snake-head")
        } else if (Object.values(this.snakes).includes(cellNumber)) {
          cell.classList.add("snake-tail")
        } else if (this.ladders[cellNumber]) {
          cell.classList.add("ladder-bottom")
        } else if (Object.values(this.ladders).includes(cellNumber)) {
          cell.classList.add("ladder-top")
        } else if (this.challengeCells.includes(cellNumber) && this.challengesByMode[this.selectedMode][cellNumber]) {
          cell.classList.add("challenge")
          const icon = document.createElement("div")
          icon.className = "cell-icon"
          icon.innerHTML = this.challengesByMode[this.selectedMode][cellNumber].icon
          cell.appendChild(icon)
        }

        const playersDiv = document.createElement("div")
        playersDiv.className = "cell-players"
        cell.appendChild(playersDiv)

        gameBoard.appendChild(cell)
      }
    }

    this.updatePlayerPositions()
    this.drawSnakesAndLadders()

    // Add labels after a short delay to ensure cells are rendered
    setTimeout(() => {
      this.addSnakeAndLadderLabels()
    }, 100)
  }

  addSnakeAndLadderLabels() {
    // Remove existing labels
    document.querySelectorAll(".snake-label, .ladder-label").forEach((label) => label.remove())

    // Add snake labels - hanya di kepala ular dengan positioning yang tidak overlap
    Object.entries(this.snakes).forEach(([head, tail]) => {
      const headCell = document.getElementById(`cell-${head}`)
      if (headCell && headCell.classList.contains("snake-head")) {
        const label = document.createElement("div")
        label.className = "snake-label"
        label.textContent = `${head}→${tail}`
        headCell.appendChild(label)
      }
    })

    // Add ladder labels - hanya di bawah tangga dengan positioning yang tidak overlap
    Object.entries(this.ladders).forEach(([bottom, top]) => {
      const bottomCell = document.getElementById(`cell-${bottom}`)
      if (bottomCell && bottomCell.classList.contains("ladder-bottom")) {
        const label = document.createElement("div")
        label.className = "ladder-label"
        label.textContent = `${bottom}→${top}`
        bottomCell.appendChild(label)
      }
    })
  }

  drawSnakesAndLadders() {
    const overlay = document.getElementById("board-overlay")
    overlay.innerHTML = ""

    Object.entries(this.snakes).forEach(([head, tail]) => {
      this.drawSnake(overlay, Number.parseInt(head), Number.parseInt(tail))
    })

    Object.entries(this.ladders).forEach(([bottom, top]) => {
      this.drawLadder(overlay, Number.parseInt(bottom), Number.parseInt(top))
    })
  }

  drawSnake(svg, head, tail) {
    const headPos = this.getCellPosition(head)
    const tailPos = this.getCellPosition(tail)

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    const midX = (headPos.x + tailPos.x) / 2
    const midY = (headPos.y + tailPos.y) / 2 - 50

    const d = `M ${headPos.x} ${headPos.y} Q ${midX} ${midY} ${tailPos.x} ${tailPos.y}`

    path.setAttribute("d", d)
    path.setAttribute("stroke", "#e74c3c")
    path.setAttribute("stroke-width", "8")
    path.setAttribute("fill", "none")
    path.setAttribute("stroke-linecap", "round")
    path.setAttribute("opacity", "0.9")

    svg.appendChild(path)
  }

  drawLadder(svg, bottom, top) {
    const bottomPos = this.getCellPosition(bottom)
    const topPos = this.getCellPosition(top)

    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line")

    line1.setAttribute("x1", bottomPos.x - 10)
    line1.setAttribute("y1", bottomPos.y)
    line1.setAttribute("x2", topPos.x - 10)
    line1.setAttribute("y2", topPos.y)
    line1.setAttribute("stroke", "#27ae60")
    line1.setAttribute("stroke-width", "6")
    line1.setAttribute("opacity", "0.9")

    line2.setAttribute("x1", bottomPos.x + 10)
    line2.setAttribute("y1", bottomPos.y)
    line2.setAttribute("x2", topPos.x + 10)
    line2.setAttribute("y2", topPos.y)
    line2.setAttribute("stroke", "#27ae60")
    line2.setAttribute("stroke-width", "6")
    line2.setAttribute("opacity", "0.9")

    const steps = 5
    for (let i = 0; i <= steps; i++) {
      const rung = document.createElementNS("http://www.w3.org/2000/svg", "line")
      const y = bottomPos.y + (topPos.y - bottomPos.y) * (i / steps)

      rung.setAttribute("x1", bottomPos.x - 10)
      rung.setAttribute("y1", y)
      rung.setAttribute("x2", bottomPos.x + 10)
      rung.setAttribute("y2", y)
      rung.setAttribute("stroke", "#27ae60")
      rung.setAttribute("stroke-width", "4")
      rung.setAttribute("opacity", "0.9")

      svg.appendChild(rung)
    }

    svg.appendChild(line1)
    svg.appendChild(line2)
  }

  getCellPosition(cellNumber) {
    const cell = document.getElementById(`cell-${cellNumber}`)
    if (!cell) return { x: 0, y: 0 }

    const rect = cell.getBoundingClientRect()
    const boardRect = document.getElementById("game-board").getBoundingClientRect()

    return {
      x: rect.left - boardRect.left + rect.width / 2,
      y: rect.top - boardRect.top + rect.height / 2,
    }
  }

  updatePlayerPositions() {
    document.querySelectorAll(".cell-players").forEach((div) => {
      div.innerHTML = ""
    })

    this.players.forEach((player, index) => {
      if (player.position > 0) {
        const cell = document.getElementById(`cell-${player.position}`)
        if (cell) {
          const playersDiv = cell.querySelector(".cell-players")

          const playerToken = document.createElement("div")
          playerToken.className = "player-token"
          playerToken.style.background = player.color
          playerToken.textContent = player.avatar
          playersDiv.appendChild(playerToken)
        }
      }
    })
  }

  updateUI() {
    const currentPlayer = this.players[this.currentPlayerIndex]

    document.getElementById("current-player-name").textContent = currentPlayer.name
    document.getElementById("current-player-position").textContent = `Posisi: ${currentPlayer.position}`

    const avatarDiv = document.getElementById("current-player-avatar")
    avatarDiv.style.background = currentPlayer.color
    avatarDiv.textContent = currentPlayer.avatar

    document.getElementById("game-round").textContent = `Putaran: ${this.gameRound}`

    const playersListDiv = document.getElementById("players-list")
    playersListDiv.innerHTML = ""

    this.players.forEach((player, index) => {
      const playerDiv = document.createElement("div")
      playerDiv.className = `player-info ${index === this.currentPlayerIndex ? "active" : ""}`
      playerDiv.innerHTML = `
        <div class="player-name-section">
          <div class="player-avatar" style="background: ${player.color}">${player.avatar}</div>
          <span class="player-name">${player.name}</span>
        </div>
        <span class="player-pos">${player.position}</span>
      `
      playersListDiv.appendChild(playerDiv)
    })

    // Update challenge stats
    this.updateChallengeStats()
  }

  updateChallengeStats() {
    const statsContainer = document.getElementById("challenge-stats")
    if (!statsContainer) return

    const statsList = statsContainer.querySelector(".stats-list")
    statsList.innerHTML = ""

    this.players.forEach((player) => {
      const statItem = document.createElement("div")
      statItem.className = "stat-item"
      statItem.innerHTML = `
        <div class="stat-player">
          <div class="stat-avatar" style="background: ${player.color}">${player.avatar}</div>
          <span>${player.name}</span>
        </div>
        <div class="stat-count">${this.playerChallengeStats[player.name] || 0} tantangan</div>
      `
      statsList.appendChild(statItem)
    })
  }

  rollDice() {
    if (!this.isGameActive) return

    const diceElement = document.getElementById("dice")
    const rollButton = document.getElementById("roll-dice")

    rollButton.disabled = true
    diceElement.classList.add("rolling")

    let rollCount = 0
    const rollInterval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 6) + 1
      diceElement.querySelector(".dice-face i").className = `fas fa-dice-${this.getDiceClass(randomNum)}`
      rollCount++

      if (rollCount >= 12) {
        clearInterval(rollInterval)
        const finalRoll = Math.floor(Math.random() * 6) + 1
        diceElement.querySelector(".dice-face i").className = `fas fa-dice-${this.getDiceClass(finalRoll)}`
        diceElement.classList.remove("rolling")

        setTimeout(() => {
          this.movePlayer(finalRoll)
          rollButton.disabled = false
        }, 500)
      }
    }, 100)
  }

  getDiceClass(number) {
    const diceClasses = ["one", "two", "three", "four", "five", "six"]
    return diceClasses[number - 1]
  }

  movePlayer(steps) {
    const currentPlayer = this.players[this.currentPlayerIndex]
    let newPosition = currentPlayer.position + steps

    if (newPosition >= 100) {
      newPosition = 100
      currentPlayer.position = newPosition
      this.updatePlayerPositions()
      this.showWinner(currentPlayer)
      return
    }

    this.animatePlayerMovement(currentPlayer, currentPlayer.position, newPosition, steps)
  }

  animatePlayerMovement(player, startPos, endPos, steps) {
    let currentPos = startPos
    const moveInterval = setInterval(() => {
      if (currentPos < endPos) {
        currentPos++
        player.position = currentPos
        this.updatePlayerPositions()
        this.updateUI()
      } else {
        clearInterval(moveInterval)
        setTimeout(() => {
          this.checkSpecialCell(endPos)
        }, 500)
      }
    }, 200)
  }

  checkSpecialCell(position) {
    const currentPlayer = this.players[this.currentPlayerIndex]

    if (this.snakes[position]) {
      const newPosition = this.snakes[position]
      setTimeout(() => {
        currentPlayer.position = newPosition
        this.updatePlayerPositions()
        this.updateUI()
        this.showNotification(`🐍 ${currentPlayer.name} kena ular! Turun ke kotak ${newPosition}`, "warning")
        setTimeout(() => this.nextTurn(), 2000)
      }, 1000)
      return
    }

    if (this.ladders[position]) {
      const newPosition = this.ladders[position]
      setTimeout(() => {
        currentPlayer.position = newPosition
        this.updatePlayerPositions()
        this.updateUI()
        this.showNotification(`🪜 ${currentPlayer.name} naik tangga ke kotak ${newPosition}!`, "success")
        setTimeout(() => this.nextTurn(), 2000)
      }, 1000)
      return
    }

    if (this.challengeCells.includes(position) && this.challengesByMode[this.selectedMode][position]) {
      this.showChallenge(this.challengesByMode[this.selectedMode][position])
      return
    }

    this.nextTurn()
  }

  showChallenge(challenge) {
    const modal = document.getElementById("challenge-modal")
    const icon = document.getElementById("challenge-icon")
    const title = document.getElementById("challenge-title")
    const category = document.getElementById("challenge-category")
    const description = document.getElementById("challenge-description")
    const content = document.getElementById("challenge-content")
    const timer = document.getElementById("challenge-timer")

    icon.innerHTML = challenge.icon
    title.textContent = challenge.title
    category.textContent = challenge.category
    description.textContent = challenge.description
    content.textContent = challenge.content

    // Increment challenge count for current player
    const currentPlayer = this.players[this.currentPlayerIndex]
    this.playerChallengeStats[currentPlayer.name]++

    modal.classList.add("active")
    this.startChallengeTimer(challenge.timer)
    this.updateChallengeStats() // Update stats display
  }

  startChallengeTimer(seconds) {
    const timerElement = document.getElementById("challenge-timer")
    let timeLeft = seconds

    this.challengeTimer = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60)
      const secs = timeLeft % 60
      timerElement.textContent = `⏰ ${minutes}:${secs.toString().padStart(2, "0")}`

      if (timeLeft <= 0) {
        clearInterval(this.challengeTimer)
        timerElement.textContent = "⏰ Waktu Habis!"
      }
      timeLeft--
    }, 1000)
  }

  completeChallengeModal() {
    const modal = document.getElementById("challenge-modal")
    modal.classList.remove("active")
    if (this.challengeTimer) {
      clearInterval(this.challengeTimer)
    }
    this.showNotification("✅ Tantangan selesai! Lanjut ke giliran berikutnya", "success")
    setTimeout(() => this.nextTurn(), 1000)
  }

  skipChallenge() {
    const modal = document.getElementById("challenge-modal")
    modal.classList.remove("active")
    if (this.challengeTimer) {
      clearInterval(this.challengeTimer)
    }

    const currentPlayer = this.players[this.currentPlayerIndex]
    if (currentPlayer.position > 1) {
      currentPlayer.position -= 1
      this.updatePlayerPositions()
      this.updateUI()
      this.showNotification(`⏭️ ${currentPlayer.name} melewati tantangan dan mundur 1 langkah`, "warning")
    } else {
      this.showNotification(`⏭️ ${currentPlayer.name} melewati tantangan`, "warning")
    }

    setTimeout(() => this.nextTurn(), 2000)
  }

  nextTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length

    if (this.currentPlayerIndex === 0) {
      this.gameRound++
    }

    this.updateUI()
    this.showNotification(`🎯 Giliran ${this.players[this.currentPlayerIndex].name}`, "info")
  }

  showWinner(winner) {
    this.isGameActive = false
    const modal = document.getElementById("winner-modal")
    const winnerText = document.getElementById("winner-text")
    const winnerAvatar = document.getElementById("winner-avatar")

    winnerText.textContent = `${winner.name} memenangkan ${this.modeInfo[this.selectedMode].name}! 🎉`
    winnerAvatar.style.background = winner.color
    winnerAvatar.textContent = winner.avatar

    modal.classList.add("active")
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 20px;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      z-index: 10000;
      animation: slideInDown 0.3s ease-out;
      max-width: 350px;
      text-align: center;
      font-size: 0.9rem;
    `

    const backgrounds = {
      success: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      warning: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      info: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    }
    notification.style.background = backgrounds[type] || backgrounds.info

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutUp 0.3s ease-in"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  resetGame() {
    document.getElementById("winner-modal").classList.remove("active")

    this.players = []
    this.currentPlayerIndex = 0
    this.isGameActive = false
    this.gameRound = 1
    this.playerChallengeStats = {}

    if (this.challengeTimer) {
      clearInterval(this.challengeTimer)
    }

    this.showScreen("mode-screen")
    this.showNotification("🔄 Game direset! Pilih mode permainan baru", "info")
  }

  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active")
    })
    document.getElementById(screenId).classList.add("active")
  }
}

// Initialize game when page loads
let game
document.addEventListener("DOMContentLoaded", () => {
  game = new EnhancedSnakesLadders()
})
