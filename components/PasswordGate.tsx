import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container, Eye, EyeOff, Copy, Lock, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// 彩色漂浮圆圈组件
interface FloatingCircleProps {
  size: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  duration: number;
  key?: React.Key;
}

function FloatingCircle({ size, x, y, color, delay, duration }: FloatingCircleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none blur-sm"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        opacity: 0.15,
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function FloatingCircles() {
  const circles = [
    { size: 180, x: 10, y: 15, color: "linear-gradient(135deg, #ff6b9d, #c44569)", delay: 0, duration: 20 },
    { size: 140, x: 75, y: 20, color: "linear-gradient(135deg, #4facfe, #00f2fe)", delay: 2, duration: 18 },
    { size: 200, x: 85, y: 60, color: "linear-gradient(135deg, #a18cd1, #fbc2eb)", delay: 4, duration: 22 },
    { size: 160, x: 5, y: 70, color: "linear-gradient(135deg, #fa709a, #fee140)", delay: 1, duration: 19 },
    { size: 120, x: 50, y: 10, color: "linear-gradient(135deg, #30cfd0, #330867)", delay: 3, duration: 17 },
    { size: 100, x: 25, y: 80, color: "linear-gradient(135deg, #ff9a9e, #fecfef)", delay: 5, duration: 21 },
    { size: 150, x: 65, y: 75, color: "linear-gradient(135deg, #667eea, #764ba2)", delay: 2.5, duration: 23 },
    { size: 90, x: 40, y: 40, color: "linear-gradient(135deg, #f093fb, #f5576c)", delay: 1.5, duration: 16 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {circles.map((circle, i) => (
        <FloatingCircle
          key={i}
          size={circle.size}
          x={circle.x}
          y={circle.y}
          color={circle.color}
          delay={circle.delay}
          duration={circle.duration}
        />
      ))}
    </div>
  );
}

// 预定义100个一次性密码（所有设备通用）
// 100个不重复的随机三位数，完全无规律
const PASSWORD_LIST = [
  "jiaheng285", "jiaheng491", "jiaheng419", "jiaheng362", "jiaheng961",
  "jiaheng997", "jiaheng135", "jiaheng693", "jiaheng289", "jiaheng426",
  "jiaheng690", "jiaheng100", "jiaheng549", "jiaheng149", "jiaheng790",
  "jiaheng721", "jiaheng920", "jiaheng326", "jiaheng924", "jiaheng175",
  "jiaheng741", "jiaheng884", "jiaheng061", "jiaheng244", "jiaheng383",
  "jiaheng803", "jiaheng403", "jiaheng852", "jiaheng835", "jiaheng640",
  "jiaheng243", "jiaheng204", "jiaheng664", "jiaheng247", "jiaheng592",
  "jiaheng593", "jiaheng877", "jiaheng851", "jiaheng477", "jiaheng817",
  "jiaheng071", "jiaheng395", "jiaheng397", "jiaheng558", "jiaheng173",
  "jiaheng003", "jiaheng252", "jiaheng513", "jiaheng753", "jiaheng728",
  "jiaheng672", "jiaheng742", "jiaheng478", "jiaheng143", "jiaheng762",
  "jiaheng253", "jiaheng390", "jiaheng965", "jiaheng335", "jiaheng358",
  "jiaheng052", "jiaheng651", "jiaheng440", "jiaheng333", "jiaheng839",
  "jiaheng508", "jiaheng448", "jiaheng578", "jiaheng438", "jiaheng581",
  "jiaheng409", "jiaheng121", "jiaheng131", "jiaheng011", "jiaheng466",
  "jiaheng002", "jiaheng242", "jiaheng618", "jiaheng480", "jiaheng583",
  "jiaheng073", "jiaheng273", "jiaheng327", "jiaheng257", "jiaheng144",
  "jiaheng868", "jiaheng212", "jiaheng991", "jiaheng834", "jiaheng474",
  "jiaheng124", "jiaheng081", "jiaheng823", "jiaheng782", "jiaheng698",
  "jiaheng667", "jiaheng060", "jiaheng571", "jiaheng757", "jiaheng501",
];

const ADMIN_PASSWORD = "admin123";
const SESSION_KEY = "jh_auth_verified";
const USED_PASSWORDS_KEY = "jh_used_passwords";

function getUsedPasswords(): string[] {
  try {
    const stored = localStorage.getItem(USED_PASSWORDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function markPasswordAsUsed(password: string): void {
  const used = getUsedPasswords();
  if (!used.includes(password)) {
    used.push(password);
    localStorage.setItem(USED_PASSWORDS_KEY, JSON.stringify(used));
  }
}

function resetUsedPasswords(): void {
  localStorage.removeItem(USED_PASSWORDS_KEY);
}

function verifyPassword(input: string): boolean {
  // 检查密码是否在列表中
  if (!PASSWORD_LIST.includes(input)) {
    return false;
  }
  
  // 检查密码是否已被使用
  const used = getUsedPasswords();
  if (used.includes(input)) {
    return false;
  }
  
  // 标记为已使用
  markPasswordAsUsed(input);
  return true;
}

function getAvailablePasswordsCount(): number {
  const used = getUsedPasswords();
  return PASSWORD_LIST.length - used.length;
}

interface AdminPanelProps {
  onClose: () => void;
}

function AdminPanel({ onClose }: AdminPanelProps) {
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usedPasswords, setUsedPasswords] = useState<string[]>([]);
  const [copiedPassword, setCopiedPassword] = useState<string | null>(null);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUsedPasswords(getUsedPasswords());
    }
  };

  const handleCopy = (password: string) => {
    navigator.clipboard.writeText(password);
    setCopiedPassword(password);
    setTimeout(() => setCopiedPassword(null), 2000);
  };

  const handleReset = () => {
    if (confirm("确定要重置所有密码吗？所有已使用的密码将恢复可用。")) {
      resetUsedPasswords();
      setUsedPasswords([]);
    }
  };

  const availableCount = PASSWORD_LIST.length - usedPasswords.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-xl p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border border-slate-200 rounded-[2rem] w-full max-w-2xl relative shadow-2xl shadow-slate-200/50 max-h-[85vh] overflow-hidden flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {!isAuthenticated ? (
          <div className="space-y-8 p-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">管理员验证</h3>
              <p className="text-slate-500 text-sm">请输入密码以管理访问凭证</p>
            </div>
            <div className="space-y-4 max-w-sm mx-auto">
              <Input
                type="password"
                placeholder="管理员密码"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-2xl h-12 text-center"
              />
              <Button
                onClick={handleAdminLogin}
                className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full h-12 text-base font-medium"
              >
                验证身份
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-8 pb-4 border-b border-slate-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-1">访问密码管理</h3>
                <p className="text-slate-500 text-sm">选择一个未使用的密码发送给甲方</p>
              </div>

              <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-slate-900">{availableCount}</div>
                  <div className="text-sm text-slate-500">
                    剩余可用
                    <br />
                    <span className="text-xs">共 {PASSWORD_LIST.length} 个</span>
                  </div>
                </div>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  重置全部
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {PASSWORD_LIST.map((password) => {
                  const isUsed = usedPasswords.includes(password);
                  return (
                    <button
                      key={password}
                      onClick={() => !isUsed && handleCopy(password)}
                      disabled={isUsed}
                      className={cn(
                        "relative p-3 rounded-xl text-sm font-mono transition-all",
                        isUsed
                          ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-slate-400 hover:shadow-sm active:scale-95 cursor-pointer"
                      )}
                    >
                      <span className="text-xs text-slate-400 absolute top-1 left-2">
                        {password.replace("jiaheng", "")}
                      </span>
                      <span className="block mt-3 truncate">{password}</span>
                      {isUsed && (
                        <span className="absolute top-1 right-2 text-[10px] text-slate-300">已用</span>
                      )}
                      {copiedPassword === password && (
                        <span className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white text-xs rounded-xl">
                          已复制
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <p className="text-xs text-slate-400 text-center">
                点击任意未使用密码即可复制 • 灰色表示已使用过
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = useCallback(() => {
    if (verifyPassword(password)) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPassword("");
      inputRef.current?.focus();
    }
  }, [password, onSuccess]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleLogoTripleClick = useCallback(() => {
    setIsAdminOpen(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden">
      <FloatingCircles />

      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm px-8"
      >
        {/* Logo 区域 */}
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleLogoTripleClick}
            className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-10 shadow-[0_8px_60px_-12px_rgba(0,0,0,0.15)] cursor-pointer select-none ring-1 ring-slate-100"
          >
            <Container className="w-14 h-14 text-slate-800" strokeWidth={1.5} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[28px] font-light text-slate-900 text-center tracking-wide"
          >
            登录获取嘉亨物流服务
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-sm mt-3 text-center font-light tracking-wide"
          >
            请输入访问密码
          </motion.p>
        </div>

        {/* 密码输入区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="relative">
            <Input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              placeholder="密码"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:border-slate-300 transition-all text-center tracking-[0.15em] h-14",
                error && "border-red-300 focus-visible:ring-red-100 focus-visible:border-red-300"
              )}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm text-center font-light"
              >
                密码错误或已被使用
              </motion.p>
            )}
          </AnimatePresence>

          <Button
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full h-14 text-base font-medium tracking-wide transition-all active:scale-[0.98]"
          >
            登录
          </Button>
        </motion.div>

        {/* 底部提示 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-slate-300 text-xs text-center mt-16 font-light tracking-wider"
        >
          此页面仅供授权访问
        </motion.p>
      </motion.div>
    </div>
  );
}
