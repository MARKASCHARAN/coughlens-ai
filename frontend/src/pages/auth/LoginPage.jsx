import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";

export default function LoginPage() {
  const { requestOtp, verifyOtp, isLoading, authStep, setAuthStep } = useUser();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("INDIVIDUAL"); // Default role

  const handleRequestOtp = async (e) => {
      e.preventDefault();
      if (!phone) return;
      // Basic validation or formatting could go here
      const success = await requestOtp(phone, role);
      if (success) {
          // Stay on page, UI updates via authStep
      }
  };

  const handleVerifyOtp = async (e) => {
      e.preventDefault();
      if (!otp) return;
      const success = await verifyOtp(phone, otp);
      if (success) {
          navigate("/dashboard");
      }
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
             <p className="text-gray-400 text-sm">
                {authStep === "PHONE" ? "Sign in via Phone to access your dashboard." : "Enter the OTP sent to your phone."}
             </p>
        </div>

        <div className="space-y-6">
            
            {authStep === "PHONE" ? (
                <form onSubmit={handleRequestOtp} className="space-y-4 text-left">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Phone Number</label>
                        <Input 
                            type="tel" 
                            placeholder="9999999999" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-11 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-orange-500/50 transition-all font-medium"
                            required
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Role</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-orange-500/50 transition-all font-medium appearance-none"
                        >
                            <option value="INDIVIDUAL" className="bg-gray-900">Individual</option>
                            <option value="ASHA_WORKER" className="bg-gray-900">Asha Worker</option>
                        </select>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold shadow-lg shadow-orange-500/20 mt-2 transition-all active:scale-[0.98]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending OTP..." : "Get OTP"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
                     <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Enter OTP</label>
                            <button type="button" onClick={() => setAuthStep("PHONE")} className="text-xs font-medium text-orange-500 hover:text-orange-400">Change Phone?</button>
                        </div>
                        <Input 
                            type="text" 
                            placeholder="123456" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="h-11 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-orange-500/50 transition-all font-medium"
                            required
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold shadow-lg shadow-orange-500/20 mt-2 transition-all active:scale-[0.98]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Verify & Login"}
                    </Button>
                </form>
            )}
        </div>
    </motion.div>
  );
}
