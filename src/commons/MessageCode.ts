export enum MessageCode {
	USER_NOT_FOUND = 'Không tìm thấy thông tin người dùng',
	USER_NOT_REGISTER = 'Bạn chưa đăng ký dịch vụ, vui lòng liên hệ quản trị hệ thống để đăng ký',
	USER_IS_DELETED = 'Tài khoản đã bị khóa',
	USER_ALREADY_EXISTED = 'Tên người dùng đã tồn tại trong hệ thống',
	USER_CREATE_ERROR = 'Không thể đăng ký ngay lúc này',
	USER_PASSWORD_WRONG = 'Tên người dùng hoặc mật khẩu không chính xác',
	USER_NOT_HAVE_PERMISSION = 'Bạn không có quyền truy cập chức năng này',
	USER_INVALID_TOKEN = 'Token không hợp lệ hoặc đã hết hạn',

	UNKNOWN_ERROR = 'Lỗi không xác định',
    MISSING_REQUIRED_FIELD = "Thiếu thông tin bắt buộc",
	PLEASE_FILL_ALL_REQUIRED_FIELDS = 'Vui lòng điền đầy đủ thông tin',
}