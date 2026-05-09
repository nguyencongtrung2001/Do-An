"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DetailCourt, SelectedSlot, GroupedSlot } from "@/types/court.types";
import { mergeSelectedSlots } from "@/utils/booking.utils";
import { apiPost } from "@/services/api";
import toast from "react-hot-toast";

export function useBooking(_locationSans: DetailCourt[]) {
  const { user, token } = useAuth() || {};
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSlotToggle = (court: DetailCourt, marker: string) => {
    setSelectedSlots(prev => {
      const exists = prev.find(s => s.ma_san === court.ma_san && s.ngay_dat === selectedDate && s.gio_bat_dau === marker);
      if (exists) {
        return prev.filter(s => s !== exists);
      } else {
        return [...prev, {
          ma_san: court.ma_san,
          ten_san: court.ten_san,
          ngay_dat: selectedDate,
          gio_bat_dau: marker,
          gio_ket_thuc: marker,
          gia_thue: court.gia_thue_30p
        }];
      }
    });
  };

  const removeGroup = (groupToRemove: GroupedSlot) => {
    setSelectedSlots(prev => prev.filter(s => !groupToRemove.slots.includes(s)));
  };

  const groupedSlots = useMemo(() => mergeSelectedSlots(selectedSlots), [selectedSlots]);
  
  const invalidGroups = groupedSlots.filter(g => g.slots.length < 2);
  const isInvalid = invalidGroups.length > 0;

  const totalPrice = useMemo(() => {
    return groupedSlots.reduce((sum, group) => {
      const slotCount = group.slots.length - 1;
      const groupPrice = slotCount * group.slots[0].gia_thue;
      return sum + groupPrice;
    }, 0);
  }, [groupedSlots]);

  const confirmBooking = async (paymentMethod: string) => {
    if (!user || !token) {
      toast.error("Phiên đăng nhập không hợp lệ");
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (paymentMethod === "cash" || paymentMethod === "wallet") {
        setPaymentStatus("Đang xử lý đơn hàng...");
        
        const slotsForBackend = groupedSlots.flatMap(group => {
          return group.slots.map((marker: SelectedSlot) => {
            const [h, m] = marker.gio_bat_dau.split(':').map(Number);
            const endDate = new Date(0, 0, 0, h, m + 30);
            const gio_ket_thuc = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
            
            return {
              ma_san: group.ma_san,
              ten_san: group.ten_san,
              ngay_dat: group.ngay_dat,
              gio_bat_dau: marker.gio_bat_dau,
              gio_ket_thuc: gio_ket_thuc,
              gia_thue: marker.gia_thue
            };
          });
        });

        const payload = {
          ma_nguoi_dung: user.ma_nguoi_dung,
          phuong_thuc_thanh_toan: paymentMethod,
          selectedSlots: slotsForBackend
        };

        await apiPost("/booking", JSON.stringify(payload), token);
        toast.success("Đặt sân thành công! Vui lòng kiểm tra lịch sử.");
        setTimeout(() => { window.location.href = "/history"; }, 1500);
      } else if (paymentMethod === "vnpay") {
        setPaymentStatus("Đang kết nối cổng thanh toán VNPAY...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?fake_params=123";
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xảy ra khi xử lý.");
      }
      setIsSubmitting(false);
      setPaymentStatus("");
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    selectedCourt,
    setSelectedCourt,
    selectedSlots,
    handleSlotToggle,
    removeGroup,
    groupedSlots,
    isInvalid,
    totalPrice,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isSubmitting,
    paymentStatus,
    confirmBooking,
  };
}
