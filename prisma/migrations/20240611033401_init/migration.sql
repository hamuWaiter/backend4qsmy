-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "createTime" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateTime" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;
