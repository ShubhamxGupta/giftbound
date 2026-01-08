
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hkqvwukwegllhrvvnipf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrcXZ3dWt3ZWdsbGhydnZuaXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NTQyMjgsImV4cCI6MjA4MzQzMDIyOH0.wOsnwYz_V9f2qRAY7TEjrF9jdmA9R5wqq147kdpR5Uk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRLS() {
  console.log('Attempting to fetch participants with ANON key...');
  const { data, error } = await supabase.from('participants').select('*').limit(5);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('SUCCESS (VULNERABILITY CONFIRMED):');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.length > 0 && data[0].assigned_participant_id) {
        console.log('!!! CRITICAL: assigned_participant_id IS VISIBLE !!!');
    } else if (data.length > 0) {
        console.log('Data visible, but assigned_participant_id might be null or not selected?');
    } else {
        console.log('No data returned (table might be empty).');
    }
  }
}

testRLS();
