const axios = require("axios");

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://dashboardbackend.akashjayaraj.repl.co/users"
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();
