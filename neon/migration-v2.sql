-- Telegram users (linked to existing users table)
CREATE TABLE IF NOT EXISTS telegram_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id bigint UNIQUE NOT NULL,
  telegram_username text,
  telegram_first_name text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  referrer_telegram_id bigint,
  created_at timestamptz DEFAULT now()
);

-- Bot message deduplication
CREATE TABLE IF NOT EXISTS bot_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id bigint NOT NULL,
  message_type text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  UNIQUE(telegram_id, message_type, (sent_at::date))
);

CREATE INDEX IF NOT EXISTS idx_telegram_users_tid ON telegram_users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_bot_messages_tid ON bot_messages(telegram_id);
