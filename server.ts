import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const _filename = typeof __filename !== "undefined" ? __filename : fileURLToPath(import.meta.url);
const _dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(_filename);

const app = express();
const PORT = 3000;

// Handle larger payloads for base64 screenshots
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Path for persistence
const DB_FILE = path.join(_dirname, "data-store.json");

// Default initial database content
const DEFAULT_DB = {
  users: [
    {
      id: "user_sara",
      firstName: "سارة",
      goals: ["بشرة لامعة", "راحة نفسية"],
      joinedAt: "2026-06-15T10:00:00.000Z",
      plantPoints: 85,
      points: 150,
      tasksCompletedToday: ["task_skin_1", "task_skin_2", "task_peace_1"],
      lastTaskDate: "2026-06-28",
      screenshot: "dummy_screenshot_1",
      avatarUrl: "preset_1"
    },
    {
      id: "user_layla",
      firstName: "ليلى",
      goals: ["شعر صحي", "جسم مثالي"],
      joinedAt: "2026-06-20T12:30:00.000Z",
      plantPoints: 70,
      points: 120,
      tasksCompletedToday: ["task_hair_1", "task_body_1"],
      lastTaskDate: "2026-06-28",
      screenshot: "dummy_screenshot_2",
      avatarUrl: "preset_2"
    },
    {
      id: "user_nadine",
      firstName: "نادين",
      goals: ["ملامح بارزة", "راحة نفسية"],
      joinedAt: "2026-06-24T16:45:00.000Z",
      plantPoints: 55,
      points: 95,
      tasksCompletedToday: ["task_features_1"],
      lastTaskDate: "2026-06-28",
      screenshot: "dummy_screenshot_3",
      avatarUrl: "preset_3"
    }
  ],
  posts: [
    {
      id: "post_1",
      authorId: "user_sara",
      authorName: "سارة",
      content: "يا بنات، جربت وصفة رانيا لتنظيف البشرة بالشوفان والزبادي اليوم... النتيجة تجنن! بشرتي ناعمة جداً ولامعة كأنها زجاج! 😍✨ شكراً رانيا على هذا الموقع الأكثر من رائع!",
      category: "بشرة لامعة",
      createdAt: "2026-06-28T14:30:00.000Z",
      likes: 12,
      likedBy: [],
      comments: [
        {
          id: "comm_1",
          authorName: "ليلى",
          content: "وااو حمستيني أجربها اليوم! رانيا دائماً نصائحها مضمونة 💖",
          createdAt: "2026-06-28T14:45:00.000Z"
        }
      ]
    },
    {
      id: "post_2",
      authorId: "user_layla",
      authorName: "ليلى",
      content: "مساج فروة الرأس اليومي غير شعري تماماً! التساقط قل بنسبة كبيرة وصار فيه لمعة صحية. مين فيكم ملتزمة بتحدي النبتة؟ نبتتي صارت لطيفة وكبيرة! 🌱💖",
      category: "شعر صحي",
      createdAt: "2026-06-28T11:20:00.000Z",
      likes: 9,
      likedBy: [],
      comments: []
    },
    {
      id: "post_3",
      authorId: "user_nadine",
      authorName: "نادين",
      content: "تمرين التمدد الصباحي يعطي طاقة وراحة نفسية لا توصف.. فخورة جداً بوجودي في هذه المساحة الآمنة معكن. رانيا هي قدوتنا دائماً 🌸",
      category: "راحة نفسية",
      createdAt: "2026-06-27T18:15:00.000Z",
      likes: 15,
      likedBy: [],
      comments: [
        {
          id: "comm_2",
          authorName: "سارة",
          content: "فعلاً التمدد يصنع فرقاً كبيراً في النفسية والمزاج! استمري يا بطلة 🌟",
          createdAt: "2026-06-27T19:00:00.000Z"
        }
      ]
    }
  ],
  chatMessages: [
    {
      id: "msg_1",
      authorId: "user_sara",
      authorName: "سارة",
      text: "أهلاً بالبنات الجميلات في عالم رانيا! 👋✨",
      room: "general",
      createdAt: "2026-06-28T15:00:00.000Z"
    },
    {
      id: "msg_2",
      authorId: "user_layla",
      authorName: "ليلى",
      text: "مرحباً يا صديقتي! كيف حال نبتتك اليوم؟ 🌱",
      room: "general",
      createdAt: "2026-06-28T15:02:00.000Z"
    },
    {
      id: "msg_3",
      authorId: "user_sara",
      authorName: "سارة",
      text: "نبتتي كبرت وطلعت وردة صغيرة! فرحانة جداً بالالتزام 🌸🌸",
      room: "general",
      createdAt: "2026-06-28T15:05:00.000Z"
    },
    {
      id: "msg_4",
      authorId: "user_nadine",
      authorName: "نادين",
      text: "أنا أيضاً! تحدي الـ 6 مهام يغير روتيني اليومي للأفضل.",
      room: "general",
      createdAt: "2026-06-28T15:08:00.000Z"
    },
    {
      id: "msg_5",
      authorId: "user_layla",
      authorName: "ليلى",
      text: "بنات، ما هي أفضل طريقة لترطيب الشفايف في الشتاء؟ 💋",
      room: "beauty",
      createdAt: "2026-06-28T16:10:00.000Z"
    },
    {
      id: "msg_6",
      authorId: "user_sara",
      authorName: "سارة",
      text: "جربي فازلين مع نقاط من زيت اللوز، رائع جداً ومغذي!",
      room: "beauty",
      createdAt: "2026-06-28T16:15:00.000Z"
    },
    {
      id: "msg_7",
      authorId: "user_nadine",
      authorName: "نادين",
      text: "تذكرن يا جميلات: أنتن قويات، متميزات، وتستحقين الأفضل دائماً 💖",
      room: "support",
      createdAt: "2026-06-28T17:00:00.000Z"
    }
  ]
};

// Ensure database file exists
function logActivity(db: any, userId: string, userName: string, action: string, details: string) {
  if (!db.activityLogs) {
    db.activityLogs = [];
  }
  db.activityLogs.unshift({
    id: "act_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    userId,
    userName,
    action,
    details,
    timestamp: new Date().toISOString()
  });
  // Keep last 150 entries to keep database size reasonable
  if (db.activityLogs.length > 150) {
    db.activityLogs = db.activityLogs.slice(0, 150);
  }
}

function loadDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialDb = {
        ...DEFAULT_DB,
        visitorCount: 1,
        plantClicksCount: 0,
        activityLogs: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), "utf8");
      return initialDb;
    }
    const data = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(data);
    
    let modified = false;
    if (parsed.visitorCount === undefined || parsed.visitorCount > 100) {
      // Reset the visitor count to start fresh with real testing
      parsed.visitorCount = 1;
      modified = true;
    }
    if (parsed.plantClicksCount === undefined || parsed.plantClicksCount > 10) {
      // Reset the plant care counter to start clean
      parsed.plantClicksCount = 0;
      modified = true;
    }
    if (!parsed.activityLogs || parsed.activityLogs.some((log: any) => log.id.startsWith("act_init_"))) {
      // Clear out the pre-populated placeholder logs to show only real user actions
      parsed.activityLogs = [];
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), "utf8");
    }
    return parsed;
  } catch (error) {
    console.error("Error loading database, returning default:", error);
    return DEFAULT_DB;
  }
}

function saveDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving database:", error);
  }
}

// REST APIs
// 1. Register User
app.post("/api/register", (req, res) => {
  const { firstName, password, screenshot, goals } = req.body;

  if (!firstName || !password || !screenshot || !goals || !Array.isArray(goals)) {
    return res.status(400).json({ error: "الرجاء تعبئة جميع الحقول المطلوبة ورفع لقطة الشاشة." });
  }

  const dbData = loadDB();
  
  // Clean names to prevent duplicates
  const exists = dbData.users.find(
    (u: any) => u.firstName.trim().toLowerCase() === firstName.trim().toLowerCase()
  );

  if (exists) {
    return res.status(400).json({ error: "هذا الاسم مستخدم بالفعل، يرجى اختيار اسم آخر مميز." });
  }

  const newUser = {
    id: "user_" + Date.now(),
    firstName: firstName.trim(),
    password: password, // In simple setups, we save it directly
    screenshot: screenshot, // Base64 string
    goals: goals.slice(0, 3), // Max 3
    joinedAt: new Date().toISOString(),
    plantPoints: 10, // Starts at 10%
    points: 10, // initial registration points
    tasksCompletedToday: [],
    lastTaskDate: new Date().toISOString().split("T")[0],
    avatarUrl: req.body.avatarUrl || "preset_1"
  };

  dbData.users.push(newUser);
  logActivity(dbData, newUser.id, newUser.firstName, "register", "انضمت إلى عالم رانيا المشرق وبدأت رحلتها للتوهج ✨");
  saveDB(dbData);

  // Return user without password
  const { password: _, ...userSafe } = newUser;
  res.status(201).json(userSafe);
});

// 2. Login User
app.post("/api/login", (req, res) => {
  const { firstName, password } = req.body;

  if (!firstName || !password) {
    return res.status(400).json({ error: "الرجاء إدخال الاسم الأول وكلمة المرور." });
  }

  const dbData = loadDB();
  const user = dbData.users.find(
    (u: any) =>
      u.firstName.trim().toLowerCase() === firstName.trim().toLowerCase() &&
      u.password === password
  );

  if (!user) {
    return res.status(400).json({ error: "الاسم أو كلمة المرور غير صحيحة." });
  }

  if (user.isBanned) {
    return res.status(403).json({ error: "عذراً، تم إلغاء وحظر هذا الحساب نهائياً من قبل فريق رانيا بسبب تضليل أو رفع لقطات شاشة غير حقيقية لمتابعة الحساب. ⚠️" });
  }

  logActivity(dbData, user.id, user.firstName, "login", "سجلت الدخول لتبدأ طقوسها اليومية 🔑");
  saveDB(dbData);

  const { password: _, ...userSafe } = user;
  res.json(userSafe);
});

// 3. Admin View: Get all users with screenshots
app.get("/api/admin/users", (req, res) => {
  const { passcode } = req.query;
  // Let's enforce the secret passcode "rania99"
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح، أنت غير مخول لعرض قاعدة البيانات." });
  }

  const dbData = loadDB();
  res.json(dbData.users);
});

// 4. Update task completion and Virtual Plant points
app.post("/api/users/:userId/tasks", (req, res) => {
  const { userId } = req.params;
  const { taskId, isCompleted, taskTitle } = req.body; // boolean

  const dbData = loadDB();
  const userIndex = dbData.users.findIndex((u: any) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "المستخدمة غير موجودة." });
  }

  const user = dbData.users[userIndex];
  const today = new Date().toISOString().split("T")[0];

  // Reset tasks if it's a new day
  if (user.lastTaskDate !== today) {
    user.tasksCompletedToday = [];
    user.lastTaskDate = today;
  }

  if (isCompleted) {
    // Complete task
    if (!user.tasksCompletedToday.includes(taskId)) {
      user.tasksCompletedToday.push(taskId);
      user.points += 15; // +15 points per task
      user.plantPoints = Math.min(100, user.plantPoints + 15); // Grow plant
      logActivity(dbData, user.id, user.firstName, "task_completed", `أنجزت مهمة: ${taskTitle || taskId} 🌸`);
    }
  } else {
    // Uncheck task
    const index = user.tasksCompletedToday.indexOf(taskId);
    if (index !== -1) {
      user.tasksCompletedToday.splice(index, 1);
      user.points = Math.max(0, user.points - 15);
      user.plantPoints = Math.max(0, user.plantPoints - 15); // Wilt plant
    }
  }

  dbData.users[userIndex] = user;
  saveDB(dbData);

  const { password: _, ...userSafe } = user;
  res.json(userSafe);
});

// 4b. Update user profile (avatar)
app.post("/api/users/:userId/profile", (req, res) => {
  const { userId } = req.params;
  const { avatarUrl } = req.body;

  const dbData = loadDB();
  const userIndex = dbData.users.findIndex((u: any) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "المستخدمة غير موجودة." });
  }

  const user = dbData.users[userIndex];
  if (avatarUrl !== undefined) {
    user.avatarUrl = avatarUrl;
  }

  dbData.users[userIndex] = user;
  saveDB(dbData);

  const { password: _, ...userSafe } = user;
  res.json(userSafe);
});

// 5. Leaderboard: Get all users sorted by points
app.get("/api/leaderboard", (req, res) => {
  const dbData = loadDB();
  const sorted = [...dbData.users]
    .sort((a, b) => b.points - a.points)
    .map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      points: u.points,
      plantPoints: u.plantPoints,
      goals: u.goals,
      joinedAt: u.joinedAt,
      avatarUrl: u.avatarUrl || "preset_1"
    }));
  res.json(sorted);
});

// 6. Community: Get posts
app.get("/api/community", (req, res) => {
  const dbData = loadDB();
  // Return sorted by createdAt descending
  const sortedPosts = [...dbData.posts].sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json(sortedPosts);
});

// 7. Community: Add post
app.post("/api/community", (req, res) => {
  const { userId, authorName, content, category, image } = req.body;

  if (!userId || !authorName || !content || !category) {
    return res.status(400).json({ error: "الرجاء إدخال تفاصيل المنشور بالكامل." });
  }

  const dbData = loadDB();
  const newPost = {
    id: "post_" + Date.now(),
    authorId: userId,
    authorName,
    content,
    category,
    image: image || null, // optional base64 string
    createdAt: new Date().toISOString(),
    likes: 0,
    likedBy: [],
    comments: []
  };

  dbData.posts.push(newPost);
  logActivity(dbData, userId, authorName, "post_created", `شاركت تجربة جديدة في فئة "${category}" 📝`);
  saveDB(dbData);
  res.status(201).json(newPost);
});

// 8. Community: Toggle Like post
app.post("/api/community/:postId/like", (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "معرف المستخدم مطلوب للتفاعل." });
  }

  const dbData = loadDB();
  const postIndex = dbData.posts.findIndex((p: any) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "المنشور غير موجود." });
  }

  const post = dbData.posts[postIndex];
  if (!post.likedBy) {
    post.likedBy = [];
  }

  const userLikeIndex = post.likedBy.indexOf(userId);
  let isLikedNow = false;
  if (userLikeIndex === -1) {
    post.likedBy.push(userId);
    post.likes += 1;
    isLikedNow = true;
  } else {
    post.likedBy.splice(userLikeIndex, 1);
    post.likes = Math.max(0, post.likes - 1);
  }

  if (isLikedNow) {
    const liker = dbData.users.find((u: any) => u.id === userId);
    const likerName = liker ? liker.firstName : "عضوة";
    logActivity(dbData, userId, likerName, "post_liked", `أعجبت بمنشور لصديقتها "${post.authorName}" ❤️`);
  }

  dbData.posts[postIndex] = post;
  saveDB(dbData);
  res.json(post);
});

// 9. Community: Add Comment to post
app.post("/api/community/:postId/comment", (req, res) => {
  const { postId } = req.params;
  const { authorName, content, userId } = req.body;

  if (!authorName || !content) {
    return res.status(400).json({ error: "الرجاء كتابة تعليق لطيف ومبهج." });
  }

  const dbData = loadDB();
  const postIndex = dbData.posts.findIndex((p: any) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "المنشور غير موجود." });
  }

  const newComment = {
    id: "comm_" + Date.now(),
    authorName,
    content,
    createdAt: new Date().toISOString()
  };

  dbData.posts[postIndex].comments.push(newComment);
  logActivity(dbData, userId || "unknown", authorName, "comment_added", `علّقت بكلمات لطيفة ومبهجة على منشور صديقتها "${dbData.posts[postIndex].authorName}" 💬`);
  saveDB(dbData);
  res.status(201).json(dbData.posts[postIndex]);
});

// 10. Chat Messages: Get messages for a room
app.get("/api/chat", (req, res) => {
  const { room } = req.query;
  const dbData = loadDB();
  
  const messages = dbData.chatMessages || [];
  if (room) {
    return res.json(messages.filter((m: any) => m.room === room));
  }
  res.json(messages);
});

// 11. Chat Messages: Post message
app.post("/api/chat", (req, res) => {
  const { userId, authorName, text, room } = req.body;

  if (!userId || !authorName || !text || !room) {
    return res.status(400).json({ error: "البيانات ناقصة لإرسال الرسالة." });
  }

  const dbData = loadDB();
  if (!dbData.chatMessages) {
    dbData.chatMessages = [];
  }

  const newMessage = {
    id: "msg_" + Date.now(),
    authorId: userId,
    authorName,
    text,
    room,
    createdAt: new Date().toISOString()
  };

  dbData.chatMessages.push(newMessage);
  
  // Prune chat messages to keep database light (e.g. keep last 200)
  if (dbData.chatMessages.length > 200) {
    dbData.chatMessages = dbData.chatMessages.slice(-200);
  }

  saveDB(dbData);
  res.status(201).json(newMessage);
});

// 11b. Search Users for Friends (Privacy-focused: returns only ID, name, avatar)
app.get("/api/users/search", (req, res) => {
  const { query, currentUserId } = req.query;
  const dbData = loadDB();
  const lowercaseQuery = query ? String(query).toLowerCase().trim() : "";
  
  const filtered = dbData.users
    .filter((u: any) => {
      if (u.id === currentUserId || u.id === "admin" || u.isBanned) return false;
      if (lowercaseQuery) {
        return u.firstName.toLowerCase().includes(lowercaseQuery);
      }
      return true;
    })
    .map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      avatarUrl: u.avatarUrl || "preset_1",
    }));
  
  res.json(filtered);
});

// 11c. Send Friend Request
app.post("/api/friendships/request", (req, res) => {
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "معرف المرسل والمستلم مطلوب." });
  }

  const dbData = loadDB();
  if (!dbData.friendships) {
    dbData.friendships = [];
  }
  
  const existing = dbData.friendships.find((f: any) => 
    (f.senderId === senderId && f.receiverId === receiverId) ||
    (f.senderId === receiverId && f.receiverId === senderId)
  );

  if (existing) {
    return res.status(400).json({ error: "طلب الصداقة موجود بالفعل أو تم إرساله مسبقاً." });
  }

  const newRequest = {
    id: "friend_" + Date.now(),
    senderId,
    receiverId,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  dbData.friendships.push(newRequest);
  
  const sender = dbData.users.find((u: any) => u.id === senderId);
  const receiver = dbData.users.find((u: any) => u.id === receiverId);
  if (sender && receiver) {
    logActivity(dbData, senderId, sender.firstName, "friend_request_sent", `أرسلت طلب صداقة إلى "${receiver.firstName}" 🌸`);
  }

  saveDB(dbData);
  res.status(201).json(newRequest);
});

// 11d. Accept/Decline Friend Request
app.post("/api/friendships/:id/respond", (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "accepted" or "declined"
  
  if (!["accepted", "declined"].includes(status)) {
    return res.status(400).json({ error: "حالة غير صالحة." });
  }

  const dbData = loadDB();
  if (!dbData.friendships) {
    dbData.friendships = [];
  }

  const index = dbData.friendships.findIndex((f: any) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "طلب الصداقة غير موجود." });
  }

  const friendship = dbData.friendships[index];
  friendship.status = status;
  
  const sender = dbData.users.find((u: any) => u.id === friendship.senderId);
  const receiver = dbData.users.find((u: any) => u.id === friendship.receiverId);
  if (sender && receiver) {
    if (status === "accepted") {
      logActivity(dbData, receiver.id, receiver.firstName, "friend_request_accepted", `قبلت طلب الصداقة من "${sender.firstName}" وأصبحتا صديقتين الآن! 👭💖`);
    } else {
      logActivity(dbData, receiver.id, receiver.firstName, "friend_request_declined", `رفضت طلب الصداقة من "${sender.firstName}" 💔`);
    }
  }

  if (status === "declined") {
    dbData.friendships.splice(index, 1);
  } else {
    dbData.friendships[index] = friendship;
  }

  saveDB(dbData);
  res.json({ success: true, friendship });
});

// 11e. Get User's Friendships & Requests
app.get("/api/users/:userId/friendships", (req, res) => {
  const { userId } = req.params;
  const dbData = loadDB();
  if (!dbData.friendships) {
    dbData.friendships = [];
  }

  const userFriendships = dbData.friendships.filter((f: any) => f.senderId === userId || f.receiverId === userId);
  
  const hydrated = userFriendships.map((f: any) => {
    const friendId = f.senderId === userId ? f.receiverId : f.senderId;
    const friend = dbData.users.find((u: any) => u.id === friendId);
    return {
      id: f.id,
      status: f.status,
      senderId: f.senderId,
      receiverId: f.receiverId,
      createdAt: f.createdAt,
      friend: friend ? {
        id: friend.id,
        firstName: friend.firstName,
        avatarUrl: friend.avatarUrl || "preset_1"
      } : { id: friendId, firstName: "مستخدمة غير معروفة", avatarUrl: "preset_1" }
    };
  });

  res.json(hydrated);
});

// 11f. Direct Messages: Get messages for friendship
app.get("/api/direct-messages/:friendshipId", (req, res) => {
  const { friendshipId } = req.params;
  const dbData = loadDB();
  if (!dbData.directMessages) {
    dbData.directMessages = [];
  }
  const messages = dbData.directMessages.filter((m: any) => m.friendshipId === friendshipId);
  res.json(messages);
});

// 11g. Direct Messages: Post Message
app.post("/api/direct-messages", (req, res) => {
  const { friendshipId, senderId, senderName, text } = req.body;
  if (!friendshipId || !senderId || !senderName || !text) {
    return res.status(400).json({ error: "البيانات ناقصة لإرسال الرسالة." });
  }

  const dbData = loadDB();
  if (!dbData.directMessages) {
    dbData.directMessages = [];
  }

  const friendship = dbData.friendships?.find((f: any) => f.id === friendshipId && f.status === "accepted");
  if (!friendship) {
    return res.status(403).json({ error: "لا يمكن إرسال رسائل إلا بين الصديقات المقبولات." });
  }

  const newMessage = {
    id: "dm_" + Date.now(),
    friendshipId,
    senderId,
    senderName,
    text,
    createdAt: new Date().toISOString()
  };

  dbData.directMessages.push(newMessage);

  if (dbData.directMessages.length > 500) {
    dbData.directMessages = dbData.directMessages.slice(-500);
  }

  saveDB(dbData);
  res.status(201).json(newMessage);
});

// 11h. Secure Chat: Submit a Report ("إبلاغ")
app.post("/api/reports", (req, res) => {
  const { reporterId, reporterName, reportedUserId, reportedUserName, messageText, reason } = req.body;
  if (!reporterId || !reportedUserId || !messageText) {
    return res.status(400).json({ error: "البيانات ناقصة لتقديم الإبلاغ." });
  }

  const dbData = loadDB();
  if (!dbData.reports) {
    dbData.reports = [];
  }

  const newReport = {
    id: "rep_" + Date.now(),
    reporterId,
    reporterName,
    reportedUserId,
    reportedUserName,
    messageText,
    reason: reason || "سلوك غير لائق أو تجاوز في الدردشة الخاصة",
    createdAt: new Date().toISOString(),
    status: "pending"
  };

  dbData.reports.push(newReport);
  logActivity(dbData, reporterId, reporterName, "chat_report", `قدّمت إبلاغاً عن تجاوز في الدردشة من العضوة "${reportedUserName}" ⚠️`);
  saveDB(dbData);

  res.status(201).json(newReport);
});

// 11i. Admin View: Get all reports
app.get("/api/admin/reports", (req, res) => {
  const { passcode } = req.query;
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }
  const dbData = loadDB();
  res.json(dbData.reports || []);
});

// 11j. Admin View: Dismiss/resolve report
app.post("/api/admin/reports/:reportId/resolve", (req, res) => {
  const { passcode } = req.query;
  const { reportId } = req.params;
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  const dbData = loadDB();
  if (!dbData.reports) {
    dbData.reports = [];
  }

  const reportIndex = dbData.reports.findIndex((r: any) => r.id === reportId);
  if (reportIndex === -1) {
    return res.status(404).json({ error: "البلاغ غير موجود." });
  }

  dbData.reports[reportIndex].status = "resolved";
  saveDB(dbData);
  res.json({ success: true, report: dbData.reports[reportIndex] });
});

// 12. Visitor tracking
app.post("/api/track/visit", (req, res) => {
  const dbData = loadDB();
  dbData.visitorCount = (dbData.visitorCount || 0) + 1;
  saveDB(dbData);
  res.json({ success: true, visitorCount: dbData.visitorCount });
});

// 13. Virtual Plant Done/Care Event
app.post("/api/users/:userId/plant-water", (req, res) => {
  const { userId } = req.params;
  const dbData = loadDB();
  const userIndex = dbData.users.findIndex((u: any) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "المستخدمة غير موجودة." });
  }

  const user = dbData.users[userIndex];
  
  // Award a small point bonus for explicit plant water click
  user.plantPoints = Math.min(100, (user.plantPoints || 0) + 10);
  user.points = (user.points || 0) + 10;
  
  dbData.plantClicksCount = (dbData.plantClicksCount || 0) + 1;
  
  logActivity(dbData, user.id, user.firstName, "plant_watered", "سقت واعتنت بنبتتها الافتراضية وسجلت 'تم' 🌱💧");
  
  dbData.users[userIndex] = user;
  saveDB(dbData);
  
  const { password: _, ...userSafe } = user;
  res.json({ user: userSafe, plantClicksCount: dbData.plantClicksCount });
});

// 14. Admin stats route
app.get("/api/admin/stats", (req, res) => {
  const { passcode } = req.query;
  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  const dbData = loadDB();
  
  // Calculate real-time goals popularity
  const goalsPopularity: { [goal: string]: number } = {
    "بشرة لامعة": 0,
    "شعر صحي": 0,
    "ملامح بارزة": 0,
    "جسم مثالي": 0,
    "راحة نفسية": 0
  };

  dbData.users.forEach((u: any) => {
    if (Array.isArray(u.goals)) {
      u.goals.forEach((g: string) => {
        if (goalsPopularity[g] !== undefined) {
          goalsPopularity[g]++;
        } else {
          goalsPopularity[g] = 1;
        }
      });
    }
  });

  res.json({
    visitorCount: dbData.visitorCount || 182,
    plantClicksCount: dbData.plantClicksCount || 45,
    activityLogs: dbData.activityLogs || [],
    goalsPopularity
  });
});

// 15. Admin View: Warn user
app.post("/api/admin/users/:userId/warn", (req, res) => {
  const { passcode } = req.query;
  const { userId } = req.params;
  const { reason } = req.body;

  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  const dbData = loadDB();
  const userIndex = dbData.users.findIndex((u: any) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "المستخدمة غير موجودة." });
  }

  const user = dbData.users[userIndex];
  user.warningsCount = (user.warningsCount || 0) + 1;
  user.warningReason = reason || "تضليل أو رفع لقطة شاشة غير مطابقة لشروط التوهج والمتابعة.";
  
  logActivity(dbData, user.id, user.firstName, "user_warned", `تلقّت إنذاراً رقم ${user.warningsCount} بسبب: ${user.warningReason} ⚠️`);
  dbData.users[userIndex] = user;
  saveDB(dbData);

  res.json({ success: true, user });
});

// 16. Admin View: Ban user
app.post("/api/admin/users/:userId/ban", (req, res) => {
  const { passcode } = req.query;
  const { userId } = req.params;

  if (passcode !== "rania99") {
    return res.status(403).json({ error: "رمز الدخول غير صحيح." });
  }

  const dbData = loadDB();
  const userIndex = dbData.users.findIndex((u: any) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "المستخدمة غير موجودة." });
  }

  const user = dbData.users[userIndex];
  user.isBanned = true;
  
  logActivity(dbData, user.id, user.firstName, "user_banned", "تم حظر حسابها نهائياً وإلغاء التوهج بسبب التضليل 🚫");
  dbData.users[userIndex] = user;
  saveDB(dbData);

  res.json({ success: true, user });
});

// Explicitly map admin paths to avoid any 403 or routing conflicts on the backend
app.get(["/admin", "/rania-admin", "/control-panel", "/admin-panel"], (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    return next();
  } else {
    const distPath = path.join(process.cwd(), "dist");
    return res.sendFile(path.join(distPath, "index.html"));
  }
});

// Configure Vite or Production static files
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
