-- CreateEnum
CREATE TYPE "EvaluationStatus" AS ENUM ('baru', 'dibaca', 'ditindaklanjuti', 'selesai');

-- AlterTable
ALTER TABLE "evaluations"
    ADD COLUMN "status"        "EvaluationStatus" NOT NULL DEFAULT 'baru',
    ADD COLUMN "internal_note" TEXT,
    ADD COLUMN "hidden_at"     TIMESTAMPTZ(3),
    ADD COLUMN "updated_at"    TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD CONSTRAINT "evaluations_internal_note_len"
        CHECK ("internal_note" IS NULL OR char_length("internal_note") <= 1000);

-- CreateIndex
CREATE INDEX "evaluations_status_idx" ON "evaluations"("status");
