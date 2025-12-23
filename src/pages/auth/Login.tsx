import AppIcon from "../../components/ui/AppIcon";
// import { Link } from "react-router-dom";

type Props = {};

function Login({}: Props) {
  return (
    <div className="flex items-center flex-col justify-center h-screen bg-white">
      <div className="bg-zinc-50 p-8 rounded-md shadow-md w-96 text-center">
        <div className="flex items-center justify-between mb-12">
          {/* <img src="/logo.png" alt="Logo" className="mx-auto h-16 w-16" /> */}
          <div>
            <h2 className="text-2xl font-semibold">Line App</h2>
          </div>
          <div>
            {/* bu yerda pagination soni ko'rsatiladi */}
            <span className="bg-gray-400 border border-white bg-opacity-25 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold">
              1/3
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-8">Xush kelibsiz!</h1>
        <p className="text-sm text-gray-400">
          Tizimga kirish uchun telefon raqamdan foydalaning
        </p>
        <div className="mt-12 space-y-4">
          <form className="flex flex-col gap-4">
            <div className="relative">     
             
            <input
              type="text"
              name="phone"
              placeholder="+998 __ ___ __ __"
              className="w-full bg-white px-4 py-2 border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              pattern="^998[0-9]{9}$"
              required={true}
            />
            
            <span className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400">
              <AppIcon name="lucide:phone" className="w-6 h-6 inline-block ml-2" />
            </span>
            </div>
            <div className="">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600">
                <AppIcon name="file-icons:telegram" className="w-6 h-6 inline-block mr-2" />
                Telegram orqali kirish
              </button>
            </div>
            <div>
              <p className="text-xs text-gray-400">
                Tizimga kirish orqali siz{" "}
                <a href="#" className="text-blue-500 underline">
                  Foydalanish shartlari
                </a>{" "}
                hamda{" "}
                <a href="#" className="text-blue-500 underline">
                  Maxfiylik siyosati
                </a>
                ni qabul qilgan bo‘lasiz.
              </p>
            </div>
            {/* <div>
              <p>
                <Link to="/register" className="text-blue-500 text-sm">
                  Akkauntingiz bormi? Tizimga kirish
                </Link>
              </p> */}
            {/* </div> */}
            <div className="">
              <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                Davom etish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
