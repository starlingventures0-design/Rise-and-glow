import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import {
  isSupabaseConfigured,
  getDbMode,
  logActivity,
  registerUser,
  loginUser,
  getAllUsers,
  updateUserTasks,
  updateUserProfile,
  getLeaderboard,
  getCommunityPosts,
  addCommunityPost,
  toggleLikePost,
  addCommentToPost,
  getChatMessages,
  addChatMessage,
  searchUsersForFriends,
  sendFriendRequest,
  respondFriendRequest,
  getUserFriendships,
  getDirectMessages,
  postDirectMessage,
  submitReport,
  getAllReports,
  resolveReport,
  trackVisit,
  waterPlant,
  getAdminStats,
  warnUser,
  banUser
} from "./supabaseService.js";

const _filename = typeof __filename !== "undefined" ? __filename : fileURLToPath(import.meta.url);
const _dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(_filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ====================================================================
// REST ENDPOINTS
// ====================================================================

// DB Status Endpoint
app.get("/api/db-status", (req, res) => {
  res.json({
    status: isSupabaseConfigured ? "connected" : "local_fallback",
    type: isSupabaseConfigured ? "Supabase (PostgreSQL)" : "Local JSON Storage",
    url: process.env.SUPABASE_URL || null
  });
});

// 1. Register User
app.post("/api/register", async (req, res) => {
  const { firstName, password, screenshot, goals, avatarUrl } = req.body;

  if (!firstName || !password || !screenshot || !goals || !Array.isArray(goals)) {
    return res.status(400).json({ error: "الرجاء تعبئة جميع الحقول المطلوبة ورفع لقطة الشاشة." });
  }

  try {
    const userSafe = await registerUser({ firstName, password, screenshot, goals, avatarUrl });
    res.status(201).json(userSafe);
  } catch (err: any) {
    if (err.message === "EXISTS") {
      return res.status(400).json({ error: "هذا الاسم مستخدم بالفعل، يرجى اختيار اسم آخر مميز." });
    }
    console.error("Registration error:", err);
    res.status(500).json({ error: "حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى." });
  }
});

// 2. Login User
app.post("/api/login", async (req, res) => {
  const { firstName, password } = req.body;

  if (!firstName || !password) {
    return res.status(400).json({ error: "الرجاء إدخال الاسم الأول وكلمة المرور." });
  }

  try {
    const userSafe = await loginUser(firstName, password);
    res.json(userSafe);
  } catch (err: any) {
    if (err.message === "INVALID") {
      return res.status(400).json({ error: "الاسم أو كلمة المرور غير صحيحة." });
    }
    if (err.message === "BANNED") {
      return res.status(403).json({ error: "عذراً، تم إلغاء وحظر هذا الحساب نهائياً من قبل فريق رانيا بسبب تضليل أو رفع لقطات شاشة غير حقيقية لمتابعة الحساب. ⚠️" });
    }
    console.error("Login error:", err);
    res.status(500).json({ error: "حدث خطأ أثناء تسجيل الدخول." });
  }
});

// 3. Admin View: Get all users with screenshots
app.get("/api/admin/users", async (req, res) => {
  const { passcode } = req.query;
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح، أنت غير مخول لعرض قاعدة البيانات." });
  }

  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Admin users retrieve error:", err);
    res.status(500).json({ error: "فشل استرداد قائمة المستخدمين." });
  }
});

// 4. Update task completion and Virtual Plant points
app.post("/api/users/:userId/tasks", async (req, res) => {
  const { userId } = req.params;
  const { taskId, isCompleted, taskTitle } = req.body;

  try {
    const userSafe = await updateUserTasks(userId, taskId, isCompleted, taskTitle);
    res.json(userSafe);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "المستخدمة غير موجودة." });
    }
    console.error("Update task error:", err);
    res.status(500).json({ error: "فشل تحديث المهمة." });
  }
});

// 4b. Update user profile (avatar)
app.post("/api/users/:userId/profile", async (req, res) => {
  const { userId } = req.params;
  const { avatarUrl } = req.body;

  try {
    const userSafe = await updateUserProfile(userId, avatarUrl);
    res.json(userSafe);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "المستخدمة غير موجودة." });
    }
    console.error("Update profile error:", err);
    res.status(500).json({ error: "فشل تحديث الصورة الشخصية." });
  }
});

// 5. Leaderboard: Get all users sorted by points
app.get("/api/leaderboard", async (req, res) => {
  try {
    const sorted = await getLeaderboard();
    res.json(sorted);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    res.status(500).json({ error: "فشل استيراد قائمة المتصدرين." });
  }
});

// 6. Community: Get posts
app.get("/api/community", async (req, res) => {
  try {
    const posts = await getCommunityPosts();
    res.json(posts);
  } catch (err) {
    console.error("Community posts fetch error:", err);
    res.status(500).json({ error: "فشل استيراد المنشورات." });
  }
});

// 7. Community: Add post
app.post("/api/community", async (req, res) => {
  const { userId, authorName, content, category, image } = req.body;

  if (!userId || !authorName || !content || !category) {
    return res.status(400).json({ error: "الرجاء إدخال تفاصيل المنشور بالكامل." });
  }

  try {
    const newPost = await addCommunityPost({ userId, authorName, content, category, image });
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Add post error:", err);
    res.status(500).json({ error: "فشل إضافة المنشور." });
  }
});

// 8. Community: Toggle Like post
app.post("/api/community/:postId/like", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "معرف المستخدم مطلوب للتفاعل." });
  }

  try {
    const post = await toggleLikePost(postId, userId);
    res.json(post);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "المنشور غير موجود." });
    }
    console.error("Like post error:", err);
    res.status(500).json({ error: "فشل التفاعل مع المنشور." });
  }
});

// 9. Community: Add Comment to post
app.post("/api/community/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  const { authorName, content, userId } = req.body;

  if (!authorName || !content) {
    return res.status(400).json({ error: "الرجاء كتابة تعليق لطيف ومبهج." });
  }

  try {
    const updatedPost = await addCommentToPost(postId, authorName, content, userId);
    res.status(201).json(updatedPost);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "المنشور غير موجود." });
    }
    console.error("Add comment error:", err);
    res.status(500).json({ error: "فشل إضافة التعليق." });
  }
});

// 10. Chat Messages: Get messages for a room
app.get("/api/chat", async (req, res) => {
  const { room } = req.query;
  try {
    const messages = await getChatMessages(room ? String(room) : undefined);
    res.json(messages);
  } catch (err) {
    console.error("Chat fetch error:", err);
    res.status(500).json({ error: "فشل استيراد المحادثات." });
  }
});

// 11. Chat Messages: Post message
app.post("/api/chat", async (req, res) => {
  const { userId, authorName, text, room } = req.body;

  if (!userId || !authorName || !text || !room) {
    return res.status(400).json({ error: "البيانات ناقصة لإرسال الرسالة." });
  }

  try {
    const newMessage = await addChatMessage(userId, authorName, text, room);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Post chat message error:", err);
    res.status(500).json({ error: "فشل إرسال الرسالة." });
  }
});

// 11b. Search Users for Friends
app.get("/api/users/search", async (req, res) => {
  const { query, currentUserId } = req.query;
  try {
    const filtered = await searchUsersForFriends(
      query ? String(query) : "",
      currentUserId ? String(currentUserId) : ""
    );
    res.json(filtered);
  } catch (err) {
    console.error("Search users error:", err);
    res.status(500).json({ error: "فشل البحث عن المستخدمات." });
  }
});

// 11c. Send Friend Request
app.post("/api/friendships/request", async (req, res) => {
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "معرف المرسل والمستلم مطلوب." });
  }

  try {
    const newRequest = await sendFriendRequest(senderId, receiverId);
    res.status(201).json(newRequest);
  } catch (err: any) {
    if (err.message === "EXISTS") {
      return res.status(400).json({ error: "طلب الصداقة موجود بالفعل أو تم إرساله مسبقاً." });
    }
    console.error("Friend request error:", err);
    res.status(500).json({ error: "فشل إرسال طلب الصداقة." });
  }
});

// 11d. Accept/Decline Friend Request
app.post("/api/friendships/:id/respond", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["accepted", "declined"].includes(status)) {
    return res.status(400).json({ error: "حالة غير صالحة." });
  }

  try {
    const result = await respondFriendRequest(id, status);
    res.json(result);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "طلب الصداقة غير موجود." });
    }
    console.error("Respond friend request error:", err);
    res.status(500).json({ error: "فشل الرد على طلب الصداقة." });
  }
});

// 11e. Get User's Friendships & Requests
app.get("/api/users/:userId/friendships", async (req, res) => {
  const { userId } = req.params;
  try {
    const friendships = await getUserFriendships(userId);
    res.json(friendships);
  } catch (err) {
    console.error("Get user friendships error:", err);
    res.status(500).json({ error: "فشل تحميل قائمة الصداقات." });
  }
});

// 11f. Direct Messages: Get messages for friendship
app.get("/api/direct-messages/:friendshipId", async (req, res) => {
  const { friendshipId } = req.params;
  try {
    const messages = await getDirectMessages(friendshipId);
    res.json(messages);
  } catch (err) {
    console.error("Get direct messages error:", err);
    res.status(500).json({ error: "فشل تحميل الرسائل الخاصة." });
  }
});

// 11g. Direct Messages: Post Message
app.post("/api/direct-messages", async (req, res) => {
  const { friendshipId, senderId, senderName, text } = req.body;
  if (!friendshipId || !senderId || !senderName || !text) {
    return res.status(400).json({ error: "البيانات ناقصة لإرسال الرسالة." });
  }

  try {
    const newMessage = await postDirectMessage({ friendshipId, senderId, senderName, text });
    res.status(201).json(newMessage);
  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return res.status(403).json({ error: "لا يمكن إرسال رسائل إلا بين الصديقات المقبولات." });
    }
    console.error("Post direct message error:", err);
    res.status(500).json({ error: "فشل إرسال الرسالة الخاصة." });
  }
});

// 11h. Secure Chat: Submit a Report
app.post("/api/reports", async (req, res) => {
  const { reporterId, reporterName, reportedUserId, reportedUserName, messageText, reason } = req.body;
  if (!reporterId || !reportedUserId || !messageText) {
    return res.status(400).json({ error: "البيانات ناقصة لتقديم الإبلاغ." });
  }

  try {
    const newReport = await submitReport({ reporterId, reporterName, reportedUserId, reportedUserName, messageText, reason });
    res.status(201).json(newReport);
  } catch (err) {
    console.error("Submit report error:", err);
    res.status(500).json({ error: "فشل تقديم الإبلاغ." });
  }
});

// 11i. Admin View: Get all reports
app.get("/api/admin/reports", async (req, res) => {
  const { passcode } = req.query;
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }
  try {
    const reports = await getAllReports();
    res.json(reports);
  } catch (err) {
    console.error("Get admin reports error:", err);
    res.status(500).json({ error: "فشل تحميل البلاغات." });
  }
});

// 11j. Admin View: Dismiss/resolve report
app.post("/api/admin/reports/:reportId/resolve", async (req, res) => {
  const { passcode } = req.query;
  const { reportId } = req.params;
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  try {
    const result = await resolveReport(reportId);
    res.json(result);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "البلاغ غير موجود." });
    }
    console.error("Resolve report error:", err);
    res.status(500).json({ error: "فشل معالجة البلاغ." });
  }
});

// 12. Visitor tracking
app.post("/api/track/visit", async (req, res) => {
  try {
    const result = await trackVisit();
    res.json(result);
  } catch (err) {
    console.error("Track visit error:", err);
    res.status(500).json({ error: "فشل تتبع الزيارة." });
  }
});

// 13. Virtual Plant Done/Care Event
app.post("/api/users/:userId/plant-water", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await waterPlant(userId);
    res.json(result);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "المستخدمة غير موجودة." });
    }
    console.error("Water plant error:", err);
    res.status(500).json({ error: "فشل ري النبتة الافتراضية." });
  }
});

// 14. Admin stats route
app.get("/api/admin/stats", async (req, res) => {
  const { passcode } = req.query;
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  try {
    const stats = await getAdminStats();
    res.json(stats);
  } catch (err) {
    console.error("Get admin stats error:", err);
    res.status(500).json({ error: "فشل تحميل الإحصائيات الإدارية." });
  }
});

// 15. Admin View: Warn user
app.post("/api/admin/users/:userId/warn", async (req, res) => {
  const { passcode } = req.query;
  const { userId } = req.params;
  const { reason } = req.body;

  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  try {
    const result = await warnUser(userId, reason);
    res.json(result);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "المستخدمة غير موجودة." });
    }
    console.error("Warn user error:", err);
    res.status(500).json({ error: "فشل إرسال الإنذار للمستخدمة." });
  }
});

// 16. Admin View: Ban user
app.post("/api/admin/users/:userId/ban", async (req, res) => {
  const { passcode } = req.query;
  const { userId } = req.params;

  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  try {
    const result = await banUser(userId);
    res.json(result);
  } catch (err: any) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "المستخدمة غير موجودة." });
    }
    console.error("Ban user error:", err);
    res.status(500).json({ error: "فشل حظر المستخدمة." });
  }
});

app.get(["/admin", "/rania-admin", "/control-panel", "/admin-panel"], (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    return next();
  } else {
    const distPath = path.join(process.cwd(), "dist");
    return res.sendFile(path.join(distPath, "index.html"));
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${getDbMode()} database mode.`);
  });
}

startServer();
