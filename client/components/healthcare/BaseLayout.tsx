import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

interface BaseLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function BaseLayout({ children, title }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-gray-50 h-[72px] flex items-center justify-between px-7">
          <h1 className="text-[28px] font-bold text-gray-900 leading-[34px] tracking-[-0.4px]">{title}</h1>
          
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z" fill="#9CA3AF"/>
              </svg>
              <input
                type="text"
                placeholder="Search.."
                className="pl-12 w-[267px] h-12 bg-gray-50 border-2 border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:border-gray-300 focus:outline-none"
              />
            </div>

            {/* Notifications */}
            <button className="relative w-10 h-10 p-0 bg-transparent border-none cursor-pointer">
              <svg className="w-5 h-5 text-gray-700 stroke-[1.5] mx-auto" width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.17188 7.87305C2.16967 6.93847 2.3519 6.01252 2.70801 5.14844C3.06413 4.28439 3.58702 3.49854 4.24707 2.83691C4.90711 2.17536 5.69153 1.65111 6.55469 1.29297C7.41796 0.934786 8.34368 0.749997 9.27832 0.75H9.3291L9.69141 0.761719C13.4056 0.978027 16.3836 4.126 16.3838 7.95898V8.625C16.3838 11.8533 17.041 13.7426 17.6553 14.8008V14.8018C17.7292 14.9307 17.7768 15.0723 17.7959 15.2188L17.8057 15.3662C17.8056 15.5643 17.7539 15.7589 17.6553 15.9307C17.5565 16.1025 17.4143 16.2459 17.2432 16.3457C17.0719 16.4456 16.8769 16.4987 16.6787 16.5H12.7021L12.6377 17.1787C12.5577 18.0143 12.169 18.7899 11.5479 19.3545C10.9267 19.919 10.1176 20.2323 9.27832 20.2324C8.43886 20.2324 7.62902 19.9191 7.00781 19.3545C6.38672 18.7899 5.99793 18.0142 5.91797 17.1787L5.85352 16.5H1.87695C1.67876 16.4987 1.48372 16.4456 1.3125 16.3457C1.1414 16.2459 0.999105 16.1024 0.900391 15.9307C0.801784 15.7589 0.750095 15.5642 0.75 15.3662C0.749912 15.1696 0.80136 14.9766 0.898438 14.8057C1.51341 13.7483 2.17188 11.8578 2.17188 8.625V7.87305Z" stroke="#111827" strokeWidth="1.5"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-red-400 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-900 font-medium">3</span>
              </div>
            </button>

            {/* User Profile */}
            <button className="w-10 h-10 p-0 bg-transparent border-none cursor-pointer">
              <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center">
                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.4424 11.0295C12.6806 11.0295 14.6924 8.81647 14.6924 5.25416C14.6924 2.35701 12.3372 0 9.4424 0C6.54755 0 4.19241 2.35701 4.19241 5.25416C4.19241 8.81647 6.2042 11.0295 9.4424 11.0295ZM9.44999 12.5933C4.75387 12.5933 0 14.0372 0 16.7966C0 19.5561 4.75387 21 9.44999 21C14.1461 21 18.9 19.5561 18.9 16.7966C18.9 14.0372 14.1461 12.5933 9.44999 12.5933Z" fill="#9C80F4"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
