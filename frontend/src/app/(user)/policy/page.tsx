export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-green-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Chính sách & Quy định</h1>
          <p className="text-green-100 mt-2">Các điều khoản, chính sách và quy định áp dụng tại SportLink</p>
        </div>
        
        <div className="p-8 space-y-8 text-gray-700">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b">Điều khoản đặt sân</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Chính sách huỷ / đổi lịch sân áp dụng theo các quy định dưới đây.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3 pb-2 border-b border-green-100">Quy định đặt sân & thời gian tối thiểu</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Thời gian đặt sân tối thiểu là <strong>1 tiếng</strong>.</li>
              <li>Quý khách có thể đặt nhiều sân cùng một lúc nhưng <strong>phải cùng ngày</strong>, không được khác ngày. Nếu muốn đặt sân ở các ngày khác nhau, vui lòng <strong>tách riêng</strong> thành các đơn đặt sân khác nhau.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b">Chính sách hoàn tiền & huỷ lịch</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Trường hợp quý khách huỷ sân <strong>sau 30 phút</strong> kể từ lúc đặt: Hoàn lại <strong>50%</strong> số tiền đã thanh toán.</li>
              <li>Trường hợp quý khách huỷ sân <strong>sau 1 tiếng</strong> kể từ lúc đặt: <strong>Không hoàn tiền</strong>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b">Quy định chuyển nhượng/đổi lịch đặt</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Sân không hỗ trợ huỷ/đổi ngoài thời gian quy định ở trên. Quý khách có nhu cầu thay đổi vui lòng tự <strong>pass sân lại cho người khác</strong> bằng cách tìm người thay thế trên các hội nhóm cộng đồng.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b">Chính sách xử lý khi điều kiện bất khả kháng (mưa bão, bảo trì sân, lỗi hệ thống...)</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Trường hợp mưa bão, bảo trì sân, lỗi hệ thống... sân sẽ hoàn tiền 100% cho quý khách.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b">Quy định an toàn & trách nhiệm người chơi</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Quý khách hàng vui lòng thực hiện các nội quy an toàn tại sân.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b">Chính sách bảo mật thông tin khách hàng</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Cam kết bảo mật tuyệt đối thông tin cá nhân và lịch sử đặt sân của khách hàng.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 pb-2 border-b">Các quy định bổ sung riêng của sân (nếu có)</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Sẽ được thông báo cụ thể tại từng sân khi khách hàng đến nhận sân.</li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}