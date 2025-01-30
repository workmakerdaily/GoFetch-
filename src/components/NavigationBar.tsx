import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import logo from '../assets/images/logo.png';
import navLogo from '../assets/images/nav-logo.png';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { Link, useLocation } from 'react-router-dom';
import { HOSPITAL_SPOTS_PATH, RESTAURANT_SPOTS_PATH, ROOT_PATH, TOURIST_SPOTS_PATH } from '../constants';



const NavigationBar = () => {

    // function: 현재 경로를 가져오기 함수 //
    const location = useLocation();

    // function: 현재 경로 활성화 확인 함수 //
    const isActive = (path: string) => location.pathname.startsWith(path);

    // state: 로그인, 회원가입 모달 및 반응형 메뉴 상태 //
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    // event handler: 로그인 버튼 클릭 이벤트 핸들러 //
    const loginClickHandler = () => {
        setMobileMenuOpen(false);
        setIsSignupOpen(false);
        setIsLoginOpen(true);
    };

    // event handler: 회원가입 버튼 클릭 이벤트 핸들러 //
    const signupClickHandler = () => {
        setMobileMenuOpen(false);
        setIsLoginOpen(false);
        setIsSignupOpen(true);
    };

    return (
        <>
            <header className="bg-transparent fixed top-0 left-0 w-full z-50 px-8">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link to={ROOT_PATH} className="-m-1.5 p-1.5">
                            <span className="sr-only">logo</span>
                            <img
                                alt=""
                                src={navLogo}
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-6 lg:mr-auto">
                        <Link
                            to={TOURIST_SPOTS_PATH}
                            className={`text-base font-semibold rounded-md px-2 py-1 ${isActive(TOURIST_SPOTS_PATH)
                                ? "text-[#3949AB] underline"
                                : "text-[#3949AB] hover:underline"
                                }`}
                        >
                            여행지
                        </Link>
                        <Link
                            to={RESTAURANT_SPOTS_PATH}
                            className={`text-base font-semibold rounded-md px-2 py-1 ${isActive(RESTAURANT_SPOTS_PATH)
                                ? "text-[#3949AB] underline"
                                : "text-[#3949AB] hover:underline"
                                }`}
                        >
                            음식점
                        </Link>
                        <Link
                            to={HOSPITAL_SPOTS_PATH}
                            className={`text-base font-semibold rounded-md px-2 py-1 ${isActive(HOSPITAL_SPOTS_PATH)
                                ? "text-[#3949AB] underline"
                                : "text-[#3949AB] hover:underline"
                                }`}
                        >
                            병원
                        </Link>
                    </PopoverGroup>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <div
                            onClick={loginClickHandler}
                            className="p-2 rounded-full text-[#3949AB] hover:bg-[#3949AB] hover:text-[#9FA8DA] cursor-pointer"
                        >
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to={ROOT_PATH} onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src={logo}
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">

                                    <Link
                                        to={TOURIST_SPOTS_PATH}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isActive(TOURIST_SPOTS_PATH)
                                                ? "bg-[#5C6BC0] text-white"
                                                : "text-[#3949AB] hover:bg-[#9FA8DA] hover:text-white"
                                            }`}
                                    >
                                        여행지
                                    </Link>
                                    <Link
                                        to={RESTAURANT_SPOTS_PATH}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isActive(RESTAURANT_SPOTS_PATH)
                                                ? "bg-[#5C6BC0] text-white"
                                                : "text-[#3949AB] hover:bg-[#9FA8DA] hover:text-white"
                                            }`}
                                    >
                                        음식점
                                    </Link>
                                    <Link
                                        to={HOSPITAL_SPOTS_PATH}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isActive(HOSPITAL_SPOTS_PATH)
                                                ? "bg-[#5C6BC0] text-white"
                                                : "text-[#3949AB] hover:bg-[#9FA8DA] hover:text-white"
                                            }`}
                                    >
                                        병원
                                    </Link>
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                                        onClick={loginClickHandler}
                                    >
                                        로그인
                                    </a>
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                                        onClick={signupClickHandler}
                                    >
                                        회원가입
                                    </a>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSignup={() => {
                    setIsLoginOpen(false);
                    setIsSignupOpen(true);
                }}
            />
            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLogin={() => {
                    setIsSignupOpen(false);
                    setIsLoginOpen(true);
                }}
            />
        </>
    )
}

export default NavigationBar;