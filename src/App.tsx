import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Heart,
  Flower2,
  Trophy,
  MessageSquare,
  BookOpen,
  MessageCircle,
  Camera,
  Play,
  Video,
  LogOut,
  ShieldCheck,
  Plus,
  Send,
  RefreshCw,
  Eye,
  EyeOff,
  User,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ChevronLeft,
  ChevronRight,
  Sparkle,
  Lock,
  Compass,
  Smile,
  X,
  Users
} from "lucide-react";
import { User as UserType, Post, ChatMessage, Task } from "./types";
import { TASK_POOL, ENCYCLOPEDIA_DATA } from "./data";
import { Logo } from "./components/Logo";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

const RANIA_ENCYCLOPEDIA_FEED = [
  {
    id: "feed_tip_1",
    type: "tip",
    category: "نصيحة للعناية بالذات 💡",
    title: "سر رانيا للوقاية من بهتان وجفاف البشرة 💧",
    content: "تنصحكِ رانيا بالترطيب المائي الداخلي كأول خطوة للتوهج الفوري! اشربي كأسين كاملين من الماء الفاتر فور استيقاظكِ من النوم، حيث يساعد ذلك على إعادة الحيوية لخلايا البشرة وطرد السموم المتراكمة. تجنبي تماماً غسل وجهكِ بالماء الساخن واستبدليه بالماء البارد لشد الجلد وإغلاق المسام وتنشيط خلايا وجهكِ الفاتن.",
    quote: "جمالكِ الحقيقي يبدأ بخلية مرتوية ونفس مطمئنة يا صديقتي. 🌸",
    likes: 345,
    tag: "بشرة لامعة"
  },
  {
    id: "feed_recipe_1",
    type: "recipe",
    category: "وصفة مغذية وسهلة 🥗",
    title: "سموذي التوهج الوردي لبشرة ممتلئة ومشرقة 🍓",
    content: "المكونات:\n- نصف كوب فراولة طازجة ولذيذة\n- نصف حبة شمندر (بنجر) مسلوقة\n- حبة موز ناضجة لترطيب طبيعي غني بالبوتاسيوم\n- نصف كوب حليب لوز أو ماء جوز هند منعش\n\nطريقة التحضير:\nامزجي المكونات جيداً في الخلاط حتى تصبح ناعمة. اشربيه كوجبة فطور أو وجبة خفيفة غنية بمضادات الأكسدة والحديد التي تمنح وجنتيكِ لوناً وردياً طبيعياً أخاذاً!",
    quote: "كوب واحد يومياً يعيد لخدودكِ بريق الطبيعة دون الحاجة لأي مساحيق تجميل! 🥰",
    likes: 289,
    tag: "بشرة لامعة"
  },
  {
    id: "feed_mask_1",
    type: "mask",
    category: "ماسك طبيعي مجرب 🧖‍♀️",
    title: "ماسك رانيا الذهبي السحري للتفتيح والنضارة الفورية 🍯",
    content: "المكونات:\n- ملعقة كبيرة زبادي طازج وبارد\n- ملعقة صغيرة عسل نحل طبيعي نقي\n- ربع ملعقة صغيرة من كركم البشرة الأصلي\n\nطريقة الاستخدام:\nامزجي المكونات برفق وضعيها على بشرتكِ النظيفة لمدة 15 دقيقة، ثم اشطفيها بماء فاتر بحركات دائرية ناعمة. هذا الماسك يهدئ البشرة ويزيل شحوب الإجهاد فوراً ويمنحكِ ملمساً حريرياً ناعماً.",
    quote: "الزبادي البارد يمتص شحوب الإرهاق ويعيد النضارة الفورية لبشرتكِ بعد يوم طويل. ✨",
    likes: 412,
    tag: "بشرة لامعة"
  },
  {
    id: "feed_tip_2",
    type: "tip",
    category: "نصيحة للعناية بالذات 💡",
    title: "سحر النوم المبكر لتألق عينيكِ وراحة بالكِ الوفيرة 🌙",
    content: "النوم في فترة الليل (خاصة بين 10 مساءً و2 صباحاً) يحفز هرمونات تجديد خلايا البشرة ويزيل سموم الدماغ. تنصحكِ رانيا بإطفاء جميع الشاشات والأجهزة الرقمية قبل الخلود للنوم بـ 30 دقيقة، واستبدالها بقراءة كتاب خفيف أو قول التوكيدات الإيجابية لتستيقظي بوجه مشرق مبهج خالٍ من الهالات والانتفاخات.",
    quote: "الوسادة المصنوعة من الحرير تمنع تجاعيد النوم وتحافظ على رطوبة بشرتكِ وشعركِ! 🎀",
    likes: 215,
    tag: "راحة نفسية"
  },
  {
    id: "feed_mask_2",
    type: "mask",
    category: "ماسك طبيعي مجرب 🧖‍♀️",
    title: "قناع الأفوكادو والموز لتنعيم وتغذية خصلات الشعر 🥑",
    content: "المكونات:\n- نصف حبة أفوكادو ناضجة تماماً\n- نصف حبة موز\n- ملعقة كبيرة زيت زيتون بكر معصور على البارد\n\nطريقة الاستخدام:\nاهرسي الأفوكادو والموز جيداً حتى تحصلي على معجون ناعم بلا تكتلات. وزعيه بالتساوي على خصلات شعركِ من الجذور حتى الأطراف، وغطيه بقبعة الاستحمام لمدة 45 دقيقة ثم اغسليه بشامبو لطيف خالٍ من الكبريتات والسلفات لشعر فائق النعومة واللمعان.",
    quote: "أطراف شعركِ الجميلة تحتاج للغذاء الدائم لتقاوم التقصف والجفاف، اعتني بها بحب! 🌿",
    likes: 518,
    tag: "شعر صحي"
  },
  {
    id: "feed_recipe_2",
    type: "recipe",
    category: "وصفة مغذية وسهلة 🥗",
    title: "سلطة الحديد والزنك لمنع تساقط الشعر وزيادة نموه 🥗",
    content: "المكونات:\n- كوب سبانخ طازجة وصغيرة\n- ملعقتان من بذور اليقطين (القرع) النيئة\n- حبات رمان حمراء ومنعشة\n- شرائح خيار رقيقة\n\nطريقة التحضير:\nاخلطي المكونات في وعاء خشبي جميل، وتبليها بزيت زيتون وعصير ليمون طازج وقرصة ملح بحري. هذه السلطة اللذيذة غنية بالحديد والزنك اللازمين لتغذية فروة رأسكِ من الجذور وتطويل الشعر وحمايته من التكسر.",
    quote: "تغذية فروة رأسكِ تبدأ من الداخل؛ اجعلي طبق السبانخ والبذور صديقكِ المفضل! 🥬",
    likes: 198,
    tag: "شعر صحي"
  },
  {
    id: "feed_tip_3",
    type: "tip",
    category: "نصيحة للعناية بالذات 💡",
    title: "تمارين يوغا الوجه لشد وتحديد ملامح الفك والوجنتين 🧘‍♀️",
    content: "املئي فمكِ بالهواء تماماً، ثم انقليه ببطء من الخد الأيمن إلى الخد الأيسر، ثم للأعلى تحت الشفة العلوية والأسفل. كرري هذه الحركة الدائرية لمدة دقيقة كاملة صباحاً ومساءً. هذا يحفز الدورة الدموية في وجهكِ، ويساعد على نحت الملامح وشد الخدود بشكل طبيعي وجذاب.",
    quote: "استمري في تطبيق هذا التمرين البسيط يومياً وستلاحظين تحديد ملامحكِ الفاتنة بكل فخر! ✨",
    likes: 388,
    tag: "ملامح بارزة"
  },
  {
    id: "feed_mask_3",
    type: "mask",
    category: "ماسك طبيعي مجرب 🧖‍♀️",
    title: "سيروم رانيا الطبيعي لتطويل الرموش وتكثيف الحواجب 👁️",
    content: "المكونات:\n- مقادير متساوية من زيت الخروع النقي الخفيف\n- زيت اللوز الحلو المعصور على البارد\n\nطريقة الاستخدام:\nامزجي الزيوت جيداً وضعيها في عبوة مسكرة نظيفة ومعقمة تماماً. مرري الفرشاة بلطف شديد على رموشكِ وحواجبكِ قبل النوم يومياً. ستلاحظين كثافة مذهلة ولمعاناً طبيعياً خلال أسابيع معدودة من الالتزام والاهتمام.",
    quote: "احرصي على عدم دخول الزيت للعين، وطبقيه على الأطراف والمنبت الخارجي بلطف شديد! 💖",
    likes: 476,
    tag: "ملامح بارزة"
  },
  {
    id: "feed_recipe_3",
    type: "recipe",
    category: "وصفة مغذية وسهلة 🥗",
    title: "مشروب الديتوكس الصباحي السحري لتنقية البشرة والجسم 🍋",
    content: "المكونات:\n- كوب ماء دافئ مائل للاعتدال\n- شرائح ليمونة طازجة وصغيرة\n- 3-5 أوراق نعناع أخضر منعش\n- نصف ملعقة صغيرة من مبشور الزنجبيل الطازج\n\nطريقة التحضير:\nانقعي المكونات في كوب الماء الدافئ لـ 5 دقائق مغطاة، ثم اشربيه على الريق قبل تناول وجبة الفطور بنصف ساعة. هذا المشروب ينظف جهازكِ الهضمي والكبد ويعيد التوازن والنقاء لبشرتكِ لتتوهج كالكريستال.",
    quote: "البداية اللطيفة والدافئة ليومكِ تنعكس على نضارة وجهكِ ونشاط جسمكِ الرشيق! 🌱",
    likes: 512,
    tag: "جسم مثالي"
  },
  {
    id: "feed_tip_4",
    type: "tip",
    category: "نصيحة للعناية بالذات 💡",
    title: "طقس رانيا المسائي لراحة البال والتحرر من ضغوط اليوم 🌸",
    content: "اجلسي في مكان هادئ ومريح، أشعلي شمعة برائحة اللافندر (الخزامى) أو البابونج، وافتحي مذكراتكِ الجميلة لتكتبي 3 نعم أنتِ ممتنة لوجودها اليوم، مهما بدت بسيطة. التركيز على النعم والامتنان يعيد برمجة عقلكِ الباطن نحو الطمأنينة والسلام ويهيئ أعصابكِ لنوم عميق هادئ يمنع الهالات السوداء.",
    quote: "أنتِ تستحقين في نهاية كل يوم لحظة هادئة تسعد قلبكِ النقي وتريح عقلكِ المفكر. 🥰",
    likes: 310,
    tag: "راحة نفسية"
  },
  {
    id: "feed_mask_4",
    type: "mask",
    category: "تونر ماء الورد والنشا لشد البشرة الفوري وتضييق المسام 🌹",
    content: "المكونات:\n- ربع كوب ماء ورد بلدي بارد\n- ملعقة صغيرة نشا ذرة ناعم\n\nطريقة الاستخدام:\nاخلطي النشا مع ماء الورد جيداً حتى يذوب النشا تماماً وتختفي التكتلات. بللي قطنة تجميلية وامسحي بها وجهكِ ورقبتكِ بحركات لطيفة، دعي القناع لعشر دقائق حتى يجف ثم اشطفيه بالماء البارد. ستحصلين على ملمس ناعم كالحرير مشدود المسامات فوري.",
    quote: "ماء الورد الطبيعي يغذي خلايا وجهكِ ويعيد لها التوازن والنعومة الطبيعية المدهشة! ✨",
    likes: 299,
    tag: "بشرة لامعة"
  },
  {
    id: "feed_recipe_4",
    type: "recipe",
    category: "وصفة مغذية وسهلة 🥗",
    title: "بودينغ الشيا والكاكاو للحيوية والطاقة واللمعان الدائم 🍫",
    content: "المكونات:\n- ملعقتان كبيرتان من بذور الشيا الغنية بأوميغا 3\n- كوب حليب سائل دافئ (أو حليب نباتي)\n- ملعقة صغيرة عسل نحل للتحلية الطبيعية\n- نصف ملعقة صغيرة بودرة كاكاو خام عضوي\n\nطريقة التحضير:\nاخلطي المكونات في كوب زجاجي جيداً، اتركيها في الثلاجة لـ 3 ساعات على الأقل حتى تنتفخ البذور وتأخذ قوام البودينغ اللذيذ. تحتوي بذور الشيا على الأحماض الدهنية الأساسية التي تقوي حاجز البشرة وتمنح شعركِ لمعاناً رائعاً.",
    quote: "مكافأة شهية وصحية تسعد قلبكِ وتغذي خلايا شعركِ وبشرتكِ في آن واحد! 🍩",
    likes: 264,
    tag: "جسم مثالي"
  }
];
const PRESET_AVATARS = [
  { id: "preset_1", emoji: "🌸", color: "from-pink-300 to-pink-500", label: "وردة الروز" },
  { id: "preset_2", emoji: "👑", color: "from-purple-300 to-indigo-500", label: "التاج الذهبي" },
  { id: "preset_3", emoji: "🦄", color: "from-fuchsia-300 to-pink-500", label: "الحصان السحري" },
  { id: "preset_4", emoji: "🎀", color: "from-rose-300 to-rose-500", label: "فيونكة لطيفة" },
  { id: "preset_5", emoji: "🐱", color: "from-amber-300 to-orange-400", label: "قطة مرحة" },
  { id: "preset_6", emoji: "🦊", color: "from-orange-300 to-red-400", label: "ثعلب ذكي" },
  { id: "preset_7", emoji: "💅", color: "from-pink-400 to-fuchsia-600", label: "مناكير أنيق" },
  { id: "preset_8", emoji: "🧸", color: "from-amber-400 to-amber-600", label: "دب دافئ" },
  { id: "preset_9", emoji: "✨", color: "from-cyan-300 to-blue-500", label: "نجوم متوهجة" }
];

const generateProgressHistory = (user: any) => {
  const history = [];
  const daysToShow = 7;
  const now = new Date();
  
  const currentPoints = user.points || 10;
  const currentPlant = user.plantPoints || 15;
  
  for (let i = daysToShow - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    
    const dateStr = d.toLocaleDateString("ar-EG", { weekday: "short", day: "numeric" });
    
    const dayIndex = daysToShow - 1 - i; 
    
    let fraction = 0;
    if (dayIndex === 0) {
      fraction = 0.0;
    } else if (dayIndex === 1) {
      fraction = 0.18;
    } else if (dayIndex === 2) {
      fraction = 0.35;
    } else if (dayIndex === 3) {
      fraction = 0.55;
    } else if (dayIndex === 4) {
      fraction = 0.72;
    } else if (dayIndex === 5) {
      fraction = 0.88;
    } else {
      fraction = 1.0;
    }

    const seed = user.id ? user.id.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) : 1;
    let offset = 0;
    if (dayIndex > 0 && dayIndex < daysToShow - 1) {
      offset = ((seed * (dayIndex + 3)) % 11 - 5) / 100; 
    }
    const finalFraction = Math.max(0.0, Math.min(1.0, fraction + offset));

    const minPoints = 10;
    const minPlant = 15;
    
    let dayPoints = minPoints;
    let dayPlant = minPlant;
    
    if (dayIndex > 0) {
      dayPoints = Math.round(minPoints + (currentPoints - minPoints) * finalFraction);
      dayPlant = Math.round(minPlant + (currentPlant - minPlant) * finalFraction);
    }
    
    if (dayIndex === daysToShow - 1) {
      dayPoints = currentPoints;
      dayPlant = currentPlant;
    }

    history.push({
      date: dateStr,
      "نقاط التوهج": dayPoints,
      "نمو النبتة (%)": dayPlant,
    });
  }
  
  return history;
};

export default function App() {
  // === إضافة دالة التنظيف للأمان (XSS) ===
  const sanitizeInput = (str: string) => str ? str.replace(/<[^>]*>?/gm, '') : "";

  const [dbStatus, setDbStatus] = useState<{ status: string; type: string; url: string | null } | null>(null);
  
  // === تعديل القراءة المباشرة من Local Storage كقيمة افتراضية ===
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const savedUser = localStorage.getItem("rania_glow_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (window.location.hash !== "#admin-control" && window.location.hash !== "#admin-control-panel") {
          return parsed;
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
    return null;
  });

  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const [viewingProfileUser, setViewingProfileUser] = useState<any | null>(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [registerStep, setRegisterStep] = useState<"info" | "goals">("info");

  const [adminPasscode, setAdminPasscode] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminError, setAdminError] = useState("");
  const [adminActionTarget, setAdminActionTarget] = useState<{
    type: "warn" | "ban";
    userId: string;
    userName: string;
    reason?: string;
  } | null>(null);
  const [adminStats, setAdminStats] = useState<{
    visitorCount: number;
    plantClicksCount: number;
    activityLogs: any[];
    goalsPopularity: { [g: string]: number };
  } | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeChatRoom, setActiveChatRoom] = useState<string>("general");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("بشرة لامعة");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newPostImageName, setNewPostImageName] = useState("");
  const [newCommentText, setNewCommentText] = useState<{ [postId: string]: string }>({});
  const [newChatMessage, setNewChatMessage] = useState("");
  const [activePrivateUser, setActivePrivateUser] = useState<any | null>(null);
  const [friendsSearchQuery, setFriendsSearchQuery] = useState("");
  const [friendsSearchResults, setFriendsSearchResults] = useState<any[]>([]);
  const [friendsSearchLoading, setFriendsSearchLoading] = useState(false);
  const [userFriendships, setUserFriendships] = useState<any[]>([]);
  const [activeFriendshipChat, setActiveFriendshipChat] = useState<any | null>(null);
  const [privateMessages, setPrivateMessages] = useState<any[]>([]);
  const [newPrivateMessage, setNewPrivateMessage] = useState("");
  const [chatReportTarget, setChatReportTarget] = useState<any | null>(null);
  const [chatReportReason, setChatReportReason] = useState("");
  const [adminReports, setAdminReports] = useState<any[]>([]);
  const [reportingSubmitting, setReportingSubmitting] = useState(false);

  const [isAdminRoute, setIsAdminRoute] = useState(
    window.location.pathname === "/admin" ||
    window.location.pathname === "/admin-panel" ||
    window.location.pathname === "/control-panel" ||
    window.location.pathname === "/rania-admin"
  );

  const [encyclopediaFilter, setEncyclopediaFilter] = useState<"all" | "tip" | "recipe" | "mask">("all");
  const [visibleEncyclopediaCount, setVisibleEncyclopediaCount] = useState<number>(4);
  const [isEncyclopediaLoading, setIsEncyclopediaLoading] = useState<boolean>(false);
  const [likedEncyclopediaIds, setLikedEncyclopediaIds] = useState<{ [key: string]: boolean }>({});
  const [savedEncyclopediaIds, setSavedEncyclopediaIds] = useState<{ [key: string]: boolean }>({});
  const [encyclopediaLikeCounts, setEncyclopediaLikeCounts] = useState<{ [key: string]: number }>({});
  const [customToast, setCustomToast] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // === إضافة Effect التحديث الموحد للبيانات (يمنع التعارض) ===
  useEffect(() => {
    if (currentUser && currentUser.id !== "admin") {
      localStorage.setItem("rania_glow_user", JSON.stringify(currentUser));
    } else if (!currentUser) {
      localStorage.removeItem("rania_glow_user");
    }
  }, [currentUser]);

  useEffect(() => {
    fetch("/api/db-status")
      .then(res => res.json())
      .then(data => setDbStatus(data))
      .catch(err => console.error("Error fetching db status:", err));
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    fetchCommunityPosts();

    fetch("/api/track/visit", { method: "POST" })
      .then(res => res.json())
      .catch(err => console.error("Error tracking visit:", err));
  }, []);

  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === "#admin-control" || window.location.hash === "#admin-control-panel") {
        setActiveTab("admin");
        setCurrentUser({
          id: "admin",
          firstName: "إدارة رانيا",
          goals: [],
          joinedAt: "",
          plantPoints: 100,
          points: 9999,
          tasksCompletedToday: [],
          lastTaskDate: ""
        });
        setIsAdminLoggedIn(false);
      }
    };

    handleHashCheck();
    window.addEventListener("hashchange", handleHashCheck);
    return () => window.removeEventListener("hashchange", handleHashCheck);
  }, []);

  useEffect(() => {
    if (customToast) {
      const timer = setTimeout(() => {
        setCustomToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [customToast]);

  useEffect(() => {
    if (currentUser) {
      generateDailyTasks(currentUser);
    }
  }, [currentUser?.goals]);

  useEffect(() => {
    if (currentUser) {
      const room = activePrivateUser
        ? (currentUser.id < activePrivateUser.id ? `private_${currentUser.id}_${activePrivateUser.id}` : `private_${activePrivateUser.id}_${currentUser.id}`)
        : activeChatRoom;
      fetchChatMessages(room);
      const interval = setInterval(() => {
        fetchChatMessages(room);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentUser, activeChatRoom, activePrivateUser]);

  useEffect(() => {
    if (currentUser && activeFriendshipChat) {
      fetchPrivateMessages(activeFriendshipChat.id);
      const interval = setInterval(() => {
        fetchPrivateMessages(activeFriendshipChat.id);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentUser, activeFriendshipChat]);

  useEffect(() => {
    if (currentUser && currentUser.id !== "admin") {
      fetchUserFriendships();
      const interval = setInterval(() => {
        fetchUserFriendships();
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // === تعديل دالة المهام لتتجدد أسبوعياً بـ 4 مهام يومياً ===
  const generateDailyTasks = (user: UserType) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
    const dayOfWeek = now.getDay();
    
    const seed = `${weekNumber}-${dayOfWeek}-${user.id}`;
    const seedNum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const shuffleWithSeed = (array: Task[], seedValue: number) => {
      const arr = [...array];
      let currentSeed = seedValue;
      for (let i = arr.length - 1; i > 0; i--) {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        const j = Math.floor((currentSeed / 233280) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    let combined: Task[] = [];
    user.goals.forEach((goal, idx) => {
      if (TASK_POOL[goal]) {
        const shuffled = shuffleWithSeed(TASK_POOL[goal], seedNum + idx);
        combined.push(...shuffled.slice(0, 4)); 
      }
    });

    const allGoals = Object.keys(TASK_POOL);
    for (const goal of allGoals) {
      if (combined.length >= 4) break; 
      if (!user.goals.includes(goal) && TASK_POOL[goal]) {
        const shuffled = shuffleWithSeed(TASK_POOL[goal], seedNum);
        combined.push(...shuffled.slice(0, 4));
      }
    }

    setTasks(combined.slice(0, 4)); 
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (e) {
      console.error("Leaderboard fetch error:", e);
    }
  };

  const fetchCommunityPosts = async () => {
    try {
      const res = await fetch("/api/community");
      if (res.ok) {
        const data = await res.json();
        setCommunityPosts(data);
      }
    } catch (e) {
      console.error("Community fetch error:", e);
    }
  };

  const fetchChatMessages = async (room: string) => {
    try {
      const res = await fetch(`/api/chat?room=${room}`);
      if (res.ok) {
        const data = await res.json();
        setChatMessages(data);
      }
    } catch (e) {
      console.error("Chat fetch error:", e);
    }
  };

  const fetchUserFriendships = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/users/${currentUser.id}/friendships`);
      if (res.ok) {
        const data = await res.json();
        setUserFriendships(data);
      }
    } catch (e) {
      console.error("Error fetching friendships:", e);
    }
  };
  const searchUsersForFriends = async (queryStr: string) => {
    if (!currentUser) return;
    setFriendsSearchLoading(true);
    try {
      // استخدام التنظيف قبل البحث كإجراء احترازي
      const cleanQuery = sanitizeInput(queryStr);
      const res = await fetch(`/api/users/search?query=${encodeURIComponent(cleanQuery)}&currentUserId=${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setFriendsSearchResults(data);
      }
    } catch (e) {
      console.error("Error searching users:", e);
    } finally {
      setFriendsSearchLoading(false);
    }
  };
  const sendFriendRequest = async (receiverId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/friendships/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: currentUser.id, receiverId }),
      });
      if (res.ok) {
        setCustomToast("تم إرسال طلب الصداقة بنجاح! في انتظار موافقة صديقتكِ الرائعة 🌸✨");
        fetchUserFriendships();
        searchUsersForFriends(friendsSearchQuery);
      } else {
        const err = await res.json();
        setCustomToast(err.error || "فشل إرسال طلب الصداقة.");
      }
    } catch (e) {
      console.error("Error sending friend request:", e);
      setCustomToast("عذراً، حدث خطأ أثناء إرسال الطلب.");
    }
  };
  const respondToFriendRequest = async (friendshipId: string, status: "accepted" | "declined") => {
    try {
      const res = await fetch(`/api/friendships/${friendshipId}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        if (status === "accepted") {
          setCustomToast("يا إلهي! تم قبول الصداقة الآن.. أصبحتم صديقتين ويمكنكما البدء بالدردشة الآمنة فوراً! 👭💖");
        } else {
          setCustomToast("تم رفض طلب الصداقة بلطف. 🌸");
        }
        fetchUserFriendships();
      } else {
        const err = await res.json();
        setCustomToast(err.error || "فشل الرد على الطلب.");
      }
    } catch (e) {
      console.error("Error responding to friend request:", e);
    }
  };
  const fetchPrivateMessages = async (friendshipId: string) => {
    try {
      const res = await fetch(`/api/direct-messages/${friendshipId}`);
      if (res.ok) {
        const data = await res.json();
        setPrivateMessages(data);
      }
    } catch (e) {
      console.error("Error fetching private messages:", e);
    }
  };
  const sendPrivateMessage = async () => {
    if (!currentUser || !activeFriendshipChat || !newPrivateMessage.trim()) return;
    // تطبيق الأمان على الرسالة قبل إرسالها
    const msgText = sanitizeInput(newPrivateMessage.trim());
    setNewPrivateMessage("");
    try {
      const res = await fetch("/api/direct-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friendshipId: activeFriendshipChat.id,
          senderId: currentUser.id,
          senderName: currentUser.firstName,
          text: msgText
        }),
      });
      if (res.ok) {
        const newMsg = await res.json();
        setPrivateMessages((prev) => [...prev, newMsg]);
      } else {
        const err = await res.json();
        setCustomToast(err.error || "فشل إرسال الرسالة.");
      }
    } catch (e) {
      console.error("Error sending private message:", e);
    }
  };
  const submitChatReport = async () => {
    if (!currentUser || !chatReportTarget || !chatReportReason.trim()) return;
    setReportingSubmitting(true);
    // تطبيق الأمان على نص البلاغ
    const safeReason = sanitizeInput(chatReportReason.trim());
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporterId: currentUser.id,
          reporterName: currentUser.firstName,
          reportedUserId: chatReportTarget.senderId,
          reportedUserName: chatReportTarget.senderName,
          messageText: chatReportTarget.text,
          reason: safeReason
        }),
      });
      if (res.ok) {
        setCustomToast("شكراً لكِ! لقد تم إرسال البلاغ فوراً وبسرية تامة إلى إدارة رانيا للتحقيق واتخاذ اللازم 🔒⚠️");
        setChatReportTarget(null);
        setChatReportReason("");
      } else {
        const err = await res.json();
        setCustomToast(err.error || "فشل تقديم البلاغ.");
      }
    } catch (e) {
      console.error("Error submitting report:", e);
    } finally {
      setReportingSubmitting(false);
    }
  };
  const fetchAdminReports = async () => {
    try {
      const res = await fetch(`/api/admin/reports?passcode=${adminPasscode}`);
      if (res.ok) {
        const data = await res.json();
        setAdminReports(data);
      }
    } catch (e) {
      console.error("Error fetching admin reports:", e);
    }
  };
  const resolveAdminReport = async (reportId: string) => {
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/resolve?passcode=${adminPasscode}`, {
        method: "POST"
      });
      if (res.ok) {
        setCustomToast("تم تحديد البلاغ كمكتمل ومحلول بنجاح! شكراً لكِ رانيا على حمايتكِ للمجتمع 🛡️✨");
        fetchAdminReports();
      }
    } catch (e) {
      console.error("Error resolving admin report:", e);
    }
  };
  const renderUserAvatar = (userId: string, sizeClass = "w-10 h-10 text-lg") => {
    if (userId === "admin") {
      return (
        <div className={`${sizeClass} rounded-full bg-gradient-to-tr from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-sm border border-white flex-shrink-0 font-sans font-bold`}>
          👑
        </div>
      );
    }
    const user = leaderboard.find((u) => u.id === userId) || (userId === currentUser?.id ? currentUser : null);
    const avatarUrl = user?.avatarUrl || "preset_1";
    if (avatarUrl.startsWith("preset_")) {
      const preset = PRESET_AVATARS.find((p) => p.id === avatarUrl) || PRESET_AVATARS[0];
      return (
        <div className={`${sizeClass} rounded-full bg-gradient-to-tr ${preset.color} flex items-center justify-center text-white shadow-sm border border-white flex-shrink-0 font-sans`}>
          {preset.emoji}
        </div>
      );
    }
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden border border-pink-100 flex-shrink-0 shadow-sm bg-pink-50 flex items-center justify-center`}>
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  };
  const getPlantStage = (points: number) => {
    if (points <= 15) return { icon: "🪵", text: "تربة رطبة (اسقيني بالمهام اليومية!)", color: "text-amber-700" };
    if (points <= 35) return { icon: "🌱", text: "برعم صغير لطيف ينمو بحب ✨", color: "text-emerald-500" };
    if (points <= 60) return { icon: "🌿", text: "نبتة يافعة تكبر وتتغذى بانتظام 💖", color: "text-emerald-600" };
    if (points <= 85) return { icon: "🪴", text: "شجيرة رانيا الراقية تملأ الغرفة خضرة", color: "text-teal-600" };
    return { icon: "🌸", text: "زهرة متفتحة جميلة فخورة بالتزامكِ الدائم! 🥰", color: "text-pink-500 animate-pulse" };
  };
  const formatTimeElapsed = (isoString: string) => {
    try {
      const diff = Date.now() - new Date(isoString).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return "الآن";
      if (mins < 60) return `منذ ${mins} د`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `منذ ${hours} س`;
      const days = Math.floor(hours / 24);
      return `منذ ${days} ي`;
    } catch (e) {
      return "قبل قليل";
    }
  };
  const refreshAdminStats = async () => {
    try {
      const res = await fetch(`/api/admin/stats?passcode=${adminPasscode}`);
      if (res.ok) {
        const data = await res.json();
        setAdminStats(data);
      }
    } catch (e) {
      console.error("Error fetching admin stats:", e);
    }
  };
  const renderAdminDashboardStats = () => {
    if (!adminStats) {
      return (
        <div className="bg-white rounded-3xl p-8 border border-pink-100/40 shadow-sm text-center">
          <p className="text-sm text-slate-500 font-bold">جاري تحميل إحصائيات التتبع الداخلي... 🌱</p>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-white rounded-3xl p-6 border border-pink-100/40 shadow-md flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-2xl shrink-0">
              👥
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-400">إجمالي عدد زوار الموقع</p>
              <p className="text-2xl font-black text-slate-800 mt-1">
                {adminStats.visitorCount.toLocaleString()} <span className="text-xs font-bold text-slate-400">زيارة</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-pink-100/40 shadow-md flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl shrink-0">
              🌱
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-400">مرات رعاية وسقي النبتة</p>
              <p className="text-2xl font-black text-slate-800 mt-1">
                {adminStats.plantClicksCount.toLocaleString()} <span className="text-xs font-bold text-slate-400">سقي</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-pink-100/40 shadow-md flex items-center gap-4 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl shrink-0">
              💖
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-400">إجمالي العضوات المسجلات</p>
              <p className="text-2xl font-black text-slate-800 mt-1">
                {adminUsers.length} <span className="text-xs font-bold text-slate-400">فتاة</span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-pink-100/40 shadow-md flex flex-col justify-between transition-all hover:shadow-lg">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-extrabold text-xs text-purple-800">الأهداف الأكثر طلباً بين البنات 📊</h4>
                <span className="text-[9px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">تحديث فوري</span>
              </div>
              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
                توزيع الأهداف والاهتمامات المفضلة لدى متابعاتكِ لتحديد نوع المحتوى والمهام المستقبلية.
              </p>
              <div className="space-y-4">
                {Object.entries(adminStats.goalsPopularity || {}).map(([goal, count]) => {
                  const totalUsers = Math.max(1, adminUsers.length);
                  const countNum = Number(count);
                  const percentage = Math.min(100, Math.round((countNum / totalUsers) * 100));
                  
                  const colorMap: { [key: string]: string } = {
                    "بشرة لامعة": "from-pink-400 to-pink-500",
                    "شعر صحي": "from-purple-400 to-purple-500",
                    "ملامح بارزة": "from-rose-400 to-rose-500",
                    "جسم مثالي": "from-emerald-400 to-emerald-500",
                    "راحة نفسية": "from-indigo-400 to-indigo-500",
                  };
                  const bgStyle = colorMap[goal] || "from-pink-400 to-pink-500";
                  return (
                    <div key={goal} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-extrabold text-slate-700">{goal}</span>
                        <span className="text-slate-500 font-bold font-mono text-[10px]">{count} فتاة ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${bgStyle} h-full rounded-full transition-all duration-1000`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-[9px] text-slate-400 mt-6 pt-4 border-t border-slate-50 text-center font-bold">
              يتم التحديث تلقائياً عند تغيير رغبات العضوات
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-pink-100/40 shadow-md flex flex-col transition-all hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-extrabold text-xs text-purple-800">سجل الأنشطة والفاعلية المباشر ⚡</h4>
              <button
                onClick={refreshAdminStats}
                className="text-[9px] bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200/50 font-extrabold cursor-pointer transition-all active:scale-95 flex items-center gap-1"
              >
                تحديث الأرقام 🔄
              </button>
            </div>
            
            <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
              متابعة حية لأبرز الأنشطة التي تقوم بها العضوات داخل الموقع في الوقت الفعلي (إنجاز مهام، سقي نبتة، تفاعلات).
            </p>
            <div className="flex-1 overflow-y-auto max-h-[250px] pr-1 space-y-2.5">
              {adminStats.activityLogs && adminStats.activityLogs.length > 0 ? (
                adminStats.activityLogs.map((log: any) => (
                  <div key={log.id} className="p-3 bg-slate-50/50 hover:bg-slate-50 rounded-2xl border border-slate-100/40 transition-colors flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100/30 flex items-center justify-center font-bold text-xs text-pink-600 shrink-0">
                        {log.userName ? log.userName.charAt(0) : "ع"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-700 font-bold leading-relaxed break-words">
                          <span className="font-extrabold text-slate-900">{log.userName || "عضوة"}</span>{" "}
                          {log.details}
                        </p>
                        <span className="text-[9px] text-slate-400 mt-1 block">
                          المعرف: {log.userId}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap bg-white px-2 py-0.5 rounded-full border border-slate-100 font-mono shrink-0">
                      {formatTimeElapsed(log.timestamp)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-xs text-slate-400">
                  لا توجد أنشطة مسجلة بعد.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const plantInfo = getPlantStage(currentUser?.plantPoints || 10);
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    if (adminPasscode === "rania99") {
      setIsAdminLoggedIn(true);
      fetchAdminUsersList();
      refreshAdminStats();
      fetchAdminReports();
    } else {
      setAdminError("رمز المرور غير صحيح، حاولي مرة أخرى.");
    }
  };
  const fetchAdminUsersList = async () => {
    try {
      const res = await fetch(`/api/admin/users?passcode=${adminPasscode}`);
      if (res.ok) {
        const data = await res.json();
        setAdminUsers(data);
      }
    } catch (e) {
      console.error("Error fetching admin users:", e);
    }
  };
  const handleWarnUserClick = (userId: string, userName: string) => {
    setAdminActionTarget({ type: "warn", userId, userName, reason: "" });
  };
  const handleBanUserClick = (userId: string, userName: string) => {
    setAdminActionTarget({ type: "ban", userId, userName });
  };
  const executeWarnUser = async (userId: string, userName: string, reason: string) => {
    try {
      // تطبيق الأمان على سبب الإنذار
      const safeReason = sanitizeInput(reason);
      const res = await fetch(`/api/admin/users/${userId}/warn?passcode=${adminPasscode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: safeReason }),
      });
      if (res.ok) {
        setCustomToast(`تم إرسال إنذار للعضوة ${userName} بنجاح ⚠️`);
        setAdminActionTarget(null);
        fetchAdminUsersList();
        if (currentUser && currentUser.id === userId) {
          const updated = await res.json();
          if (updated.user) {
            setCurrentUser(updated.user);
            localStorage.setItem("rania_glow_user", JSON.stringify(updated.user));
          }
        }
      }
    } catch (e) {
      console.error("Error warning user:", e);
    }
  };
  const executeBanUser = async (userId: string, userName: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/ban?passcode=${adminPasscode}`, {
        method: "POST"
      });
      if (res.ok) {
        setCustomToast(`تم حظر حساب العضوة ${userName} نهائياً 🚫`);
        setAdminActionTarget(null);
        fetchAdminUsersList();
      }
    } catch (e) {
      console.error("Error banning user:", e);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setScreenshot(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) return prev.filter((g) => g !== goal);
      if (prev.length >= 3) return prev;
      return [...prev, goal];
    });
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!screenshot) {
      setAuthError("الرجاء رفع لقطة شاشة لإثبات المتابعة قبل المتابعة.");
      return;
    }
    setRegisterStep("goals");
  };
  const submitRegistration = async () => {
    if (selectedGoals.length === 0) {
      alert("الرجاء اختيار هدف واحد على الأقل.");
      return;
    }
    setAuthError("");
    try {
      // تطبيق الأمان على اسم المستخدم
      const safeFirstName = sanitizeInput(firstName);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: safeFirstName,
          password, // كلمة المرور لا تُنظف عادة لتسمح بالرموز الخاصة
          screenshot,
          goals: selectedGoals
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
        localStorage.setItem("rania_glow_user", JSON.stringify(data));
        setAuthSuccess("تم إنشاء حسابكِ بنجاح! مرحباً بكِ في عالم رانيا.");
      } else {
        const err = await res.json();
        setAuthError(err.error || "فشل إنشاء الحساب.");
        setRegisterStep("info");
      }
    } catch (e) {
      console.error("Error registering:", e);
      setAuthError("حدث خطأ أثناء إنشاء الحساب.");
      setRegisterStep("info");
    }
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      // تطبيق الأمان على اسم المستخدم عند تسجيل الدخول
      const safeFirstName = sanitizeInput(firstName);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: safeFirstName, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
        localStorage.setItem("rania_glow_user", JSON.stringify(data));
      } else {
        const err = await res.json();
        setAuthError(err.error || "فشل تسجيل الدخول.");
      }
    } catch (e) {
      console.error("Error logging in:", e);
      setAuthError("حدث خطأ أثناء تسجيل الدخول.");
    }
  };
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("rania_glow_user");
    setActiveTab("dashboard");
  };
  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    if (!currentUser) return;
    const task = tasks.find((t) => t.id === taskId);
    try {
      const res = await fetch(`/api/users/${currentUser.id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, isCompleted: completed, taskTitle: task?.title || taskId }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCurrentUser(updated);
        localStorage.setItem("rania_glow_user", JSON.stringify(updated));
        fetchLeaderboard();
      }
    } catch (e) {
      console.error("Error toggling task:", e);
    }
  };
  const handlePlantWateringClick = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/users/${currentUser.id}/plant-water`, {
        method: "POST"
      });
      if (res.ok) {
        const result = await res.json();
        setCurrentUser(result.user);
        localStorage.setItem("rania_glow_user", JSON.stringify(result.user));
        setCustomToast("تم سقي نبتتكِ بنجاح! استمري 🌱💧");
      }
    } catch (e) {
      console.error("Error watering plant:", e);
    }
  };
  const handleGoalUpdateInDashboard = async (newGoals: string[]) => {
    if (!currentUser || newGoals.length === 0) return;
    const updated = {
      ...currentUser,
      goals: newGoals,
    };
    setCurrentUser(updated);
    localStorage.setItem("rania_glow_user", JSON.stringify(updated));
    generateDailyTasks(updated);
  };
  const openUserProfile = (userId: string) => {
    const user = leaderboard.find((u) => u.id === userId) || (userId === currentUser?.id ? currentUser : null);
    if (user) {
      setViewingProfileUser(user);
    }
  };
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newChatMessage.trim()) return;
    const room = activePrivateUser
      ? (currentUser.id < activePrivateUser.id ? `private_${currentUser.id}_${activePrivateUser.id}` : `private_${activePrivateUser.id}_${currentUser.id}`)
      : activeChatRoom;
    
    // تطبيق الأمان على الرسالة قبل إرسالها لغرف الدردشة
    const msgText = sanitizeInput(newChatMessage.trim());
    setNewChatMessage("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, authorName: currentUser.firstName, text: msgText, room }),
      });
      if (res.ok) {
        fetchChatMessages(room);
      }
    } catch (e) {
      console.error("Error sending chat message:", e);
    }
  };
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fdfbfc] via-white to-[#f5f1ff] text-slate-800 flex flex-col font-sans relative p-4 md:p-8 selection:bg-pink-200">
        
        <div className="absolute top-4 left-4 text-purple-300 pointer-events-none"><Sparkles className="w-8 h-8 animate-pulse" /></div>
        <div className="absolute top-24 right-6 text-pink-300 pointer-events-none animate-bounce"><Sparkles className="w-6 h-6" /></div>
        
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center py-10 z-10">
          
          <div className="flex flex-col items-center gap-2 mb-8 text-center w-full max-w-xs mx-auto">
            <div className="hover:scale-105 transition-transform duration-300 w-full" style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "visible" }}>
              <Logo size={140} showBackground={false} style={{ width: "100%", height: "auto", maxWidth: "140px" }} />
            </div>
            <h1 className="text-2xl font-extrabold text-purple-900 font-display mt-3">
              لوحة الإدارة والمراجعة - Glow & Rise
            </h1>
            <p className="text-pink-500 font-bold tracking-widest text-xs uppercase mt-1">
              منطقة رانيا الخاصة للموافقة والمتابعة 👑
            </p>
          </div>
          {!isAdminLoggedIn ? (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-pink-100/60 shadow-xl max-w-md mx-auto w-full">
              <h3 className="font-extrabold text-base text-purple-800 text-center mb-6">تسجيل دخول رانيا والمسؤولين 🔒</h3>
              
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">رمز المرور الخاص لإدارة رانيا:</label>
                  <input
                    type="password"
                    required
                    placeholder="الرجاء إدخال الرمز الخاص"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 text-center font-mono"
                  />
                </div>
                {adminError && (
                  <p className="text-xs text-red-600 font-bold text-center">{adminError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl text-xs hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer shadow-lg shadow-purple-100"
                >
                  دخول والتحقق من حسابات البنات ➔
                </button>
              </form>
              <div className="pt-6 border-t border-slate-100 mt-6 text-center">
                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="text-xs text-pink-500 font-bold hover:underline cursor-pointer"
                >
                  العودة للموقع الرئيسي 🌸
                </button>
              </div>
            </div>
          ) : (
        <div className="space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-purple-700">قائمة العضوات لقطات شاشة التحقق المرفوعة 📸</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    يمكنكِ فحص الصور المرفوعة يدويًا وإلغاء حساب أي عضوة ترفع صورًا غير حقيقية أو مضللة.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    className="text-xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    الذهاب للموقع الرئيسي 🌸
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      setAdminPasscode("");
                    }}
                    className="text-xs font-bold bg-red-50 hover:bg-red-100 text-red-500 px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    خروج الإدارة
                  </button>
                </div>
              </div>
              {renderAdminDashboardStats()}
              <h4 className="font-extrabold text-base text-purple-900 mt-8 mb-2">طلبات التحقق من صور المتابعة للمشتركات الجدد 📸</h4>
              {adminUsers.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-pink-100/40 text-slate-400 text-sm">
                  لا توجد لقطات شاشة مرفوعة حالياً للتحقق منها.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
                      
                      <div className="h-56 bg-slate-100 border-b border-slate-50 flex items-center justify-center relative group">
                        {user.screenshot ? (
                          user.screenshot.startsWith("data:") ? (
                            <img
                              src={user.screenshot}
                              alt="Follow verification screenshot"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="p-4 text-center text-xs text-slate-400">
                              <span>{user.screenshot}</span>
                            </div>
                          )
                        ) : (
                          <p className="text-xs text-slate-400">لا توجد صورة مرفوعة</p>
                        )}
                      </div>
                      <div className="p-5 space-y-3">
                        <div>
                          <p className="text-sm font-bold text-slate-800">العضوة: {user.firstName}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">تاريخ الانضمام: {new Date(user.joinedAt).toLocaleDateString("ar-SA")}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {user.goals.map((goal: string) => (
                            <span key={goal} className="px-2 py-0.5 bg-pink-50 text-[9px] text-pink-600 rounded">
                              {goal}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs pt-3 mt-3 border-t border-slate-50">
                          <span className="font-bold text-purple-700">نقاط: {user.points}</span>
                          <span className="font-bold text-emerald-500">نبتة: {user.plantPoints}%</span>
                        </div>
                        {user.warningsCount > 0 && (
                          <div className="bg-amber-50 text-amber-700 p-2.5 rounded-2xl text-[10px] border border-amber-100/60 leading-relaxed font-bold">
                            ⚠️ تم الإنذار ({user.warningsCount}): {user.warningReason}
                          </div>
                        )}
                        {user.isBanned && (
                          <div className="bg-rose-50 text-rose-700 p-2.5 rounded-2xl text-[10px] border border-rose-100/60 leading-relaxed font-bold text-center">
                            🚫 هذا الحساب محظور حالياً
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <button
                            onClick={() => handleWarnUserClick(user.id, user.firstName)}
                            className="py-2 bg-amber-50 hover:bg-amber-100 text-amber-750 font-extrabold rounded-xl text-[10px] transition-all cursor-pointer text-center"
                          >
                            إنذار العضوة ⚠️
                          </button>
                          <button
                            onClick={() => handleBanUserClick(user.id, user.firstName)}
                            className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold rounded-xl text-[10px] transition-all cursor-pointer text-center"
                          >
                            إلغاء وحظر 🚫
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {adminActionTarget && (
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 text-right" style={{ direction: "rtl" }}>
              <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden border border-pink-100 shadow-2xl flex flex-col p-6 space-y-5 animate-in fade-in-50 zoom-in-95 duration-200">
                
                <div className="flex justify-between items-center pb-3 border-b border-pink-50">
                  <h3 className="font-extrabold text-base text-purple-900 flex items-center gap-2">
                    {adminActionTarget.type === "warn" ? "⚠️ توجيه إنذار رسمي للمشتركة" : "🚫 حظر وإلغاء حساب العضوة نهائياً"}
                  </h3>
                  <button 
                    onClick={() => setAdminActionTarget(null)}
                    className="p-1 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-full transition-all cursor-pointer border border-pink-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {currentUser && currentUser.id === adminActionTarget.userId && (
                  <div className="bg-orange-50 border-r-4 border-orange-500 p-3.5 rounded-2xl text-xs text-orange-800 font-extrabold leading-relaxed">
                    📢 ملاحظة تجريبية: أنتِ على وشك توجيه الإجراء لحسابكِ الحالي النشط ({adminActionTarget.userName})! يمكنكِ تجربة ذلك لرؤية النتيجة مباشرة، وسيتم تحديث حالتكِ في الحال.
                  </div>
                )}
                {adminActionTarget.type === "warn" && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      أنتِ على وشك إرسال إنذار رسمي للعضوة <span className="font-extrabold text-purple-700">"{adminActionTarget.userName}"</span>. سيظهر هذا الإنذار بشكل بارز في لوحة تحكمها الخاصة فوراً.
                    </p>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">سبب الإنذار والمخالفة:</label>
                      <textarea
                        rows={3}
                        value={adminActionTarget.reason || ""}
                        onChange={(e) => setAdminActionTarget({ ...adminActionTarget, reason: e.target.value })}
                        placeholder="اكتبي سبب الإنذار هنا بالتفصيل..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300 font-sans"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => executeWarnUser(adminActionTarget.userId, adminActionTarget.userName, adminActionTarget.reason || "")}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md cursor-pointer"
                      >
                        تأكيد وإرسال الإنذار ⚠️
                      </button>
                      <button
                        onClick={() => setAdminActionTarget(null)}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-xs transition-all cursor-pointer"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                )}
                {adminActionTarget.type === "ban" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-800 text-xs leading-relaxed space-y-2">
                      <p className="font-extrabold text-sm flex items-center gap-1.5">
                        <span>⚠️ تحذير نهائي وقاطع!</span>
                      </p>
                      <p>
                        هل أنتِ متأكدة تماماً من حظر حساب العضوة <span className="font-extrabold text-rose-900 underline">"{adminActionTarget.userName}"</span> نهائياً من منصة رانيا للتوهج؟
                      </p>
                      <p className="text-[11px] text-rose-600">
                        هذا الإجراء سيمنع العضوة تماماً من تسجيل الدخول أو التفاعل في المنصة نهائياً.
                      </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => executeBanUser(adminActionTarget.userId, adminActionTarget.userName)}
                        className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md cursor-pointer"
                      >
                        نعم، حظر الحساب نهائياً 🚫
                      </button>
                      <button
                        onClick={() => setAdminActionTarget(null)}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-xs transition-all cursor-pointer"
                      >
                        تراجع
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {customToast && (
            <div className="fixed bottom-8 left-4 md:left-8 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-xs px-5 py-3.5 rounded-full shadow-2xl border border-pink-300 flex items-center gap-2 animate-bounce">
              🌸 {customToast}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7fa] via-[#ffffff] to-[#f7f3ff] text-slate-800 flex flex-col font-sans relative pb-8 selection:bg-pink-200">
      
      <div className="absolute top-4 left-4 text-pink-300 pointer-events-none animate-bounce"><Sparkles className="w-8 h-8" /></div>
      <div className="absolute top-24 right-6 text-purple-300 pointer-events-none animate-pulse"><Sparkle className="w-6 h-6" /></div>
      {!currentUser && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 z-10 max-w-4xl mx-auto w-full">
          
          <div className="flex flex-col items-center gap-2 mb-8 text-center w-full max-w-xs mx-auto">
            <div className="hover:scale-105 transition-transform duration-300 w-full" style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "visible" }}>
              <Logo size={200} showBackground={false} style={{ width: "100%", height: "auto", maxWidth: "200px" }} />
            </div>
            <p className="text-pink-600 font-extrabold tracking-wider text-sm mt-3">توهجي وارتقي برعاية رانيا 💖</p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-pink-100 text-center mb-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-display">مرحباً بكِ في عالم رانيا الرائع! ✨</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              أهلاً بكِ يا صديقتي في مساحتكِ الآمنة والخاصة بالبنات فقط. هذا الموقع صُمم بكل حب وشغف برعاية <span className="font-extrabold text-pink-500">رانيا</span> لمساعدتكِ على التطور والاعتناء بجمالكِ الخارجي وصحتكِ النفسية والروحية يومياً.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 w-full overflow-hidden max-w-lg">
            
            <div className="flex border-b border-pink-50">
              <button
                onClick={() => { setAuthMode("register"); setAuthError(""); setAuthSuccess(""); }}
                className={`flex-1 py-4 text-center font-bold text-sm transition-all duration-300 ${
                  authMode === "register" ? "bg-gradient-to-r from-pink-50 to-pink-100 text-pink-600 border-b-2 border-pink-500" : "text-gray-400 hover:text-pink-400"
                }`}
              >
                إنشاء حساب جديد ✨
              </button>
              <button
                onClick={() => { setAuthMode("login"); setAuthError(""); setAuthSuccess(""); }}
                className={`flex-1 py-4 text-center font-bold text-sm transition-all duration-300 ${
                  authMode === "login" ? "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 border-b-2 border-purple-500" : "text-gray-400 hover:text-purple-400"
                }`}
              >
                تسجيل الدخول 🌸
              </button>
            </div>
            {authError && (
              <div className="m-4 p-4 bg-red-50 border-r-4 border-red-500 rounded-xl text-red-700 text-xs md:text-sm flex gap-2 items-start animate-pulse">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500" />
                <span className="font-medium">{authError}</span>
              </div>
            )}
            {authSuccess && (
              <div className="m-4 p-4 bg-green-50 border-r-4 border-green-500 rounded-xl text-green-700 text-xs md:text-sm flex gap-2 items-start">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-500" />
                <span className="font-medium leading-relaxed">{authSuccess}</span>
              </div>
            )}
            <div className="p-6 md:p-8">
              {authMode === "register" && (
                <div>
                  {registerStep === "info" ? (
                    <form onSubmit={handleRegister} className="space-y-6">
                      
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2">اسمكِ الأول الرائع 🌸</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: سارة، مريم..."
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-pink-50/50 border border-pink-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all text-center font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-2">كلمة سر خاصة بكِ 🔒</label>
                        <input
                          type="password"
                          required
                          placeholder="اكتبي كلمة سر سهلة الحفظ لتسجيل دخولكِ لاحقاً"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-pink-50/50 border border-pink-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all text-center font-medium"
                        />
                      </div>
                      <div className="border-2 border-dashed border-pink-200 bg-pink-50/30 rounded-2xl p-5 text-center transition-all hover:border-pink-300 relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          id="file-upload"
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="flex flex-col items-center justify-center">
                          <Camera className="w-8 h-8 text-pink-400 mb-2" />
                          <p className="text-xs font-bold text-gray-700">ارفعي لقطة شاشة لإثبات المتابعة</p>
                          <p className="text-[10px] text-pink-500 mt-1 font-medium">تابعي حساب رانيا على إنستغرام @queeen_raaniaa ثم ارفعي لقطة الشاشة هنا</p>
                          
                          {screenshotName && (
                            <div className="mt-3 py-1 px-3 bg-white rounded-full border border-pink-200 flex items-center gap-1">
                              <span className="text-[10px] text-green-600 font-bold">تم اختيار: {screenshotName} ✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex gap-3">
                        <AlertTriangle className="w-10 h-10 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-xs text-red-600 font-bold mb-1">تنبيه هام من فريق رانيا:</p>
                          <p className="text-[10px] text-red-500 leading-relaxed font-medium">
                            يتم فحص الصور المرفوعة دورياً من قبل فريق رانيا. في حال اكتشاف أي صورة غير حقيقية أو تضليل، سيتم إلغاء حسابكِ نهائياً وحظركِ من الموقع.
                          </p>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-2xl hover:from-pink-500 hover:to-pink-600 shadow-md transition-all hover:-translate-y-0.5"
                      >
                        الخطوة التالية: اختاري أهدافكِ الرائعة ✨
                      </button>
                    </form>
                  ) : (
                  <div className="space-y-6">
                      <div className="text-center mb-4">
                        <h3 className="font-bold text-lg text-pink-600">حددي أهداف التوهج الخاصة بكِ 🎯</h3>
                        <p className="text-xs text-gray-500 mt-1">اختاري 3 مجالات كحد أقصى لرانيا لتقوم بتصميم روتينكِ اليومي المخصص</p>
                      </div>
                      <div className="space-y-3">
                        {["بشرة لامعة", "شعر صحي", "ملامح بارزة", "جسم مثالي", "راحة نفسية"].map((goal) => {
                          const isSelected = selectedGoals.includes(goal);
                          return (
                            <button
                              key={goal}
                              type="button"
                              onClick={() => handleGoalToggle(goal)}
                              className={`w-full p-4 rounded-2xl border text-right flex justify-between items-center transition-all ${
                                isSelected
                                  ? "border-pink-300 bg-pink-50/70 text-pink-700 shadow-sm font-bold"
                                  : "border-slate-100 bg-slate-50 hover:bg-pink-50/20 text-slate-700"
                              }`}
                            >
                              <span className="text-sm font-medium">{goal}</span>
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                  isSelected ? "bg-pink-500 border-pink-500 text-white" : "border-slate-300"
                                }`}
                              >
                                {isSelected && "✓"}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setRegisterStep("info")}
                          className="flex-1 py-3 border border-pink-200 text-pink-500 font-bold rounded-2xl hover:bg-pink-50 text-sm transition-all"
                        >
                          رجوع للخلف
                        </button>
                        <button
                          type="button"
                          onClick={submitRegistration}
                          className="flex-[2] py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-600 shadow-md text-sm transition-all"
                        >
                          إنشاء حسابي والدخول! 🚀
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {authMode === "login" && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">اسمكِ الأول الرائع 🌸</label>
                    <input
                      type="text"
                      required
                      placeholder="اكتبي اسمكِ المستخدم سابقاً"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all text-center font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">كلمة سر خاصة بكِ 🔒</label>
                    <input
                      type="password"
                      required
                      placeholder="ادخلي كلمة السر الخاصة بكِ"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all text-center font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 shadow-md transition-all hover:-translate-y-0.5"
                  >
                    دخول إلى عالم رانيا ✨
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsAdminRoute(true);
                window.history.pushState({}, "", "/rania-admin");
              }}
              className="inline-flex items-center gap-1.5 text-[11px] text-purple-400 hover:text-purple-600 font-bold hover:underline cursor-pointer bg-purple-50/50 hover:bg-purple-50 px-3.5 py-2 rounded-full transition-all border border-purple-100/40 shadow-sm"
            >
              🔒 الدخول السريع للوحة الإدارة برمز المرور (خاص برانيا والمسؤولين)
            </button>
          </div>
        </div>
      )}
{currentUser && (
  <div className="flex-1 flex flex-col md:flex-row min-h-screen" dir="rtl">
    
    {/* شريط الإدارة الجانبي */}
    {currentUser.id === "admin" && (
      <div className="w-full md:w-68 bg-white border-e border-pink-100 p-6 flex flex-col z-10">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-300 to-purple-400 rounded-full flex items-center justify-center text-white text-xl shadow-sm">
            🛠️
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Glow&Rise Admin
            </h1>
            <p className="text-[10px] text-pink-400 font-bold">لوحة إدارة رانيا 🔒</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => {
              setActiveTab("admin");
              setIsAdminLoggedIn(false);
            }}
            className={`w-full p-3 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all ${
              activeTab === "admin"
                ? "bg-purple-50 text-purple-600 border-s-4 border-purple-500"
                : "text-slate-500 hover:bg-purple-50/30 hover:text-purple-500"
            }`}
          >
            🔒 <span className="ms-1">مراجعة المستخدمين</span>
          </button>
        </nav>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <span className="text-gray-400">مرحباً رانيا ✨</span>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-600 transition-all font-semibold flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" /> خروج
          </button>
        </div>

      </div>
    )}

    {/* المحتوى الرئيسي المشترك */}
    <div className={`flex-1 flex flex-col p-4 md:p-8 gap-6 overflow-y-auto ${currentUser.id !== "admin" ? "pb-28" : ""}`}>
      
      {/* الهيدر العلوي */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-pink-100/30">
        <div className="flex items-center gap-3">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "visible" }}>
            <Logo size={65} showBackground={false} style={{ width: "100%", height: "auto", maxWidth: "65px" }} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">
              {currentUser.id === "admin" ? "لوحة التحكم للإدارة والمراجعة 🛠️" : "مرحباً بكِ في عالم رانيا الرائع! ✨"}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed mt-1">
              {currentUser.id === "admin"
                ? "أهلاً بكِ رانيا، هنا يمكنكِ مراقبة العضوات وفحص الصور واللقطات المرفوعة للتأكد من المتابعة."
                : "أهلاً بكِ يا صديقتي في مساحتكِ الآمنة والخاصة بالبنات فقط برعاية رانيا الجميلة."}
            </p>
          </div>
        </div>

        {currentUser.id !== "admin" && (
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-pink-100 shadow-sm">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-800">{currentUser.firstName}</p>
              <p className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5 justify-end">
                حساب موثق <ShieldCheck className="w-3 h-3" />
              </p>
            </div>
            <button
              onClick={() => openUserProfile(currentUser.id)}
              className="cursor-pointer hover:scale-105 transition-transform outline-none"
              title="عرض وتعديل ملفكِ الشخصي"
            >
              {renderUserAvatar(currentUser.id, "w-10 h-10")}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-all cursor-pointer border border-red-100/40"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* تبويب لوحة التحكم الرئيسية */}
      {activeTab === "dashboard" && currentUser.id !== "admin" && (
        <div className="lg:col-span-3 w-full space-y-6">
          
          {/* قسم التنبيهات الصادرة من الإدارة */}
          {currentUser.warningsCount > 0 && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-s-4 border-amber-500 rounded-3xl p-5 shadow-sm text-right flex items-start gap-4 transition-all duration-300">
              <span className="text-2xl mt-0.5">⚠️</span>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-amber-800">تنبيه ومراجعة من إدارة رانيا</h4>
                <p className="text-xs text-amber-700 leading-relaxed">
                  لقد تلقيتِ تنبيهاً رسميّاً رقم ({currentUser.warningsCount}) بسبب: <span className="font-extrabold text-amber-900">"{currentUser.warningReason}"</span>. 
                  يرجى الالتزام برفع صور حقيقية للتحقق لضمان عدم حظر حسابكِ نهائياً وخسارة نقاط التوهج ونبتتكِ الافتراضية.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* بطاقة تحدي النبتة الافتراضية */}
            <div className="col-span-1 bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md flex flex-col items-center justify-center gap-5 text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-400"></div>
              <h3 className="font-extrabold text-base text-pink-600 mt-2 flex items-center gap-2">تحدي نبتة رانيا الافتراضية 🌿</h3>
              <p className="text-[10px] text-slate-400 leading-normal max-w-xs">
                تنبت النبتة وتزهر عند إنجازكِ للمهام اليومية المتغيرة، وتذبل عند التقاعس والإهمال! حافظي عليها يافعة 🌸
              </p>

              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-[#fff0f5] to-[#e6e6fa] flex items-center justify-center relative shadow-inner border-4 border-white transition-all duration-700 hover:scale-105">
                <span className="text-7xl select-none transition-all duration-700 filter drop-shadow-md">
                  {plantInfo?.icon}
                </span>
                <div className="absolute bottom-2 bg-white px-3 py-1 rounded-full text-[10px] font-extrabold text-pink-500 shadow-sm border border-pink-100">
                  مستوى النمو: {currentUser.plantPoints}%
                </div>
              </div>

              <div className="w-full space-y-2">
                <p className={`text-xs font-bold ${plantInfo?.color}`}>{plantInfo?.text}</p>
                <div className="w-full bg-pink-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-emerald-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${currentUser.plantPoints}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 pt-1">
                  <span>نقاط التوهج: {currentUser.points} 🌟</span>
                  <span>تحدي الاستمرار اليومي</span>
                </div>

                <button
                  onClick={handlePlantWateringClick}
                  className="w-full mt-2 py-2.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold rounded-2xl text-[11px] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-emerald-300/40"
                >
                  <span>💧</span>
                  <span>رعاية وسقي النبتة اليوم (تم)</span>
                  <span>🌱</span>
                </button>
              </div>
            </div>

            {/* روتينات التوهج والجمال اليومي */}
            <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md flex flex-col">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-purple-700 flex items-center gap-1">
                    روتينكِ للتوهج والجمال اليومي 💅💖
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    6 مهام يومية مخصصة لأهدافكِ. أنجزيها ليزداد مستوى نبتتك وتوهجكِ!
                  </p>
                </div>

                <div className="bg-amber-50 text-amber-600 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 border border-amber-200">
                  <Flame className="w-4 h-4 text-amber-500" />
                  روتينكِ المخصص نشط
                </div>
              </div>

              <div className="mb-4 p-3 bg-purple-50/50 rounded-2xl border border-purple-100/40">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <span className="text-xs font-bold text-purple-800">أهدافكِ النشطة الحالية: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(currentUser.goals ?? []).map((g) => (
                        <span key={g} className="px-2 py-0.5 bg-white text-[10px] text-purple-600 rounded-full border border-purple-200">
                          # {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const newG = prompt(
                        "اكتبي أهدافكِ مفصولة بفاصلة (مثال: بشرة لامعة, راحة نفسية, شعر صحي) بحد أقصى 3 أهداف:"
                      );
                      if (newG) {
                        const parsed = newG.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
                        handleGoalUpdateInDashboard(parsed.slice(0, 3));
                      }
                    }}
                    className="text-xs font-bold text-pink-500 hover:text-pink-600 underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" /> تعديل الأهداف والاهتمامات
                  </button>
                </div>
              </div>

              {/* قائمة المهام اليومية مع حماية الاختيارات */}
              <div className="space-y-3 flex-1">
                {(tasks ?? []).map((task) => {
                  const isCompleted = currentUser.tasksCompletedToday?.includes(task.id) ?? false;
                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl border transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleTaskToggle(task.id, !isCompleted)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                            isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                              : "border-slate-300 bg-slate-50 hover:bg-pink-50/40"
                          }`}
                        >
                          {isCompleted && "✓"}
                        </button>
                        <span className={`text-sm font-medium ${isCompleted ? "line-through text-slate-400" : ""}`}>
                          {task.title}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-purple-400 bg-purple-50 px-2 py-0.5 rounded-full">
                        {task.category}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-center text-xs text-slate-400">
                أكملتِ ({currentUser.tasksCompletedToday?.length ?? 0} / 6) مهام لهذا اليوم! استمري رانيا فخورة بكِ 🌸
              </div>
            </div>

            {/* نصيحة اليوم الذهبية */}
            <div className="col-span-1 lg:col-span-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border border-pink-100/40 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1 text-center md:text-right">
                <span className="px-2 py-1 bg-white text-[10px] rounded-full text-pink-600 font-bold border border-pink-100">
                  جديد ومميز 🌟
                </span>
                <h4 className="font-extrabold text-lg text-purple-900 mt-2">نصيحة رانيا الذهبية المخصصة لكِ هذا اليوم</h4>
                <p className="text-xs text-purple-700 max-w-xl leading-relaxed mt-1">
                  بناءً على اهتمامكِ بـ ({(currentUser.goals ?? []).join("، ")}): "الجمال يبدأ بترطيب خلايا البشرة والامتنان الصباحي. احرصي على شرب كوب ماء دافئ مع ليمون فور الاستيقاظ وقراءة مذكراتكِ الملهمة."
                </p>
              </div>

              <button
                onClick={() => setActiveTab("encyclopedia")}
                className="py-3 px-6 bg-white hover:bg-pink-50 text-pink-600 font-bold rounded-full border border-pink-200 shadow-sm text-xs transition-all flex items-center gap-1 cursor-pointer"
              >
                تصفح الموسوعة الكاملة لرانيا <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )} 

      {/* تبويب موسوعة الجمال والتوهج */}
      {activeTab === "encyclopedia" && (
        <div className="space-y-6 max-w-2xl mx-auto">
          
          <div className="bg-gradient-to-br from-white via-[#fffafc] to-pink-50/30 rounded-3xl p-6 border border-pink-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-100/40 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-100/40 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-pink-100 text-pink-600 rounded-lg text-xs font-bold">محتوى حصري 👑</span>
              <span className="text-xs text-purple-600 font-extrabold">من رانيا لكِ مباشرة</span>
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              موجز الجمال والتوهج المستمر 📖✨
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
              مرحباً بكِ في صفحة التغذية المستمرة المستوحاة بالكامل من أسلوب حياة <span className="font-bold text-pink-600">رانيا</span>! تصفحي مئات النصائح للعناية بالذات، الوصفات اللذيذة، والماسكات الطبيعية المجربة التي نُسقت بعناية لتناسب أهدافكِ.
            </p>
          </div>

          {/* أزرار الفلترة للموسوعة */}
          <div className="bg-white/80 backdrop-blur-md sticky top-0 py-3 z-10 flex flex-wrap gap-2 justify-center border-b border-pink-100/30">
            {["all", "tip", "recipe", "mask"].map((filterType) => {
              const labels = { all: "الكل 💖", tip: "نصائح رانيا 💡", recipe: "وصفات رانيا 🥗", mask: "ماسكات رانيا 🧖‍♀️" };
              return (
                <button
                  key={filterType}
                  onClick={() => {
                    setEncyclopediaFilter(filterType);
                    setVisibleEncyclopediaCount(4);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    encyclopediaFilter === filterType
                      ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md shadow-pink-100"
                      : "bg-pink-50/50 text-pink-600 hover:bg-pink-50 border border-pink-100/40"
                  }`}
                >
                  {labels[filterType]}
                </button>
              );
            })}
          </div>

          {/* خلاصة بطاقات الموسوعة الفعالة */}
          <div className="space-y-6">
            {(() => {
              const filtered = (RANIA_ENCYCLOPEDIA_FEED ?? []).filter(item => {
                if (encyclopediaFilter === "all") return true;
                return item.type === encyclopediaFilter;
              });

              if (filtered.length === 0) {
                return (
                  <div className="text-center py-12 bg-white rounded-3xl border border-pink-100 p-6 text-slate-400 text-xs font-bold">
                    لا توجد عناصر حالية تطابق هذا الفلتر 🌸
                  </div>
                );
              }

              return filtered.slice(0, visibleEncyclopediaCount).map((item, index) => {
                const uniqueId = `${item.id}_feed_${index}`;
                const isLiked = likedEncyclopediaIds[uniqueId];
                const isSaved = savedEncyclopediaIds[uniqueId];
                const displayLikes = (item.likes ?? 0) + (isLiked ? 1 : 0);
                const isGoalRelated = currentUser?.goals?.includes(item.tag);

                return (
                  <div
                    key={uniqueId}
                    className="bg-gradient-to-br from-white via-[#fffdfd] to-pink-50/10 rounded-3xl p-6 border border-pink-100/60 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.005]"
                  >
                    {isGoalRelated && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-br-2xl shadow-sm">
                        🎯 متطابق مع اهتمامكِ
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-4 mt-2">
                      <span className="text-xs font-extrabold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100/50">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-purple-400 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
                        # {item.tag}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-lg text-slate-800 mb-3 leading-snug">
                      {item.title}
                    </h4>

                    <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-white/60 p-4 rounded-2xl border border-pink-50/50 mb-4 font-medium">
                      {item.content}
                    </div>

                    {item.quote && (
                      <div className="text-xs italic text-purple-800 bg-purple-50/40 p-3 rounded-2xl border border-purple-100/20 flex items-start gap-2 mb-4">
                        <span className="text-xl leading-none text-pink-400">"</span>
                        <p className="flex-1 font-semibold">{item.quote}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-pink-50">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setLikedEncyclopediaIds((prev) => ({ ...prev, [uniqueId]: !prev[uniqueId] }))}
                          className={`flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                            isLiked ? "text-pink-500" : "text-slate-400 hover:text-pink-400"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-pink-500" : ""}`} /> {displayLikes}
                        </button>
                        <button
                          onClick={() => {
                            setSavedEncyclopediaIds((prev) => ({ ...prev, [uniqueId]: !prev[uniqueId] }));
                            setCustomToast(isSaved ? "تم إلغاء الحفظ." : "تم الحفظ في مفضلتكِ! 🌸");
                          }}
                          className={`flex items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                            isSaved ? "text-purple-500" : "text-slate-400 hover:text-purple-400"
                          }`}
                        >
                          <BookOpen className={`w-4 h-4 ${isSaved ? "fill-purple-200" : ""}`} /> حفظ
                        </button>
                      </div>
                    </div>

                  </div>
                );
              });
            })()}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                setIsEncyclopediaLoading(true);
                setTimeout(() => {
                  setVisibleEncyclopediaCount((prev) => prev + 4);
                  setIsEncyclopediaLoading(false);
                }, 600);
              }}
              disabled={isEncyclopediaLoading}
              className="px-8 py-3 bg-white hover:bg-pink-50 text-pink-600 font-bold rounded-full border border-pink-200 shadow-sm text-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isEncyclopediaLoading ? "جاري التحميل..." : "تحميل المزيد من محتوى رانيا ✨"}
            </button>
          </div>

        </div>
      )}
 {activeTab === "friends" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md">
              <h3 className="font-extrabold text-base text-purple-800 mb-1 flex items-center gap-2">
                🔍 ابحثي عن صديقاتكِ
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                اكتبي اسم عضوة لإرسال طلب صداقة والتواصل الآمن معها.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="اكتبي اسم الصديقة..."
                  value={friendsSearchQuery}
                  onChange={(e) => setFriendsSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchUsersForFriends(friendsSearchQuery);
                  }}
                  className="flex-1 bg-pink-50/40 border border-pink-100 rounded-2xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-pink-300 transition-all text-right"
                />
                <button
                  onClick={() => searchUsersForFriends(friendsSearchQuery)}
                  className="px-5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl text-xs transition-all cursor-pointer"
                >
</button>
              </div>

              <div className="mt-4 space-y-3">
                {friendsSearchLoading && (
                  <div className="text-center py-4 text-xs text-slate-400 animate-pulse">
                    جاري البحث والتقصي عن أحلى الصديقات... 🌸🔎
                  </div>
                )}

                {!friendsSearchLoading && friendsSearchResults.length > 0 && (
                  <div className="divide-y divide-pink-50 max-h-60 overflow-y-auto pr-1">
                    {friendsSearchResults.map((user) => {
                      const friendship = userFriendships.find(
                        (f) => f.senderId === user.id || f.receiverId === user.id
                      );

                      return (
                        <div key={user.id} className="py-3 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <button onClick={() => openUserProfile(user.id)} className="hover:scale-105 transition-transform">
                              {renderUserAvatar(user.id, "w-9 h-9 text-xs")}
                            </button>
                            <div className="text-right">
                              <span onClick={() => openUserProfile(user.id)} className="font-bold text-slate-800 text-xs block cursor-pointer hover:text-pink-500">
                                {user.firstName}
                              </span>
                              <span className="text-[9px] text-slate-400">عضوة في مجتمع رانيا 💖</span>
                            </div>
                          </div>
                          <div>
                            {!friendship ? (
                              <button onClick={() => sendFriendRequest(user.id)} className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm">
                                إضافة صديقة 🌸
                              </button>
                            ) : friendship.status === "pending" ? (
                              friendship.senderId === currentUser?.id ? (
                                <span className="text-[10px] bg-yellow-50 text-yellow-600 font-bold px-2 py-1 rounded-full border border-yellow-100">
                                  طلب معلق ⏳
                                </span>
                              ) : (
                                <div className="flex gap-1.5">
                                  <button onClick={() => respondToFriendRequest(friendship.id, "accepted")} className="px-2 py-1 bg-green-500 text-white text-[9px] font-bold rounded-lg hover:bg-green-600">قبول 👍</button>
                                  <button onClick={() => respondToFriendRequest(friendship.id, "declined")} className="px-2 py-1 bg-slate-200 text-slate-600 text-[9px] font-bold rounded-lg hover:bg-slate-300">رفض</button>
               </div>
                              )
                            ) : (
              <button
               onClick={() => {
                setActiveFriendshipChat(friendship);
                fetchPrivateMessages(friendship.id);
                }} 
               className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm"
               > 
               مراسلة 💬
               </button>
                        )} 
                           </div>
                         </div>
                       ); 
                   })} 
                 </div>
         )} 
               {!friendsSearchLoading && friendsSearchResults.length === 0 && friendsSearchQuery && (
                  <p className="text-center py-4 text-xs text-slate-400">
                    لم نعثر على عضوات بهذا الاسم.. تأكدي من كتابة الاسم بشكل صحيح 🌸💡
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md">
              <h3 className="font-extrabold text-xs text-purple-800 mb-3 flex items-center gap-2">
                <span>💌 طلبات الصداقة الواردة إليكِ</span>
                <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full text-[10px]">
                  {userFriendships.filter((f) => f.status === "pending" && f.receiverId === currentUser?.id).length}
                </span>
              </h3>

              {(() => {
                const incomingRequests = userFriendships.filter((f) => f.status === "pending" && f.receiverId === currentUser?.id);
                if (incomingRequests.length === 0) {
                  return (
                    <p className="text-center py-4 text-xs text-slate-400">
                      لا توجد طلبات صداقة واردة حالياً. كوني مبادرة وابحثي عن صديقاتكِ بالأعلى! 🥰🌸
                    </p>
                  );
                }
                return (
                  <div className="space-y-3 divide-y divide-pink-50 max-h-48 overflow-y-auto">
                    {incomingRequests.map((req) => (
                      <div key={req.id} className="pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openUserProfile(req.senderId)}>
                            {renderUserAvatar(req.senderId, "w-8 h-8 text-xs")}
                          </button>
                          <div className="text-right">
                            <span onClick={() => openUserProfile(req.senderId)} className="font-extrabold text-slate-700 text-xs block cursor-pointer hover:text-pink-500">
                              {req.senderName}
                            </span>
                            <span className="text-[9px] text-slate-400">ترغب في مرافقتكِ بالتوهج 👭</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => respondToFriendRequest(req.id, "accepted")} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm">قبول 👍</button>
                          <button onClick={() => respondToFriendRequest(req.id, "declined")} className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold rounded-xl transition-all">تجاهل</button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {activeFriendshipChat ? (
              <div className="bg-white rounded-3xl border border-pink-100/60 shadow-md flex flex-col h-[550px] overflow-hidden">
                <div className="p-4 border-b border-pink-50 bg-gradient-to-r from-pink-50/10 to-purple-50/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const otherId = activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverId : activeFriendshipChat.senderId;
                        openUserProfile(otherId);
                      }}
                    >
                      {renderUserAvatar(activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverId : activeFriendshipChat.senderId, "w-10 h-10")}
                    </button>
                    <div className="text-right">
                      <h4 className="font-extrabold text-sm text-purple-900">
                        دردشة خاصة مع {activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverName : activeFriendshipChat.senderName}
                      </h4>
                      <p className="text-[9px] text-emerald-600 font-bold">● مساحة مشفرة وآمنة تماماً للبنات 🌸🔒</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveFriendshipChat(null)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all">
                    رجوع للصديقات ➔
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
                  {privateMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-xl">💬</div>
                      <p className="text-xs font-bold text-slate-600">هذه هي بداية مساحتكم السرية والآمنة!</p>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                        ابدأوا بتبادل أسرار الجمال، والتحفيز المتبادل بكل محبة وأمان 🌸👭
                      </p>
                    </div>
                  ) : (
                    privateMessages.map((msg) => {
                      const isMe = msg.senderId === currentUser?.id;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2`}>
                          {!isMe && renderUserAvatar(msg.senderId, "w-6 h-6 text-[8px]")}
                          <div className="max-w-[75%] space-y-1">
                            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isMe ? "bg-purple-600 text-white rounded-br-none text-right" : "bg-white border border-pink-100 text-slate-800 rounded-bl-none text-right"}`}>
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                              <span className="block text-[8px] opacity-70 mt-1 text-left font-sans">
                                {new Date(msg.createdAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            {!isMe && (
                              <button onClick={() => { setChatReportTarget(msg); setChatReportReason(""); }} className="text-[9px] text-red-400 hover:text-red-600 hover:underline flex items-center gap-0.5">
                                ⚠️ إبلاغ عن تجاوز
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-3 border-t border-pink-50 bg-white flex gap-2">
                  <textarea
                    placeholder="اكتبي رسالتكِ السرية واللطيفة هنا..."
                    value={newPrivateMessage}
                    onChange={(e) => setNewPrivateMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendPrivateMessage();
                      }
                    }}
                    rows={1}
                    className="flex-1 bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs outline-none focus:ring-1 focus:ring-pink-300 resize-none max-h-24 text-right"
                  />
                  <button onClick={sendPrivateMessage} className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-pink-100 cursor-pointer">
                    <Send className="w-4 h-4 transform rotate-180" />
                  </button>
                </div>
              </div>
            ) : (
            <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md">
              <h3 className="font-extrabold text-xs text-purple-800 mb-3 flex items-center gap-2">
                <span>💌 طلبات الصداقة الواردة إليكِ</span>
                <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full text-[10px]">
                  {userFriendships.filter((f) => f.status === "pending" && f.receiverId === currentUser?.id).length}
                </span>
              </h3>
              {(() => {
                const incomingRequests = userFriendships.filter((f) => f.status === "pending" && f.receiverId === currentUser?.id);
                if (incomingRequests.length === 0) {
                  return (
                    <p className="text-center py-4 text-xs text-slate-400">
                      لا توجد طلبات صداقة واردة حالياً. كوني مبادرة وابحثي عن صديقاتكِ بالأعلى! 🥰🌸
                    </p>
                  );
                }
                return (
                  <div className="space-y-3 divide-y divide-pink-50 max-h-48 overflow-y-auto">
                    {incomingRequests.map((req) => (
                      <div key={req.id} className="pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openUserProfile(req.senderId)}>
                            {renderUserAvatar(req.senderId, "w-8 h-8 text-xs")}
                          </button>
                          <div className="text-right">
                            <span onClick={() => openUserProfile(req.senderId)} className="font-extrabold text-slate-700 text-xs block cursor-pointer hover:text-pink-500">
                              {req.senderName}
                            </span>
                            <span className="text-[9px] text-slate-400">ترغب في مرافقتكِ بالتوهج 👭</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => respondToFriendRequest(req.id, "accepted")} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm">قبول 👍</button>
                          <button onClick={() => respondToFriendRequest(req.id, "declined")} className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold rounded-xl transition-all">تجاهل</button>
                        </div>
                      </div>
                    ))}
{activeTab === "friends" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md">
              <h3 className="font-extrabold text-base text-purple-800 mb-1 flex items-center gap-2">
                🔍 ابحثي عن صديقاتكِ
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                اكتبي اسم عضوة لإرسال طلب صداقة والتواصل الآمن معها.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="اكتبي اسم الصديقة..."
                  value={friendsSearchQuery}
                  onChange={(e) => setFriendsSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchUsersForFriends(friendsSearchQuery);
                  }}
                  className="flex-1 bg-pink-50/40 border border-pink-100 rounded-2xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-pink-300 transition-all text-right"
                />
                <button
                  onClick={() => searchUsersForFriends(friendsSearchQuery)}
                  className="px-5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl text-xs transition-all cursor-pointer"
                >
                  بحث
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {friendsSearchLoading && (
                  <div className="text-center py-4 text-xs text-slate-400 animate-pulse">
                    جاري البحث والتقصي عن أحلى الصديقات... 🌸🔎
                  </div>
                )}
                {!friendsSearchLoading && friendsSearchResults.length > 0 && (
                  <div className="divide-y divide-pink-50 max-h-60 overflow-y-auto pr-1">
                    {friendsSearchResults.map((user) => {
                      const friendship = userFriendships.find(
                        (f) => f.senderId === user.id || f.receiverId === user.id
                      );
                      return (
                        <div key={user.id} className="py-3 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <button onClick={() => openUserProfile(user.id)} className="hover:scale-105 transition-transform">
                              {renderUserAvatar(user.id, "w-9 h-9 text-xs")}
                            </button>
                            <div className="text-right">
                              <span onClick={() => openUserProfile(user.id)} className="font-bold text-slate-800 text-xs block cursor-pointer hover:text-pink-500">
                                {user.firstName}
                              </span>
                              <span className="text-[9px] text-slate-400">عضوة في مجتمع رانيا 💖</span>
                            </div>
                          </div>
                          <div>
                            {!friendship ? (
                              <button onClick={() => sendFriendRequest(user.id)} className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm">
                                إضافة صديقة 🌸
                              </button>
                            ) : friendship.status === "pending" ? (
                              friendship.senderId === currentUser?.id ? (
                                <span className="text-[10px] bg-yellow-50 text-yellow-600 font-bold px-2 py-1 rounded-full border border-yellow-100">
                                  طلب معلق ⏳
                                </span>
                              ) : (
                                <div className="flex gap-1.5">
                                  <button onClick={() => respondToFriendRequest(friendship.id, "accepted")} className="px-2 py-1 bg-green-500 text-white text-[9px] font-bold rounded-lg hover:bg-green-600">قبول 👍</button>
                                  <button onClick={() => respondToFriendRequest(friendship.id, "declined")} className="px-2 py-1 bg-slate-200 text-slate-600 text-[9px] font-bold rounded-lg hover:bg-slate-300">رفض</button>
                                </div>
                              )
                            ) : (
                              <button
                                onClick={() => {
                                  setActiveFriendshipChat(friendship);
                                  fetchPrivateMessages(friendship.id);
                                }}
                                className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm"
                              >
                                مراسلة 💬
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {!friendsSearchLoading && friendsSearchResults.length === 0 && friendsSearchQuery && (
                  <p className="text-center py-4 text-xs text-slate-400">
                    لم نعثر على عضوات بهذا الاسم.. تأكدي من كتابة الاسم بشكل صحيح 🌸💡
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md">
              <h3 className="font-extrabold text-xs text-purple-800 mb-3 flex items-center gap-2">
                <span>💌 طلبات الصداقة الواردة إليكِ</span>
                <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded-full text-[10px]">
                  {userFriendships.filter((f) => f.status === "pending" && f.receiverId === currentUser?.id).length}
                </span>
              </h3>
              {(() => {
                const incomingRequests = userFriendships.filter((f) => f.status === "pending" && f.receiverId === currentUser?.id);
                if (incomingRequests.length === 0) {
                  return (
                    <p className="text-center py-4 text-xs text-slate-400">
                      لا توجد طلبات صداقة واردة حالياً. كوني مبادرة وابحثي عن صديقاتكِ بالأعلى! 🥰🌸
                    </p>
                  );
                }
                return (
                  <div className="space-y-3 divide-y divide-pink-50 max-h-48 overflow-y-auto">
                    {incomingRequests.map((req) => (
                      <div key={req.id} className="pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openUserProfile(req.senderId)}>
                            {renderUserAvatar(req.senderId, "w-8 h-8 text-xs")}
                          </button>
                          <div className="text-right">
                            <span onClick={() => openUserProfile(req.senderId)} className="font-extrabold text-slate-700 text-xs block cursor-pointer hover:text-pink-500">
                              {req.senderName}
                            </span>
                            <span className="text-[9px] text-slate-400">ترغب في مرافقتكِ بالتوهج 👭</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => respondToFriendRequest(req.id, "accepted")} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-[10px] font-bold rounded-xl transition-all shadow-sm">قبول 👍</button>
                          <button onClick={() => respondToFriendRequest(req.id, "declined")} className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold rounded-xl transition-all">تجاهل</button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {activeFriendshipChat ? (
              <div className="bg-white rounded-3xl border border-pink-100/60 shadow-md flex flex-col h-[550px] overflow-hidden">
                <div className="p-4 border-b border-pink-50 bg-gradient-to-r from-pink-50/10 to-purple-50/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const otherId = activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverId : activeFriendshipChat.senderId;
                        openUserProfile(otherId);
                      }}
                    >
                      {renderUserAvatar(activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverId : activeFriendshipChat.senderId, "w-10 h-10")}
                    </button>
                    <div className="text-right">
                      <h4 className="font-extrabold text-sm text-purple-900">
                        دردشة خاصة مع {activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverName : activeFriendshipChat.senderName}
                      </h4>
                      <p className="text-[9px] text-emerald-600 font-bold">● مساحة مشفرة وآمنة تماماً للبنات 🌸🔒</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveFriendshipChat(null)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all">
                    رجوع للصديقات ➔
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
                  {privateMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-xl">💬</div>
                      <p className="text-xs font-bold text-slate-600">هذه هي بداية مساحتكم السرية والآمنة!</p>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                        ابدأوا بتبادل أسرار الجمال، والتحفيز المتبادل بكل محبة وأمان 🌸👭
                      </p>
                    </div>
                  ) : (
                    privateMessages.map((msg) => {
                      const isMe = msg.senderId === currentUser?.id;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2`}>
                          {!isMe && renderUserAvatar(msg.senderId, "w-6 h-6 text-[8px]")}
                          <div className="max-w-[75%] space-y-1">
                            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isMe ? "bg-purple-600 text-white rounded-br-none text-right" : "bg-white border border-pink-100 text-slate-800 rounded-bl-none text-right"}`}>
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                              <span className="block text-[8px] opacity-70 mt-1 text-left font-sans">
                                {new Date(msg.createdAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            {!isMe && (
                              <button onClick={() => { setChatReportTarget(msg); setChatReportReason(""); }} className="text-[9px] text-red-400 hover:text-red-600 hover:underline flex items-center gap-0.5">
                                ⚠️ إبلاغ عن تجاوز
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-3 border-t border-pink-50 bg-white flex gap-2">
                  <textarea
                    placeholder="اكتبي رسالتكِ السرية واللطيفة هنا..."
                    value={newPrivateMessage}
                    onChange={(e) => setNewPrivateMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendPrivateMessage();
                      }
                    }}
                    rows={1}
                    className="flex-1 bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs outline-none focus:ring-1 focus:ring-pink-300 resize-none max-h-24 text-right"
                  />
                  <button onClick={sendPrivateMessage} className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-pink-100 cursor-pointer">
                    <Send className="w-4 h-4 transform rotate-180" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md">
                <h3 className="font-extrabold text-base text-purple-800 mb-2 flex items-center gap-2">
                  <span>👭 صديقاتي المتوهجات</span>
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">
                    {userFriendships.filter((f) => f.status === "accepted").length}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-normal">
                  صديقاتكِ اللواتي وافقتِ عليهن أو وافقن على طلبكِ. لا يمكنكما تبادل الرسائل إلا بعد قبول طلب الصداقة حفاظاً على الأمان والخصوصية 🔒✨
                </p>
                {(() => {
                  const acceptedFriends = userFriendships.filter((f) => f.status === "accepted");
                  if (acceptedFriends.length === 0) {
                    return (
                      <div className="text-center py-12 bg-pink-50/20 border border-dashed border-pink-100 rounded-3xl space-y-4">
                        <p className="text-xs text-slate-500 font-bold">لا يوجد صديقات بعد 🌸</p>
                        <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed px-4">
                          ابحثي عن صديقاتكِ أو ابعثي بطلبات جديدة لبدء التحفيز المتبادل! 🥰👭
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {acceptedFriends.map((f) => {
                        const otherId = f.senderId === currentUser?.id ? f.receiverId : f.senderId;
                        const otherName = f.senderId === currentUser?.id ? f.receiverName : f.senderName;
                        return (
                          <div key={f.id} className="bg-slate-50/50 hover:bg-pink-50/20 transition-all p-4 rounded-2xl border border-slate-100 hover:border-pink-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <button onClick={() => openUserProfile(otherId)} className="hover:scale-105 transition-transform">
                                {renderUserAvatar(otherId, "w-10 h-10")}
                              </button>
                              <div className="text-right">
                                <span onClick={() => openUserProfile(otherId)} className="font-extrabold text-slate-800 text-xs block cursor-pointer hover:text-pink-500">
                                  {otherName}
                                </span>
                                <span className="text-[9px] text-green-600 font-bold">صديقة متوهجة 🌱</span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setActiveFriendshipChat(f);
                                fetchPrivateMessages(f.id);
                              }}
                              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold rounded-xl shadow-sm flex items-center gap-1"
                            >
                              دردشة 💬
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
     )} 
                  <div className="space-y-3 divide-y divide-pink-50 max-h-48 overflow-y-auto">
                    {incomingRequests.map((req) => (
                      <div key={req.id} className="pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openUserProfile(req.senderId)}>
                            {renderUserAvatar(req.senderId, "w-8 h-8 text-xs")}
                          </button>
                          <div className="text-right">
                            <span onClick={() => openUserProfile(req.senderId)} className="font-extrabold text-slate-700 text-xs block cursor-pointer ho
          <div className="lg:col-span-7 space-y-6">
            {activeFriendshipChat ? (
              <div className="bg-white rounded-3xl border border-pink-100/60 shadow-md flex flex-col h-[550px] overflow-hidden">
                <div className="p-4 border-b border-pink-50 bg-gradient-to-r from-pink-50/10 to-purple-50/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const otherId = activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverId : activeFriendshipChat.senderId;
                        openUserProfile(otherId);
                      }}
                    >
                      {renderUserAvatar(activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverId : activeFriendshipChat.senderId, "w-10 h-10")}
                    </button>
                    <div className="text-right">
                      <h4 className="font-extrabold text-sm text-purple-900">
                        دردشة خاصة مع {activeFriendshipChat.senderId === currentUser?.id ? activeFriendshipChat.receiverName : activeFriendshipChat.senderName}
                      </h4>
                      <p className="text-[9px] text-emerald-600 font-bold">● مساحة مشفرة وآمنة تماماً للبنات 🌸🔒</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveFriendshipChat(null)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all">
                    رجوع للصديقات ➔
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
                  {privateMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-xl">💬</div>
                      <p className="text-xs font-bold text-slate-600">هذه هي بداية مساحتكم السرية والآمنة!</p>
                      <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                        ابدأوا بتبادل أسرار الجمال، والتحفيز المتبادل بكل محبة وأمان 🌸👭
                      </p>
                    </div>
                  ) : (
                    privateMessages.map((msg) => {
                      const isMe = msg.senderId === currentUser?.id;
                      return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2`}>
                          {!isMe && renderUserAvatar(msg.senderId, "w-6 h-6 text-[8px]")}
                          <div className="max-w-[75%] space-y-1">
                            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${isMe ? "bg-purple-600 text-white rounded-br-none text-right" : "bg-white border border-pink-100 text-slate-800 rounded-bl-none text-right"}`}>
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                              <span className="block text-[8px] opacity-70 mt-1 text-left font-sans">
                                {new Date(msg.createdAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            {!isMe && (
                              <button onClick={() => { setChatReportTarget(msg); setChatReportReason(""); }} className="text-[9px] text-red-400 hover:text-red-600 hover:underline flex items-center gap-0.5">
                                ⚠️ إبلاغ عن تجاوز
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-3 border-t border-pink-50 bg-white flex gap-2">
                  <textarea
                    placeholder="اكتبي رسالتكِ السرية واللطيفة هنا..."
                    value={newPrivateMessage}
                    onChange={(e) => setNewPrivateMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendPrivateMessage();
                      }
                    }}
                    rows={1}
                    className="flex-1 bg-pink-50/30 border border-pink-100 rounded-2xl p-3 text-xs outline-none focus:ring-1 focus:ring-pink-300 resize-none max-h-24 text-right"
                  />
                  <button onClick={sendPrivateMessage} className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-pink-100 cursor-pointer">
                    <Send className="w-4 h-4 transform rotate-180" />
                  </button>
                </div>
              </div>
            ) : (
                <h3 className="font-extrabold text-base text-purple-800 mb-2 flex items-center gap-2">
                  <span>👭 صديقاتي المتوهجات</span>
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">
                    {userFriendships.filter((f) => f.status === "accepted").length}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-normal">
                  صديقاتكِ اللواتي وافقتِ عليهن أو وافقن على طلبكِ. لا يمكنكما تبادل الرسائل إلا بعد قبول طلب الصداقة حفاظاً على الأمان والخصوصية 🔒✨
                </p>

                {(() => {
                  const acceptedFriends = userFriendships.filter((f) => f.status === "accepted");
                  if (acceptedFriends.length === 0) {
                    return (
                      <div className="text-center py-12 bg-pink-50/20 border border-dashed border-pink-100 rounded-3xl space-y-4">
                        <p className="text-xs text-slate-500 font-bold">لا يوجد صديقات بعد 🌸</p>
                        <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed px-4">
                          ابحثي عن صديقاتكِ أو ابعثي بطلبات جديدة لبدء التحفيز المتبادل! 🥰👭
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {acceptedFriends.map((f) => {
                        const otherId = f.senderId === currentUser?.id ? f.receiverId : f.senderId;
                        const otherName = f.senderId === currentUser?.id ? f.receiverName : f.senderName;

                        return (
                          <div key={f.id} className="bg-slate-50/50 hover:bg-pink-50/20 transition-all p-4 rounded-2xl border border-slate-100 hover:border-pink-100 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <button onClick={() => openUserProfile(otherId)} className="hover:scale-105 transition-transform">
                                {renderUserAvatar(otherId, "w-10 h-10")}
                              </button>
                              <div className="text-right">
                                <span onClick={() => openUserProfile(otherId)} className="font-extrabold text-slate-800 text-xs block cursor-pointer hover:text-pink-500">
                                  {otherName}
                                </span>
                                <span className="text-[9px] text-green-600 font-bold">صديقة متوهجة 🌱</span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setActiveFriendshipChat(f);
                                fetchPrivateMessages(f.id);
                              }}
                              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold rounded-xl shadow-sm flex items-center gap-1"
                            >
                              دردشة 💬
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })} 
              </div>
            )}
          </div>
        </div>
      )}

      {/* تبويب غرف الدردشة العامة */}
              {activeTab === "chat" && (
<div className="bg-white rounded-3xl border border-pink-100/60 shadow-md flex-1 flex flex-col md:flex-row overflow-hidden min-h-[550px] max-h-[700px]">
<div className="w-full md:w-80 border-e border-pink-50 flex flex-col bg-gradient-to-b from-pink-50/20 to-purple-50/10 flex-shrink-0">
<div className="p-4 border-b border-pink-50 bg-white">
<h4 className="font-extrabold text-sm text-purple-800 flex items-center gap-1.5">
 <MessageSquare className="w-4 h-4 text-pink-500" /> مساحتكِ للمحادثة 💬
</h4>
<p className="text-[10px] text-slate-400 mt-0.5">تبادلي النصائح وتواصلي مع الصديقات بأمان.</p>
</div>
<div className="p-3 border-b border-pink-50 space-y-1 bg-white/50">
<span className="text-[10px] font-bold text-slate-400 px-2 block mb-1">قنوات الفضفضة العامة 👥</span>
{[
{ id: "general", name: "الصالون العام 💖" },
{ id: "beauty", name: "العناية بالبشرة والجمال 💄" },
 { id: "support", name: "فضفضة ودعم نفسي 🤗" }
 ].map((room) => {
const isSelected = !activePrivateUser && activeChatRoom === room.id;
return (
<button
key={room.id}
onClick={()
=> {
setActivePrivateUser(null);
setActiveChatRoom(room.id);
fetchChatMessages(room.id);
  }}
className={`w-full text-right p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
isSelected
? "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 shadow-sm border-s-4 border-purple-500" 
                              : "text-slate-600 hover:bg-pink-50/40 hover:text-slate-800"
    }`}
> 
<span>{room.name}</span>
<span className="text-[9px] bg-white px-1.5 py-0.5 rounded-full text-slate-400 font-bold border border-slate-100">عام</span>
</button>
    );
 })}
</div>
<div className="flex-1 overflow-y-auto p-3 space-y-1.5">
<span className="text-[10px] font-bold text-slate-400 px-2 block mb-1 font-sans">رسائل خاصة مع صديقاتكِ 👭🔒</span>
{(leaderboard ?? [])
.filter((user) => user?.id !== currentUser?.id) 
.map((user) => { 
const isSelected = activePrivateUser?.id === user?.id;
return (
<button
key={user?.id}
onClick={() => {
setActivePrivateUser(user);
const room = currentUser.id < user.id ? `private_${currentUser.id}_${user.id}` : `private_${user.id}_${currentUser.id}`;
fetchChatMessages(room);
 }}
className={`w-full text-right p-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2.5 cursor-pointer ${
isSelected
? "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 shadow-sm border-s-4 border-pink-500" 
: "text-slate-600 hover:bg-purple-50/50 hover:text-purple-800" 
    }`}
> 
{renderUserAvatar(user?.id, "w-7 h-7 text-[9px]")}
<div className="flex-1 text-right">
<div className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
{user?.firstName}
                                {user?.id === "admin" && <span className="text-[8px] text-purple-600 bg-purple-100 px-1 rounded font-bold">إدارة</span>}
</div>
<span className="text-[8px] text-slate-400 block mt-0.5">توهج: {user?.points} 🌟</span>
</div>
<div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
</button>
); 
      })}
</div>
</div>
<div className="flex-1 flex flex-col bg-white">
<div className="border-b border-pink-50 p-4 bg-gradient-to-r from-pink-50/30 to-purple-50/10 flex justify-between items-center">
<div className="flex items-center gap-3">
{activePrivateUser && (
<button
onClick={() =>
openUserProfile(activePrivateUser.id)}
className="cursor-pointer hover:scale-105 transition-transform"
> 
{renderUserAvatar(activePrivateUser.id, "w-9 h-9")}
</button>
)} 
<div>
                       <h3 className="font-extrabold text-sm text-purple-800 flex items-center gap-1.5">
 {activePrivateUser ? (
<button
type="button"
onClick={() => openUserProfile(activePrivateUser.id)}
className="hover:text-pink-500 cursor-pointer font-extrabold text-sm text-right outline-none transition-colors"
> 
<span className="text-pink-500">🔒 محادثة خاصة وسرية مع:</span> {activePrivateUser.firstName}
</button>
 ) : (
<>
  <span>👥 الغرفة العامة:</span> {activeChatRoom === "general" ? "الصالون العام 💖" : activeChatRoom === "beauty" ? "العناية بالبشرة والجمال 💄" : "فضفضة ودعم نفسي 🤗"}
</>
)} 
</h3>
<p className="text-[9px] text-slate-400 mt-0.5">
? "محادثة 
مشفرة آمنة تماماً ولا يمكن لأي طرف آخر الاطلاع عليها برعاية رانيا."
                           : "مساحة جماعية آمنة للبنات لتبادل المنشورات والتجارب المباشرة."}
</p>
      </div>
</div>
 {activePrivateUser && (
<button
onClick={() => {
setActivePrivateUser(null);
fetchChatMessages(activeChatRoom);
  }}
className="text-[10px] bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
> 
 العودة للغرف العامة ➔
</button>
 )}
</div>
<div className="flex-1 p-4 overflow-y-auto space-y-4 bg-pink-50/10 min-h-[300px]">
{(chatMessages ?? []).length === 0 ? (
<div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
<MessageCircle className="w-10 h-10 text-purple-200 mb-2 animate-bounce" />
لا توجد رسائل سابقة
هنا. ابدئي الحديث وقولي مرحباً! ✨
 </div>
   ) : (
chatMessages.map((msg) => {
const isMe = msg?.authorId === currentUser?.id;
return (
<div
key={msg?.id}
className={`flex gap-2.5 max-w-[85%] ${isMe ? "ms-auto flex-row-reverse" : "me-auto"}`}
> 
<button
type="button"
onClick={() => openUserProfile(msg?.authorId)}
className="cursor-pointer hover:scale-105 transition-transform outline-none"
title="عرض ملف صديقتنا"> 
{renderUserAvatar(msg?.authorId, "w-7.5 h-7.5 text-[10px]")}
</button>
<div className="space-y-0.5">
<button
type="button"
onClick={() => openUserProfile(msg?.authorId)}
className="text-[8px] text-slate-400 block px-1 font-bold hover:text-pink-500 transition-colors cursor-pointer text-right outline-none"
> 
{msg?.authorName} {isMe && "(أنتِ)"}
</button>
<div className={`p-3 rounded-2xl text-xs leading-relaxed ${
isMe ? "bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-ss-none shadow-sm font-sans text-right"
: "bg-white border border-pink-50 text-slate-700 rounded-se-none shadow-sm font-sans text-right" 
  }`}>
{msg?.text}
</div>
</div>
</div>
); 
 })
 )}
<div ref={chatEndRef} />
</div>
<form onSubmit={handleSendChatMessage} className="p-4 border-t border-pink-50 bg-white flex gap-2">
<input
type="text"
required
placeholder={activePrivateUser ? `اكتبي رسالة خاصة لـ ${activePrivateUser.firstName}...` : "اكتبي رسالة لطيفة ومحفزة لصديقاتكِ الجميلات..."}
value={newChatMessage}
onChange={(e) => setNewChatMessage(e.target.value)}
className="flex-1 bg-pink-50/30 border border-pink-100 rounded-full px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-pink-300 transition-all font-sans text-right"
 />
<button
type="submit"
className="w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md shadow-pink-100 flex-shrink-0"
> 
<Send className="w-4 h-4 transform rotate-180" />
</button>
</form>
</div>
</div>
   )}

            {/* تبويب لوحة المتصدرين والترتيب العام */}
            {activeTab === "leaderboard" && (
              <div className="space-y-6">
                
                <div className="bg-white rounded-3xl p-6 border border-pink-100/50 shadow-md">
                  <h3 className="text-xl font-extrabold text-pink-600 flex items-center gap-2">
                    لوحة الشرف وتوهج الفتيات المتصدرات 🏆✨
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    أنجزي مهامكِ يومياً لحصد النقاط والتنافس مع صديقاتكِ الجميلات على المراكز الثلاثة الأولى لوحة الشرف برعاية رانيا.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-3xl mx-auto pt-6">
                  
                  {leaderboard?.[1] && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center text-center relative md:order-1 h-fit md:mb-4">
                      <span className="text-4xl absolute -top-4">🥈</span>
                      <button
                        onClick={() => openUserProfile(leaderboard[1].id)}
                        className="cursor-pointer hover:scale-105 transition-transform outline-none"
                        title="عرض الملف الشخصي"
                      >
                        {renderUserAvatar(leaderboard[1].id, "w-16 h-16 text-2xl")}
                      </button>
                      <h4
                        onClick={() => openUserProfile(leaderboard[1].id)}
                        className="font-bold text-sm text-slate-800 mt-3 cursor-pointer hover:text-pink-500 transition-colors"
                      >
                        {leaderboard[1].firstName}
                      </h4>
                      <p className="text-[10px] text-slate-400">المركز الثاني</p>
                      
                      <div className="mt-3 py-1 px-4 bg-slate-50 text-slate-700 text-xs font-bold rounded-full">
                        {leaderboard[1].points} نقطة
                      </div>
                    </div>
                  )}

                  {leaderboard?.[0] && (
                    <div className="bg-white rounded-3xl border-2 border-yellow-300 shadow-md p-8 flex flex-col items-center justify-center text-center relative md:order-2 h-fit">
                      <span className="text-5xl absolute -top-6 animate-bounce">👑🥇</span>
                      <button
                        onClick={() => openUserProfile(leaderboard[0].id)}
                        className="cursor-pointer hover:scale-105 transition-transform outline-none animate-pulse"
                        title="عرض الملف الشخصي"
                      >
                        {renderUserAvatar(leaderboard[0].id, "w-20 h-20 text-3xl")}
                      </button>
                      <h4
                        onClick={() => openUserProfile(leaderboard[0].id)}
                        className="font-extrabold text-base text-slate-800 mt-3 cursor-pointer hover:text-pink-500 transition-colors"
                      >
                        {leaderboard[0].firstName}
                      </h4>
                      <p className="text-xs text-yellow-600 font-bold">ملكة التوهج</p>
                      
                      <div className="mt-3 py-1 px-4 bg-yellow-50 text-yellow-700 text-sm font-bold rounded-full border border-yellow-200">
                        {leaderboard[0].points} نقطة 🌟
                      </div>
                    </div>
                  )}

                  {leaderboard?.[2] && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center text-center relative md:order-3 h-fit md:mb-2">
                      <span className="text-4xl absolute -top-4">🥉</span>
                      <button
                        onClick={() => openUserProfile(leaderboard[2].id)}
                        className="cursor-pointer hover:scale-105 transition-transform outline-none"
                        title="عرض الملف الشخصي"
                      >
                        {renderUserAvatar(leaderboard[2].id, "w-16 h-16 text-2xl")}
                      </button>
                      <h4
                        onClick={() => openUserProfile(leaderboard[2].id)}
                        className="font-bold text-sm text-slate-800 mt-3 cursor-pointer hover:text-pink-500 transition-colors"
                      >
                        {leaderboard[2].firstName}
                      </h4>
                      <p className="text-[10px] text-slate-400">المركز الثالث</p>
                      
                      <div className="mt-3 py-1 px-4 bg-orange-50 text-orange-700 text-xs font-bold rounded-full">
                        {leaderboard[2].points} نقطة
                      </div>
                    </div>
                  )}

                </div>

                <div className="bg-white rounded-3xl border border-pink-100/50 shadow-sm overflow-hidden max-w-2xl mx-auto">
                  <div className="p-4 bg-pink-50/50 border-b border-pink-50 text-xs font-bold text-pink-700 text-right">
                    جدول الترتيب لجميع صديقات رانيا
                  </div>

                  <div className="divide-y divide-pink-50">
                    {(leaderboard ?? []).map((user, idx) => (
                      <div key={user?.id} className="p-4 flex justify-between items-center text-xs md:text-sm">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-400 w-5">{idx + 1}</span>
                          <button
                            onClick={() => openUserProfile(user?.id)}
                            className="cursor-pointer hover:scale-105 transition-transform outline-none"
                            title="عرض الملف الشخصي"
                          >
                            {renderUserAvatar(user?.id, "w-8 h-8 text-[10px]")}
                          </button>
                          <span
                            onClick={() => openUserProfile(user?.id)}
                            className="font-bold text-slate-800 cursor-pointer hover:text-pink-500 transition-colors"
                          >
                            {user?.firstName}
                          </span>
                        </div>

                        <span className="font-bold text-purple-700">{user?.points} نقطة</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* تبويب لوحة تحكم الإدارة لرانيا */}
            {activeTab === "admin" && (
              <div className="space-y-6">
                
                {!isAdminLoggedIn ? (
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-pink-100/60 shadow-md max-w-md mx-auto">
                    <h3 className="font-extrabold text-lg text-purple-800 text-center mb-4">تسجيل دخول رانيا والمسؤولين 🔒</h3>
                    
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2 text-right">رمز المرور الخاص لإدارة رانيا:</label>
                        <input
                          type="password"
                          required
                          placeholder="الرجاء إدخل الرمز الخاص"
                          value={adminPasscode}
                          onChange={(e) => setAdminPasscode(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 text-center"
                        />
                      </div>

                      {adminError && (
                        <p className="text-xs text-red-600 font-bold text-center">{adminError}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl text-xs hover:from-purple-600 hover:to-pink-600 transition-all cursor-pointer"
                      >
                        دخول والتحقق من حسابات البنات ➔
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-6">
                    
                    <div className="bg-white rounded-3xl p-6 border border-pink-100/60 shadow-md flex justify-between items-center">
                      <div className="text-right">
                        <h3 className="text-lg font-extrabold text-purple-700">قائمة العضوات لقطات شاشة التحقق المرفوعة 📸</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          يمكنكِ فحص الصور المرفوعة يدويًا وإلغاء حساب أي عضوة ترفع صورًا غير حقيقية أو مضللة.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsAdminLoggedIn(false);
                          setAdminPasscode("");
                        }}
                        className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
                      >
                        خروج الإدارة
                      </button>
                    </div>

                    {renderAdminDashboardStats()}

                    <h4 className="font-extrabold text-base text-purple-900 mt-8 mb-2 text-right">طلبات التحقق من صور المتابعة للمشتركات الجدد 📸</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(adminUsers ?? []).map((user) => (
                        <div key={user?.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between">
                          
                          <div className="h-56 bg-slate-100 border-b border-slate-50 flex items-center justify-center relative group">
                            {user?.screenshot ? (
                              user.screenshot.startsWith("data:") ? (
                                <img
                                  src={user.screenshot}
                                  alt="Follow verification screenshot"
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="p-4 text-center text-xs text-slate-400">
                                  <span>{user.screenshot}</span>
                                </div>
                              )
                            ) : (
                              <p className="text-xs text-slate-400">لا توجد صورة مرفوعة</p>
                            )}
                          </div>
                          
                          <div className="p-5 space-y-3 text-right">
                            <div>
                              <p className="text-sm font-bold text-slate-800">العضوة: {user?.firstName}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">تاريخ الانضمام: {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("ar-SA") : ""}</p>
                            </div>

                            <div className="flex flex-wrap gap-1 justify-start">
                              {(user?.goals ?? []).map((goal) => (
                                <span key={goal} className="px-2 py-0.5 bg-pink-50 text-[9px] text-pink-600 rounded">
                                  {goal}
                                </span>
                              ))}
                            </div>

                            <div className="flex justify-between items-center text-xs pt-3 mt-3 border-t border-slate-50">
                              <span className="font-bold text-purple-700">نقاط: {user?.points}</span>
                              <span className="font-bold text-emerald-500">نبتة: {user?.plantPoints}%</span>
                            </div>

                            {user?.warningsCount > 0 && (
                              <div className="bg-amber-50 text-amber-700 p-2.5 rounded-2xl text-[10px] border border-amber-100/60 leading-relaxed font-bold">
                                ⚠️ تم الإنذار ({user.warningsCount}): {user.warningReason}
                              </div>
                            )}
                            {user?.isBanned && (
                              <div className="bg-rose-50 text-rose-700 p-2.5 rounded-2xl text-[10px] border border-rose-100/60 leading-relaxed font-bold text-center">
                                🚫 هذا الحساب محظور حالياً
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <button
                                onClick={() => handleWarnUserClick(user?.id, user?.firstName)}
                                className="py-2 bg-amber-50 hover:bg-amber-100 text-amber-750 font-extrabold rounded-xl text-[10px] transition-all cursor-pointer text-center"
                              >
                                إنذار العضوة ⚠️
                              </button>
                              <button
                                onClick={() => handleBanUserClick(user?.id, user?.firstName)}
                                className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold rounded-xl text-[10px] transition-all cursor-pointer text-center"
                              >
                                إلغاء وحظر 🚫
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                    <div className="mt-12 bg-white rounded-3xl p-6 border border-red-100 shadow-md">
                      <div className="border-b border-red-50 pb-4 mb-4 flex justify-between items-center flex-wrap gap-2">
                        <div className="text-right">
                          <h4 className="font-extrabold text-base text-red-600 flex items-center gap-2 justify-end">
                            <span>🚨 بلاغات تجاوز الدردشة الخاصة (مجتمع الصديقات)</span>
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">
                            البلاغات المرفوعة تلقائياً من الفتيات بخصوص أي سلوك أو حديث غير لائق في المراسلات الخاصة.
                          </p>
                        </div>
                        <button
                          onClick={fetchAdminReports}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all"
                        >
                          تحديث البلاغات 🔄
                        </button>
                      </div>

                      {(adminReports ?? []).length === 0 ? (
                        <div className="text-center py-8 text-xs text-slate-500 font-bold bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          🎉 لا توجد بلاغات تجاوز حالياً. مجتمع الصديقات نظيف وآمن بالكامل!
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {adminReports.map((report) => (
                            <div
                              key={report?.id}
                              className={`p-4 rounded-2xl border flex flex-col justify-between gap-4 text-right transition-all ${
                                report?.status === "resolved"
                                  ? "bg-slate-50/60 border-slate-100 opacity-70"
                                  : "bg-red-50/40 border-red-100"
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    report?.status === "resolved" ? "bg-slate-200 text-slate-500" : "bg-red-100 text-red-600"
                                  }`}>
                                    {report?.status === "resolved" ? "تم الحل ✓" : "قيد المراجعة"}
                                  </span>
                                  <span className="text-[9px] text-slate-400">{formatTimeElapsed(report?.createdAt)}</span>
                                </div>

                                <p className="text-xs text-slate-700">
                                  <span className="font-extrabold">{report?.reporterName}</span> أبلغت عن{" "}
                                  <span className="font-extrabold text-red-600">{report?.reportedUserName}</span>
                                </p>

                                <div className="bg-white p-2.5 rounded-xl text-[11px] text-slate-600 border border-slate-100">
                                  "{report?.messageText}"
                                </div>

                                <p className="text-[10px] text-slate-500">
                                  <span className="font-bold">السبب:</span> {report?.reason}
                                </p>
                              </div>

                              {report?.status !== "resolved" && (
                                <button
                                  onClick={() => resolveAdminReport(report?.id)}
                                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold rounded-xl transition-all"
                                >
                                  تحديد كمكتمل ✓
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* نافذة المنبثقة لعرض حساب الصديقات */}
            {viewingProfileUser && (
              <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4" dir="rtl">
                <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden border border-pink-100 shadow-2xl flex flex-col animate-in fade-in-50 zoom-in-95 duration-200">
                  
                  <div className="p-4 flex justify-end">
                    <button
                      onClick={() => setViewingProfileUser(null)}
                      className="p-1.5 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-full transition-all cursor-pointer border border-pink-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="px-6 pb-6 flex flex-col items-center text-center -mt-4">
                    {renderUserAvatar(viewingProfileUser?.id, "w-24 h-24 text-4xl")}
                    <h3 className="font-extrabold text-xl text-slate-800 mt-4">{viewingProfileUser?.firstName}</h3>
                    <p className="text-xs text-slate-400 mt-1">عضوة في مجتمع رانيا 💖</p>

                    <div className="flex gap-2 flex-wrap justify-center mt-3">
                      {(viewingProfileUser?.goals ?? []).map((g) => (
                        <span key={g} className="px-2.5 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mt-6">
                      <div className="bg-pink-50/50 rounded-2xl p-4 text-center">
                        <p className="text-xl font-black text-pink-600">{viewingProfileUser?.points ?? 0}</p>
                        <p className="text-[10px] text-slate-500 font-bold mt-1">نقاط التوهج 🌟</p>
                      </div>
                      <div className="bg-emerald-50/50 rounded-2xl p-4 text-center">
                        <p className="text-xl font-black text-emerald-600">{viewingProfileUser?.plantPoints ?? 0}%</p>
                        <p className="text-[10px] text-slate-500 font-bold mt-1">نمو النبتة 🌱</p>
                      </div>
                    </div>

                    {viewingProfileUser?.id !== currentUser?.id && (
                      <button
                        onClick={() => {
                          const friendship = userFriendships.find(
                            (f) => f.senderId === viewingProfileUser.id || f.receiverId === viewingProfileUser.id
                          );
                          if (!friendship) {
                            sendFriendRequest(viewingProfileUser.id);
                          }
                          setViewingProfileUser(null);
                        }}
                        className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl text-xs shadow-md hover:from-pink-600 hover:to-purple-600 transition-all cursor-pointer"
                      >
                        إضافة صديقة 🌸
                      </button>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* نافذة المنبثقة للإبلاغ عن المحتوى السيء */}
            {chatReportTarget && (
              <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4" dir="rtl">
                <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden border border-pink-100 shadow-2xl flex flex-col p-6 space-y-4">
                  <h3 className="font-extrabold text-base text-red-600 text-right">⚠️ الإبلاغ عن تجاوز</h3>
                  <p className="text-xs text-slate-500 text-right">اذكري سبب الإبلاغ عن هذه الرسالة لإدارة رانيا:</p>
                  <textarea
                    rows={3}
                    value={chatReportReason}
                    onChange={(e) => setChatReportReason(e.target.value)}
                    placeholder="اكتبي السبب هنا..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-red-300 text-right"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={submitChatReport}
                      disabled={reportingSubmitting}
                      className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-2xl text-xs transition-all disabled:opacity-50"
                    >
                      {reportingSubmitting ? "جاري الإرسال..." : "إرسال البلاغ ⚠️"}
                    </button>
                    <button
                      onClick={() => setChatReportTarget(null)}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-xs transition-all"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* نظام التنبيهات المنبثقة (Toast) */}
            {customToast && (
              <div className="fixed bottom-8 left-4 md:left-8 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-xs px-5 py-3.5 rounded-full shadow-2xl border border-pink-300 flex items-center gap-2 animate-bounce">
                🌸 {customToast}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
                                   
