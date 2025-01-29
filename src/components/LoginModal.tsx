import logo from '../assets/images/logo.png';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSignup: () => void;
}

const LoginModal = ({ isOpen, onClose, onSignup }: Props) => {
    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
                <div className="flex justify-center mb-6">
                    <img
                        alt=""
                        src={logo}
                        className="h-8 w-auto"
                    />
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="이메일을 입력하세요."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력하세요."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-teal-600 text-black font-bold rounded-md shadow-md hover:bg-teal-700"
                    >
                        로그인
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            계정이 없으신가요?{' '}
                            <a
                                href="#signup"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSignup();
                                }}
                                className="text-[#7986CB] font-semibold hover:underline"
                            >
                                회원가입하러 가기
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
