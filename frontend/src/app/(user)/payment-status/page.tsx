'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';

// Mã lỗi VNPay sandbox — giúp debug
const VNPAY_CODES: Record<string, string> = {
  '07': 'Trừ tiền thành công nhưng giao dịch bị nghi ngờ',
  '09': 'Thẻ/Tài khoản chưa đăng ký dịch vụ InternetBanking',
  '10': 'Xác thực thông tin thẻ sai quá 3 lần',
  '11': 'Hết hạn chờ thanh toán, vui lòng thực hiện lại',
  '12': 'Thẻ/Tài khoản bị khóa',
  '13': 'Nhập sai mật khẩu OTP',
  '24': 'Khách hàng huỷ giao dịch',
  '51': 'Tài khoản không đủ số dư',
  '65': 'Vượt quá hạn mức giao dịch trong ngày',
  '75': 'Ngân hàng đang bảo trì',
  '79': 'Nhập sai mật khẩu thanh toán quá số lần',
  '99': 'Lỗi không xác định',
};

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status   = searchParams.get('status');
  const txnRef   = searchParams.get('vnp_TxnRef');
  const message  = searchParams.get('message');
  const code     = searchParams.get('code');   // responseCode từ VNPay

  const errorDetail = code ? (VNPAY_CODES[code] ?? `Mã lỗi: ${code}`) : undefined;

  if (status === 'success') {
    return (
      <div className="text-center py-20 px-4 max-w-xl mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="text-green-500 w-24 h-24" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Thanh toán thành công!</h1>
        <p className="text-slate-600 mb-8">
          Đơn hàng <span className="font-semibold text-slate-800">#{txnRef}</span> đã được thanh toán.
          Cảm ơn bạn đã sử dụng dịch vụ.
        </p>
        <Link
          href="/history"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-primary/30 w-full sm:w-auto"
        >
          Xem lịch sử đặt sân
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center py-20 px-4 max-w-xl mx-auto">
      <div className="flex justify-center mb-6">
        <XCircle className="text-red-500 w-24 h-24" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Thanh toán thất bại</h1>
      <p className="text-slate-600 mb-2">
        Rất tiếc, giao dịch của bạn không thành công hoặc đã bị huỷ.
      </p>

      {/* Hiển thị lý do cụ thể */}
      {errorDetail && (
        <p className="text-sm text-red-500 font-medium mb-2">{errorDetail}</p>
      )}
      {message === 'invalid_checksum' && (
        <p className="text-sm text-red-500 font-medium mb-2">Dữ liệu không hợp lệ (checksum sai).</p>
      )}
      {txnRef && (
        <p className="text-sm text-slate-400 mb-8">Mã đơn hàng: #{txnRef}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => router.back()}
          className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-primary/30"
        >
          Thử thanh toán lại
        </button>
        <Link
          href="/"
          className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default function PaymentStatus() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Đang tải...</div>}>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50/50">
        <PaymentStatusContent />
      </div>
    </Suspense>
  );
}