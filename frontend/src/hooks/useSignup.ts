"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import { UserData, Role } from "@/types/auth.types";
import toast from "react-hot-toast";

export function useSignup(role: Role) {
  const router = useRouter();
  const { login } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Owner specific fields
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [cccdTruoc, setCccdTruoc] = useState<File | null>(null);
  const [cccdSau, setCccdSau] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [kinhDo, setKinhDo] = useState<number | null>(null);
  const [viDo, setViDo] = useState<number | null>(null);

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    
    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp");
      return;
    }
    
    setLoading(true);
    try {
      let data;
      if (role === Role.OWNER) {
        data = await authService.registerOwner({
          ho_ten: name,
          email,
          so_dien_thoai: phone,
          mat_khau: password,
          ten_dia_diem: locationName,
          dia_chi: address,
          kinh_do: kinhDo,
          vi_do: viDo,
          anh_cccd_truoc: cccdTruoc,
          anh_cccd_sau: cccdSau,
          anh_dai_dien: avatarFile,
        });
      } else {
        data = await authService.registerUser({
          ho_ten: name,
          email,
          so_dien_thoai: phone,
          mat_khau: password,
        });
      }
      
      login(data.token, data.user as UserData);
      
      if (data.user.vai_tro === "Quản trị viên") {
        router.push("/admin/users");
      } else if (role === Role.OWNER) {
        router.push("/owner/dashboard");
      } else {
        router.push("/");
      }
      
      toast.success("Đăng ký thành công!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Đăng ký thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      name, setName,
      email, setEmail,
      phone, setPhone,
      password, setPassword,
      confirmPassword, setConfirmPassword,
      locationName, setLocationName,
      address, setAddress,
      cccdTruoc, setCccdTruoc,
      cccdSau, setCccdSau,
      avatarPreview,
      kinhDo, setKinhDo,
      viDo, setViDo,
      loading,
      errorMsg,
    },
    actions: {
      handleAvatarChange,
      handleSubmit,
      setErrorMsg
    }
  };
}
