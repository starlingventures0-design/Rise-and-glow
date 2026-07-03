import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const _filename = typeof __filename !== "undefined" ? __filename : fileURLToPath(import.meta.url);
const _dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(_filename);
const DB_FILE = path.join(_dirname, "data-store.json");

// ====================================================================
// DEFAULT LOCAL STORAGE CONFIGURATION (FALLBACK)
// ====================================================================
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
  ],
  friendships: [],
  directMessages: [],
  reports: [],
  visitorCount: 1,
  plantClicksCount: 0,
  activityLogs: []
};

function loadJSONDB() {
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
    if (parsed.visitorCount === undefined) {
      parsed.visitorCount = 1;
      modified = true;
    }
    if (parsed.plantClicksCount === undefined) {
      parsed.plantClicksCount = 0;
      modified = true;
    }
    if (!parsed.activityLogs) {
      parsed.activityLogs = [];
      modified = true;
    }
    if (!parsed.friendships) {
      parsed.friendships = [];
      modified = true;
    }
    if (!parsed.directMessages) {
      parsed.directMessages = [];
      modified = true;
    }
    if (!parsed.reports) {
      parsed.reports = [];
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), "utf8");
    }
    return parsed;
  } catch (error) {
    console.error("Error loading local DB:", error);
    return DEFAULT_DB as any;
  }
}

function saveJSONDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving local DB:", error);
  }
}

function logJSONActivity(db: any, userId: string, userName: string, action: string, details: string) {
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
  if (db.activityLogs.length > 150) {
    db.activityLogs = db.activityLogs.slice(0, 150);
  }
}

// ====================================================================
// SUPABASE CLIENT INITIALIZATION
// ====================================================================
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

let supabase: any = null;
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });
    console.log("🟢 Supabase client initialized successfully. Connecting with URL:", supabaseUrl);
  } catch (err) {
    console.error("❌ Failed to initialize Supabase client:", err);
  }
} else {
  console.log("ℹ️ Supabase credentials not found. Running in LOCAL JSON FALLBACK MODE.");
}

// Helper to determine if we are executing on Supabase or JSON fallback
export function getDbMode() {
  return isSupabaseConfigured && supabase ? "supabase" : "local";
}

// Generic helper to run a Supabase operation with instant fallback if table doesn't exist
async function runQuery<T>(supabaseOp: () => Promise<any>, fallbackOp: () => T): Promise<T> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackOp();
  }
  try {
    const { data, error } = await supabaseOp();
    if (error) {
      if (error.code === "42P01") {
        console.warn(`⚠️ Table not found in Supabase (Code 42P01). Did you run supabase-schema.sql? Falling back to Local JSON.`);
        return fallbackOp();
      }
      throw error;
    }
    return data as any as T;
  } catch (err: any) {
    console.error("❌ Supabase operation error, falling back to Local JSON:", err.message || err);
    return fallbackOp();
  }
}

// ====================================================================
// DATABASE OPERATIONS DEFINITIONS
// ====================================================================

// Log Activity
export async function logActivity(userId: string, userName: string, action: string, details: string) {
  const mode = getDbMode();
  if (mode === "supabase") {
    try {
      const { error } = await supabase.from("activity_logs").insert([{
        id: "act_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        userId,
        userName,
        action,
        details,
        timestamp: new Date().toISOString()
      }]);
      if (!error) return;
      if (error.code !== "42P01") throw error;
    } catch (err) {
      console.error("Failed to log activity to Supabase:", err);
    }
  }

  // Fallback to local
  const db = loadJSONDB();
  logJSONActivity(db, userId, userName, action, details);
  saveJSONDB(db);
}

// Register User
export async function registerUser(fields: any) {
  const { firstName, password, screenshot, goals, avatarUrl } = fields;
  const usernameClean = firstName.trim();

  return runQuery(
    async () => {
      // Check if user exists
      const { data: existingUsers, error: checkErr } = await supabase
        .from("users")
        .select("id, firstName")
        .ilike("firstName", usernameClean);

      if (checkErr) throw checkErr;
      if (existingUsers && existingUsers.length > 0) {
        throw new Error("EXISTS");
      }

      const newUser = {
        id: "user_" + Date.now(),
        firstName: usernameClean,
        password: password,
        screenshot: screenshot,
        goals: goals.slice(0, 3),
        joinedAt: new Date().toISOString(),
        plantPoints: 10,
        points: 10,
        tasksCompletedToday: [],
        lastTaskDate: new Date().toISOString().split("T")[0],
        avatarUrl: avatarUrl || "preset_1",
        isBanned: false,
        warningsCount: 0,
        warningReason: null
      };

      const { data, error } = await supabase
        .from("users")
        .insert([newUser])
        .select();

      if (error) throw error;
      
      await logActivity(newUser.id, newUser.firstName, "register", "انضمت إلى عالم رانيا المشرق وبدأت رحلتها للتوهج ✨");
      
      const { password: _, ...userSafe } = data[0];
      return userSafe;
    },
    () => {
      const db = loadJSONDB();
      const exists = db.users.find(
        (u: any) => u.firstName.trim().toLowerCase() === usernameClean.toLowerCase()
      );
      if (exists) {
        throw new Error("EXISTS");
      }

      const newUser = {
        id: "user_" + Date.now(),
        firstName: usernameClean,
        password: password,
        screenshot: screenshot,
        goals: goals.slice(0, 3),
        joinedAt: new Date().toISOString(),
        plantPoints: 10,
        points: 10,
        tasksCompletedToday: [],
        lastTaskDate: new Date().toISOString().split("T")[0],
        avatarUrl: avatarUrl || "preset_1",
        isBanned: false,
        warningsCount: 0,
        warningReason: ""
      };

      db.users.push(newUser);
      logJSONActivity(db, newUser.id, newUser.firstName, "register", "انضمت إلى عالم رانيا المشرق وبدأت رحلتها للتوهج ✨");
      saveJSONDB(db);

      const { password: _, ...userSafe } = newUser;
      return userSafe;
    }
  );
}

// Login User
export async function loginUser(firstName: string, password: string) {
  const usernameClean = firstName.trim();

  return runQuery(
    async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .ilike("firstName", usernameClean)
        .eq("password", password);

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("INVALID");
      }

      const user = data[0];
      if (user.isBanned) {
        throw new Error("BANNED");
      }

      await logActivity(user.id, user.firstName, "login", "سجلت الدخول لتبدأ طقوسها اليومية 🔑");
      
      const { password: _, ...userSafe } = user;
      return userSafe;
    },
    () => {
      const db = loadJSONDB();
      const user = db.users.find(
        (u: any) =>
          u.firstName.trim().toLowerCase() === usernameClean.toLowerCase() &&
          u.password === password
      );

      if (!user) {
        throw new Error("INVALID");
      }

      if (user.isBanned) {
        throw new Error("BANNED");
      }

      logJSONActivity(db, user.id, user.firstName, "login", "سجلت الدخول لتبدأ طقوسها اليومية 🔑");
      saveJSONDB(db);

      const { password: _, ...userSafe } = user;
      return userSafe;
    }
  );
}

// Get All Users (Admin)
export async function getAllUsers() {
  return runQuery(
    async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      return data;
    },
    () => {
      const db = loadJSONDB();
      return db.users;
    }
  );
}

// Update User Tasks
export async function updateUserTasks(userId: string, taskId: string, isCompleted: boolean, taskTitle: string) {
  return runQuery(
    async () => {
      const { data: users, error: getErr } = await supabase.from("users").select("*").eq("id", userId);
      if (getErr) throw getErr;
      if (!users || users.length === 0) throw new Error("NOT_FOUND");

      const user = users[0];
      const today = new Date().toISOString().split("T")[0];

      let tasksCompleted = Array.isArray(user.tasksCompletedToday) ? user.tasksCompletedToday : [];
      if (user.lastTaskDate !== today) {
        tasksCompleted = [];
      }

      let points = user.points || 0;
      let plantPoints = user.plantPoints || 0;

      if (isCompleted) {
        if (!tasksCompleted.includes(taskId)) {
          tasksCompleted.push(taskId);
          points += 15;
          plantPoints = Math.min(100, plantPoints + 15);
          await logActivity(user.id, user.firstName, "task_completed", `أنجزت مهمة: ${taskTitle || taskId} 🌸`);
        }
      } else {
        const index = tasksCompleted.indexOf(taskId);
        if (index !== -1) {
          tasksCompleted.splice(index, 1);
          points = Math.max(0, points - 15);
          plantPoints = Math.max(0, plantPoints - 15);
        }
      }

      const { data: updatedUsers, error: updateErr } = await supabase
        .from("users")
        .update({
          tasksCompletedToday: tasksCompleted,
          points,
          plantPoints,
          lastTaskDate: today
        })
        .eq("id", userId)
        .select();

      if (updateErr) throw updateErr;
      const { password: _, ...userSafe } = updatedUsers[0];
      return userSafe;
    },
    () => {
      const db = loadJSONDB();
      const userIndex = db.users.findIndex((u: any) => u.id === userId);
      if (userIndex === -1) throw new Error("NOT_FOUND");

      const user = db.users[userIndex];
      const today = new Date().toISOString().split("T")[0];

      if (user.lastTaskDate !== today) {
        user.tasksCompletedToday = [];
        user.lastTaskDate = today;
      }

      if (isCompleted) {
        if (!user.tasksCompletedToday.includes(taskId)) {
          user.tasksCompletedToday.push(taskId);
          user.points += 15;
          user.plantPoints = Math.min(100, user.plantPoints + 15);
          logJSONActivity(db, user.id, user.firstName, "task_completed", `أنجزت مهمة: ${taskTitle || taskId} 🌸`);
        }
      } else {
        const index = user.tasksCompletedToday.indexOf(taskId);
        if (index !== -1) {
          user.tasksCompletedToday.splice(index, 1);
          user.points = Math.max(0, user.points - 15);
          user.plantPoints = Math.max(0, user.plantPoints - 15);
        }
      }

      db.users[userIndex] = user;
      saveJSONDB(db);

      const { password: _, ...userSafe } = user;
      return userSafe;
    }
  );
}

// Update User Profile (Avatar)
export async function updateUserProfile(userId: string, avatarUrl: string) {
  return runQuery(
    async () => {
      const { data, error } = await supabase
        .from("users")
        .update({ avatarUrl })
        .eq("id", userId)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error("NOT_FOUND");

      const { password: _, ...userSafe } = data[0];
      return userSafe;
    },
    () => {
      const db = loadJSONDB();
      const userIndex = db.users.findIndex((u: any) => u.id === userId);
      if (userIndex === -1) throw new Error("NOT_FOUND");

      db.users[userIndex].avatarUrl = avatarUrl;
      saveJSONDB(db);

      const { password: _, ...userSafe } = db.users[userIndex];
      return userSafe;
    }
  );
}

// Get Leaderboard
export async function getLeaderboard() {
  return runQuery(
    async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, firstName, points, plantPoints, goals, joinedAt, avatarUrl")
        .order("points", { ascending: false });

      if (error) throw error;
      return data;
    },
    () => {
      const db = loadJSONDB();
      const sorted = [...db.users]
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
      return sorted;
    }
  );
}

// Get Community Posts
export async function getCommunityPosts() {
  return runQuery(
    async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) throw error;
      return data;
    },
    () => {
      const db = loadJSONDB();
      const sorted = [...db.posts].sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return sorted;
    }
  );
}

// Add Community Post
export async function addCommunityPost(fields: any) {
  const { userId, authorName, content, category, image } = fields;

  return runQuery(
    async () => {
      const newPost = {
        id: "post_" + Date.now(),
        authorId: userId,
        authorName,
        content,
        category,
        image: image || null,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        comments: []
      };

      const { data, error } = await supabase
        .from("posts")
        .insert([newPost])
        .select();

      if (error) throw error;

      await logActivity(userId, authorName, "post_created", `شاركت تجربة جديدة في فئة "${category}" 📝`);
      return data[0];
    },
    () => {
      const db = loadJSONDB();
      const newPost = {
        id: "post_" + Date.now(),
        authorId: userId,
        authorName,
        content,
        category,
        image: image || null,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        comments: []
      };

      db.posts.push(newPost);
      logJSONActivity(db, userId, authorName, "post_created", `شاركت تجربة جديدة في فئة "${category}" 📝`);
      saveJSONDB(db);
      return newPost;
    }
  );
}

// Toggle Like Post
export async function toggleLikePost(postId: string, userId: string) {
  return runQuery(
    async () => {
      const { data: posts, error: getErr } = await supabase.from("posts").select("*").eq("id", postId);
      if (getErr) throw getErr;
      if (!posts || posts.length === 0) throw new Error("NOT_FOUND");

      const post = posts[0];
      const likedBy = Array.isArray(post.likedBy) ? post.likedBy : [];

      const userLikeIndex = likedBy.indexOf(userId);
      let likes = post.likes || 0;
      let isLikedNow = false;

      if (userLikeIndex === -1) {
        likedBy.push(userId);
        likes += 1;
        isLikedNow = true;
      } else {
        likedBy.splice(userLikeIndex, 1);
        likes = Math.max(0, likes - 1);
      }

      if (isLikedNow) {
        const { data: likers } = await supabase.from("users").select("firstName").eq("id", userId);
        const likerName = likers && likers[0] ? likers[0].firstName : "عضوة";
        await logActivity(userId, likerName, "post_liked", `أعجبت بمنشور لصديقتها "${post.authorName}" ❤️`);
      }

      const { data: updatedPosts, error: updateErr } = await supabase
        .from("posts")
        .update({ likes, likedBy })
        .eq("id", postId)
        .select();

      if (updateErr) throw updateErr;
      return updatedPosts[0];
    },
    () => {
      const db = loadJSONDB();
      const postIndex = db.posts.findIndex((p: any) => p.id === postId);
      if (postIndex === -1) throw new Error("NOT_FOUND");

      const post = db.posts[postIndex];
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
        const liker = db.users.find((u: any) => u.id === userId);
        const likerName = liker ? liker.firstName : "عضوة";
        logJSONActivity(db, userId, likerName, "post_liked", `أعجبت بمنشور لصديقتها "${post.authorName}" ❤️`);
      }

      db.posts[postIndex] = post;
      saveJSONDB(db);
      return post;
    }
  );
}

// Add Comment to Post
export async function addCommentToPost(postId: string, authorName: string, content: string, userId: string) {
  return runQuery(
    async () => {
      const { data: posts, error: getErr } = await supabase.from("posts").select("*").eq("id", postId);
      if (getErr) throw getErr;
      if (!posts || posts.length === 0) throw new Error("NOT_FOUND");

      const post = posts[0];
      const comments = Array.isArray(post.comments) ? post.comments : [];

      const newComment = {
        id: "comm_" + Date.now(),
        authorName,
        content,
        createdAt: new Date().toISOString()
      };

      comments.push(newComment);

      const { data: updatedPosts, error: updateErr } = await supabase
        .from("posts")
        .update({ comments })
        .eq("id", postId)
        .select();

      if (updateErr) throw updateErr;

      await logActivity(userId || "unknown", authorName, "comment_added", `علّقت بكلمات لطيفة ومبهجة على منشور صديقتها "${post.authorName}" 💬`);
      return updatedPosts[0];
    },
    () => {
      const db = loadJSONDB();
      const postIndex = db.posts.findIndex((p: any) => p.id === postId);
      if (postIndex === -1) throw new Error("NOT_FOUND");

      const newComment = {
        id: "comm_" + Date.now(),
        authorName,
        content,
        createdAt: new Date().toISOString()
      };

      db.posts[postIndex].comments.push(newComment);
      logJSONActivity(db, userId || "unknown", authorName, "comment_added", `علّقت بكلمات لطيفة ومبهجة على منشور صديقتها "${db.posts[postIndex].authorName}" 💬`);
      saveJSONDB(db);
      return db.posts[postIndex];
    }
  );
}

// Get Chat Messages
export async function getChatMessages(room?: string) {
  return runQuery(
    async () => {
      let queryBuilder = supabase.from("chat_messages").select("*");
      if (room) {
        queryBuilder = queryBuilder.eq("room", room);
      }
      const { data, error } = await queryBuilder.order("createdAt", { ascending: true });
      if (error) throw error;
      return data;
    },
    () => {
      const db = loadJSONDB();
      const messages = db.chatMessages || [];
      if (room) {
        return messages.filter((m: any) => m.room === room);
      }
      return messages;
    }
  );
}

// Add Chat Message
export async function addChatMessage(userId: string, authorName: string, text: string, room: string) {
  return runQuery(
    async () => {
      const newMessage = {
        id: "msg_" + Date.now(),
        authorId: userId,
        authorName,
        text,
        room,
        createdAt: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("chat_messages")
        .insert([newMessage])
        .select();

      if (error) throw error;
      return data[0];
    },
    () => {
      const db = loadJSONDB();
      if (!db.chatMessages) {
        db.chatMessages = [];
      }

      const newMessage = {
        id: "msg_" + Date.now(),
        authorId: userId,
        authorName,
        text,
        room,
        createdAt: new Date().toISOString()
      };

      db.chatMessages.push(newMessage);
      if (db.chatMessages.length > 200) {
        db.chatMessages = db.chatMessages.slice(-200);
      }

      saveJSONDB(db);
      return newMessage;
    }
  );
}

// Search Users For Friends
export async function searchUsersForFriends(query: string, currentUserId: string) {
  const lowercaseQuery = query ? String(query).toLowerCase().trim() : "";

  return runQuery(
    async () => {
      let queryBuilder = supabase.from("users").select("id, firstName, avatarUrl, isBanned");
      
      const { data, error } = await queryBuilder;
      if (error) throw error;

      return data
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
          avatarUrl: u.avatarUrl || "preset_1"
        }));
    },
    () => {
      const db = loadJSONDB();
      return db.users
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
          avatarUrl: u.avatarUrl || "preset_1"
        }));
    }
  );
}

// Send Friend Request
export async function sendFriendRequest(senderId: string, receiverId: string) {
  return runQuery(
    async () => {
      const { data: existing, error: checkErr } = await supabase
        .from("friendships")
        .select("*")
        .or(`and(senderId.eq.${senderId},receiverId.eq.${receiverId}),and(senderId.eq.${receiverId},receiverId.eq.${senderId})`);

      if (checkErr) throw checkErr;
      if (existing && existing.length > 0) {
        throw new Error("EXISTS");
      }

      const newRequest = {
        id: "friend_" + Date.now(),
        senderId,
        receiverId,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("friendships")
        .insert([newRequest])
        .select();

      if (error) throw error;

      const { data: senderArr } = await supabase.from("users").select("firstName").eq("id", senderId);
      const { data: receiverArr } = await supabase.from("users").select("firstName").eq("id", receiverId);
      const sender = senderArr && senderArr[0];
      const receiver = receiverArr && receiverArr[0];

      if (sender && receiver) {
        await logActivity(senderId, sender.firstName, "friend_request_sent", `أرسلت طلب صداقة إلى "${receiver.firstName}" 🌸`);
      }

      return data[0];
    },
    () => {
      const db = loadJSONDB();
      if (!db.friendships) db.friendships = [];

      const existing = db.friendships.find((f: any) => 
        (f.senderId === senderId && f.receiverId === receiverId) ||
        (f.senderId === receiverId && f.receiverId === senderId)
      );

      if (existing) {
        throw new Error("EXISTS");
      }

      const newRequest = {
        id: "friend_" + Date.now(),
        senderId,
        receiverId,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      db.friendships.push(newRequest);

      const sender = db.users.find((u: any) => u.id === senderId);
      const receiver = db.users.find((u: any) => u.id === receiverId);
      if (sender && receiver) {
        logJSONActivity(db, senderId, sender.firstName, "friend_request_sent", `أرسلت طلب صداقة إلى "${receiver.firstName}" 🌸`);
      }

      saveJSONDB(db);
      return newRequest;
    }
  );
}

// Respond to Friend Request
export async function respondFriendRequest(id: string, status: string) {
  return runQuery(
    async () => {
      const { data: friendships, error: getErr } = await supabase.from("friendships").select("*").eq("id", id);
      if (getErr) throw getErr;
      if (!friendships || friendships.length === 0) throw new Error("NOT_FOUND");

      const friendship = friendships[0];

      const { data: senderArr } = await supabase.from("users").select("firstName").eq("id", friendship.senderId);
      const { data: receiverArr } = await supabase.from("users").select("id, firstName").eq("id", friendship.receiverId);
      const sender = senderArr && senderArr[0];
      const receiver = receiverArr && receiverArr[0];

      if (sender && receiver) {
        if (status === "accepted") {
          await logActivity(receiver.id, receiver.firstName, "friend_request_accepted", `قبلت طلب الصداقة من "${sender.firstName}" وأصبحتا صديقتين الآن! 👭💖`);
        } else {
          await logActivity(receiver.id, receiver.firstName, "friend_request_declined", `رفضت طلب الصداقة من "${sender.firstName}" 💔`);
        }
      }

      if (status === "declined") {
        const { error: delErr } = await supabase.from("friendships").delete().eq("id", id);
        if (delErr) throw delErr;
        return { success: true, friendship: { ...friendship, status: "declined" } };
      } else {
        const { data: updated, error: updErr } = await supabase
          .from("friendships")
          .update({ status })
          .eq("id", id)
          .select();

        if (updErr) throw updErr;
        return { success: true, friendship: updated[0] };
      }
    },
    () => {
      const db = loadJSONDB();
      if (!db.friendships) db.friendships = [];

      const index = db.friendships.findIndex((f: any) => f.id === id);
      if (index === -1) throw new Error("NOT_FOUND");

      const friendship = db.friendships[index];
      friendship.status = status;

      const sender = db.users.find((u: any) => u.id === friendship.senderId);
      const receiver = db.users.find((u: any) => u.id === friendship.receiverId);
      if (sender && receiver) {
        if (status === "accepted") {
          logJSONActivity(db, receiver.id, receiver.firstName, "friend_request_accepted", `قبلت طلب الصداقة من "${sender.firstName}" وأصبحتا صديقتين الآن! 👭💖`);
        } else {
          logJSONActivity(db, receiver.id, receiver.firstName, "friend_request_declined", `رفضت طلب الصداقة من "${sender.firstName}" 💔`);
        }
      }

      if (status === "declined") {
        db.friendships.splice(index, 1);
      } else {
        db.friendships[index] = friendship;
      }

      saveJSONDB(db);
      return { success: true, friendship };
    }
  );
}

// Get User's Friendships
export async function getUserFriendships(userId: string) {
  return runQuery(
    async () => {
      const { data: friendships, error: frErr } = await supabase
        .from("friendships")
        .select("*")
        .or(`senderId.eq.${userId},receiverId.eq.${userId}`);

      if (frErr) throw frErr;

      const { data: users, error: uErr } = await supabase.from("users").select("id, firstName, avatarUrl");
      if (uErr) throw uErr;

      const hydrated = friendships.map((f: any) => {
        const friendId = f.senderId === userId ? f.receiverId : f.senderId;
        const friend = users.find((u: any) => u.id === friendId);
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

      return hydrated;
    },
    () => {
      const db = loadJSONDB();
      if (!db.friendships) db.friendships = [];

      const userFriendships = db.friendships.filter((f: any) => f.senderId === userId || f.receiverId === userId);
      const hydrated = userFriendships.map((f: any) => {
        const friendId = f.senderId === userId ? f.receiverId : f.senderId;
        const friend = db.users.find((u: any) => u.id === friendId);
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

      return hydrated;
    }
  );
}

// Get Direct Messages
export async function getDirectMessages(friendshipId: string) {
  return runQuery(
    async () => {
      const { data, error } = await supabase
        .from("direct_messages")
        .select("*")
        .eq("friendshipId", friendshipId)
        .order("createdAt", { ascending: true });

      if (error) throw error;
      return data;
    },
    () => {
      const db = loadJSONDB();
      if (!db.directMessages) db.directMessages = [];
      return db.directMessages.filter((m: any) => m.friendshipId === friendshipId);
    }
  );
}

// Post Direct Message
export async function postDirectMessage(fields: any) {
  const { friendshipId, senderId, senderName, text } = fields;

  return runQuery(
    async () => {
      const { data: friendship, error: frErr } = await supabase
        .from("friendships")
        .select("*")
        .eq("id", friendshipId)
        .eq("status", "accepted")
        .maybeSingle();

      if (frErr) throw frErr;
      if (!friendship) throw new Error("UNAUTHORIZED");

      const newMessage = {
        id: "dm_" + Date.now(),
        friendshipId,
        senderId,
        senderName,
        text,
        createdAt: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("direct_messages")
        .insert([newMessage])
        .select();

      if (error) throw error;
      return data[0];
    },
    () => {
      const db = loadJSONDB();
      if (!db.directMessages) db.directMessages = [];

      const friendship = db.friendships?.find((f: any) => f.id === friendshipId && f.status === "accepted");
      if (!friendship) {
        throw new Error("UNAUTHORIZED");
      }

      const newMessage = {
        id: "dm_" + Date.now(),
        friendshipId,
        senderId,
        senderName,
        text,
        createdAt: new Date().toISOString()
      };

      db.directMessages.push(newMessage);
      if (db.directMessages.length > 500) {
        db.directMessages = db.directMessages.slice(-500);
      }

      saveJSONDB(db);
      return newMessage;
    }
  );
}

// Submit Report
export async function submitReport(fields: any) {
  const { reporterId, reporterName, reportedUserId, reportedUserName, messageText, reason } = fields;

  return runQuery(
    async () => {
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

      const { data, error } = await supabase
        .from("reports")
        .insert([newReport])
        .select();

      if (error) throw error;

      await logActivity(reporterId, reporterName, "chat_report", `قدّمت إبلاغاً عن تجاوز في الدردشة من العضوة "${reportedUserName}" ⚠️`);
      return data[0];
    },
    () => {
      const db = loadJSONDB();
      if (!db.reports) db.reports = [];

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

      db.reports.push(newReport);
      logJSONActivity(db, reporterId, reporterName, "chat_report", `قدّمت إبلاغاً عن تجاوز في الدردشة من العضوة "${reportedUserName}" ⚠️`);
      saveJSONDB(db);
      return newReport;
    }
  );
}

// Get All Reports (Admin)
export async function getAllReports() {
  return runQuery(
    async () => {
      const { data, error } = await supabase.from("reports").select("*");
      if (error) throw error;
      return data;
    },
    () => {
      const db = loadJSONDB();
      return db.reports || [];
    }
  );
}

// Resolve Report (Admin)
export async function resolveReport(reportId: string) {
  return runQuery(
    async () => {
      const { data, error } = await supabase
        .from("reports")
        .update({ status: "resolved" })
        .eq("id", reportId)
        .select();

      if (error) throw error;
      return { success: true, report: data[0] };
    },
    () => {
      const db = loadJSONDB();
      if (!db.reports) db.reports = [];

      const reportIndex = db.reports.findIndex((r: any) => r.id === reportId);
      if (reportIndex === -1) throw new Error("NOT_FOUND");

      db.reports[reportIndex].status = "resolved";
      saveJSONDB(db);
      return { success: true, report: db.reports[reportIndex] };
    }
  );
}

// Track Visit
export async function trackVisit() {
  return runQuery(
    async () => {
      const { data, error } = await supabase
        .from("system_stats")
        .select("value")
        .eq("key", "visitorCount")
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      const currentVal = data ? data.value : 0;
      const newVal = currentVal + 1;

      const { error: upsertErr } = await supabase
        .from("system_stats")
        .upsert({ key: "visitorCount", value: newVal });

      if (upsertErr) throw upsertErr;
      return { success: true, visitorCount: newVal };
    },
    () => {
      const db = loadJSONDB();
      db.visitorCount = (db.visitorCount || 0) + 1;
      saveJSONDB(db);
      return { success: true, visitorCount: db.visitorCount };
    }
  );
}

// Water Virtual Plant
export async function waterPlant(userId: string) {
  return runQuery(
    async () => {
      const { data: users, error: getErr } = await supabase.from("users").select("*").eq("id", userId);
      if (getErr) throw getErr;
      if (!users || users.length === 0) throw new Error("NOT_FOUND");

      const user = users[0];
      const plantPoints = Math.min(100, (user.plantPoints || 0) + 10);
      const points = (user.points || 0) + 10;

      const { data: stat } = await supabase.from("system_stats").select("value").eq("key", "plantClicksCount").maybeSingle();
      const currentClicks = stat ? stat.value : 0;
      const newClicks = currentClicks + 1;
      await supabase.from("system_stats").upsert({ key: "plantClicksCount", value: newClicks });

      await logActivity(userId, user.firstName, "plant_watered", "سقت واعتنت بنبتتها الافتراضية وسجلت 'تم' 🌱💧");

      const { data: updatedUsers, error: updateErr } = await supabase
        .from("users")
        .update({ plantPoints, points })
        .eq("id", userId)
        .select();

      if (updateErr) throw updateErr;
      const { password: _, ...userSafe } = updatedUsers[0];
      return { user: userSafe, plantClicksCount: newClicks };
    },
    () => {
      const db = loadJSONDB();
      const userIndex = db.users.findIndex((u: any) => u.id === userId);
      if (userIndex === -1) throw new Error("NOT_FOUND");

      const user = db.users[userIndex];
      user.plantPoints = Math.min(100, (user.plantPoints || 0) + 10);
      user.points = (user.points || 0) + 10;

      db.plantClicksCount = (db.plantClicksCount || 0) + 1;
      logJSONActivity(db, user.id, user.firstName, "plant_watered", "سقت واعتنت بنبتتها الافتراضية وسجلت 'تم' 🌱💧");

      db.users[userIndex] = user;
      saveJSONDB(db);

      const { password: _, ...userSafe } = user;
      return { user: userSafe, plantClicksCount: db.plantClicksCount };
    }
  );
}

// Get Admin Stats
export async function getAdminStats() {
  const mode = getDbMode();

  if (mode === "supabase") {
    try {
      const { data: stats } = await supabase.from("system_stats").select("*");
      const visitorCountStat = stats?.find((s: any) => s.key === "visitorCount")?.value || 1;
      const plantClicksCountStat = stats?.find((s: any) => s.key === "plantClicksCount")?.value || 0;

      const { data: logs } = await supabase
        .from("activity_logs")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(150);

      const { data: users } = await supabase.from("users").select("goals");

      const goalsPopularity: { [goal: string]: number } = {
        "بشرة لامعة": 0,
        "شعر صحي": 0,
        "ملامح بارزة": 0,
        "جسم مثالي": 0,
        "راحة نفسية": 0
      };

      users?.forEach((u: any) => {
        const goals = Array.isArray(u.goals) ? u.goals : [];
        goals.forEach((g: string) => {
          if (goalsPopularity[g] !== undefined) {
            goalsPopularity[g]++;
          }
        });
      });

      return {
        visitorCount: visitorCountStat,
        plantClicksCount: plantClicksCountStat,
        activityLogs: logs || [],
        goalsPopularity
      };
    } catch (err: any) {
      console.error("Failed to query Admin stats from Supabase:", err);
    }
  }

  // Local fallback
  const db = loadJSONDB();
  const goalsPopularity: { [goal: string]: number } = {
    "بشرة لامعة": 0,
    "شعر صحي": 0,
    "ملامح بارزة": 0,
    "جسم مثالي": 0,
    "راحة نفسية": 0
  };

  db.users.forEach((u: any) => {
    if (Array.isArray(u.goals)) {
      u.goals.forEach((g: string) => {
        if (goalsPopularity[g] !== undefined) {
          goalsPopularity[g]++;
        }
      });
    }
  });

  return {
    visitorCount: db.visitorCount || 1,
    plantClicksCount: db.plantClicksCount || 0,
    activityLogs: db.activityLogs || [],
    goalsPopularity
  };
}

// Warn User
export async function warnUser(userId: string, reason: string) {
  return runQuery(
    async () => {
      const { data: users, error: getErr } = await supabase.from("users").select("*").eq("id", userId);
      if (getErr) throw getErr;
      if (!users || users.length === 0) throw new Error("NOT_FOUND");

      const user = users[0];
      const warningsCount = (user.warningsCount || 0) + 1;
      const warningReason = reason || "تضليل أو رفع لقطة شاشة غير مطابقة لشروط التوهج والمتابعة.";

      await logActivity(userId, user.firstName, "user_warned", `تلقّت إنذاراً رقم ${warningsCount} بسبب: ${warningReason} ⚠️`);

      const { data: updatedUsers, error: updateErr } = await supabase
        .from("users")
        .update({ warningsCount, warningReason })
        .eq("id", userId)
        .select();

      if (updateErr) throw updateErr;
      return { success: true, user: updatedUsers[0] };
    },
    () => {
      const db = loadJSONDB();
      const userIndex = db.users.findIndex((u: any) => u.id === userId);
      if (userIndex === -1) throw new Error("NOT_FOUND");

      const user = db.users[userIndex];
      user.warningsCount = (user.warningsCount || 0) + 1;
      user.warningReason = reason || "تضليل أو رفع لقطة شاشة غير مطابقة لشروط التوهج والمتابعة.";

      logJSONActivity(db, user.id, user.firstName, "user_warned", `تلقّت إنذاراً رقم ${user.warningsCount} بسبب: ${user.warningReason} ⚠️`);
      db.users[userIndex] = user;
      saveJSONDB(db);

      return { success: true, user };
    }
  );
}

// Ban User
export async function banUser(userId: string) {
  return runQuery(
    async () => {
      const { data: users, error: getErr } = await supabase.from("users").select("*").eq("id", userId);
      if (getErr) throw getErr;
      if (!users || users.length === 0) throw new Error("NOT_FOUND");

      const user = users[0];

      await logActivity(userId, user.firstName, "user_banned", "تم حظر حسابها نهائياً وإلغاء التوهج بسبب التضليل 🚫");

      const { data: updatedUsers, error: updateErr } = await supabase
        .from("users")
        .update({ isBanned: true })
        .eq("id", userId)
        .select();

      if (updateErr) throw updateErr;
      return { success: true, user: updatedUsers[0] };
    },
    () => {
      const db = loadJSONDB();
      const userIndex = db.users.findIndex((u: any) => u.id === userId);
      if (userIndex === -1) throw new Error("NOT_FOUND");

      const user = db.users[userIndex];
      user.isBanned = true;

      logJSONActivity(db, user.id, user.firstName, "user_banned", "تم حظر حسابها نهائياً وإلغاء التوهج بسبب التضليل 🚫");
      db.users[userIndex] = user;
      saveJSONDB(db);

      return { success: true, user };
    }
  );
}
