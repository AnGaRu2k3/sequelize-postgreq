// helpers.js
const formatDate = function (date) {
    // Convert date to 'DD/MM/YYYY' format
    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    return formattedDate;
};

const isAdmin = function (check) {
    // Check if the value is true, return 'Admin', otherwise 'user'
    if (check === true) return "Admin";
    return "user";
};

const first10char = function (str) {
    // Return the first 10 characters of a string, or an empty string if the input is null/undefined
    if (!str) return "";
    return str.slice(0, Math.min(10, str.length));
};

module.exports = { formatDate, isAdmin, first10char };