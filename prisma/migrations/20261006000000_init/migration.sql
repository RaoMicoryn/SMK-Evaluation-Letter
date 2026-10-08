-- CreateTable
CREATE TABLE "evaluations" (
    "id"                  UUID         NOT NULL DEFAULT gen_random_uuid(),
    "category"            VARCHAR(50)  NOT NULL,
    "rating"              INTEGER      NOT NULL,
    "positive_feedback"   TEXT,
    "improvements_needed" TEXT,
    "is_anonymous"        BOOLEAN      NOT NULL DEFAULT true,
    "reporter_name"       VARCHAR(100),
    "created_at"          TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id"),

    -- Pagar terakhir di level database (Prisma tidak bisa mengekspresikan CHECK).
    CONSTRAINT "evaluations_rating_range"
        CHECK ("rating" BETWEEN 1 AND 5),
    CONSTRAINT "evaluations_positive_feedback_len"
        CHECK ("positive_feedback" IS NULL OR char_length("positive_feedback") <= 500),
    CONSTRAINT "evaluations_improvements_needed_len"
        CHECK ("improvements_needed" IS NULL OR char_length("improvements_needed") <= 500),
    CONSTRAINT "evaluations_identity_consistent"
        CHECK (
            ("is_anonymous" = true  AND "reporter_name" IS NULL) OR
            ("is_anonymous" = false AND "reporter_name" IS NOT NULL AND char_length(btrim("reporter_name")) > 0)
        )
);

-- CreateIndex
CREATE INDEX "evaluations_category_created_at_idx" ON "evaluations"("category", "created_at" DESC);
