import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { SocialButtons } from "./SocialButtons";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";

export default function LoginPage() {
  const { login, isLoading } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      await login("555-555-5555"); // Mock login
      navigate("/dashboard");
  };

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
    >
        <div className="mb-8">
             <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
             <p className="text-gray-400 text-sm">Sign in to access your clinical dashboard.</p>
        </div>

        <div className="space-y-6">
            <SocialButtons />
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-bold">
                    <span className="bg-[#121212] px-3 text-gray-500 rounded-full py-0.5 border border-white/5">
                        Or continue with
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Email or Phone</label>
                    <Input 
                        type="text" 
                        placeholder="doctor@clinic.com" 
                        className="h-11 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-orange-500/50 transition-all font-medium"
                        required
                    />
                </div>
                 <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Password</label>
                        <Link to="/auth/forgot" className="text-xs font-medium text-orange-500 hover:text-orange-400">Forgot?</Link>
                    </div>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="h-11 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-orange-500/50 transition-all font-medium"
                        required
                    />
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold shadow-lg shadow-orange-500/20 mt-2 transition-all active:scale-[0.98]"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Log In"}
                </Button>
            </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/auth/signup" className="text-white font-bold hover:text-orange-500 transition-colors">Sign up free</Link>
        </div>
    </motion.div>
  );
}
