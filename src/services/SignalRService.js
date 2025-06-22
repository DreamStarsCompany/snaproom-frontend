import * as signalR from "@microsoft/signalr";

let connection = null;

/**
 * Khởi tạo và bắt đầu kết nối SignalR
 * @param {string} accessToken - Token xác thực
 * @param {function} onReceiveMessage - Callback khi nhận được tin nhắn
 */
export const startSignalRConnection = async (accessToken, onReceiveMessage) => {
  console.log("Đang thiết lập SignalR...");

  if (connection && connection.state === "Connected") {
    console.log("✅ SignalR đã được kết nối trước đó.");
    return;
  }

  console.log("🔧 Tạo mới HubConnection...");
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://snaproom-e7asc0ercvbxazb8.southeastasia-01.azurewebsites.net/chathub", {
      accessTokenFactory: () => {
        console.log("🔑 Tạo access token cho SignalR...");
        return accessToken;
      },
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  console.log("📡 Đăng ký lắng nghe 'ReceiveMessage'...");
  connection.on("ReceiveMessage", (message) => {
    console.log("📥 Tin nhắn mới từ server:", message);
    try {
      onReceiveMessage(message);
    } catch (err) {
      console.error("❌ Lỗi xử lý ReceiveMessage:", err);
    }
  });

  try {
    console.log("🚀 Bắt đầu kết nối SignalR...");
    await connection.start();
    console.log("✅ SignalR đã kết nối thành công");
  } catch (error) {
    console.error("❌ Lỗi khi kết nối SignalR:", error);
  }
};

/**
 * Gửi tin nhắn qua SignalR
 * @param {string} senderId
 * @param {string} receiverId
 * @param {string} content
 */
export const sendMessage = async (senderId, receiverId, content) => {
  console.log(`📤 Đang gửi: "${content}" từ ${senderId} đến ${receiverId}`);

  if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
    console.warn("⚠️ Không thể gửi tin nhắn: chưa kết nối SignalR.");
    return;
  }

  try {
    await connection.invoke("SendMessage", senderId, receiverId, content);
    console.log("✅ Tin nhắn đã gửi qua SignalR");
  } catch (error) {
    console.error("❌ Lỗi khi gửi tin nhắn:", error);
  }
};

/**
 * Ngắt kết nối SignalR
 */
export const stopSignalRConnection = async () => {
  if (connection) {
    try {
      console.log("🔌 Đang ngắt kết nối SignalR...");
      await connection.stop();
      console.log("✅ Đã ngắt kết nối SignalR");
    } catch (error) {
      console.error("❌ Lỗi khi ngắt kết nối SignalR:", error);
    }
  } else {
    console.log("ℹ️ Không có kết nối SignalR để ngắt.");
  }
};
