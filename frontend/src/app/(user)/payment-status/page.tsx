'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get('status');
  const txnRef = searchParams.get('vnp_TxnRef');
  const message = searchParams.get('message');

  useEffect(() => {
    // Optional: Call API to double check the status if needed
  }, []);

  if (status === 'success') {
    return (
      <div className="text-center py-20 px-4 max-w-xl mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="text-green-500 w-24 h-24" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Thanh toán thành công!</h1>
        <p className="text-slate-600 mb-8">
          Đơn hàng <span className="font-semibold text-slate-800">#{txnRef}</span> của bạn đã được thanh toán thành công. Cảm ơn bạn đã sử dụng dịch vụ.
        </p>
        <Link href="/history" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-primary/30 w-full sm:w-auto">
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
      <p className="text-slate-600 mb-8">
        Rất tiếc, giao dịch của bạn không thành công hoặc đã bị hủy.
        {message === 'invalid_checksum' && ' Dữ liệu không hợp lệ.'}
        {txnRef && ` Mã đơn hàng: #${txnRef}`}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={() => router.back()} className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-primary/30">
          Thử thanh toán lại
        </button>
        <Link href="/" className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
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
