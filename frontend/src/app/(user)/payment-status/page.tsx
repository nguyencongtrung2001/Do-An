'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiGet } from '@/services/api';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        
        const queryString = searchParams.toString();
        
        
        const res = await apiGet<any>(`/booking/vnpay-callback?${queryString}`);
        
        if (res.data?.status === 'SUCCESS') {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      } catch (error) {
        console.error('Lỗi xác thực thanh toán:', error);
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.get('vnp_SecureHash')) {
      verifyPayment();
    } else {
      setLoading(false);
      setIsSuccess(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <p className="text-slate-600 font-medium">Đang xác thực giao dịch với VNPay, vui lòng không đóng trình duyệt...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
        {isSuccess ? (
          <>
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Thanh toán thành công!</h1>
            <p className="text-slate-500 text-sm mb-6">Lịch đặt sân của bạn đã được xác nhận. Chúc bạn có những giờ phút chơi thể thao vui vẻ!</p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-rose-500 mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Thanh toán thất bại</h1>
            <p className="text-slate-500 text-sm mb-6">Giao dịch bị hủy hoặc xảy ra lỗi trong quá trình xử lý. Vui lòng kiểm tra lại số dư tài khoản hoặc thử lại.</p>
          </>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/history"
            className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition-colors ${
              isSuccess 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Xem lịch sử đặt sân
          </Link>
          <Link
            href="/"
            className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition-colors ${
              isSuccess 
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Đang tải...</div>}>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50/50">
        <PaymentStatusContent />
      </div>
    </Suspense>
  );
}