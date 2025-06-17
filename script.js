// Sistem Pakar Forward Chaining untuk Rekomendasi Bidang Studi

class ExpertSystem {
  constructor() {
    this.currentQuestionIndex = 0
    this.answers = []
    this.currentLevel = 1
    this.currentPath = "general"
    this.questions = this.initializeQuestions()
    this.rules = this.initializeRules()
  }

  initializeQuestions() {
    return {
      // Level 1: Single General Question
      general: [
        "Apakah kamu lebih tertarik dengan ilmu alam dan teknologi (SAINTEK) dibandingkan ilmu sosial dan humaniora (SOSHUM)?",
      ],

      // Level 1: General SAINTEK
      saintek: [
        "Apakah kamu tertarik mempelajari ilmu alam dan teknologi?",
        "Apakah kamu senang menyelesaikan soal-soal logika atau matematika?",
        "Apakah kamu lebih suka melakukan eksperimen ilmiah daripada membaca teori sosial?",
        "Apakah kamu tertarik membangun atau menciptakan sesuatu dengan teknologi?",
      ],

      // Level 1: General SOSHUM
      soshum_general: [
        "Apakah kamu tertarik mempelajari perilaku manusia dan masyarakat?",
        "Apakah kamu lebih suka berdiskusi dibandingkan menghitung angka?",
        "Apakah kamu senang membaca buku sejarah, politik, atau budaya?",
        "Apakah kamu suka berbicara di depan umum dan mengemukakan pendapat?",
        "Apakah kamu memiliki rasa empati dan tertarik memahami perbedaan sosial?",
        "Apakah kamu lebih nyaman menulis esai dibanding menyelesaikan soal logika?",
      ],

      // Level 2: SAINTEK Branches
      saintek_kesehatan: [
        "Apakah kamu tertarik mempelajari anatomi tubuh manusia?",
        "Apakah kamu ingin bekerja membantu menyembuhkan orang sakit?",
        "Apakah kamu nyaman melihat darah atau prosedur medis?",
        "Apakah kamu teliti dan sabar dalam mengamati gejala-gejala pasien?",
        "Apakah kamu ingin menjadi dokter, perawat, atau tenaga medis lainnya?",
        "Apakah kamu tertarik dengan obat-obatan dan farmasi?",
      ],

      saintek_teknik: [
        "Apakah kamu suka mempelajari cara kerja mesin atau alat elektronik?",
        "Apakah kamu tertarik dengan pembangunan dan struktur seperti jembatan atau gedung?",
        "Apakah kamu suka membuat desain atau sketsa perancangan alat?",
        "Apakah kamu tertarik dengan dunia komputer dan teknologi digital?",
        "Apakah kamu ingin tahu bagaimana cara membuat software atau aplikasi?",
        "Apakah kamu suka merakit atau membongkar alat elektronik?",
        "Apakah kamu memiliki ketertarikan terhadap energi dan listrik?",
      ],

      saintek_murni: [
        "Apakah kamu tertarik mempelajari reaksi kimia dan laboratorium?",
        "Apakah kamu penasaran tentang cara kerja alam semesta?",
        "Apakah kamu tertarik dengan astronomi atau fisika partikel?",
        "Apakah kamu senang mengamati tumbuhan dan hewan?",
        "Apakah kamu menyukai eksperimen biologi di laboratorium?",
        "Apakah kamu tertarik dengan riset ilmiah dan publikasi jurnal?",
      ],

      // Level 2: SOSHUM Branches
      soshum_hukum: [
        "Apakah kamu senang membahas isu hukum dan keadilan sosial?",
        "Apakah kamu tertarik dengan kerja-kerja advokasi dan hak asasi manusia?",
        "Apakah kamu suka membaca undang-undang atau mengikuti berita hukum?",
        "Apakah kamu ingin menjadi pengacara, jaksa, atau hakim?",
        "Apakah kamu mengikuti perkembangan politik nasional dan global?",
        "Apakah kamu ingin bekerja di instansi pemerintahan atau organisasi politik?",
      ],

      soshum_ekonomi: [
        "Apakah kamu tertarik mempelajari cara kerja pasar dan keuangan?",
        "Apakah kamu senang berdagang atau berwirausaha?",
        "Apakah kamu suka menganalisis data keuangan atau tren pasar?",
        "Apakah kamu ingin menjadi manajer, analis keuangan, atau pengusaha?",
        "Apakah kamu suka mempelajari manajemen sumber daya manusia?",
        "Apakah kamu tertarik mempelajari strategi pemasaran produk?",
      ],

      soshum_sosial: [
        "Apakah kamu tertarik mempelajari kebudayaan dan kehidupan masyarakat?",
        "Apakah kamu suka menulis puisi, cerita, atau artikel?",
        "Apakah kamu ingin menjadi sosiolog, antropolog, atau peneliti budaya?",
        "Apakah kamu tertarik dengan bahasa asing dan linguistik?",
        "Apakah kamu ingin bekerja di bidang pendidikan atau menjadi guru?",
        "Apakah kamu tertarik dengan dunia media, komunikasi, atau jurnalistik?",
      ],

      // Level 3: Specific Programs
      kesehatan_spesifik: [
        "Apakah kamu bercita-cita menjadi dokter umum atau spesialis?",
        "Apakah kamu lebih tertarik di bidang kesehatan masyarakat?",
        "Apakah kamu ingin menjadi apoteker atau peneliti obat?",
        "Apakah kamu lebih suka mengelola data dan teknologi di bidang kesehatan (rekam medis)?",
      ],

      teknik_spesifik: [
        "Apakah kamu ingin menjadi software engineer?",
        "Apakah kamu lebih suka merancang jaringan dan sistem komputer?",
        "Apakah kamu tertarik menjadi insinyur sipil atau struktur bangunan?",
        "Apakah kamu ingin bekerja di industri manufaktur atau permesinan?",
        "Apakah kamu suka dengan desain alat robotik dan AI?",
        "Apakah kamu tertarik dengan teknik pertambangan atau geologi?",
      ],

      murni_spesifik: [
        "Apakah kamu ingin menjadi ahli kimia atau peneliti laboratorium?",
        "Apakah kamu lebih suka menganalisis DNA, genetik, atau bioteknologi?",
        "Apakah kamu tertarik menjadi astronom atau astrofisikawan?",
        "Apakah kamu ingin meneliti perubahan iklim dan lingkungan?",
        "Apakah kamu tertarik dengan matematika murni dan teorinya?",
      ],

      hukum_spesifik: [
        "Apakah kamu ingin memperjuangkan keadilan melalui hukum?",
        "Apakah kamu tertarik dengan diplomasi atau hubungan internasional?",
        "Apakah kamu ingin bekerja di lembaga legislatif atau kementerian?",
        "Apakah kamu suka riset hukum dan kebijakan publik?",
      ],

      ekonomi_spesifik: [
        "Apakah kamu ingin membuka bisnis sendiri?",
        "Apakah kamu lebih tertarik di perbankan atau pasar saham?",
        "Apakah kamu ingin bekerja di dunia manajemen perusahaan?",
        "Apakah kamu suka menganalisis konsumen dan membuat strategi promosi?",
      ],

      sosial_spesifik: [
        "Apakah kamu tertarik menjadi penulis, editor, atau jurnalis?",
        "Apakah kamu ingin bekerja di industri kreatif, seperti film atau teater?",
        "Apakah kamu ingin menjadi guru atau dosen?",
        "Apakah kamu tertarik meneliti bahasa daerah atau linguistik struktural?",
        "Apakah kamu ingin bekerja di lembaga kemanusiaan atau NGO?",
        "Apakah kamu tertarik dengan sosiologi digital dan pengaruh media sosial?",
      ],
    }
  }

  initializeRules() {
    return {
      // Program Studi Recommendations
      programs: {
        // SAINTEK Programs
        kedokteran: ["Kedokteran", "Keperawatan", "Kesehatan Masyarakat"],
        farmasi: ["Farmasi", "Kimia Farmasi", "Bioteknologi Farmasi"],
        kesehatan_teknologi: ["Rekam Medis", "Teknologi Laboratorium Medik", "Radiologi"],

        teknik_informatika: ["Teknik Informatika", "Ilmu Komputer", "Sistem Informasi"],
        teknik_sipil: ["Teknik Sipil", "Arsitektur", "Teknik Lingkungan"],
        teknik_mesin: ["Teknik Mesin", "Teknik Industri", "Teknik Manufaktur"],
        teknik_elektro: ["Teknik Elektro", "Teknik Telekomunikasi", "Teknik Robotika"],
        teknik_pertambangan: ["Teknik Pertambangan", "Teknik Geologi", "Teknik Perminyakan"],

        kimia: ["Kimia", "Kimia Murni", "Teknik Kimia"],
        biologi: ["Biologi", "Bioteknologi", "Mikrobiologi"],
        fisika: ["Fisika", "Astronomi", "Geofisika"],
        matematika: ["Matematika", "Statistika", "Aktuaria"],

        // SOSHUM Programs
        hukum: ["Ilmu Hukum", "Hukum Bisnis", "Hukum Internasional"],
        politik: ["Ilmu Politik", "Hubungan Internasional", "Administrasi Publik"],

        manajemen: ["Manajemen", "Manajemen Bisnis", "Manajemen SDM"],
        ekonomi: ["Ekonomi", "Ekonomi Pembangunan", "Ekonomi Syariah"],
        akuntansi: ["Akuntansi", "Akuntansi Keuangan", "Perpajakan"],
        bisnis: ["Administrasi Bisnis", "Kewirausahaan", "Bisnis Digital"],

        komunikasi: ["Ilmu Komunikasi", "Jurnalistik", "Public Relations"],
        sastra: ["Sastra Indonesia", "Sastra Inggris", "Linguistik"],
        pendidikan: ["Pendidikan", "PGSD", "Pendidikan Bahasa"],
        sosiologi: ["Sosiologi", "Antropologi", "Psikologi"],
        kreatif: ["Desain Komunikasi Visual", "Film dan Televisi", "Seni Rupa"],
      },
    }
  }

  getCurrentQuestion() {
    const currentQuestions = this.questions[this.currentPath]
    if (this.currentQuestionIndex < currentQuestions.length) {
      return currentQuestions[this.currentQuestionIndex]
    }
    return null
  }

  answerQuestion(answer) {
    this.answers.push({
      path: this.currentPath,
      questionIndex: this.currentQuestionIndex,
      question: this.getCurrentQuestion(),
      answer: answer,
      level: this.currentLevel,
    })

    this.currentQuestionIndex++

    // Forward Chaining Logic
    this.applyForwardChaining()
  }

  applyForwardChaining() {
    // Level 1: Determine SAINTEK vs SOSHUM based on single question
    if (this.currentPath === "general") {
        if (this.currentQuestionIndex >= this.questions.general.length) {
            const isSaintek = this.answers[0].answer; // Get the answer to the single question

            if (isSaintek) {
                // Go to SAINTEK Level 2
                this.currentLevel = 2;
                this.currentPath = "saintek_kesehatan";
                this.currentQuestionIndex = 0;
            } else {
                // Go to SOSHUM Level 1
                this.currentLevel = 1;
                this.currentPath = "soshum_general";
                this.currentQuestionIndex = 0;
            }
        }
    }

    // SOSHUM Level 1 Complete
    else if (this.currentPath === "soshum_general") {
      if (this.currentQuestionIndex >= this.questions.soshum_general.length) {
        const soshum_score = this.answers.filter((a) => a.path === "soshum_general" && a.answer).length

        if (soshum_score >= 4) {
          // Go to SOSHUM Level 2
          this.currentLevel = 2
          this.currentPath = "soshum_hukum"
          this.currentQuestionIndex = 0
        } else {
          // No clear direction
          this.showResults()
          return
        }
      }
    }

    // Level 2: SAINTEK Branches
    else if (this.currentPath === "saintek_kesehatan") {
      if (this.currentQuestionIndex >= this.questions.saintek_kesehatan.length) {
        const kesehatanScore = this.answers.filter((a) => a.path === "saintek_kesehatan" && a.answer).length

        if (kesehatanScore >= 4) {
          this.currentLevel = 3
          this.currentPath = "kesehatan_spesifik"
          this.currentQuestionIndex = 0
        } else {
          this.currentPath = "saintek_teknik"
          this.currentQuestionIndex = 0
        }
      }
    } else if (this.currentPath === "saintek_teknik") {
      if (this.currentQuestionIndex >= this.questions.saintek_teknik.length) {
        const teknikScore = this.answers.filter((a) => a.path === "saintek_teknik" && a.answer).length

        if (teknikScore >= 4) {
          this.currentLevel = 3
          this.currentPath = "teknik_spesifik"
          this.currentQuestionIndex = 0
        } else {
          this.currentPath = "saintek_murni"
          this.currentQuestionIndex = 0
        }
      }
    } else if (this.currentPath === "saintek_murni") {
      if (this.currentQuestionIndex >= this.questions.saintek_murni.length) {
        const murniScore = this.answers.filter((a) => a.path === "saintek_murni" && a.answer).length

        if (murniScore >= 4) {
          this.currentLevel = 3
          this.currentPath = "murni_spesifik"
          this.currentQuestionIndex = 0
        } else {
          this.showResults()
          return
        }
      }
    }

    // Level 2: SOSHUM Branches
    else if (this.currentPath === "soshum_hukum") {
      if (this.currentQuestionIndex >= this.questions.soshum_hukum.length) {
        const hukumScore = this.answers.filter((a) => a.path === "soshum_hukum" && a.answer).length

        if (hukumScore >= 4) {
          this.currentLevel = 3
          this.currentPath = "hukum_spesifik"
          this.currentQuestionIndex = 0
        } else {
          this.currentPath = "soshum_ekonomi"
          this.currentQuestionIndex = 0
        }
      }
    } else if (this.currentPath === "soshum_ekonomi") {
      if (this.currentQuestionIndex >= this.questions.soshum_ekonomi.length) {
        const ekonomiScore = this.answers.filter((a) => a.path === "soshum_ekonomi" && a.answer).length

        if (ekonomiScore >= 4) {
          this.currentLevel = 3
          this.currentPath = "ekonomi_spesifik"
          this.currentQuestionIndex = 0
        } else {
          this.currentPath = "soshum_sosial"
          this.currentQuestionIndex = 0
        }
      }
    } else if (this.currentPath === "soshum_sosial") {
      if (this.currentQuestionIndex >= this.questions.soshum_sosial.length) {
        const sosialScore = this.answers.filter((a) => a.path === "soshum_sosial" && a.answer).length

        if (sosialScore >= 4) {
          this.currentLevel = 3
          this.currentPath = "sosial_spesifik"
          this.currentQuestionIndex = 0
        } else {
          this.showResults()
          return
        }
      }
    }

    // Level 3: Specific Programs - All lead to results
    else if (this.currentPath.includes("_spesifik")) {
      if (this.currentQuestionIndex >= this.questions[this.currentPath].length) {
        this.showResults()
        return
      }
    }

    // Continue with next question
    this.displayCurrentQuestion()
  }

  generateRecommendations() {
    const recommendations = []
    const pathScores = {}

    // Calculate scores for each path
    this.answers.forEach((answer) => {
      if (answer.answer) {
        pathScores[answer.path] = (pathScores[answer.path] || 0) + 1
      }
    })

    // Get total questions per path for percentage calculation
    const pathTotals = {}
    this.answers.forEach((answer) => {
      pathTotals[answer.path] = (pathTotals[answer.path] || 0) + 1
    })

    // Calculate percentage scores
    const pathPercentages = {}
    Object.keys(pathScores).forEach((path) => {
      pathPercentages[path] = (pathScores[path] / pathTotals[path]) * 100
    })

    // Determine primary recommendation based on strongest path and specific answers
    const strongestPath = Object.keys(pathPercentages).reduce((a, b) =>
      pathPercentages[a] > pathPercentages[b] ? a : b,
    )

    // Generate specific recommendations based on the strongest path and level 3 answers
    if (strongestPath.includes("kesehatan") || this.currentPath.includes("kesehatan")) {
      const level3Answers = this.answers.filter((a) => a.path === "kesehatan_spesifik")

      if (level3Answers.some((a) => a.questionIndex === 0 && a.answer)) {
        recommendations.push("Kedokteran", "Kedokteran Gigi")
      } else if (level3Answers.some((a) => a.questionIndex === 2 && a.answer)) {
        recommendations.push("Farmasi", "Kimia Farmasi")
      } else if (level3Answers.some((a) => a.questionIndex === 3 && a.answer)) {
        recommendations.push("Rekam Medis", "Teknologi Laboratorium Medik")
      } else if (level3Answers.some((a) => a.questionIndex === 1 && a.answer)) {
        recommendations.push("Kesehatan Masyarakat", "Gizi")
      } else {
        recommendations.push("Kedokteran", "Keperawatan", "Farmasi")
      }
    } else if (strongestPath.includes("teknik") || this.currentPath.includes("teknik")) {
      const level3Answers = this.answers.filter((a) => a.path === "teknik_spesifik")

      if (level3Answers.some((a) => a.questionIndex === 0 && a.answer)) {
        recommendations.push("Teknik Informatika", "Ilmu Komputer")
      } else if (level3Answers.some((a) => a.questionIndex === 1 && a.answer)) {
        recommendations.push("Teknik Komputer", "Sistem Informasi")
      } else if (level3Answers.some((a) => a.questionIndex === 2 && a.answer)) {
        recommendations.push("Teknik Sipil", "Arsitektur")
      } else if (level3Answers.some((a) => a.questionIndex === 3 && a.answer)) {
        recommendations.push("Teknik Mesin", "Teknik Industri")
      } else if (level3Answers.some((a) => a.questionIndex === 4 && a.answer)) {
        recommendations.push("Teknik Elektro", "Teknik Robotika")
      } else if (level3Answers.some((a) => a.questionIndex === 5 && a.answer)) {
        recommendations.push("Teknik Pertambangan", "Teknik Geologi")
      } else {
        recommendations.push("Teknik Informatika", "Teknik Sipil", "Teknik Elektro")
      }
    } else if (strongestPath.includes("murni") || this.currentPath.includes("murni")) {
      const level3Answers = this.answers.filter((a) => a.path === "murni_spesifik")

      if (level3Answers.some((a) => a.questionIndex === 0 && a.answer)) {
        recommendations.push("Kimia", "Teknik Kimia")
      } else if (level3Answers.some((a) => a.questionIndex === 1 && a.answer)) {
        recommendations.push("Biologi", "Bioteknologi")
      } else if (level3Answers.some((a) => a.questionIndex === 2 && a.answer)) {
        recommendations.push("Fisika", "Astronomi")
      } else if (level3Answers.some((a) => a.questionIndex === 3 && a.answer)) {
        recommendations.push("Teknik Lingkungan", "Geografi")
      } else if (level3Answers.some((a) => a.questionIndex === 4 && a.answer)) {
        recommendations.push("Matematika", "Statistika")
      } else {
        recommendations.push("Kimia", "Biologi", "Fisika")
      }
    } else if (strongestPath.includes("hukum") || this.currentPath.includes("hukum")) {
      const level3Answers = this.answers.filter((a) => a.path === "hukum_spesifik")

      if (level3Answers.some((a) => a.questionIndex === 0 && a.answer)) {
        recommendations.push("Ilmu Hukum", "Hukum Bisnis")
      } else if (level3Answers.some((a) => a.questionIndex === 1 && a.answer)) {
        recommendations.push("Hubungan Internasional", "Ilmu Politik")
      } else if (level3Answers.some((a) => a.questionIndex === 2 && a.answer)) {
        recommendations.push("Administrasi Publik", "Ilmu Pemerintahan")
      } else if (level3Answers.some((a) => a.questionIndex === 3 && a.answer)) {
        recommendations.push("Ilmu Hukum", "Kriminologi")
      } else {
        recommendations.push("Ilmu Hukum", "Ilmu Politik")
      }
    } else if (strongestPath.includes("ekonomi") || this.currentPath.includes("ekonomi")) {
      const level3Answers = this.answers.filter((a) => a.path === "ekonomi_spesifik")

      if (level3Answers.some((a) => a.questionIndex === 0 && a.answer)) {
        recommendations.push("Kewirausahaan", "Manajemen Bisnis")
      } else if (level3Answers.some((a) => a.questionIndex === 1 && a.answer)) {
        recommendations.push("Ekonomi", "Akuntansi")
      } else if (level3Answers.some((a) => a.questionIndex === 2 && a.answer)) {
        recommendations.push("Manajemen", "Administrasi Bisnis")
      } else if (level3Answers.some((a) => a.questionIndex === 3 && a.answer)) {
        recommendations.push("Manajemen Pemasaran", "Bisnis Digital")
      } else {
        recommendations.push("Manajemen", "Ekonomi", "Akuntansi")
      }
    } else if (strongestPath.includes("sosial") || this.currentPath.includes("sosial")) {
      const level3Answers = this.answers.filter((a) => a.path === "sosial_spesifik")

      if (level3Answers.some((a) => a.questionIndex === 0 && a.answer)) {
        recommendations.push("Jurnalistik", "Ilmu Komunikasi")
      } else if (level3Answers.some((a) => a.questionIndex === 1 && a.answer)) {
        recommendations.push("Desain Komunikasi Visual", "Film dan Televisi")
      } else if (level3Answers.some((a) => a.questionIndex === 2 && a.answer)) {
        recommendations.push("Pendidikan", "PGSD")
      } else if (level3Answers.some((a) => a.questionIndex === 3 && a.answer)) {
        recommendations.push("Sastra Indonesia", "Linguistik")
      } else if (level3Answers.some((a) => a.questionIndex === 4 && a.answer)) {
        recommendations.push("Sosiologi", "Psikologi")
      } else if (level3Answers.some((a) => a.questionIndex === 5 && a.answer)) {
        recommendations.push("Ilmu Komunikasi", "Sosiologi")
      } else {
        recommendations.push("Ilmu Komunikasi", "Sosiologi", "Psikologi")
      }
    }

    // Fallback recommendations with limited options
    if (recommendations.length === 0) {
      const saintekAnswers = this.answers.filter((a) => a.path === "general" && a.answer).length
      const soshumAnswers = this.answers.filter((a) => a.path === "soshum_general" && a.answer).length

      if (saintekAnswers >= soshumAnswers) {
        recommendations.push("Teknik Informatika", "Matematika")
      } else {
        recommendations.push("Manajemen", "Ilmu Komunikasi")
      }
    }

    // Remove duplicates and limit to maximum 5 recommendations
    const uniqueRecommendations = [...new Set(recommendations)]
    return uniqueRecommendations.slice(0, 5)
  }

  displayCurrentQuestion() {
    const question = this.getCurrentQuestion()
    if (!question) {
      this.showResults()
      return
    }

    document.getElementById("questionText").textContent = question
    document.getElementById("questionNumber").textContent = `Pertanyaan ${this.getTotalQuestionNumber()}`
    document.getElementById("levelIndicator").textContent = `Level ${this.currentLevel}`

    this.updateProgress()
  }

  getTotalQuestionNumber() {
    return this.answers.length + 1
  }

  updateProgress() {
    const totalQuestions = this.estimateTotalQuestions()
    const currentQuestion = this.answers.length
    const progress = Math.min((currentQuestion / totalQuestions) * 100, 100)

    document.getElementById("progressFill").style.width = `${progress}%`
    document.getElementById("progressText").textContent = `${Math.round(progress)}%`
  }

  estimateTotalQuestions() {
    // Estimate based on typical path length
    return 20 // Average path through the decision tree
  }

  showResults() {
    const recommendations = this.generateRecommendations()

    document.getElementById("questionScreen").style.display = "none"
    document.getElementById("resultScreen").style.display = "block"

    const resultContent = document.getElementById("resultContent")
    resultContent.innerHTML = `
          <div class="recommendation">
              <h3>🎯 Top ${recommendations.length} Rekomendasi Program Studi untuk Anda:</h3>
              <ul class="recommendation-list">
                  ${recommendations.map((program, index) => `<li><strong>${index + 1}.</strong> ${program}</li>`).join("")}
              </ul>
          </div>
          <div class="analysis-section">
              <h3>📊 Ringkasan Analisis</h3>
              <p>Berdasarkan ${this.answers.length} pertanyaan yang telah dijawab, sistem telah memilih ${recommendations.length} program studi yang paling sesuai dengan minat dan karakteristik Anda.</p>
              <p><strong>Tingkat Kepercayaan:</strong> ${this.calculateConfidence()}%</p>
              <p><em>Rekomendasi diurutkan berdasarkan tingkat kesesuaian tertinggi.</em></p>
          </div>
      `

    // Directly set progress to 100% for the results screen
    document.getElementById("progressFill").style.width = `100%`;
    document.getElementById("progressText").textContent = `100%`;
  }

  calculateConfidence() {
    const totalAnswers = this.answers.length
    const positiveAnswers = this.answers.filter((a) => a.answer).length
    const confidence = Math.min((positiveAnswers / totalAnswers) * 100, 95)
    return Math.round(confidence)
  }

  showDetailedAnalysis() {
    document.getElementById("resultScreen").style.display = "none"
    document.getElementById("analysisScreen").style.display = "block"

    const analysisContent = document.getElementById("analysisContent")

    const pathAnalysis = this.analyzeAnswersByPath()

    analysisContent.innerHTML = `
            <div class="analysis-section">
                <h3>📈 Analisis Berdasarkan Bidang</h3>
                ${Object.entries(pathAnalysis)
        .map(
          ([path, data]) => `
                    <div class="answer-item ${data.score > 50 ? "positive" : "negative"}">
                        <strong>${this.getPathDisplayName(path)}</strong><br>
                        Skor: ${data.score}% (${data.positive}/${data.total} jawaban positif)
                    </div>
                `,
        )
        .join("")}
            </div>
            
            <div class="analysis-section">
                <h3>📝 Detail Jawaban</h3>
                <div class="answer-summary">
                    ${this.answers
        .map(
          (answer, index) => `
                        <div class="answer-item ${answer.answer ? "positive" : "negative"}">
                            <strong>Q${index + 1}:</strong> ${answer.question}<br>
                            <strong>Jawaban:</strong> ${answer.answer ? "Ya" : "Tidak"}
                        </div>
                    `,
        )
        .join("")}
                </div>
            </div>
        `
  }

  analyzeAnswersByPath() {
    const pathAnalysis = {}

    this.answers.forEach((answer) => {
      if (!pathAnalysis[answer.path]) {
        pathAnalysis[answer.path] = { positive: 0, total: 0 }
      }

      pathAnalysis[answer.path].total++
      if (answer.answer) {
        pathAnalysis[answer.path].positive++
      }
    })

    Object.keys(pathAnalysis).forEach((path) => {
      const data = pathAnalysis[path]
      data.score = Math.round((data.positive / data.total) * 100)
    })

    return pathAnalysis
  }

  getPathDisplayName(path) {
    const pathNames = {
      general: "SAINTEK Umum",
      soshum_general: "SOSHUM Umum",
      saintek_kesehatan: "Kesehatan & Kedokteran",
      saintek_teknik: "Teknik",
      saintek_murni: "Ilmu Murni",
      soshum_hukum: "Hukum & Politik",
      soshum_ekonomi: "Ekonomi & Bisnis",
      soshum_sosial: "Sosial & Humaniora",
      kesehatan_spesifik: "Spesialisasi Kesehatan",
      teknik_spesifik: "Spesialisasi Teknik",
      murni_spesifik: "Spesialisasi Ilmu Murni",
      hukum_spesifik: "Spesialisasi Hukum",
      ekonomi_spesifik: "Spesialisasi Ekonomi",
      sosial_spesifik: "Spesialisasi Sosial",
    }

    return pathNames[path] || path
  }

  restart() {
    this.currentQuestionIndex = 0
    this.answers = []
    this.currentLevel = 1
    this.currentPath = "general"

    document.getElementById("resultScreen").style.display = "none"
    document.getElementById("analysisScreen").style.display = "none"
    document.getElementById("welcomeScreen").style.display = "block"

    document.getElementById("progressFill").style.width = "0%"
    document.getElementById("progressText").textContent = "0%"
  }
}

// Global instance
let expertSystem

function startExpertSystem() {
  expertSystem = new ExpertSystem()

  document.getElementById("welcomeScreen").style.display = "none"
  document.getElementById("questionScreen").style.display = "block"

  expertSystem.displayCurrentQuestion()
}

function answerQuestion(answer) {
  expertSystem.answerQuestion(answer)
}

function restartSystem() {
  expertSystem.restart()
}

function showDetailedAnalysis() {
  expertSystem.showDetailedAnalysis()
}

function backToResult() {
  document.getElementById("analysisScreen").style.display = "none"
  document.getElementById("resultScreen").style.display = "block"
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Sistem Pakar Forward Chaining siap digunakan!")
})
