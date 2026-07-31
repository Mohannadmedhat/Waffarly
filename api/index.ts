import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(express.json());

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Waffarly - وافرلي" });
});

// AI Assistant Endpoint - Shopping Assistant & Price Advisor
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message parameter is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `أهلاً بك! بناءً على طلبك "${message}"، قمت بتحليل أفضل العروض المتاحة في السوق لمساعدتك على الشراء بأعلى توفير:`,
        deal: {
          title: message.includes("لابتوب") ? "Lenovo Ideapad Gaming 3" : message.includes("سامسونج") ? "Samsung Galaxy A05" : "Sony WH-1000XM5",
          specs: message.includes("لابتوب") ? "معالج RTX 3050 ، رام 16GB ، ذاكرة 512GB SSD" : message.includes("سامسونج") ? "شاشة 6.7 بوصة ، ذاكرة 128GB ، بطارية 5000mAh" : "سماعة لاسلكية عازلة للضوضاء بالكامل ، لون أسود مطفي",
          price: message.includes("لابتوب") ? "28,999 ج.م" : message.includes("سامسونج") ? "4,250 ج.م" : "15,725 ج.م",
          originalPrice: message.includes("لابتوب") ? "34,500 ج.م" : message.includes("سامسونج") ? "4,800 ج.م" : "18,500 ج.م",
          discountText: "انخفاض 12%",
          store: "أمازون (Amazon)",
          cashback: "435 ج.م",
          imageUrl: message.includes("لابتوب")
            ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBIet0amJtZ1hmzTgdPdqHCdRr20WQDyBoQISyA-R60gBuNUasSxi9PjuJmMro5cF_gF4Ncp8CYsGuSs5u-4MS3PM8rDVzEdn0Dl-B1LglF6nN0FaXcLvriBCEzzePfLc6hTSeZic85YQqNWiCSz_UCDcaMh8Z_6bOZE_Zw-bIA0DZDUFSWtjrZmX1cdLPrIwOk2c3PGQkDSNHF-KJKkUHJS17VRuNDPAoDISyVHUKgBktURhnqO2f2auKcWd6DhB9ZeNCdRP3ixxIG"
            : message.includes("سامسونج")
            ? "https://lh3.googleusercontent.com/aida-public/AB6AXuB04eLak2vheJIvzwWSKOhaPOlkBbaZ1jIUmjVk6pQM3iyzyVPSYzRkiG7SopfKlzBmDevQIY2DpbTdqQG92KmLPL3ysdY6GwlwtUE67E42rjxaT9K_ltrErXCNC70YE1U4T_j8Oiay7ZJotYvUk3zuw-Vdkx231j1Q2GfEzluO9UxPMnZ7QBBH5mn00uog9mJJPS_czSg8iD1yZSbaab_9XSsHr2rgCV1EnqcAlRc5nfkxQl8PXwwNVbedgMDkF65N7Pxl0SO_HIgW"
            : "https://lh3.googleusercontent.com/aida-public/AB6AXuAAkJ7utX-rV2ZJ8dHuld_B24bGMD14cnaV661NkVU0zDkKQqNaQFy8BGb6tpC0eXrS7biz-MpAu7rfrEo8-ZJvAEo8PN5BKrf87iLJgyhfXeyw_EB-tCq36UfiCqhCImpNh09vSLfg5ASnaNwf4TeTIpWmlQ75P5FowRz64mSb5EVvrdSfSVHqakIIVNAE3jwKeSKdrehM7c3bE56DLg5_794vQKLoijXACTHYvPgKZJ-7VvSbh-OVSNEYXSKOsZwi5MSSmrbBoAAm",
          reason: "هذا الخيار يقدم أفضل قيمة مقابل السعر حالياً بناءً على تتبع أسعار المتاجر ومعدل الكاش باك المتاح.",
          dailySavingRate: "5,501 ج.م"
        },
        suggestionChips: ["مقارنة الأسعار", "البحث عن كوبونات", "تتبع انخفاض السعر"]
      });
    }

    const systemInstruction = `أنت "ذكاء Waffarly الاصطناعي" - مساعد التسوق ومقارنة الأسعار وتتبع الكاش باك لمنصة وافرلي (Waffarly).
أجب باللغة العربية الفصيحة وبأسلوب سلس ومهني.
عند كتابة أسماء المنتجات أو المواصفات بالإنجليزية، حافظ على وضوح النص العربي وتجنب الخلط المحير للعلامات.
اجعل الإجابة دائماً بصيغة JSON مطابقة للهيكل التالي:
{
  "reply": "نص الرد والتوضيح باللغة العربية",
  "deal": {
    "title": "اسم المنتج الموصى به",
    "specs": "المواصفات الرئيسية بالعربية السلسة",
    "price": "السعر الحالي بالجنيه أو الريال مثل (15,725 ج.م)",
    "originalPrice": "السعر قبل الخصم",
    "discountText": "نسبة الخصم",
    "store": "اسم المتجر",
    "cashback": "قيمة الكاش باك",
    "imageUrl": "رابط الصورة",
    "reason": "سبب التوصية بالتفصيل",
    "dailySavingRate": "معدل التوفير المقدر"
  },
  "suggestionChips": ["اقتراح 1", "اقتراح 2", "اقتراح 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const textResult = response.text?.trim() || "{}";
    try {
      const parsed = JSON.parse(textResult);
      return res.json(parsed);
    } catch {
      return res.json({
        reply: textResult || "لقد قمت بتحليل الأسعار لك وتجهيز أحدث العروض.",
        deal: null,
        suggestionChips: ["مقارنة الأسعار", "البحث عن كوبونات", "تنسيق تنبيه سعر"]
      });
    }
  } catch (error: any) {
    console.error("Assistant API Error:", error);
    res.status(500).json({ error: error.message || "Failed to process AI assistant query" });
  }
});

export default app;
