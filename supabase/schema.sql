-- Supabase Schema for SOL Stay Living

-- 1. LEADS TABLE
CREATE TABLE leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    occupation TEXT,
    move_in_date DATE,
    source TEXT DEFAULT 'Website',
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Visit Scheduled', 'Visited', 'Converted', 'Lost'))
);

-- Enable RLS for leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- Allow anonymous inserts (from the public website form)
CREATE POLICY "Allow public inserts" ON leads FOR INSERT WITH CHECK (true);
-- Only authenticated users (admins) can view, update, delete
CREATE POLICY "Allow auth full access" ON leads FOR ALL USING (auth.role() = 'authenticated');


-- 2. PROPERTIES TABLE
CREATE TABLE properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    property_name TEXT NOT NULL,
    address TEXT NOT NULL,
    total_beds INTEGER NOT NULL,
    occupied_beds INTEGER DEFAULT 0,
    vacant_beds INTEGER GENERATED ALWAYS AS (total_beds - occupied_beds) STORED,
    monthly_rent NUMERIC NOT NULL
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow auth full access" ON properties FOR ALL USING (auth.role() = 'authenticated');


-- 3. RESIDENTS TABLE
CREATE TABLE residents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    emergency_contact TEXT NOT NULL,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    bed_number TEXT,
    joining_date DATE NOT NULL,
    contract_end_date DATE NOT NULL,
    deposit_amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Vacated'))
);

ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow auth full access" ON residents FOR ALL USING (auth.role() = 'authenticated');


-- 4. PAYMENTS TABLE
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
    payment_type TEXT NOT NULL CHECK (payment_type IN ('Deposit', 'Installment 1', 'Installment 2', 'Rent')),
    amount NUMERIC NOT NULL,
    payment_date DATE,
    due_date DATE NOT NULL,
    payment_status TEXT DEFAULT 'Pending' CHECK (payment_status IN ('Paid', 'Pending', 'Overdue'))
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow auth full access" ON payments FOR ALL USING (auth.role() = 'authenticated');


-- 5. MAINTENANCE_REQUESTS TABLE
CREATE TABLE maintenance_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    issue_type TEXT NOT NULL CHECK (issue_type IN ('Electrical', 'Plumbing', 'Cleaning', 'Appliance', 'Other')),
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved'))
);

ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow auth full access" ON maintenance_requests FOR ALL USING (auth.role() = 'authenticated');


