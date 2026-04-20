import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container, Eye, EyeOff, Copy, RefreshCw, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FloatingCircleProps {
  size: number;
  x: number;
  delay: number;
  duration: number;
  opacity: number;
  key?: React.Key;
}

function FloatingCircle({ size, x, delay, duration, opacity }: FloatingCircleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        background: `radial-gradient(circle, rgba(99,102,241,${opacity}) 0%, rgba(99,102,241,0) 70%)`,
      }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{
        y: "-20vh",
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function FloatingCircles() {
  const circles = [
    { size: 60, x: 10, delay: 0, duration: 15, opacity: 0.15 },
    { size: 40, x: 25, delay: 3, duration: 12, opacity: 0.1 },
    { size: 80, x: 40, delay: 1.5, duration: 18, opacity: 0.08 },
    { size: 30, x: 55, delay: 5, duration: 10, opacity: 0.12 },
    { size: 50, x: 70, delay: 2, duration: 14, opacity: 0.1 },
    { size: 70, x: 85, delay: 4, duration: 16, opacity: 0.07 },
    { size: 45, x: 15, delay: 7, duration: 13, opacity: 0.09 },
    { size: 35, x: 60, delay: 6, duration: 11, opacity: 0.11 },
    { size: 55, x: 90, delay: 8, duration: 17, opacity: 0.06 },
    { size: 65, x: 5, delay: 10, duration: 19, opacity: 0.08 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {circles.map((circle, i) => (
        <FloatingCircle
          key={i}
          size={circle.size}
          x={circle.x}
          delay={circle.delay}
          duration={circle.duration}
          opacity={circle.opacity}
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {!isAuthenticated ? (
          <div className="space-y-6">
            <div className="text-center">
              <Lock className="w-10 h-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">管理员登录</h3>
              <p className="text-slate-400 text-sm">请输入管理员密码以查看当前密码</p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="管理员密码"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
              />
              <Button
                onClick={handleAdminLogin}
                className="w-full bg-white text-slate-900 hover:bg-slate-200 rounded-full h-11 font-medium"
              >
                进入管理面板
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">当前密码</h3>
              <p className="text-slate-400 text-sm">将此密码发送给甲方</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700">
              <p className="text-3xl font-mono font-bold text-white tracking-wider mb-2">
                {currentPassword}
              </p>
              <p className="text-xs text-slate-500">基础密码 + 4位随机后缀</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="rounded-full border-slate-600 text-white hover:bg-slate-800 h-11"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
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
                className="rounded-full border-slate-600 text-white hover:bg-slate-800 h-11"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                生成新密码
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500 text-center">
                提示：生成新密码后，旧密码将立即失效
              </p>
            </div>
          </div>
        )}
      </div>
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
    // 键盘快捷键：支持 Cmd/Ctrl + Shift + A
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
    <div className="fixed inset-0 bg-[#f5f5f7] flex items-center justify-center overflow-hidden">
      <FloatingCircles />

      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={handleLogoTripleClick}
            className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-slate-900/10 cursor-pointer select-none"
            title="三击打开管理员面板"
          >
            <Container className="w-12 h-12 text-slate-900" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-display font-bold text-slate-900 text-center tracking-tight"
          >
            嘉亨物流
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-500 text-sm mt-2 text-center"
          >
            请输入密码以访问网站
          </motion.p>
        </div>

        {/* Password Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
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
                "w-full bg-white border-0 border-b-2 rounded-none px-4 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-slate-900 transition-colors text-center tracking-widest",
                error ? "border-red-500" : "border-slate-300"
              )}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm text-center"
              >
                密码错误，请重试
              </motion.p>
            )}
          </AnimatePresence>

          <Button
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full h-12 text-base font-medium mt-6"
          >
            登录
          </Button>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-slate-400 text-xs text-center mt-12"
        >
          此页面仅供授权访问
        </motion.p>
      </motion.div>
    </div>
  );
}
