# 🧪 PORTO-PLAYWRIGHT

Project automation testing menggunakan [Playwright](https://playwright.dev/) dengan struktur Page Object Model dan integrasi Allure Report untuk pelaporan hasil pengujian.

---

## 📦 Struktur Folder

```
PORTO-PLAYWRIGHT/
│
├── .github/               # Konfigurasi CI/CD GitHub Actions (jika ada)
├── allure-report/         # Output laporan hasil pengujian (static HTML)
├── allure-results/        # File mentah hasil pengujian untuk Allure
├── data/
│   └── testData.json      # Data untuk pengujian
├── node_modules/          # Dependency project
├── pages/                 # Page Object Model (POM)
│   ├── cartPage.js
│   ├── checkoutComplete.js
│   ├── checkoutInformation.js
│   ├── checkoutOverview.js
│   ├── loginPage.js
│   ├── productDetailPage.js
│   ├── productsPage.js
│   └── sidebar.js
├── playwright-report/     # Laporan default dari Playwright (HTML)
├── test-results/          # Output tambahan dari test
├── tests/                 # File berisi test case (*.spec.js)
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md              # << Tambahkan file ini
```

---

## 🚀 Cara Menjalankan Playwright

### 1. Install Dependency

```bash
npm install
```

> Pastikan `playwright`, `@playwright/test`, dan `allure-commandline` sudah ada di `package.json`.

---

### 2. Install Browsers (hanya jika belum di-install)

```bash
npx playwright install
```

---

### 3. Menjalankan Test

Jalankan seluruh test:

```bash
npx playwright test
```

Menjalankan test dengan tag tertentu:

```bash
npx playwright test --grep "@checkout"
```

---

### 4. Melihat Hasil Laporan Playwright

Setelah menjalankan test, buka laporan HTML:

```bash
npx playwright show-report
```

---

## 📊 Generate Allure Report

### 1. Jalankan test dan simpan hasil untuk Allure

```bash
npx playwright test --reporter=line,allure-playwright
```

> Akan mengisi folder `allure-results/`.

### 2. Generate Allure Report

```bash
npx allure generate allure-results --clean -o allure-report
```

### 3. Buka Allure Report

```bash
npx allure open allure-report
```

---

## 🧩 Catatan Tambahan

- Gunakan folder `data/testData.json` untuk menyimpan data dinamis atau test data.
- Semua file test case ada di dalam folder `tests/` dan dipisahkan sesuai fitur.
- Struktur Page Object disimpan di folder `pages/`.