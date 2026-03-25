import { validate, parse } from "@telegram-apps/init-data-node";
import { getDb } from "./db";

const BOT_TOKEN = process.env.BOT_TOKEN!;

export interface TmaUser {
  id: string;
  telegramId: number;
  username: string | null;
  firstName: string | null;
}

export async function authenticateTma(initDataRaw: string): Promise<TmaUser> {
  validate(initDataRaw, BOT_TOKEN, { expiresIn: 3600 });
  const initData = parse(initDataRaw);
  const tgUser = initData.user;
  if (!tgUser) throw new Error("No user in initData");

  const sql = getDb();

  const existing = await sql`
    SELECT tu.id, tu.telegram_id, tu.telegram_username, tu.telegram_first_name, tu.user_id
    FROM telegram_users tu
    WHERE tu.telegram_id = ${tgUser.id}
  `;

  if (existing.length > 0) {
    return {
      id: existing[0].user_id,
      telegramId: Number(tgUser.id),
      username: existing[0].telegram_username ?? null,
      firstName: existing[0].telegram_first_name ?? null,
    };
  }

  const userRows = await sql`
    INSERT INTO users (fingerprint)
    VALUES (${`tg_${tgUser.id}`})
    RETURNING id
  `;
  const userId = userRows[0].id;

  await sql`
    INSERT INTO telegram_users (telegram_id, telegram_username, telegram_first_name, user_id)
    VALUES (${tgUser.id}, ${tgUser.username ? String(tgUser.username) : null}, ${tgUser.firstName ? String(tgUser.firstName) : null}, ${userId})
  `;

  return {
    id: userId,
    telegramId: Number(tgUser.id),
    username: tgUser.username ? String(tgUser.username) : null,
    firstName: tgUser.firstName ? String(tgUser.firstName as string) : null,
  };
}
