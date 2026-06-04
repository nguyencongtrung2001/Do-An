"use client";

import { useState } from "react";
import { ratingService } from "@/services/rating.service";
import toast from "react-hot-toast";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  ma_dat_san_chi_tiet: string;
  token: string;
  initialRating?: number;
  onSuccess: () => void;
}

export default function RatingModal({
  isOpen,
  onClose,
  ma_dat_san_chi_tiet,
  token,
  initialRating = 0,
  onSuccess
}: RatingModalProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Vui lòng chọn số sao");
      return;
    }

    try {
      setIsSubmitting(true);
      await ratingService.createRating({
        ma_dat_san_chi_tiet,
        so_sao: rating
      }, token);
      
      toast.success("Đánh giá thành công!");
      onSuccess();
      onClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Lỗi khi gửi đánh giá";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1a1313] w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-2">
            Đánh giá trải nghiệm
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
            Vui lòng đánh giá sân để giúp chúng tôi cải thiện chất lượng dịch vụ.
          </p>

          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <span 
                  className={`material-symbols-outlined text-4xl ${
                    (hoveredRating ? star <= hoveredRating : star <= rating)
                      ? "text-yellow-400 fill-yellow-400 [font-variation-settings:'FILL'1]"
                      : "text-slate-300 dark:text-slate-700"
                  }`}
                >
                  star
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-red-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Gửi đánh giá"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
