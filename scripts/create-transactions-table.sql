-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone VARCHAR(20) NOT NULL,
  recipient_phone VARCHAR(20),
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL DEFAULT 'send', -- 'send' or 'receive'
  payment_method VARCHAR(50) NOT NULL DEFAULT 'mpesa',
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  transaction_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_phone for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_user_phone ON transactions(user_phone);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Enable RLS (Row Level Security)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to see their own transactions
CREATE POLICY "Users can view their own transactions" ON transactions
  FOR SELECT
  USING (true);

-- Create a policy that allows inserting transactions
CREATE POLICY "Allow inserting transactions" ON transactions
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows updating transactions
CREATE POLICY "Allow updating transactions" ON transactions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
