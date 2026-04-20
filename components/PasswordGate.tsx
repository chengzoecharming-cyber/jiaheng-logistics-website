import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container, Eye, EyeOff, Copy, RefreshCw, Lock, CheckCircle2 } from "lucide-react";
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

const BASE_PASSWORD = "jiaheng";
const ADMIN_PASSWORD = "admin123";
const SESSION_KEY = "jh_auth_verified";
const PASSWORD_SUFFIX_KEY = "jh_password_suffix";

function generatePasswordSuffix(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function getCurrentPassword(): string {
  const suffix = sessionStorage.getItem(PASSWORD_SUFFIX_KEY) || generatePasswordSuffix();
  sessionStorage.setItem(PASSWORD_SUFFIX_KEY, suffix);
  return BASE_PASSWORD + suffix;
}

function regeneratePassword(): string {
  const newSuffix = generatePasswordSuffix();
  sessionStorage.setItem(PASSWORD_SUFFIX_KEY, newSuffix);
  return BASE_PASSWORD + newSuffix;
}

interface AdminPanelProps {
  onClose: () => void;
}

function AdminPanel({ onClose }: AdminPanelProps) {
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setCurrentPassword(getCurrentPassword());
    }
  };

  const handleGenerateNew = () => {
    const newPassword = regeneratePassword();
    setCurrentPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-xl p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border border-slate-200 rounded-[2.5rem] p-10 w-full max-w-md relative shadow-2xl shadow-slate-200/50"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {!isAuthenticated ? (
          <div className="space-y-8 pt-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">管理员验证</h3>
              <p className="text-slate-500 text-sm">请输入密码以获取访问凭证</p>
            </div>
            <div className="space-y-4">
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
          <div className="space-y-8 pt-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">当前访问密码</h3>
              <p className="text-slate-500 text-sm">请将此密码发送给甲方</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 text-center border border-slate-100">
              <p className="text-3xl font-mono font-medium text-slate-900 tracking-[0.2em] mb-3">
                {currentPassword}
              </p>
              <p className="text-xs text-slate-400 tracking-wide">基础密码 + 4位随机后缀</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-12"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    复制密码
                  </>
                )}
              </Button>
              <Button
                onClick={handleGenerateNew}
                variant="outline"
                className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-12"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                生成新密码
              </Button>
            </div>

            <div className="pt-2">
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                生成新密码后，旧密码将立即失效
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
    const currentPassword = getCurrentPassword();
    if (password === currentPassword) {
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
                密码错误，请检查后重试
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
