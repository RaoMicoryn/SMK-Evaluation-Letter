# Kotak Evaluasi

    npm install
    npm run dev

Buka http://localhost:3000 (otomatis ke /evaluasi).
Lihat bagian "Backend API" di bawah.

## Backend API

Stack: Next.js Route Handlers + Prisma + PostgreSQL (kompatibel Neon) + Zod.

    cp .env.example .env        # isi DATABASE_URL & DIRECT_URL
    npm install                 # otomatis menjalankan prisma generate
    npm run db:migrate          # terapkan migrasi (prod/CI)
    npm run db:dev              # atau: migrate dev (lokal)

| Method | Path | Keterangan |
| --- | --- | --- |
| POST | `/api/v1/evaluations` | Simpan evaluasi. 201 / 400 / 413 / 500 |
| GET  | `/api/v1/evaluations/categories` | Daftar kategori untuk dropdown |

Payload POST (snake_case): `category`, `rating` (1-5), `positive_feedback?`, `improvements_needed?` (maks 500 karakter),
`is_anonymous`, `reporter_name` (wajib bila `is_anonymous=false`, harus `null` bila `true`, maks 100 karakter).
Field di luar daftar ditolak.

Respons error: `{ "status": "error", "message": "<error pertama>", "errors": [{ "field", "message" }] }`.

File penting: `prisma/schema.prisma`, `prisma/migrations/*/migration.sql` (berisi CHECK constraint),
`lib/server/validation.ts`, `lib/server/http.ts`, `app/api/v1/evaluations/**/route.ts`.

## Halaman Admin (`/admin`)

Untuk pembina & pengurus OSIS memantau dan mengelola evaluasi yang masuk.

**Setup** — tambahkan ke `.env` (lihat `.env.example`), lalu jalankan `npm run db:migrate` untuk migrasi kolom moderasi:

    ADMIN_PASSWORD="password-panjang-yang-sulit-ditebak"
    ADMIN_SESSION_SECRET="<hasil: openssl rand -base64 48>"   # minimal 32 karakter

Buka `/admin` → login dengan `ADMIN_PASSWORD`. Sesi disimpan di cookie httpOnly bertanda tangan (HMAC), berlaku 8 jam.

**Fitur v1**
- Daftar evaluasi + pagination, filter (teks/nama, kategori, rating, status, tanggal, tampil/sembunyi).
- Detail evaluasi, ubah **status** (baru → dibaca → ditindaklanjuti → selesai) dan **catatan internal**.
- **Sembunyikan / tampilkan lagi** entri (tidak terhapus) dan **hapus permanen**.
- Isi masukan siswa sengaja **tidak bisa diedit**, agar keasliannya terjaga.

**Belum ada (rencana lanjutan):** akun & peran per orang (pembina vs pengurus), statistik/grafik, ekspor.
Saat ini semua yang tahu password punya akses penuh, termasuk hapus permanen.

Endpoint admin (semua butuh login): `POST /api/v1/admin/login`, `POST /api/v1/admin/logout`,
`GET /api/v1/admin/evaluations`, `PATCH|DELETE /api/v1/admin/evaluations/:id`.
