const axios = require('axios');

const checkServer = async () => {
  try {
    const response = await axios.get('http://localhost:8001/api/web/get_app_name');
    console.log('✅ Server is running');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Server is not running or not accessible');
    console.log('Error:', error.message);
  }
};

checkServer();
