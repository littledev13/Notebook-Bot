// todo No Need params
const balance = "/api/v2/account/all-account-balance";
// Spot
const spotAsset = "/api/v2/spot/account/assets";
const spotOrder = "/api/v2/spot/trade/unfilled-orders";
const spotHistory = "/api/v2/spot/trade/history-orders"; // Bisa tambah params jangka waktu max 90day

// Bot
const bot = "/api/v2/account/bot-assets";

//Future
const position = "/api/v2/mix/position/all-position"; // params : productType =USDT-FUTURES
const positionHistory = "/api/v2/mix/position/history-position"; // params : productType =USDT-FUTURES
const order = "/api/v2/mix/order/orders-pending";
