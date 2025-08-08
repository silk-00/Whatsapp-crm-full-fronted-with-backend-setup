const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wcrm'
};

const fixUserPlan = async () => {
  console.log('🔧 Fixing user plan...\n');
  
  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');
    
    // Update user plan to premium with proper JSON format
    const planData = JSON.stringify({
      title: "Premium Plan",
      contact_limit: 10000,
      allow_api: true,
      allow_chatbot: true,
      allow_tag: true,
      allow_note: true,
      qr_account: 5,
      wa_warmer: true,
      rest_api_qr: true
    });

    await connection.execute(
      `UPDATE user SET plan = ?, plan_expire = DATE_ADD(NOW(), INTERVAL 1 YEAR) WHERE email = 'user@test.com'`,
      [planData]
    );
    console.log('✅ Updated user plan to premium with JSON format');
    
    // Check the updated user
    const [user] = await connection.execute(
      'SELECT uid, name, email, plan, plan_expire FROM user WHERE email = ?',
      ['user@test.com']
    );
    
    if (user.length > 0) {
      console.log('✅ User plan updated:');
      console.log('- Email:', user[0].email);
      console.log('- Plan:', user[0].plan);
      console.log('- Plan Expire:', user[0].plan_expire);
    }
    
    await connection.end();
    console.log('\n🎉 User plan fixed successfully!');
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
  }
};

fixUserPlan().catch(console.error);
