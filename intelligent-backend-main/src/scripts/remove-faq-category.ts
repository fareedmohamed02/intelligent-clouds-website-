import { connectDb, disconnectDb } from "../config/db";
import { Faq } from "../models/Faq";

/**
 * Migration: drop the retired `category` field (and its compound index) from FAQs.
 * Idempotent — safe to run more than once.
 */
async function run() {
  await connectDb();
  const collection = Faq.collection;

  // 1) Remove the field from every document
  const res = await collection.updateMany(
    { category: { $exists: true } },
    { $unset: { category: "" } },
  );
  console.log(`[migrate] category unset on ${res.modifiedCount} FAQ document(s)`);

  // 2) Drop the now-unused compound index if it still exists
  const indexes = await collection.indexes();
  const stale = indexes.find(
    (ix) => ix.key && "category" in ix.key,
  );
  if (stale?.name) {
    await collection.dropIndex(stale.name);
    console.log(`[migrate] dropped index ${stale.name}`);
  } else {
    console.log("[migrate] no category index to drop");
  }

  await disconnectDb();
  console.log("[migrate] done");
}

run().catch(async (err) => {
  console.error("[migrate] failed:", err);
  await disconnectDb().catch(() => undefined);
  process.exit(1);
});
