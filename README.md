# PORTO-PLAYWRIGHT

Project automation testing menggunakan [Playwright](https://playwright.dev/) dengan struktur Page Object Model dan integrasi Allure Report untuk pelaporan hasil pengujian.

---

## Struktur Folder

```
PORTO-PLAYWRIGHT/
│
├── .github/               
├── allure-report/         
├── allure-results/        
├── data/
│   └── testData.json      
├── pages/                 
│   ├── cartPage.js
│   ├── checkoutComplete.js
│   ├── checkoutInformation.js
│   ├── checkoutOverview.js
│   ├── loginPage.js
│   ├── productDetailPage.js
│   ├── productsPage.js
│   └── sidebar.js       
├── tests/                 
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md              
```

---

## Cara Menjalankan Playwright

### 1. Install Dependency

```bash
npm install
```

Pastikan `playwright`, `@playwright/test`, dan `allure-commandline` sudah ada di `package.json`.

---

### 2. Install Browsers

```bash
npx playwright install
```

---

### 3. Menjalankan Test

Jalankan seluruh test:

```bash
npx playwright test
```

Menjalankan test dengan tag GUI:

```bash
npx playwright test --headed
```

Menjalankan test file tertentu:

```bash
npx playwright test tests/namaFile.spec.js
```

---

### 4. Melihat Hasil Laporan Playwright

Setelah menjalankan test, buka laporan HTML:

```bash
npx playwright show-report
```

---

## Generate Allure Report

### 1. Jalankan test dan simpan hasil untuk Allure

```bash
npx playwright test --reporter=allure-playwright
```

### 2. Generate Allure Report

```bash
npx allure generate allure-results -o allure-report --clean
```

### 3. Buka Allure Report

```bash
npx allure open allure-report
```

---

## Catatan Tambahan

- Gunakan folder `data/testData.json` untuk menyimpan data dinamis atau test data.
- Semua file test case ada di dalam folder `tests/` dan dipisahkan sesuai fitur.
- Struktur Page Object disimpan di folder `pages/`.
