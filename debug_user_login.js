const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wcrm'
};

const debugLogin = async () => {
  console.log('🔍 Debugging User Login...\n');
  
  try {
    // Connect to database
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');
    
    // Check if user exists
    const [users] = await connection.execute(
      'SELECT * FROM user WHERE email = ?', 
      ['user@test.com']
    );
    
    if (users.length === 0) {
      console.log('❌ User not found in database');
      return;
    }
    
    const user = users[0];
    console.log('✅ User found in database:');
    console.log('- ID:', user.id);
    console.log('- UID:', user.uid);
    console.log('- Name:', user.name);
    console.log('- Email:', user.email);
    console.log('- Password Hash:', user.password);
    console.log('- Created:', user.created_at);
    
    // Test password comparison
    console.log('\n🔐 Testing password comparison...');
    const testPassword = 'admin123';
    console.log('Test password:', testPassword);
    
    try {
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log('Password match result:', isMatch);
      
      if (isMatch) {
        console.log('✅ Password comparison successful!');
      } else {
        console.log('❌ Password comparison failed!');
        
        // Generate new hash for comparison
        console.log('\n🔧 Generating new hash for comparison...');
        const newHash = await bcrypt.hash(testPassword, 10);
        console.log('New hash:', newHash);
        
        const newMatch = await bcrypt.compare(testPassword, newHash);
        console.log('New hash match:', newMatch);
        
        // Update user with new hash
        console.log('\n🔄 Updating user with new password hash...');
        await connection.execute(
          'UPDATE user SET password = ? WHERE email = ?',
          [newHash, 'user@test.com']
        );
        console.log('✅ Password updated in database');
      }
    } catch (bcryptError) {
      console.log('❌ Bcrypt error:', bcryptError.message);
    }
    
    await connection.end();
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
  }
};

debugLogin().catch(console.error);
